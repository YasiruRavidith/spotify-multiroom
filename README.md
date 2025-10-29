# 🎵 Web Potify


A beautiful, full-featured web-based Spotify player that brings the premium Spotify experience to your browser. Built with React and the Spotify Web Playback SDK, this project allows you to control Spotify playback across multiple devices simultaneously.

<p align="center">
  <kbd>
    <img src="spotify-multiroom/frontend/public/spotify.png" alt="Web Potify" width="200">
  </kbd>
</p>

## 🌟 Features

### 🎮 Full Playback Control
- Play, pause, skip tracks
- Shuffle and repeat modes (off, context, track)
- Real-time progress bar with seek functionality
- Volume control with persistent settings

### 📱 Responsive Design
- **Desktop**: Full album artwork with side-by-side controls
- **Mobile**: Optimized layout with album on top, controls below
- Adaptive UI that works seamlessly on any screen size

### 🔄 Device Switching
- View all available Spotify devices in real-time
- Switch playback between devices with one click
- Visual indicators for active device
- Support for computers, smartphones, speakers, and more

### 🔒 Password Protection
- Optional site password for access control
- Clean, modern login interface
- Red-themed design matching Spotify branding

### 🎨 Beautiful UI
- Spotify-inspired purple gradient background
- Smooth animations and transitions
- Glass-morphism design elements
- Real-time connection status

## 📸 Screenshots

### Mobile Experience

