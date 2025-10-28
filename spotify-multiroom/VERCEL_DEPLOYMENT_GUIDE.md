# 🚀 Complete Vercel-Only Deployment Guide
## Simple Deployment - No WebSockets, 100% Free, No Credit Card

This version deploys everything to Vercel. Each browser connects to Spotify independently (no live sync between tabs/devices).

---

## ✅ **What You Get:**

- ✅ Frontend on Vercel (free)
- ✅ Backend on Vercel (free, serverless)
- ✅ No credit card required
- ✅ Auto-keeps alive (serverless = no sleeping)
- ✅ Works perfectly for single user
- ❌ No live sync between browser tabs (each tab is independent)

---

## 📝 **Step 1: Push Code to GitHub**

### 1.1 Navigate to project

```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom"
```

### 1.2 Initialize Git (if not done)

```powershell
git init
git add .
git commit -m "Initial commit - Spotify Multi-Room Player"
```

### 1.3 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `spotify-multiroom`
3. Make it **Private** (recommended)
4. **DON'T** initialize with README
5. Click **"Create repository"**

### 1.4 Push to GitHub

```powershell
git remote add origin https://github.com/YOUR_USERNAME/spotify-multiroom.git
git branch -M main
git push -u origin main
```

✅ **Checkpoint**: Code is on GitHub!

---

## 🖥️ **Step 2: Deploy Backend to Vercel**

### 2.1 Install Vercel CLI

```powershell
npm install -g vercel
```

### 2.2 Login to Vercel

```powershell
vercel login
```

Follow the browser prompt to log in (can use GitHub, email, etc.)

### 2.3 Navigate to Backend

```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom\backend"
```

### 2.4 Deploy Backend

```powershell
vercel
```

Answer the prompts:

```
? Set up and deploy? Y
? Which scope? [Your account]
? Link to existing project? N
? What's your project's name? spotify-multiroom-backend
? In which directory is your code located? ./
? Want to override the settings? N
```

Wait for deployment...

You'll get a URL like:
```
https://spotify-multiroom-backend.vercel.app
```

**📋 COPY THIS URL!**

### 2.5 Add Environment Variables

```powershell
vercel env add SPOTIFY_CLIENT_ID
```
When prompted, enter: `6cf255ba20834cfd98d20e9b184966ff`
Select: `Production`

```powershell
vercel env add SPOTIFY_CLIENT_SECRET
```
When prompted, enter: `378a168c109a4ca8a32e4adef3749190`
Select: `Production`

```powershell
vercel env add SITE_PASSWORD
```
When prompted, enter: `yasiru2003`
Select: `Production`

```powershell
vercel env add DEVICE_NAME
```
When prompted, enter: `Spotify Multi Room`
Select: `Production`

### 2.6 Deploy to Production

```powershell
vercel --prod
```

✅ **Checkpoint**: Backend deployed!

---

## 🔑 **Step 3: Update Spotify Dashboard & Get Refresh Token**

### 3.1 Update Redirect URI

1. Go to https://developer.spotify.com/dashboard
2. Click your app (Client ID: `6cf255ba20834cfd98d20e9b184966ff`)
3. Click **"Edit Settings"**
4. Under **"Redirect URIs"**, add:
   ```
   https://spotify-multiroom-backend.vercel.app/callback
   ```
5. Click **"Add"** then **"Save"**

### 3.2 Get Refresh Token

1. Open browser and go to:
   ```
   https://spotify-multiroom-backend.vercel.app/auth/url
   ```

2. Click **"Authorize Spotify"** button

3. Log in with your **Spotify Premium** account

4. Grant permissions

5. You'll see a page with:
   ```
   SPOTIFY_REFRESH_TOKEN=AQD...very_long_token...xyz
   ```

6. **COPY THIS ENTIRE TOKEN!**

### 3.3 Add Refresh Token to Vercel

Still in the backend directory:

```powershell
vercel env add SPOTIFY_REFRESH_TOKEN
```
When prompted:
- Paste the long token you copied
- Select: `Production`

### 3.4 Redeploy Backend

```powershell
vercel --prod
```

✅ **Checkpoint**: Backend fully configured with Spotify!

---

## 🌐 **Step 4: Deploy Frontend to Vercel**

### 4.1 Navigate to Frontend

```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom\frontend"
```

### 4.2 Deploy Frontend

```powershell
vercel
```

Answer the prompts:

```
? Set up and deploy? Y
? Which scope? [Your account]
? Link to existing project? N
? What's your project's name? spotify-multiroom-frontend
? In which directory is your code located? ./
? Want to override the settings? N
```

You'll get a URL like:
```
https://spotify-multiroom-frontend.vercel.app
```

### 4.3 Add Environment Variables

