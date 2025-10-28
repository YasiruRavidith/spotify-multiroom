# 🚀 Complete Deployment Guide
## Render.com + Vercel + UptimeRobot

Follow these steps **in order** to deploy your Spotify Multi-Room player!

---

## 📝 **STEP 1: Push Your Code to GitHub**

### 1.1 Create .gitignore file

Open PowerShell and run:

```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom"
```

Create `.gitignore` file (if it doesn't exist):

```powershell
@"
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

### 1.2 Initialize Git (if not already done)

```powershell
git init
git add .
git commit -m "Initial commit - Spotify Multi-Room Player"
```

### 1.3 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `spotify-multiroom`
3. Description: `Spotify Multi-Room Player`
4. **Make it Private** (recommended - contains your code)
5. **DON'T** initialize with README (we already have code)
6. Click **Create repository**

### 1.4 Push to GitHub

Copy the commands GitHub shows you (should look like this):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/spotify-multiroom.git
git branch -M main
git push -u origin main
```

✅ **Checkpoint**: Your code is now on GitHub!

---

## 🖥️ **STEP 2: Deploy Backend to Render.com**

### 2.1 Sign Up for Render

1. Go to https://render.com/register
2. Sign up with **GitHub** (easier integration)
3. Authorize Render to access your repositories

### 2.2 Create Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository: `spotify-multiroom`
4. Click **"Connect"**

### 2.3 Configure Backend Service

Fill in these settings:

- **Name**: `spotify-multiroom-backend`
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 2.4 Add Environment Variables

Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** for each:

```
Key: SPOTIFY_CLIENT_ID
Value: 6cf255ba20834cfd98d20e9b184966ff

Key: SPOTIFY_CLIENT_SECRET
Value: 378a168c109a4ca8a32e4adef3749190

Key: SITE_PASSWORD
Value: yasiru2003

Key: PORT
Value: 3001

Key: DEVICE_NAME
Value: Spotify Multi Room
```

⚠️ **IMPORTANT**: Don't add `SPOTIFY_REFRESH_TOKEN` yet - we'll get it later!

### 2.5 Deploy!

Click **"Create Web Service"** button at the bottom.

Render will now:
1. Clone your repo
2. Install dependencies
3. Start your server

Wait 2-5 minutes for deployment to complete.

### 2.6 Copy Your Backend URL

Once deployed, you'll see:
```
Your service is live at https://spotify-multiroom-backend.onrender.com
```

**📋 COPY THIS URL!** You'll need it for:
- Frontend configuration
- Spotify Dashboard
- Getting refresh token

✅ **Checkpoint**: Backend is deployed! (But needs Spotify authorization)

---

## 🔑 **STEP 3: Get Spotify Refresh Token**

### 3.1 Update Spotify Developer Dashboard

1. Go to https://developer.spotify.com/dashboard
2. Click on your app (Client ID: `6cf255ba20834cfd98d20e9b184966ff`)
3. Click **"Edit Settings"**
4. Under **"Redirect URIs"**, add:
   ```
   https://spotify-multiroom-backend.onrender.com/callback
   ```
5. Click **"Add"**
6. Scroll down and click **"Save"**

### 3.2 Get Refresh Token

1. Open browser and go to:
   ```
   https://spotify-multiroom-backend.onrender.com/auth/url
   ```

2. Click the **"Authorize Spotify"** button

3. Log in with your **Spotify Premium** account

4. Grant permissions

5. You'll be redirected to a page showing:
   ```
   SPOTIFY_REFRESH_TOKEN=AQD...very_long_token...xyz
   ```

6. **COPY THIS TOKEN!**

### 3.3 Add Refresh Token to Render

1. Go back to Render dashboard
2. Click on your `spotify-multiroom-backend` service
3. Click **"Environment"** tab (left sidebar)
4. Click **"Add Environment Variable"**
   ```
   Key: SPOTIFY_REFRESH_TOKEN
   Value: [paste the long token you copied]
   ```
5. Click **"Save Changes"**

Render will automatically redeploy (takes ~1 minute).

✅ **Checkpoint**: Backend is fully configured with Spotify!

---

## 🌐 **STEP 4: Deploy Frontend to Vercel**

### 4.1 Install Vercel CLI

```powershell
npm install -g vercel
```

### 4.2 Login to Vercel

```powershell
vercel login
```

This will open browser - log in with GitHub or email.

### 4.3 Navigate to Frontend Folder

```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom\frontend"
```

### 4.4 Deploy to Vercel

```powershell
vercel
```

Answer the prompts:

```
? Set up and deploy "~\frontend"? Y
? Which scope? [Your account name]
? Link to existing project? N
? What's your project's name? spotify-multiroom-frontend
? In which directory is your code located? ./
? Want to override the settings? N
```

Wait for deployment...

You'll get a URL like:
```
https://spotify-multiroom-frontend.vercel.app
```

**📋 COPY THIS URL!**

### 4.5 Add Environment Variables to Vercel

Now add your backend URL as environment variables:

```powershell
vercel env add VITE_API_URL production
```
When prompted, enter:
```
https://spotify-multiroom-backend.onrender.com
```

```powershell
vercel env add VITE_WS_URL production
```
When prompted, enter:
```
wss://spotify-multiroom-backend.onrender.com
```

```powershell
vercel env add VITE_SITE_PASSWORD production
```
When prompted, enter:
```
yasiru2003
```

### 4.6 Deploy to Production

```powershell
vercel --prod
```

This will redeploy with environment variables.

Final URL (might change):
```
https://spotify-multiroom-frontend.vercel.app
```

✅ **Checkpoint**: Frontend is deployed!

---

## 🏓 **STEP 5: Set Up UptimeRobot (Keep Backend Alive)**

### 5.1 Sign Up

1. Go to https://uptimerobot.com/signup
2. Enter your email
3. Verify email
4. Log in

### 5.2 Add New Monitor

1. Click **"+ Add New Monitor"** button
2. Fill in:

```
Monitor Type: HTTP(s)
Friendly Name: Spotify Backend Keep-Alive
URL (or IP): https://spotify-multiroom-backend.onrender.com/api/ping
Monitoring Interval: 5 minutes
```

3. Click **"Create Monitor"**

That's it! UptimeRobot will now ping your backend every 5 minutes.

✅ **Checkpoint**: Backend will never sleep!

---

## ✅ **STEP 6: Test Everything**

### 6.1 Test Frontend

1. Open: `https://spotify-multiroom-frontend.vercel.app`
2. Enter password: `yasiru2003`
3. You should see the player!

### 6.2 Test Spotify Connection

1. Open Spotify on your phone or desktop
2. Start playing any song
3. Click on **"Available Devices"** (speaker icon)
4. You should see **"Spotify Multi Room"** in the list!
5. Click it to transfer playback

### 6.3 Test Backend Keep-Alive

1. Wait 5-10 minutes
2. Open browser DevTools (F12)
3. Go to Console
4. You should see: `🏓 Backend ping successful`

---

## 🎉 **You're Done!**

Your app is now fully deployed:

- ✅ Backend on Render (free tier)
- ✅ Frontend on Vercel (free tier)
- ✅ Keep-alive with UptimeRobot (free tier)
- ✅ 100% free hosting!

---

## 📱 **Usage**

### From Computer:
1. Go to your Vercel URL
2. Enter password
3. Select "Spotify Multi Room" from Spotify devices
4. Control playback from web player OR from Spotify app

### From Phone:
1. Open Spotify app
2. Play any song
3. Tap "Available Devices"
4. Select "Spotify Multi Room"
5. Music now plays through the web player!

---

## 🔧 **Troubleshooting**

### Backend shows "Application Error"
- Check Render logs: Dashboard → Your Service → Logs
- Make sure all environment variables are set
- Verify `SPOTIFY_REFRESH_TOKEN` is added

### Frontend shows "Connection error"
- Verify environment variables in Vercel
- Check `VITE_API_URL` matches your Render URL exactly
- Make sure Render backend is running (not sleeping)

### Device doesn't show up in Spotify
1. Check backend logs for errors
2. Verify redirect URI in Spotify Dashboard matches Render URL
3. Try getting a new refresh token (repeat Step 3)
4. Make sure you're logged in with Spotify Premium account

### Backend keeps sleeping
- Check UptimeRobot is active and monitoring
- Verify ping endpoint works: `https://your-backend.onrender.com/api/ping`
- Check UptimeRobot email for alerts

---

## 🔄 **Updating Your App**

When you make code changes:

**Backend:**
```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom"
git add .
git commit -m "Updated backend"
git push
```
Render will auto-deploy!

**Frontend:**
```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom\frontend"
vercel --prod
```

---

## 📊 **Your Deployment URLs**

Fill these in after deployment:

```
Backend:  https://spotify-multiroom-backend.onrender.com
Frontend: https://spotify-multiroom-frontend.vercel.app
UptimeRobot Monitor: [Your monitor name]
```

---

## 💰 **Costs**

- Render Free Tier: $0/month (750 hours)
- Vercel Free Tier: $0/month (100GB bandwidth)
- UptimeRobot Free: $0/month (50 monitors)

**Total: $0/month** 🎉

---

## 🆘 **Need Help?**

Common issues:
1. **Git not installed**: Download from https://git-scm.com
2. **Node.js not installed**: Download from https://nodejs.org
3. **Vercel CLI errors**: Try `npm install -g vercel@latest`

Good luck! 🚀🎵
