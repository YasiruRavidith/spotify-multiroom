# 🎯 Quick Reference

## 🚀 Start the App

```powershell
# Terminal 1
cd backend
npm start

# Terminal 2
cd frontend
npm run dev
```

Then open: **http://localhost:5173**

---

## 🔑 First Time Setup

1. Get Spotify App credentials from https://developer.spotify.com/dashboard
2. Add to `backend/.env`:
   ```
   SPOTIFY_CLIENT_ID=your_id
   SPOTIFY_CLIENT_SECRET=your_secret
   ```
3. Start backend: `cd backend && npm start`
4. Visit: http://localhost:3001/auth/url
5. Authorize with Spotify Premium account
6. Copy refresh token to `backend/.env`
7. Restart backend

---

## 📱 How to Use

1. Open player in browser(s)
2. Enter password (default: `yasiru2003`)
3. Wait for "Device Ready"
4. On Spotify app → Play song → Select device → "Spotify Multi-Room Player"
5. Music plays on all browsers! 🎉

---

## ⚙️ Configuration

**Change Password:**
```env
# backend/.env
SITE_PASSWORD=your_password

# frontend/.env
VITE_SITE_PASSWORD=your_password
```

**Remove Password:**
```env
SITE_PASSWORD=
VITE_SITE_PASSWORD=
```

**Change Device Name:**
```env
# backend/.env
DEVICE_NAME=My Custom Name
```

---

## 🌐 Deploy to Production

**Recommended:**
- Backend → Railway.app (supports WebSockets)
- Frontend → Vercel (fast CDN)

See `DEPLOYMENT.md` for details.

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Device not showing | Check "Device Ready" status, verify Premium account |
| Can't connect | Ensure backend running on port 3001 |
| "Premium Required" | Web Playback needs Spotify Premium |
| WebSocket failed | Check firewall, verify WS_URL correct |

---

## 📂 Project Structure

```
spotify-multiroom/
├── backend/
│   ├── server.js          ← Main server code
│   ├── package.json       ← Backend dependencies
│   └── .env               ← Configuration (DO NOT COMMIT)
├── frontend/
│   ├── src/
│   │   └── App.jsx        ← Main React component
│   ├── package.json       ← Frontend dependencies
│   └── .env               ← Configuration (DO NOT COMMIT)
├── README.md              ← Full documentation
├── SETUP.md               ← Setup instructions
├── DEPLOYMENT.md          ← Deployment guide
└── setup.ps1              ← Automated setup
```

---

## 🔗 Important URLs

| Purpose | Local URL |
|---------|-----------|
| Player | http://localhost:5173 |
| Authorization | http://localhost:3001/auth/url |
| Backend Health | http://localhost:3001/api/health |
| Spotify Dashboard | https://developer.spotify.com/dashboard |

---

## 📋 Environment Variables

**Backend:**
- `SPOTIFY_CLIENT_ID` - From Spotify Dashboard
- `SPOTIFY_CLIENT_SECRET` - From Spotify Dashboard
- `SPOTIFY_REFRESH_TOKEN` - From /auth/url
- `REDIRECT_URI` - OAuth callback
- `SITE_PASSWORD` - Access password
- `PORT` - Server port (3001)
- `DEVICE_NAME` - Device name in Spotify

**Frontend:**
- `VITE_API_URL` - Backend URL
- `VITE_WS_URL` - WebSocket URL
- `VITE_SITE_PASSWORD` - Access password

---

## 🎵 Tech Stack

- Backend: Node.js + Express + WebSockets
- Frontend: React + Vite
- API: Spotify Web API + Web Playback SDK
- Sync: WebSocket (ws)

---

## ✅ Requirements

- ✅ Node.js 16+
- ✅ Spotify Premium account
- ✅ Modern browser (Chrome/Edge/Firefox)
- ✅ Internet connection

---

**For detailed help, see README.md or SETUP.md**
