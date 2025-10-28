# 🌐 Vercel Deployment Guide

## Important Note About WebSockets on Vercel

⚠️ **Vercel serverless functions don't support WebSockets!**

For WebSocket support, you have two options:

### Option 1: Split Deployment (Recommended)

Deploy the **frontend** on Vercel and the **backend** elsewhere:

#### Backend Options:
- **Railway.app** (Free tier available, supports WebSockets)
- **Render.com** (Free tier available, supports WebSockets)
- **Heroku** (Supports WebSockets)
- **Your own server/VPS**

#### Steps:

1. **Deploy Backend to Railway/Render:**

   **For Railway:**
   ```powershell
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login and deploy
   cd backend
   railway login
   railway init
   railway up
   ```

   **For Render:**
   - Go to render.com
   - New → Web Service
   - Connect your GitHub repo
   - Select `backend` folder
   - Add environment variables
   - Deploy!

2. **Get your backend URL** (e.g., `https://your-app.railway.app`)

3. **Update Spotify Redirect URI:**
   - Go to Spotify Developer Dashboard
   - Add: `https://your-app.railway.app/callback`

4. **Deploy Frontend to Vercel:**
   ```powershell
   cd frontend
   vercel
   ```

5. **Set Vercel Environment Variables:**
   ```
   VITE_API_URL=https://your-backend.railway.app
   VITE_WS_URL=wss://your-backend.railway.app
   VITE_SITE_PASSWORD=yasiru2003
   ```

6. **Deploy:**
   ```powershell
   vercel --prod
   ```

### Option 2: Use Vercel for Frontend Only (No WebSocket Sync)

If you don't need real-time sync between devices, you can use Vercel:

1. Each browser instance connects directly to Spotify
2. No WebSocket synchronization
3. Simpler deployment

**Modify the app:**
- Remove WebSocket code
- Each client independently polls Spotify API
- Works but less synchronized

---

## Full Railway Deployment (Easiest)

Deploy BOTH frontend and backend to Railway:

```powershell
# Install Railway CLI
npm i -g @railway/cli

# From project root
railway login
railway init
railway up
```

**Add Environment Variables in Railway Dashboard:**
```
SPOTIFY_CLIENT_ID=your_id
SPOTIFY_CLIENT_SECRET=your_secret
SPOTIFY_REFRESH_TOKEN=your_token
SITE_PASSWORD=yasiru2003
VITE_API_URL=https://your-project.railway.app
VITE_WS_URL=wss://your-project.railway.app
VITE_SITE_PASSWORD=yasiru2003
```

Railway automatically detects monorepo structure!

---

## Full Render Deployment

1. Create a **Web Service** for backend:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. Create a **Static Site** for frontend:
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

3. Set environment variables in each service

---

## Quick Comparison

| Platform | WebSocket | Free Tier | Ease | Best For |
|----------|-----------|-----------|------|----------|
| Vercel | ❌ No | ✅ Yes | ⭐⭐⭐ | Frontend only |
| Railway | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐⭐ | Full app |
| Render | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐ | Full app |
| Heroku | ✅ Yes | ❌ No | ⭐⭐⭐ | Full app |

## Recommended Setup

**For best results:**

1. **Backend**: Deploy to Railway (easiest, free, supports WebSockets)
2. **Frontend**: Deploy to Vercel (fast CDN, optimized for React)

This gives you:
- ✅ Fast global frontend delivery
- ✅ WebSocket support for real-time sync
- ✅ Both on free tiers
- ✅ Easy to maintain

---

## Environment Variables Checklist

**Backend (Railway/Render):**
```env
SPOTIFY_CLIENT_ID=6cf255ba20834cfd98d20e9b184966ff
SPOTIFY_CLIENT_SECRET=378a168c109a4ca8a32e4adef3749190
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
REDIRECT_URI=https://your-backend-url.railway.app/callback
SITE_PASSWORD=yasiru2003
PORT=3001
DEVICE_NAME=Spotify Multi-Room
```

**Frontend (Vercel):**
```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_WS_URL=wss://your-backend-url.railway.app
VITE_SITE_PASSWORD=yasiru2003
```

**Spotify Developer Dashboard:**
- Add redirect URI: `https://your-backend-url.railway.app/callback`

---

## Testing Deployment

1. Visit your frontend URL
2. Enter password
3. Check browser console for errors
4. Should see "Device Ready"
5. Try playing from Spotify app

**Common Issues:**

- **CORS errors**: Check backend CORS settings allow your frontend domain
- **WebSocket fails**: Make sure using `wss://` not `ws://` for HTTPS
- **Device not showing**: Check refresh token is valid
- **Authentication failed**: Verify Spotify credentials

---

**Need help?** Check the logs on your hosting platform!
