# Keep-Alive Setup for Free Hosting

## Built-in Auto-Ping ✅

Your app now has **automatic keep-alive** built-in!

**How it works:**
- Frontend pings backend every **10 minutes**
- Backend responds with `/api/ping` endpoint
- Prevents Render from spinning down after 15 min of inactivity
- Works automatically when you have the app open in browser

**Console Logs:**
- `🏓 Backend ping successful` - Backend is alive
- `🏓 Backend ping failed` - Backend might be waking up from sleep

---

## Additional Free Keep-Alive Services

For extra reliability (if you close the browser), use these **FREE** services:

### Option 1: UptimeRobot (Recommended)

**Setup:**
1. Go to https://uptimerobot.com (free account)
2. Add New Monitor:
   - Monitor Type: **HTTP(s)**
   - Friendly Name: `Spotify Backend`
   - URL: `https://your-backend.onrender.com/api/ping`
   - Monitoring Interval: **5 minutes** (free tier)
3. Save!

UptimeRobot will ping your backend every 5 minutes, keeping it alive 24/7.

**Free tier:**
- ✅ 50 monitors
- ✅ 5-minute intervals
- ✅ Email alerts if down

---

### Option 2: Cron-Job.org

**Setup:**
1. Go to https://cron-job.org (free account)
2. Create New Cronjob:
   - Title: `Spotify Backend Keep-Alive`
   - URL: `https://your-backend.onrender.com/api/ping`
   - Execution Schedule: **Every 10 minutes**
3. Save!

**Free tier:**
- ✅ Unlimited cronjobs
- ✅ 1-minute minimum interval

---

### Option 3: GitHub Actions (Developer-Friendly)

Create `.github/workflows/keep-alive.yml` in your repo:

```yaml
name: Keep Backend Alive

on:
  schedule:
    # Runs every 10 minutes
    - cron: '*/10 * * * *'
  workflow_dispatch: # Manual trigger

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Backend
        run: |
          curl https://your-backend.onrender.com/api/ping
          echo "Backend pinged at $(date)"
```

**Free tier:**
- ✅ 2,000 minutes/month free
- ✅ Works even when you're offline
- ✅ Automatic from GitHub

---

### Option 4: Koyeb (Alternative Hosting)

If Render still sleeps, try **Koyeb.com**:
- ✅ Free tier with **always-on** instances
- ✅ No sleep after inactivity
- ✅ WebSocket support
- ⚠️ Requires credit card (but won't charge on free tier)

---

## Recommended Setup

**For best reliability:**

1. **Built-in auto-ping** (already done ✅)
   - Works when browser is open

2. **UptimeRobot** (5 min pings)
   - Free, easy setup
   - Works 24/7 even when browser is closed
   - Email alerts if backend goes down

3. **GitHub Actions** (optional)
   - Backup keep-alive
   - Useful if you already use GitHub

---

## Testing

**Check if keep-alive is working:**

1. Open browser console (F12)
2. Look for: `🏓 Backend ping successful`
3. Should appear every 10 minutes

**Or visit directly:**
```
https://your-backend.onrender.com/api/ping
```

Should return:
```json
{
  "status": "alive",
  "timestamp": "2025-10-28T12:34:56.789Z",
  "uptime": 123456
}
```

---

## Render Spin-Down Behavior

**Free tier limitations:**
- Spins down after **15 minutes** of no HTTP requests
- Cold start takes **10-30 seconds**
- With auto-ping every 10 min → **Never spins down!** ✅

**Signs backend is sleeping:**
- First request takes 10-30 seconds
- "Connecting..." status for a while
- Console shows ping failed

**Solution:**
- Auto-ping keeps it awake (already implemented)
- Or use UptimeRobot for 24/7 uptime

---

## Cost Comparison

| Service | Sleep Behavior | Keep-Alive Needed | Cost |
|---------|---------------|-------------------|------|
| Render Free | 15 min inactivity | ✅ Yes | $0 |
| Koyeb Free | Never sleeps | ❌ No | $0 (requires CC) |
| Railway | 500h/month then sleeps | Sometimes | $0 (then $5/mo) |
| Vercel | No WebSocket support | ❌ N/A | $0 |

**Verdict:** Render + UptimeRobot = Best free solution! 🎉

---

## Troubleshooting

**Q: Backend still sleeping despite pings?**
- Check UptimeRobot is actually running
- Visit `/api/ping` manually to wake it up
- Render free tier may have rate limits

**Q: Want truly always-on hosting?**
- Use Koyeb (free but needs credit card)
- Or upgrade Render to paid tier ($7/month)

**Q: Can I ping more frequently?**
- Yes! Change `600000` to `300000` (5 min) in App.jsx
- But 10 min is enough to prevent sleep

---

Your app is now set up to stay alive! 🚀
