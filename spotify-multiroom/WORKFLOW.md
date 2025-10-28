# 🎵 Spotify Multi-Room Player - Visual Workflow

## 🔄 How the System Works

```
┌──────────────────────────────────────────────────────────────┐
│                     YOUR SPOTIFY ACCOUNT                      │
│                   (Premium - Credentials in backend)          │
└───────────────────────────┬──────────────────────────────────┘
                            │
                    OAuth Authentication
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                      BACKEND SERVER                           │
│  - Stores Spotify credentials                                │
│  - Provides OAuth tokens                                     │
│  - WebSocket server for sync                                 │
│  - Password verification                                     │
└───────────┬─────────────────────────────────┬────────────────┘
            │                                 │
     Provides Tokens                    WebSocket Sync
            │                                 │
            ▼                                 ▼
┌─────────────────────────────────────────────────────────────┐
│              SPOTIFY WEB PLAYBACK SDK (Browser)             │
│  - Creates virtual Spotify device                           │
│  - Shows in your Spotify device list                        │
│  - Plays audio through browser                              │
└──────────┬──────────────────────────────────────────────────┘
           │
    Multiple Browsers
           │
      ┌────┴────┬────────┬────────┐
      ▼         ▼        ▼        ▼
  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
  │Browser│ │Browser│ │Browser│ │Browser│
  │   1   │ │   2   │ │   3   │ │   4   │
  │  🔊   │ │  🔊   │ │  🔊   │ │  🔊   │
  └───────┘ └───────┘ └───────┘ └───────┘
  Laptop    Phone     Tablet    Desktop
```

---

## 📱 User Journey

### 1️⃣ Setup (One-time)

```
Developer Dashboard → Get Credentials → Add to .env → Authorize
     ↓                      ↓               ↓            ↓
Create Spotify App    Client ID &     backend/.env   Get Refresh
                    Client Secret                     Token
```

### 2️⃣ Daily Use

```
Open Browser → Enter Password → Wait for Ready → Control from Spotify
     ↓              ↓                ↓                  ↓
http://...    yasiru2003      "Device Ready"    Select device in
                                                  Spotify app
```

### 3️⃣ Multi-Room Setup

```
Connect Bluetooth     Open Player          Wait for Ready
  Speakers         on Each Device
     ↓                    ↓                      ↓
Speaker A ←─ Laptop ──→ Browser 1 ──→ [Password] ──→ 🟢 Ready
Speaker B ←─ Phone  ──→ Browser 2 ──→ [Password] ──→ 🟢 Ready
Speaker C ←─ Tablet ──→ Browser 3 ──→ [Password] ──→ 🟢 Ready
     │                    │                      │
     └────────────────────┴──────────────────────┘
                          │
              Select device from Spotify app
                          │
                          ▼
              🎵 All play synchronized! 🎵
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Initial Authorization (One-time Setup)             │
└─────────────────────────────────────────────────────────────┘

Visit /auth/url
       │
       ▼
Click "Authorize"
       │
       ▼
Login to Spotify Premium
       │
       ▼
Spotify redirects to /callback
       │
       ▼
Backend exchanges code for tokens
       │
       ▼
Refresh Token saved to .env
       │
       ▼
✅ Setup Complete!


┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Daily Usage (Automatic)                            │
└─────────────────────────────────────────────────────────────┘

User opens player
       │
       ▼
Frontend requests token
       │
       ▼
Backend uses refresh token
       │
       ▼
Gets new access token from Spotify
       │
       ▼
Returns to frontend
       │
       ▼
Frontend creates Spotify device
       │
       ▼
✅ Device appears in Spotify!
```

---

## 🎵 Playback Flow

