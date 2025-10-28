# ✅ Setup Checklist

Use this checklist to ensure everything is configured correctly.

## 📋 Pre-Setup Checklist

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Spotify Premium account active
- [ ] Internet connection available

---

## 🔧 Configuration Checklist

### Backend Configuration

- [ ] Created Spotify Developer App at https://developer.spotify.com/dashboard
- [ ] Copied Client ID to `backend/.env`
- [ ] Copied Client Secret to `backend/.env`
- [ ] Set Redirect URI in Spotify Dashboard: `http://localhost:3001/callback`
- [ ] Set password in `backend/.env` (SITE_PASSWORD)
- [ ] Dependencies installed (`cd backend && npm install`)

### Frontend Configuration

- [ ] Set VITE_API_URL in `frontend/.env`
- [ ] Set VITE_WS_URL in `frontend/.env`
- [ ] Set VITE_SITE_PASSWORD in `frontend/.env` (match backend)
- [ ] Dependencies installed (`cd frontend && npm install`)

---

## 🔑 Authorization Checklist

- [ ] Backend server started (`cd backend && npm start`)
- [ ] Visited http://localhost:3001/auth/url
- [ ] Clicked "Authorize Spotify" button
- [ ] Logged in with Spotify Premium account
- [ ] Copied refresh token from callback page
- [ ] Pasted refresh token into `backend/.env` (SPOTIFY_REFRESH_TOKEN)
- [ ] Restarted backend server
- [ ] Saw "✅ Spotify connected" message in terminal

---

## 🚀 First Run Checklist

### Backend
- [ ] Terminal 1: `cd backend && npm start`
- [ ] Saw: "🚀 Server running on port 3001"
- [ ] Saw: "✅ Spotify connected"
- [ ] No errors in terminal

### Frontend
- [ ] Terminal 2: `cd frontend && npm run dev`
- [ ] Saw: "VITE v... ready in ...ms"
- [ ] Saw: "➜  Local:   http://localhost:5173/"
- [ ] No errors in terminal

### Browser
- [ ] Opened http://localhost:5173
- [ ] Entered password correctly
- [ ] Saw password screen (or skipped if no password)
- [ ] Page loaded without errors
- [ ] Saw "Setting up Spotify player..." or "Device Ready"
- [ ] Browser console (F12) shows no critical errors

---

## 🎵 Playback Test Checklist

- [ ] Saw "🎯 Device is Ready!" message in browser
- [ ] Opened Spotify app on phone/computer
- [ ] Played any song
- [ ] Tapped "Devices Available" icon in Spotify app
- [ ] Saw "Spotify Multi-Room Player" in device list
- [ ] Selected "Spotify Multi-Room Player"
- [ ] Music started playing in browser! 🎉
- [ ] Album art displayed correctly
- [ ] Track info showing (title, artist, album)
- [ ] Progress bar moving
- [ ] Play/pause state updates correctly

---

## 🔊 Multi-Room Test Checklist

- [ ] Opened player URL on Device 1
- [ ] Entered password on Device 1
- [ ] Saw "Device Ready" on Device 1
- [ ] Opened player URL on Device 2
- [ ] Entered password on Device 2
- [ ] Saw "Device Ready" on Device 2
- [ ] Selected device from Spotify app
- [ ] Music playing on BOTH devices
- [ ] Both devices show same track info
- [ ] Both devices synchronized

---

## 🌐 Network Test Checklist (Optional)

### Access from Phone on Same WiFi

- [ ] Found computer's IP address (`ipconfig` → IPv4 Address)
- [ ] Updated `frontend/.env`:
  ```
  VITE_API_URL=http://YOUR_IP:3001
  VITE_WS_URL=ws://YOUR_IP:3001
  ```
- [ ] Restarted frontend dev server
- [ ] Opened http://YOUR_IP:5173 on phone's browser
- [ ] Player loaded successfully
- [ ] Can control playback

---

## 🐛 Troubleshooting Checklist

If something doesn't work, check:

### Backend Issues
- [ ] Port 3001 not in use by another app
- [ ] Firewall allows port 3001
- [ ] `.env` file exists in backend folder
- [ ] All environment variables set correctly
- [ ] Refresh token is valid (not expired)
- [ ] Spotify Developer Dashboard shows app is active

### Frontend Issues
- [ ] Port 5173 not in use by another app
- [ ] `.env` file exists in frontend folder
- [ ] API URL and WS URL match backend address
- [ ] Password matches between frontend and backend
- [ ] Browser supports Web Playback SDK (Chrome/Edge/Firefox)
- [ ] Browser console (F12) checked for errors

### Spotify Issues
- [ ] Account has active Premium subscription
- [ ] Redirect URI in Spotify Dashboard matches exactly
- [ ] Scopes include: `streaming user-read-email user-read-private`
- [ ] Not too many simultaneous Spotify sessions
- [ ] Internet connection stable

### Audio Issues
- [ ] Browser has permission to play audio
- [ ] Volume not muted in browser
- [ ] Volume not muted on device
- [ ] Bluetooth speakers connected and working
- [ ] Correct audio output selected on device

---

## 📝 Deployment Checklist (Optional)

### Backend to Railway
- [ ] Installed Railway CLI (`npm i -g @railway/cli`)
- [ ] Logged in (`railway login`)
- [ ] Created project (`railway init`)
- [ ] Added environment variables in Railway dashboard
- [ ] Updated Redirect URI in Spotify Dashboard
- [ ] Deployed (`railway up`)
- [ ] Verified deployment successful

### Frontend to Vercel
- [ ] Installed Vercel CLI (`npm i -g vercel`)
- [ ] Logged in (`vercel login`)
- [ ] Deployed from frontend folder (`cd frontend && vercel`)
- [ ] Added environment variables in Vercel dashboard
- [ ] Updated VITE_API_URL to Railway URL
- [ ] Updated VITE_WS_URL to Railway URL (wss://)
- [ ] Production deploy (`vercel --prod`)
- [ ] Tested production URL

---

## ✅ Final Verification

- [ ] Local setup works perfectly
- [ ] Multi-room sync working
- [ ] Ready for daily use OR
- [ ] Deployed to production and tested
- [ ] Documentation reviewed
- [ ] .env files backed up (but not committed to git!)

---

## 🎉 Success Indicators

You'll know everything works when:

✅ Backend shows "✅ Spotify connected"  
✅ Frontend shows "🎯 Device is Ready!"  
✅ Spotify app shows "Spotify Multi-Room Player" in devices  
✅ Music plays in browser when selected  
✅ Multiple browsers play synchronized music  
✅ Track info updates in real-time  

**If all checks pass, you're ready to enjoy multi-room audio! 🎵**

---

## 📚 Need Help?

- Quick commands: See `QUICKSTART.md`
- Detailed setup: See `SETUP.md`
- Deployment: See `DEPLOYMENT.md`
- How it works: See `WORKFLOW.md`
- Full docs: See `README.md`
