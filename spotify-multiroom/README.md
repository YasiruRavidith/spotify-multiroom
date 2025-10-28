# 🎵 Spotify Multi-Room Player

A web-based Spotify player that appears as a **single device** in your Spotify device list and can play synchronized music on multiple browsers/devices simultaneously - perfect for multi-room audio with Bluetooth speakers!

## ✨ Features

- 🔊 **Single Spotify Device**: Shows up as one device in Spotify's available devices
- 🏠 **Multi-Room Sync**: Open on multiple browsers/devices for synchronized playback
- 🔐 **No Login Required**: Account credentials stored securely in backend
- 🔒 **Optional Password Protection**: Simple password to access the player
- 📱 **Control from Spotify**: Use your phone/desktop Spotify app to control playback
- ⚡ **Real-time Updates**: WebSocket-based synchronization across all connected clients
- 🌐 **Vercel Ready**: Easy deployment to Vercel

## 🎯 Use Case

Perfect for:
- Playing the same music on multiple Bluetooth speakers in different rooms
- Syncing audio across multiple devices in your house
- Creating a whole-home audio system with just one Spotify Premium account

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Spotify Premium account
- Spotify Developer App credentials

### 1. Create Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in:
   - **App Name**: Spotify Multi-Room (or any name)
   - **App Description**: Multi-room audio player
   - **Redirect URI**: `http://localhost:3001/callback` (for local testing)
4. Save your **Client ID** and **Client Secret**

### 2. Setup Backend

```powershell
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your Spotify credentials:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
REDIRECT_URI=http://localhost:3001/callback
SITE_PASSWORD=yasiru2003
PORT=3001
```

### 3. Setup Frontend

```powershell
cd frontend
npm install
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
VITE_SITE_PASSWORD=yasiru2003
```

### 4. Authorize Spotify

```powershell
# Start backend
cd backend
npm start
```

1. Visit `http://localhost:3001/auth/url` in your browser
2. Click "Authorize Spotify"
3. Log in with your Spotify Premium account
4. Copy the `SPOTIFY_REFRESH_TOKEN` shown
5. Add it to `backend/.env`:
   ```env
   SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
   ```
6. Restart the backend server

### 5. Run the Application

**Terminal 1 - Backend:**
```powershell
cd backend
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser!

## 📱 How to Use

1. **Open the player** on all devices you want to use (browsers with speakers/Bluetooth)
2. **Enter the password** if you set one (default: yasiru2003)
3. **Wait for "Device Ready"** message
4. **On your phone/computer**:
   - Open Spotify app
   - Play any song
   - Tap the "Devices Available" icon
   - Select **"Spotify Multi-Room Player"**
5. **Music plays on all browsers** with the player open! 🎉

## 🌐 Deploy to Vercel

### 1. Update Spotify App Settings

Add your Vercel domain to Spotify Redirect URIs:
```
https://your-app.vercel.app/callback
```

### 2. Install Vercel CLI

```powershell
npm i -g vercel
```

### 3. Deploy

```powershell
vercel
```

### 4. Add Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
SITE_PASSWORD=yasiru2003
VITE_API_URL=https://your-app.vercel.app
VITE_WS_URL=wss://your-app.vercel.app
VITE_SITE_PASSWORD=yasiru2003
```

### 5. Update .env Files for Production

**backend/.env:**
```env
REDIRECT_URI=https://your-app.vercel.app/callback
```

**frontend/.env:**
```env
VITE_API_URL=https://your-app.vercel.app
VITE_WS_URL=wss://your-app.vercel.app
```

Redeploy with `vercel --prod`

## 🔧 Configuration

### Environment Variables

**Backend (`backend/.env`):**
- `SPOTIFY_CLIENT_ID` - From Spotify Developer Dashboard
- `SPOTIFY_CLIENT_SECRET` - From Spotify Developer Dashboard
- `SPOTIFY_REFRESH_TOKEN` - Obtained via `/auth/url`
- `REDIRECT_URI` - Must match Spotify app settings
- `SITE_PASSWORD` - Optional password protection
- `PORT` - Server port (default: 3001)
- `DEVICE_NAME` - Name shown in Spotify (default: "Spotify Multi-Room")

**Frontend (`frontend/.env`):**
- `VITE_API_URL` - Backend URL
- `VITE_WS_URL` - WebSocket URL
- `VITE_SITE_PASSWORD` - Must match backend password

### Remove Password Protection

Set both to empty string:
```env
SITE_PASSWORD=
VITE_SITE_PASSWORD=
```

## 🛠️ Technology Stack

- **Frontend**: React + Vite + Spotify Web Playback SDK
- **Backend**: Node.js + Express + WebSockets
- **API**: Spotify Web API
- **Deployment**: Vercel

## 📝 How It Works

1. **Backend** authenticates with Spotify using your account credentials
2. **Frontend** loads Spotify Web Playback SDK and creates a virtual device
3. The device appears in your **Spotify device list**
4. When you select this device, music plays through the **browser**
5. **WebSockets** sync playback state across all connected browsers
6. **Multiple devices** can open the same URL and play synchronized audio

## ⚠️ Important Notes

- **Spotify Premium required** - Web Playback SDK only works with Premium
- **One account** - All devices use the same Spotify account
- **Browser support** - Chrome, Edge, Firefox (WebM audio support required)
- **Bluetooth speakers** - Connect via your device's Bluetooth settings before opening the player

## 🐛 Troubleshooting

### Device not showing in Spotify?
- Make sure you see "Device Ready" in the player
- Check browser console for errors
- Verify `SPOTIFY_REFRESH_TOKEN` is set correctly
- Ensure Spotify Premium is active

### Music not syncing?
- Check WebSocket connection (should show "Connected")
- Ensure all devices can reach the backend server
- Verify firewall isn't blocking WebSocket connections

### "Premium Required" error?
- Web Playback SDK requires Spotify Premium
- Verify the account has an active Premium subscription

## 📄 License

ISC

## 🤝 Contributing

Feel free to open issues or submit pull requests!

---

**Made with ❤️ for whole-home audio**
