# 🚀 Quick Deployment Commands

## Step 1: Push to GitHub
```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom"
git init
git add .
git commit -m "Initial commit"

# After creating GitHub repo, run:
git remote add origin https://github.com/YOUR_USERNAME/spotify-multiroom.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend (Render.com)
1. Go to https://render.com
2. New + → Web Service
3. Connect GitHub repo
4. Settings:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Add environment variables (see guide)
6. Deploy!

## Step 3: Get Spotify Token
```
Visit: https://YOUR-BACKEND.onrender.com/auth/url
Copy the SPOTIFY_REFRESH_TOKEN
Add to Render environment variables
```

## Step 4: Deploy Frontend (Vercel)
```powershell
npm install -g vercel
cd "d:\DEV\Spotify Radio\spotify-multiroom\frontend"
vercel login
vercel

# Add environment variables
vercel env add VITE_API_URL production
# Enter: https://YOUR-BACKEND.onrender.com

vercel env add VITE_WS_URL production
# Enter: wss://YOUR-BACKEND.onrender.com

vercel env add VITE_SITE_PASSWORD production
# Enter: yasiru2003

# Deploy to production
vercel --prod
```

## Step 5: UptimeRobot
1. https://uptimerobot.com/signup
2. Add Monitor
3. URL: `https://YOUR-BACKEND.onrender.com/api/ping`
4. Interval: 5 minutes

## Your URLs
```
Backend:  https://spotify-multiroom-backend.onrender.com
Frontend: https://spotify-multiroom-frontend.vercel.app
Password: yasiru2003
```

## Update Later
```powershell
# Backend (auto-deploys on git push)
git add .
git commit -m "Update"
git push

# Frontend
cd frontend
vercel --prod
```

Done! 🎉
