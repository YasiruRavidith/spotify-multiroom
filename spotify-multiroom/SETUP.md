# 🎯 SETUP GUIDE - Quick Start

Follow these steps to get your Spotify Multi-Room Player running:

## ✅ STEP 1: Install Dependencies

Open PowerShell in the project root and run:

```powershell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

## ✅ STEP 2: Get Spotify Authorization

1. Start the backend server:
```powershell
cd backend
npm start
```

2. Open your browser and go to: **http://localhost:3001/auth/url**

3. Click the "Authorize Spotify" button

4. Log in with your **Spotify Premium account**

5. After authorization, you'll see a page with a `SPOTIFY_REFRESH_TOKEN`

6. **Copy that token!**

7. Open `backend/.env` and paste it:
```env
SPOTIFY_REFRESH_TOKEN=paste_your_token_here
```

8. **Stop and restart the backend server** (Ctrl+C, then `npm start` again)

## ✅ STEP 3: Run Both Servers

**Terminal 1 - Backend:**
```powershell
cd backend
npm start
```

You should see:
```
✅ Spotify connected
🚀 Server running on port 3001
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

You should see:
```
VITE v... ready in ...ms
➜  Local:   http://localhost:5173/
```

## ✅ STEP 4: Test the Player

1. Open **http://localhost:5173** in Chrome/Edge

2. Enter password: **yasiru2003**

3. Wait for "Device Ready" message

4. **On your phone/computer Spotify app:**
   - Play any song
   - Click the "Devices Available" icon (usually at bottom of screen)
   - Select **"Spotify Multi-Room Player"**

5. Music should start playing in your browser! 🎉

## ✅ STEP 5: Add More Devices

1. Open **http://localhost:5173** on another device/browser
2. Enter the same password
3. Music automatically syncs! 🎵

## 🎯 Testing Multi-Room

1. Connect Bluetooth speakers to different devices (laptops, phones, tablets)
2. Open the player URL on each device
3. Select the device from Spotify
4. All speakers play the same song simultaneously!

## 🐛 Troubleshooting

### "No refresh token found"
- You need to complete STEP 2 first
- Make sure you copied the SPOTIFY_REFRESH_TOKEN to backend/.env
- Restart the backend server after adding it

### Device doesn't show in Spotify
- Check that you see "Device Ready" in the browser
- Your Spotify account must be **Premium** (required for Web Playback)
- Try refreshing the browser page
- Check browser console for errors (F12)

### Can't connect to server
- Make sure backend is running on port 3001
- Check that frontend/.env has correct VITE_API_URL
- Check firewall isn't blocking port 3001

### Premium Required Error
- Spotify Web Playback SDK only works with Premium accounts
- Make sure you're logged in with a Premium account when authorizing

## 📱 Using on Phone

To access from your phone on the same network:

1. Find your computer's IP address:
```powershell
ipconfig
# Look for IPv4 Address (e.g., 192.168.1.100)
```

2. Update frontend/.env:
```env
VITE_API_URL=http://192.168.1.100:3001
VITE_WS_URL=ws://192.168.1.100:3001
```

3. Restart frontend

4. On phone, open: **http://192.168.1.100:5173**

## 🚀 Next Steps

Once everything works locally:
- Read README.md for Vercel deployment instructions
- Configure your own password
- Customize the device name in backend/.env

---

**Enjoy your synchronized multi-room audio! 🎵**