```
┌──────────────┐
│ Phone/Laptop │  ← You control playback here
│ Spotify App  │
└──────┬───────┘
       │
   1. Play song
       │
       ▼
┌──────────────────────┐
│  Select Device:      │
│  ○ iPhone            │
│  ○ Desktop           │
│  ● Multi-Room Player │ ← Select this!
└──────┬───────────────┘
       │
   2. Playback command
       │
       ▼
┌────────────────────┐
│  Spotify Cloud     │
└────────┬───────────┘
         │
   3. Stream to device
         │
    ┌────┴─────┬─────────┬────────┐
    ▼          ▼         ▼        ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Browser1│ │Browser2│ │Browser3│ │Browser4│
│  🎵    │ │  🎵    │ │  🎵    │ │  🎵    │
└────────┘ └────────┘ └────────┘ └────────┘
   Same       Same      Same       Same
   Song       Song      Song       Song
   Same       Same      Same       Same
   Time       Time      Time       Time
```

---

## 🌐 Network Architecture

### Local Network (Development)

```
┌────────────────────────────────────────────────┐
│           Your Local Network (WiFi)            │
│                                                │
│  Computer (Backend)                            │
│    ├─ localhost:3001 (API)                     │
│    └─ localhost:3001 (WebSocket)               │
│                                                │
│  Computer (Frontend Dev Server)                │
│    └─ localhost:5173 (React App)               │
│                                                │
│  Phone 📱                                       │
│    └─ 192.168.1.100:5173 (Access via IP)      │
│                                                │
│  Tablet 📱                                      │
│    └─ 192.168.1.100:5173 (Access via IP)      │
│                                                │
└────────────────────────────────────────────────┘
```

### Production (Deployed)

```
┌──────────────────────────────────────────────────┐
│                  INTERNET                        │
└──────────────────────────────────────────────────┘
           │                    │
    Backend Server      Frontend CDN
    (Railway)           (Vercel)
           │                    │
    your-app            your-app
    .railway.app        .vercel.app
           │                    │
    ┌──────┴────────┐   ┌──────┴──────┐
    │   API + WS    │   │ Static HTML │
    │   :443        │   │     JS      │
    └───────────────┘   │     CSS     │
                        └─────────────┘
                               │
                         User's Browser
```

---

## 📊 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                    REAL-TIME SYNC                        │
└──────────────────────────────────────────────────────────┘

Device 1: Song starts playing
    │
    ├─→ Updates local state
    │
    └─→ Sends via WebSocket ───┐
                                │
Device 2: Receives update  ←────┤
    │                           │
    ├─→ Updates UI              │
    │                           │
    └─→ Player syncs      ←─────┘
                                │
Device 3: Receives update  ←────┤
    │                           │
    ├─→ Updates UI              │
    │                           │
    └─→ Player syncs      ←─────┘

All devices show:
  ✓ Same track info
  ✓ Same album art
  ✓ Same progress bar
  ✓ Same play/pause state
```

---

## 🎯 Component Interaction

```
Frontend Components:

┌────────────────────────┐
│      App.jsx           │
│                        │
│  ┌──────────────────┐  │
│  │ Password Screen  │  │ ← If password enabled
│  └──────────────────┘  │
│                        │
│  ┌──────────────────┐  │
│  │ Player Setup     │  │ ← Initialize SDK
│  │ - Load SDK       │  │
│  │ - Create Device  │  │
│  │ - Register       │  │
│  └──────────────────┘  │
│                        │
│  ┌──────────────────┐  │
│  │ Playback Display │  │ ← Show current track
│  │ - Album Art      │  │
│  │ - Track Info     │  │
│  │ - Progress Bar   │  │
│  └──────────────────┘  │
│                        │
│  ┌──────────────────┐  │
│  │ WebSocket Client │  │ ← Sync with others
│  │ - Connect        │  │
│  │ - Listen         │  │
│  │ - Broadcast      │  │
│  └──────────────────┘  │
└────────────────────────┘
```

---

## 🔄 State Management

```
Application State:

authenticated: false ──→ true (after password)
      │
      ▼
playerReady: false ──→ true (SDK loaded)
      │
      ▼
deviceReady: false ──→ true (device created)
      │
      ▼
playbackState: null ──→ { track, isPlaying, progress }
```

---

**This visual guide helps understand the complete system architecture!**
