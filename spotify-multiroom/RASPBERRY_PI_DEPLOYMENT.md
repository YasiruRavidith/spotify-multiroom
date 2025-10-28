# 🍓 Complete Raspberry Pi 3 Deployment Guide
## Full WebSocket Backend Setup - From Scratch to Production

This guide takes you from a blank Raspberry Pi 3 with a 16GB SD card to a fully working WebSocket backend that's accessible from anywhere in the world - **100% free!**

---

## 📋 **What You Need:**

- ✅ Raspberry Pi 3 (any model: B, B+, A+)
- ✅ 16GB microSD card (you have this!)
- ✅ Power supply (5V 2.5A micro USB)
- ✅ Computer with SD card reader
- ✅ Ethernet cable OR WiFi network
- ✅ (Optional) Monitor + HDMI cable for initial setup

---

## 🎯 **What You'll Get:**

- ✅ Raspberry Pi running 24/7 as your backend server
- ✅ Full WebSocket support (master/slave tabs work!)
- ✅ Accessible from anywhere via Cloudflare Tunnel (free HTTPS!)
- ✅ Auto-starts on boot
- ✅ Costs ~$2-3/year in electricity
- ✅ No monthly hosting fees EVER!

---

# Part 1: Install Raspberry Pi OS

## **Step 1: Download Raspberry Pi Imager**

### 1.1 On Your Windows Computer:

1. Go to: https://www.raspberrypi.com/software/
2. Click **"Download for Windows"**
3. Run the installer: `imager_latest.exe`
4. Install with default settings

---

## **Step 2: Flash OS to SD Card**

### 2.1 Insert SD Card

Insert your 16GB microSD card into your computer's SD card reader.

### 2.2 Open Raspberry Pi Imager

1. Launch **"Raspberry Pi Imager"**
2. Click **"CHOOSE DEVICE"**
   - Select: **Raspberry Pi 3**

3. Click **"CHOOSE OS"**
   - Select: **Raspberry Pi OS (64-bit)**
   - ⚠️ Use the **"Raspberry Pi OS Lite (64-bit)"** for best performance (no desktop GUI)
   - Or use **"Raspberry Pi OS (64-bit)"** if you want a desktop interface

4. Click **"CHOOSE STORAGE"**
   - Select your 16GB SD card

### 2.3 Configure Settings (IMPORTANT!)

1. Click the **⚙️ Settings** button (bottom right)

2. **General Tab:**
   ```
   ✅ Set hostname: spotify-backend
   ✅ Set username and password:
      Username: pi
      Password: [choose a strong password]
   ✅ Configure wireless LAN:
      SSID: [your WiFi name]
      Password: [your WiFi password]
      Country: [your country code, e.g., US, GB, LK]
   ✅ Set locale settings:
      Timezone: [your timezone]
      Keyboard layout: [your layout]
   ```

3. **Services Tab:**
   ```
   ✅ Enable SSH
   ✅ Use password authentication
   ```

4. Click **"SAVE"**

### 2.4 Write to SD Card

1. Click **"NEXT"**
2. Confirm: **"YES"** (will erase SD card)
3. Wait 5-10 minutes for writing + verification
4. Click **"CONTINUE"** when done
5. **Eject the SD card safely**

✅ **Checkpoint**: SD card ready!

---

## **Step 3: Boot Raspberry Pi**

### 3.1 Insert SD Card & Boot

1. Insert the microSD card into your Raspberry Pi
2. Connect ethernet cable (optional, if not using WiFi)
3. Connect power supply
4. Wait 2-3 minutes for first boot

### 3.2 Find Pi's IP Address

**Option A: Check your router's admin page**
- Look for device named `spotify-backend`
- Note the IP address (e.g., `192.168.1.50`)

**Option B: Use Network Scanner**
- Download: **Advanced IP Scanner** (Windows)
- Scan your network
- Look for "Raspberry Pi" or `spotify-backend`

**Option C: Use PowerShell (if you know the hostname)**
```powershell
ping spotify-backend.local
```

📋 **WRITE DOWN THE IP ADDRESS!**

---

## **Step 4: Connect via SSH**

### 4.1 Connect from Windows PowerShell