| Device Switcher | Password Screen | Now Playing |
|:---:|:---:|:---:|
| ![Device Switcher](https://github.com/user-attachments/assets/4b4a13eb-e7fb-4eae-901a-8f1fe7b82792) | ![Password Screen](https://github.com/user-attachments/assets/c8945d69-d0e9-4c86-9eff-c393aad71901) | ![Now Playing](https://github.com/user-attachments/assets/033b0235-6e89-44d4-9f17-e49f64b24e9f) |
| *Switch between devices* | *Secure password entry* | *Full playback control* |

**What you see in the screenshots:**
- 🎵 **Track Info**: "What It Is (Block Boy)" by Doechii, Kodak Black
- 📱 **Device Options**: Computer ("Web Potify Player", "NEKORAMEN") and Smartphone ("NEKORAMEN_2003_Mobile")
- 🟢 **Active Status**: Shows which device is currently playing
- ⏯️ **Playback Controls**: Shuffle, previous, pause/play, next, repeat
- 📊 **Progress Bar**: Current time (2:04-2:13) out of total duration (3:43)
- 🎨 **Beautiful UI**: Purple gradient with album artwork
- 🔒 **Security**: Password-protected access

## 🚀 The Journey

Web Potify evolved from a simple Spotify player into a full-featured multi-room audio system. Here's the development story:

### Phase 1: Core Player Foundation
- ✅ Integrated Spotify Web Playback SDK
- ✅ Built OAuth authentication flow
- ✅ Created basic play/pause controls
- ✅ Displayed real-time track information

### Phase 2: Enhanced Functionality
- ✅ Made shuffle and repeat buttons functional (not just visual)
- ✅ Added progress bar with seek capability
- ✅ Implemented volume control with localStorage persistence
- ✅ Fixed styling issues with parent flex containers

### Phase 3: Multi-Device Support
- ✅ Built device discovery via Spotify API
- ✅ Created DeviceSwitcher component with dropdown UI
- ✅ Added real-time active device detection
- ✅ Implemented WebSocket for multi-room synchronization

### Phase 4: Responsive Design
- ✅ Designed mobile-first responsive layout
- ✅ Optimized album artwork sizing with CSS clamp
- ✅ Made controls touch-friendly
- ✅ Adjusted spacing and padding for all screen sizes
- ✅ Hidden volume control on mobile devices

### Phase 5: Polish & Security
- ✅ Created password protection screen
- ✅ Switched to red-themed branding to match Spotify logo
- ✅ Added connection status indicators
- ✅ Secured environment variables with .gitignore
- ✅ Verified no sensitive data in git history

### Challenges Overcome
- 🔧 **Margin/Padding Issues**: Parent `items-center` was overriding child margins - switched to `items-start`
- 🔧 **Tailwind Specificity**: Used inline styles where Tailwind classes were being overridden
- 🔧 **Token Authentication**: Fixed backend token property naming (accessToken vs access_token)
- 🔧 **Volume Persistence**: Implemented localStorage to remember volume across page refreshes
- 🔧 **API Integration**: Connected shuffle/repeat buttons to actual Spotify Web API endpoints

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling framework
- **Spotify Web Playback SDK** - Browser-based audio playback
- **WebSocket** - Real-time multi-room synchronization
- **lucide-react** - Beautiful icon library
- **PropTypes** - Runtime type checking

### Backend
- **Node.js + Express** - RESTful API server
- **WebSocket Server** - Real-time bidirectional communication
- **Spotify Web API** - Device management and playback control
- **OAuth 2.0** - Secure Spotify authentication
- **node-fetch** - HTTP client for API calls

### Deployment & DevOps
- **Vercel** - Serverless hosting for frontend and backend
- **Environment Variables** - Secure credential management
- **Git** - Version control with proper .gitignore

## 📦 Project Structure

```
spotify-multiroom/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AlbumArtwork.jsx      # Album display with playing animation
│   │   │   ├── DeviceSwitcher.jsx    # Device selection dropdown
│   │   │   ├── Header.jsx            # Top bar with logout & status
│   │   │   ├── NowPlaying.jsx        # Main player container
│   │   │   ├── PasswordScreen.jsx    # Authentication screen
│   │   │   ├── PlaybackControls.jsx  # Play/pause/skip/shuffle/repeat
│   │   │   ├── ProgressBar.jsx       # Seek bar and time display
│   │   │   └── VolumeControls.jsx    # Volume slider control
│   │   ├── hooks/
│   │   │   ├── useSpotifyPlayer.js   # Playback SDK integration
│   │   │   └── useWebSocket.js       # Multi-room sync logic
│   │   ├── App.jsx                   # Main application component
│   │   ├── App.css                   # Global styles
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Tailwind imports
│   ├── public/
│   │   └── spotify.png               # Spotify logo
│   ├── .env.example                  # Environment template
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── server.js                     # Express + WebSocket server
│   ├── .env.example                  # Environment template
│   ├── package.json
│   └── vercel.json                   # Vercel configuration
│
├── docs/                             # Documentation
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 16+ installed
- Spotify Premium account (required for Web Playback SDK)
- Spotify Developer account (for API credentials)

### 1. Clone Repository
```bash
git clone https://github.com/YasiruRavidith/spotify-multiroom.git
cd spotify-multiroom
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Create a Spotify app at [developer.spotify.com](https://developer.spotify.com/dashboard):
1. Create new app
2. Note your Client ID and Client Secret
3. Add redirect URI: `http://localhost:3001/callback`

Edit `backend/.env`:
```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
REDIRECT_URI=http://localhost:3001/callback
SITE_PASSWORD=your_password_here
PORT=3001
DEVICE_NAME=Web Potify
```

### 3. Get Refresh Token
```bash
npm start
# Visit http://localhost:3001/auth/url in your browser
# Click "Authorize Spotify"
# Copy the refresh token displayed
# Add it to .env as SPOTIFY_REFRESH_TOKEN=...
# Restart the server
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
VITE_SITE_PASSWORD=your_password_here
```

### 5. Run Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` and enjoy! 🎉

## 🌐 Production Deployment

### Deploy to Vercel

#### Backend Deployment
```bash
cd backend
vercel login
vercel

# Add environment variables
vercel env add SPOTIFY_CLIENT_ID
vercel env add SPOTIFY_CLIENT_SECRET
vercel env add SPOTIFY_REFRESH_TOKEN
vercel env add SITE_PASSWORD

# Deploy to production
vercel --prod
```

#### Frontend Deployment
```bash
cd frontend
vercel

# Add environment variables
vercel env add VITE_API_URL        # Your backend Vercel URL
vercel env add VITE_WS_URL         # Your backend Vercel URL with wss://
vercel env add VITE_SITE_PASSWORD

# Deploy to production
vercel --prod
```

**Important**: Update your Spotify app's redirect URI in the [Developer Dashboard](https://developer.spotify.com/dashboard) to match your production backend URL.

## 🎯 How to Use

1. **Open the App**: Navigate to your deployed URL or `localhost:5173`
2. **Enter Password**: Type the password you configured (if enabled)
3. **Wait for Connection**: Look for the green "Online" status indicator
4. **Start Playing**: Control playback from Spotify (desktop/mobile app)
5. **Switch Devices**: Click the monitor icon to see all available devices
6. **Transfer Playback**: Select "Web Potify Player" to play through the browser
7. **Control Everything**: Use the web interface to play, pause, skip, shuffle, repeat
8. **Multi-Room**: Open on multiple devices for synchronized audio

### Tips
- Volume persists across page refreshes
- Shuffle and repeat states sync with Spotify
- Device list updates in real-time
- Progress bar is clickable for seeking
- Works on mobile and desktop

## 🔐 Security Features

All sensitive credentials are properly secured:

✅ **Environment Variables**: All secrets in `.env` files  
✅ **Git Protection**: `.env` files in `.gitignore`  
✅ **No Hardcoded Secrets**: All credentials from environment  
✅ **Production Secrets**: Managed through Vercel dashboard  
✅ **Password Protection**: Optional site access control  
✅ **OAuth 2.0**: Secure Spotify authentication  
✅ **Token Refresh**: Automatic access token renewal  

**Verified**: No sensitive data in git history ✨

## 🐛 Troubleshooting

### Player Shows "Offline"?
- Check backend is running and accessible
- Verify `VITE_API_URL` matches your backend URL
- Check browser console for errors
- Ensure Spotify Premium account

### Can't Switch Devices?
- Open Spotify on target device first
- Make sure device appears in Spotify app's device list
- Check API token has `user-modify-playback-state` scope
- Try refreshing the page

### No Audio Playing?
- Verify you have Spotify Premium (required)
- Check volume is not muted
- Ensure "Web Potify Player" is selected in device list
- Try transferring playback from Spotify app first

### Volume Control Not Working?
- Some Spotify devices don't support remote volume
- Check localStorage for saved volume (`spotify_volume`)
- Volume hidden on mobile - use device's physical controls

### Shuffle/Repeat Not Changing?
- Wait 2-3 seconds for Spotify API to process
- Check network tab for API responses
- Verify access token is valid
- Try controlling from Spotify app to verify connection

## 📚 API Reference

### Backend Endpoints

- `GET /api/token` - Get Spotify access token for SDK
- `GET /api/health` - Health check and token status
- `POST /api/verify` - Verify site password
- `POST /api/register-device` - Register Web Playback SDK device
- `GET /auth/url` - Get Spotify authorization URL
- `GET /callback` - OAuth callback handler

### WebSocket Events

- `playback` - Broadcast playback state changes
- `sync` - Synchronize state across clients

## 🎓 What I Learned

Building Web Potify taught me valuable lessons about:

- **Spotify Integration**: Working with Web Playback SDK and Web API
- **React Hooks**: Custom hooks for complex state management
- **WebSocket**: Real-time bidirectional communication
- **Responsive Design**: Mobile-first CSS with Tailwind
- **OAuth 2.0**: Secure authentication flows
- **State Synchronization**: Keeping multiple clients in sync
- **Token Management**: Automatic refresh and expiry handling
- **CSS Specificity**: When to use inline styles vs classes
- **Environment Security**: Proper credential management
- **API Design**: RESTful endpoints and error handling

## 🙏 Acknowledgments

- **Spotify** for the incredible Web Playback SDK and Web API
- **Vercel** for seamless, free hosting
- **React Team** for the amazing framework
- **Vite** for lightning-fast development
- **Tailwind CSS** for beautiful, utility-first styling
- **lucide-react** for clean, modern icons

## 📝 License

This project is for educational purposes. Please comply with:
- [Spotify Developer Terms of Service](https://developer.spotify.com/terms)
- [Spotify Design Guidelines](https://developer.spotify.com/documentation/design)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🌟 Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

## 📞 Contact

**Yasiru Ravidith**
- GitHub: [@YasiruRavidith](https://github.com/YasiruRavidith)
- Project: [spotify-multiroom](https://github.com/YasiruRavidith/spotify-multiroom)

---

<p align="center">
  <strong>Made with ❤️ and 🎵</strong>
</p>

<p align="center">
  <em>Bringing the Spotify experience to the web, one beat at a time.</em>
</p>

<p align="center">
  ⭐ Star this repo if you found it helpful!
</p>
