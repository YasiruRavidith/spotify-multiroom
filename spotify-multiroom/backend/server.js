import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'https://spotify-multiroom-backend.vercel.app/callback';
const SITE_PASSWORD = process.env.SITE_PASSWORD;
const DEVICE_NAME = process.env.DEVICE_NAME || 'Spotify Multi-Room';

let accessToken = null;
let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN || null;
let tokenExpiry = 0;
let currentPlaybackState = null;
let deviceId = null;

// Connected WebSocket clients
const clients = new Set();

// Refresh access token
async function refreshAccessToken() {
  if (!refreshToken) {
    console.log('No refresh token available. Please authorize first.');
    return false;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    });

    const data = await response.json();
    
    if (data.access_token) {
      accessToken = data.access_token;
      tokenExpiry = Date.now() + (data.expires_in * 1000);
      console.log('✅ Access token refreshed');
      return true;
    }
  } catch (error) {
    console.error('Token refresh error:', error);
  }
  return false;
}

// Get current playback state
async function getCurrentPlayback() {
  if (!accessToken || Date.now() >= tokenExpiry) {
    await refreshAccessToken();
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (response.status === 204) {
      return null;
    }

    if (response.ok) {
      const data = await response.json();
      return {
        isPlaying: data.is_playing,
        progress: data.progress_ms,
        track: data.item ? {
          name: data.item.name,
          artists: data.item.artists.map(a => a.name).join(', '),
          album: data.item.album.name,
          image: data.item.album.images[0]?.url,
          uri: data.item.uri,
          duration: data.item.duration_ms
        } : null,
        device: data.device
      };
    }
  } catch (error) {
    console.error('Playback fetch error:', error);
  }
  return null;
}

// Broadcast to all connected clients
function broadcast(data) {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}

// Poll Spotify for playback state
async function pollPlayback() {
  const state = await getCurrentPlayback();
  
  if (state && JSON.stringify(state) !== JSON.stringify(currentPlaybackState)) {
    currentPlaybackState = state;
    broadcast({ type: 'playback', data: state });
  }
}

// Start polling
setInterval(pollPlayback, 2000);

// Initial token refresh
if (refreshToken) {
  refreshAccessToken();
}

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  // Send current state immediately
  if (currentPlaybackState) {
    ws.send(JSON.stringify({ type: 'playback', data: currentPlaybackState }));
  }

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // Broadcast sync commands to all OTHER clients
      if (data.type === 'sync') {
        clients.forEach(client => {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify(data));
          }
        });
      }
    } catch (err) {
      console.error('WebSocket message error:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

// Routes

// Get Spotify access token for Web Playback SDK
app.get('/api/token', async (req, res) => {
  if (!accessToken || Date.now() >= tokenExpiry) {
    await refreshAccessToken();
  }
  
  res.json({ 
    accessToken: accessToken,
    expiresIn: Math.floor((tokenExpiry - Date.now()) / 1000)
  });
});

// Register device ID from frontend
app.post('/api/register-device', (req, res) => {
  const { deviceId: id } = req.body;
  deviceId = id;
  console.log(`✅ Device registered: ${id}`);
  res.json({ success: true });
});

// Transfer playback to this device
app.post('/api/transfer-playback', async (req, res) => {
  if (!accessToken || Date.now() >= tokenExpiry) {
    await refreshAccessToken();
  }

  if (!deviceId) {
    return res.status(400).json({ error: 'Device not registered' });
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: false
      })
    });

    if (response.ok || response.status === 204) {
      res.json({ success: true });
    } else {
      const error = await response.text();
      res.status(response.status).json({ error });
    }
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Authorization URL - Visit this in browser to get the auth link
app.get('/auth/url', (req, res) => {
  const scopes = 'user-read-playback-state user-modify-playback-state streaming user-read-email user-read-private';
  const authUrl = 'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scopes,
      redirect_uri: REDIRECT_URI,
    });
  
  // Send both JSON and HTML response
  res.send(`
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 40px; background: #1DB954; color: white; }
          .container { max-width: 600px; margin: 0 auto; background: rgba(0,0,0,0.3); padding: 30px; border-radius: 10px; }
          a { display: inline-block; background: white; color: #1DB954; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
          code { background: rgba(0,0,0,0.5); padding: 10px; display: block; margin: 10px 0; border-radius: 5px; word-break: break-all; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎵 Spotify Authorization</h1>
          <p>Click the button below to authorize your Spotify account:</p>
          <a href="${authUrl}" target="_blank">Authorize Spotify</a>
          <p><small>Current Redirect URI: <code>${REDIRECT_URI}</code></small></p>
          <p><small>Make sure this matches exactly in your Spotify Developer Dashboard!</small></p>
        </div>
      </body>
    </html>
  `);
});

// OAuth callback
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      })
    });

    const data = await response.json();
    
    if (data.refresh_token) {
      refreshToken = data.refresh_token;
      accessToken = data.access_token;
      tokenExpiry = Date.now() + (data.expires_in * 1000);
      
      console.log('✅ Authorization successful!');
      console.log('🔑 Save this refresh token to your .env file:');
      console.log(`SPOTIFY_REFRESH_TOKEN=${refreshToken}`);
      
      res.send(`
        <html>
          <body style="font-family: Arial; padding: 40px; text-align: center;">
            <h1>✅ Authorization Successful!</h1>
            <p>Copy this refresh token to your .env file:</p>
            <div style="background: #f0f0f0; padding: 20px; margin: 20px; border-radius: 8px; word-break: break-all;">
              <code>SPOTIFY_REFRESH_TOKEN=${refreshToken}</code>
            </div>
            <p>Then restart your server. You can close this window.</p>
          </body>
        </html>
      `);
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).send('Authorization failed');
  }
});

// Get current playback state
app.get('/api/playback', async (req, res) => {
  const state = await getCurrentPlayback();
  res.json(state || { isPlaying: false, track: null });
});

// Verify password
app.post('/api/verify', (req, res) => {
  const { password } = req.body;
  
  if (!SITE_PASSWORD) {
    return res.json({ valid: true });
  }
  
  res.json({ valid: password === SITE_PASSWORD });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    hasToken: !!refreshToken,
    tokenValid: accessToken && Date.now() < tokenExpiry
  });
});

// Keep-alive ping endpoint (prevents Render from spinning down)
app.get('/api/ping', (req, res) => {
  res.json({ 
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  if (!refreshToken) {
    console.log('\n⚠️  No refresh token found!');
    console.log(`📝 Visit http://localhost:${PORT}/auth/url to authorize`);
  } else {
    console.log('✅ Spotify connected');
  }
});