```powershell
ssh pi@192.168.1.50
```
(Replace `192.168.1.50` with your Pi's IP)

Or if the hostname works:
```powershell
ssh pi@spotify-backend.local
```

### 4.2 First Login

- Type `yes` when asked about fingerprint
- Enter the password you set in Step 2.3
- You should see: `pi@spotify-backend:~ $`

✅ **You're in!**

---

# Part 2: Set Up the Backend

## **Step 5: Update System**

```bash
sudo apt update
sudo apt upgrade -y
```
(Takes 5-10 minutes)

---

## **Step 6: Install Node.js**

### 6.1 Install Node.js 18.x

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 6.2 Verify Installation

```bash
node --version
npm --version
```

You should see:
```
v18.x.x
9.x.x
```

✅ **Node.js installed!**

---

## **Step 7: Install Git & Clone Your Repo**

### 7.1 Install Git

```bash
sudo apt install git -y
```

### 7.2 Clone Your Repository

```bash
cd ~
git clone https://github.com/YasiruRavidith/spotify-multiroom.git
```

### 7.3 Navigate to Backend

```bash
cd spotify-multiroom/backend
```

---

## **Step 8: Install Dependencies**

```bash
npm install
```

(Takes 2-3 minutes)

✅ **Backend code ready!**

---

## **Step 9: Configure Environment Variables**

### 9.1 Create .env File

```bash
nano .env
```

### 9.2 Paste Configuration

```env
SPOTIFY_CLIENT_ID=6cf255ba20834cfd98d20e9b184966ff
SPOTIFY_CLIENT_SECRET=378a168c109a4ca8a32e4adef3749190
SITE_PASSWORD=yasiru2003
DEVICE_NAME=Spotify Multi Room
PORT=3000
REDIRECT_URI=http://YOUR_PI_IP:3000/callback
```

⚠️ **Replace `YOUR_PI_IP`** with your Raspberry Pi's local IP (e.g., `192.168.1.50`)

### 9.3 Save File

- Press `Ctrl + O` (save)
- Press `Enter` (confirm)
- Press `Ctrl + X` (exit)

---

## **Step 10: Get Spotify Refresh Token**

### 10.1 Update Spotify Dashboard

1. On your computer, go to: https://developer.spotify.com/dashboard
2. Click your app (Client ID: `6cf255ba20834cfd98d20e9b184966ff`)
3. Click **"Edit Settings"**
4. Under **"Redirect URIs"**, add:
   ```
   http://192.168.1.50:3000/callback
   ```
   (Use YOUR Pi's IP!)
5. Click **"Add"** then **"Save"**

### 10.2 Start Backend Temporarily

On the Pi:
```bash
npm start
```

### 10.3 Authorize Spotify

1. On your computer's browser, go to:
   ```
   http://192.168.1.50:3000/auth/url
   ```
   (Use YOUR Pi's IP!)

2. Click **"Authorize Spotify"**
3. Log in with your **Spotify Premium** account
4. You'll see a page with:
   ```
   SPOTIFY_REFRESH_TOKEN=AQD...very_long_token...xyz
   ```

5. **COPY THIS TOKEN!**

### 10.4 Stop the Server

Back in the Pi SSH terminal:
- Press `Ctrl + C`

### 10.5 Add Token to .env

```bash
nano .env
```

Add this line at the bottom:
```env
SPOTIFY_REFRESH_TOKEN=AQD...paste_your_token_here...xyz
```

Save and exit (`Ctrl + O`, `Enter`, `Ctrl + X`)

✅ **Backend configured!**

---

# Part 3: Expose to Internet with Cloudflare Tunnel

## **Step 11: Install Cloudflare Tunnel**

### 11.1 Download Cloudflared

```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
```

### 11.2 Install

```bash
sudo dpkg -i cloudflared-linux-arm64.deb
```

### 11.3 Verify Installation

```bash
cloudflared --version
```

---

## **Step 12: Set Up Cloudflare Tunnel**

### 12.1 Login to Cloudflare

```bash
cloudflared tunnel login
```

This will show a URL like:
```
https://dash.cloudflare.com/argotunnel?...
```

**Copy this URL and open it in your computer's browser!**

1. Log in to Cloudflare (or create free account)
2. Select a domain (or use Cloudflare's free domain)
3. Authorize the tunnel
4. Return to the Pi terminal

You should see: `You have successfully logged in`

### 12.2 Create Tunnel

```bash
cloudflared tunnel create spotify-backend
```

You'll see:
```
Created tunnel spotify-backend with id: abc123...
```

📋 **Copy the tunnel ID!**

### 12.3 Create Configuration File

```bash
nano ~/.cloudflared/config.yml
```

Paste this:
```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /home/pi/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: spotify-backend.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
```

⚠️ **Replace:**
- `YOUR_TUNNEL_ID` with the ID from Step 12.2
- `spotify-backend.yourdomain.com` with your desired subdomain

**Don't have a domain?** Use Cloudflare's free `.trycloudflare.com`:
```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /home/pi/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - service: http://localhost:3000
```

Save and exit (`Ctrl + O`, `Enter`, `Ctrl + X`)

### 12.4 Route DNS (if using your domain)

```bash
cloudflared tunnel route dns spotify-backend spotify-backend.yourdomain.com
```

Skip this if using `.trycloudflare.com`

---

## **Step 13: Auto-Start Everything on Boot**

### 13.1 Create Backend Service

```bash
sudo nano /etc/systemd/system/spotify-backend.service
```

Paste:
```ini
[Unit]
Description=Spotify Multi-Room Backend
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/spotify-multiroom/backend
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Save and exit.

### 13.2 Create Cloudflare Tunnel Service

```bash
sudo nano /etc/systemd/system/cloudflared.service
```

Paste:
```ini
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
Type=simple
User=pi
ExecStart=/usr/bin/cloudflared tunnel run spotify-backend
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Save and exit.

### 13.3 Enable Services

```bash
sudo systemctl enable spotify-backend
sudo systemctl enable cloudflared
```

### 13.4 Start Services

```bash
sudo systemctl start spotify-backend
sudo systemctl start cloudflared
```

### 13.5 Check Status

```bash
sudo systemctl status spotify-backend
sudo systemctl status cloudflared
```

Both should show **"active (running)"** in green!

---

## **Step 14: Get Your Public URL**

### 14.1 Check Cloudflare Tunnel Logs

```bash
sudo journalctl -u cloudflared -f
```

Look for a line like:
```
Your free tunnel URL: https://xyz123.trycloudflare.com
```

📋 **COPY THIS URL!** This is your backend's public address!

Press `Ctrl + C` to exit logs.

---

# Part 4: Update Frontend & Deploy

## **Step 15: Update Spotify Dashboard**

1. Go to: https://developer.spotify.com/dashboard
2. Click your app
3. Click **"Edit Settings"**
4. Under **"Redirect URIs"**, add:
   ```
   https://xyz123.trycloudflare.com/callback
   ```
   (Use YOUR Cloudflare URL!)
5. Click **"Add"** then **"Save"**

---

## **Step 16: Update Backend .env**

Back on the Pi:
```bash
nano ~/spotify-multiroom/backend/.env
```

Update the `REDIRECT_URI` line:
```env
REDIRECT_URI=https://xyz123.trycloudflare.com/callback
```

Save and exit.

### Restart Backend

```bash
sudo systemctl restart spotify-backend
```

---

## **Step 17: Get New Refresh Token**

1. On your computer, visit:
   ```
   https://xyz123.trycloudflare.com/auth/url
   ```

2. Click **"Authorize Spotify"**
3. Copy the new refresh token
4. Update Pi's `.env`:
   ```bash
   nano ~/spotify-multiroom/backend/.env
   ```
   Update the `SPOTIFY_REFRESH_TOKEN` line
5. Restart:
   ```bash
   sudo systemctl restart spotify-backend
   ```

---

## **Step 18: Update Vercel Frontend**

### 18.1 On Your Windows Computer

```powershell
cd "d:\DEV\Spotify Radio\spotify-multiroom\frontend"
```

### 18.2 Update Environment Variables

```powershell
vercel env add VITE_API_URL
```
Enter: `https://xyz123.trycloudflare.com`
Select: `Production`

```powershell
vercel env add VITE_WS_URL
```
Enter: `wss://xyz123.trycloudflare.com`
Select: `Production`

### 18.3 Redeploy Frontend

```powershell
vercel --prod
```

✅ **Everything deployed!**

---

# Part 5: Test & Use

## **Step 19: Test Your Setup**

### 19.1 Test Backend

Visit: `https://xyz123.trycloudflare.com/api/health`

Should see:
```json
{"status":"ok"}
```

### 19.2 Test Frontend

Visit: `https://spotify-multiroom-frontend.vercel.app`

1. Enter password: `yasiru2003`
2. Open a second tab (same URL)
3. First tab should show: **🎵 Master (Playing Audio)**
4. Second tab should show: **📱 Display Only**

### 19.3 Test Spotify Device

1. Open Spotify app on your phone
2. Play any song
3. Tap devices icon
4. You should see **"Spotify Multi Room"**!
5. Select it - music plays!

🎉 **IT WORKS!**

---

## 🎯 **Your Final Setup:**

```
Backend:  https://xyz123.trycloudflare.com (Raspberry Pi)
Frontend: https://spotify-multiroom-frontend.vercel.app (Vercel)
Password: yasiru2003

Features:
✅ Master/slave tabs (first tab plays, others display)
✅ WebSocket sync between tabs
✅ Accessible from anywhere
✅ Runs 24/7
✅ Costs ~$2/year in electricity
✅ 100% free hosting!
```

---

## 🔧 **Useful Commands**

### Check Backend Status
```bash
sudo systemctl status spotify-backend
```

### View Backend Logs
```bash
sudo journalctl -u spotify-backend -f
```

### Restart Backend
```bash
sudo systemctl restart spotify-backend
```

### Check Cloudflare Tunnel Status
```bash
sudo systemctl status cloudflared
```

### View Tunnel Logs
```bash
sudo journalctl -u cloudflared -f
```

### Update Code from GitHub
```bash
cd ~/spotify-multiroom
git pull
cd backend
npm install
sudo systemctl restart spotify-backend
```

### Reboot Pi
```bash
sudo reboot
```

---

## 🆘 **Troubleshooting**

### Backend not starting
```bash
sudo journalctl -u spotify-backend -n 50
```
Check for errors, verify `.env` file is correct.

### Cloudflare tunnel not connecting
```bash
cloudflared tunnel login
cloudflared tunnel run spotify-backend
```
Run manually to see errors.

### Pi not booting
- Re-flash SD card
- Check power supply (needs 2.5A)
- Try monitor + keyboard for direct access

### Can't SSH to Pi
- Verify Pi is on network: `ping spotify-backend.local`
- Check router for IP address
- Ensure SSH was enabled in Step 2.3

### Spotify device not showing
- Check backend logs
- Verify refresh token is valid
- Ensure redirect URI matches in Spotify dashboard
- Must have Spotify Premium

---

## 💡 **Pro Tips**

### 1. Static IP for Pi
In your router settings, assign a static IP to the Pi's MAC address.

### 2. Custom Domain
Use your own domain instead of `.trycloudflare.com`:
1. Point domain to Cloudflare nameservers
2. Use tunnel DNS routing (Step 12.4)

### 3. Monitor Pi Temperature
```bash
vcgencmd measure_temp
```
Should be under 80°C. Add heatsink if needed.

### 4. Auto-Update Code
Add to crontab:
```bash
crontab -e
```
Add:
```
0 4 * * * cd ~/spotify-multiroom && git pull && cd backend && npm install && sudo systemctl restart spotify-backend
```

### 5. Backup SD Card
Periodically back up your SD card using:
- **Win32 Disk Imager** (Windows)
- **Raspberry Pi Imager** (read mode)

---

## 📊 **Power Consumption**

- Raspberry Pi 3: ~4W
- Running 24/7: ~35 kWh/year
- Cost (at $0.12/kWh): **~$4.20/year**

Compare to paid hosting: **$5-15/month** = **$60-180/year**

**You save $55-175/year!** 💰

---

## 🎉 **You're All Set!**

Your Raspberry Pi is now a powerful, always-on backend server that:
- ✅ Runs your Spotify backend 24/7
- ✅ Supports full WebSocket functionality
- ✅ Accessible from anywhere in the world
- ✅ Auto-starts on boot
- ✅ Costs almost nothing to run

Enjoy your multi-room Spotify player! 🎵🚀
