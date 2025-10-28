# 🎵 Master/Slave Tab Architecture

## How It Works:

### **Master Tab** (First tab opened):
- ✅ Initializes Spotify Web Playback SDK
- ✅ Plays actual audio through speakers
- ✅ Shows as "Spotify Multi Room" device in Spotify
- ✅ Broadcasts playback state via WebSocket
- 🎵 **Indicator**: Green badge "Master (Playing Audio)"

### **Slave Tabs** (Additional tabs):
- ❌ Does NOT initialize Web Playback SDK  
- ❌ Does NOT play audio
- ✅ Receives playback state from WebSocket
- ✅ Shows what master tab is playing
- ✅ Can control playback (play/pause/skip)
- 📱 **Indicator**: Blue badge "Display Only"

---

## Key Features:

### 1. **Auto Master Selection**
- First tab to open becomes master
- Uses `localStorage` to coordinate
- If master tab closes, next tab becomes master
- Heartbeat system (updates every 5 seconds)

### 2. **WebSocket Sync**
- Master tab broadcasts playback state
- Slave tabs receive and display it
- All tabs show same song, progress, controls
- ~1 second sync delay (acceptable)

### 3. **Single Spotify Device**
- Only ONE device appears in Spotify: "Spotify Multi Room"
- This is the master tab
- All other tabs just display info

---

## User Experience:

### **Opening First Tab:**
```
Tab 1 opens → Becomes Master → Shows green badge
         ↓
    Plays audio through speakers
         ↓
    Appears in Spotify devices
```

### **Opening Second Tab:**
```
Tab 2 opens → Sees master exists → Becomes Slave → Shows blue badge
         ↓
    No audio initialization
         ↓
    Receives state from WebSocket
         ↓
    Shows what Tab 1 is playing
```

### **Controls Work From Any Tab:**
```
User clicks play on Tab 2 (slave)
         ↓
    Command sent to backend
         ↓
    Master tab executes it
         ↓
    WebSocket broadcasts new state
         ↓
    All tabs update
```

---

## Benefits:

✅ **One Spotify Device** - Clean device list  
✅ **Multiple Displays** - View from any tab  
✅ **Low Resource** - Only one audio player  
✅ **Synchronized** - All tabs show same info  
✅ **Flexible** - Open on multiple devices/computers  

---

## Technical Details:

### localStorage Keys:
```javascript
spotify_master_tab: "12345678" // Tab ID of current master
spotify_master_timestamp: "1698765432100" // Last heartbeat
```

### sessionStorage Keys:
```javascript
my_tab_id: "12345678" // This tab's unique ID
```

### Master Selection Logic:
1. Check if master exists in localStorage
2. Check if master timestamp is fresh (<10 seconds)
3. If no master or stale → become master
4. If master exists and fresh → become slave

### Heartbeat:
- Master updates timestamp every 5 seconds
- Prevents stale master if tab freezes/crashes
- Other tabs can detect and take over

---

## Example Scenarios:

### Scenario 1: Normal Usage
```
1. Open Tab A → Master (plays audio)
2. Open Tab B → Slave (shows info)
3. Open Tab C → Slave (shows info)
4. All tabs show same song
5. Controls work from any tab
```

### Scenario 2: Master Tab Closes
```
1. Tab A (master) closes
2. Master timestamp becomes stale
3. Tab B detects stale master
4. Tab B becomes new master
5. Audio switches to Tab B
6. Tab C continues as slave
```

### Scenario 3: All Tabs Close
```
1. Close all tabs
2. localStorage clears after timeout
3. Next tab opened becomes master
4. Fresh start
```

---

## Deployment:

Since this uses WebSockets, you need:

### **Backend**: 
- ❌ NOT Vercel (no WebSocket support)
- ✅ Render.com (free, supports WebSockets)
- ✅ Railway.app (requires credit card)
- ✅ Glitch.com (free, no CC)

### **Frontend**:
- ✅ Vercel (works great)
- ✅ Netlify
- ✅ Anywhere static hosting works

---

## Next Steps:

1. **Re-deploy backend to Render.com** (for WebSocket support)
2. **Update frontend environment variable**: `VITE_WS_URL=wss://your-backend.onrender.com`
3. **Deploy frontend to Vercel**
4. **Test**: Open multiple tabs, check master/slave indicators

---

## Troubleshooting:

### All tabs become master
- Check WebSocket connection in console
- Backend might not be broadcasting state

### Tabs not syncing
- Check `VITE_WS_URL` is correct (`wss://` for HTTPS)
- Backend WebSocket server must be running
- Check browser console for WebSocket errors

### Audio plays from multiple tabs
- Check localStorage/sessionStorage
- Clear browser data and try again
- Only master should initialize SDK

---

This architecture gives you:
- 🎵 **One clean Spotify device**
- 📱 **Multiple control points**
- 🔄 **Synchronized playback state**
- 💻 **Low resource usage**

Perfect for your use case! 🚀