```powershell
vercel env add VITE_API_URL
```
When prompted, enter: `https://spotify-multiroom-backend.vercel.app`
Select: `Production`

⚠️ **Note**: We're NOT adding `VITE_WS_URL` because we removed WebSockets!

```powershell
vercel env add VITE_SITE_PASSWORD
```
When prompted, enter: `yasiru2003`
Select: `Production`

### 4.4 Deploy to Production

```powershell
vercel --prod
```

✅ **Checkpoint**: Frontend deployed!

---

## 🏓 **Step 5: Set Up UptimeRobot (Optional)**

Even though Vercel serverless functions don't sleep, UptimeRobot is still useful for monitoring:

### 5.1 Sign Up

1. Go to https://uptimerobot.com/signup
2. Enter email and verify

### 5.2 Add Monitor

1. Click **"+ Add New Monitor"**
2. Settings:
   ```
   Monitor Type: HTTP(s)
   Friendly Name: Spotify Backend Monitor
   URL: https://spotify-multiroom-backend.vercel.app/api/health
   Monitoring Interval: 5 minutes
   ```
3. Click **"Create Monitor"**

This will email you if the backend goes down.

---

## ✅ **Step 6: Test Everything**

### 6.1 Test Frontend

1. Go to: `https://spotify-multiroom-frontend.vercel.app`
2. Enter password: `yasiru2003`
3. You should see the player interface!

### 6.2 Test Spotify Connection

1. Open Spotify on your phone/desktop
2. Start playing any song
3. Click **"Available Devices"** (speaker icon)
4. You should see **"Spotify Multi Room"**!
5. Click it to transfer playback

### 6.3 Test Playback

- Play/pause should work
- Next/previous track should work
- Volume control should work
- Progress bar should update

---

## 🎉 **You're Done!**

### Your URLs:

```
Backend:  https://spotify-multiroom-backend.vercel.app
Frontend: https://spotify-multiroom-frontend.vercel.app
Password: yasiru2003
```

---

## 📱 **How to Use**

### From Computer:
1. Open your frontend URL
2. Enter password
3. The player will show up in Spotify devices
4. Control from web player OR Spotify app

### From Phone:
1. Open Spotify app
2. Play any song
3. Tap devices icon
4. Select "Spotify Multi Room"
5. Music plays through the web player!

### Multiple Devices:
Each browser tab/device works **independently**:
- ✅ Can open on multiple devices
- ✅ All see the same Spotify account
- ❌ No live sync between tabs (refresh to see changes)

---

## 🔄 **Updating Your App**

### Update Backend:
```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom\backend"
vercel --prod
```

### Update Frontend:
```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom\frontend"
vercel --prod
```

### Update from GitHub:
If you make changes:
```powershell
git add .
git commit -m "Updated app"
git push
```

Then redeploy with `vercel --prod` in each folder.

---

## 🆘 **Troubleshooting**

### Backend shows 500 error
- Check Vercel logs: Vercel Dashboard → Your project → Deployments → View Logs
- Verify all environment variables are set
- Make sure `SPOTIFY_REFRESH_TOKEN` is added

### Frontend can't connect
- Check `VITE_API_URL` matches your backend URL exactly
- Make sure backend is deployed and working
- Test backend directly: `https://your-backend.vercel.app/api/health`

### Device doesn't show in Spotify
1. Check backend logs for errors
2. Verify redirect URI in Spotify Dashboard
3. Try getting a new refresh token
4. Must use Spotify Premium account

### Player controls don't work
- Click anywhere to activate audio (browser requirement)
- Check browser console (F12) for errors
- Make sure you selected the device in Spotify first

---

## 💰 **Costs**

**Total: $0/month**

- Vercel Free Tier:
  - 100GB bandwidth/month
  - 100 hours serverless execution/month
  - Unlimited static files
  - No credit card required ✅

---

## 📊 **Differences from WebSocket Version**

### ✅ Advantages:
- No backend server needed (serverless)
- Never sleeps (serverless auto-scales)
- No credit card required
- Simpler architecture
- Easier to deploy

### ⚠️ Trade-offs:
- No live sync between browser tabs
- Each tab is independent
- Need to refresh to see external changes

### 💡 Use Cases:
- ✅ Perfect for: Single user, one device at a time
- ✅ Great for: Controlling Spotify from web
- ⚠️ Not ideal for: Multiple people syncing playback

---

## 🎯 **Pro Tip: Custom Domain (Optional)**

Want a custom domain like `spotify.yourdomain.com`?

1. Go to Vercel Dashboard
2. Select your frontend project
3. Click "Settings" → "Domains"
4. Add your custom domain
5. Update DNS records (Vercel shows you how)

**Free with Vercel!** 🎉

---

Good luck! Your app should now be live and working perfectly! 🚀🎵
