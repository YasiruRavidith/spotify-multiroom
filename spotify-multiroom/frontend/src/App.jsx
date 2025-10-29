import { useState, useEffect, useRef } from 'react';
import PasswordScreen from './components/PasswordScreen';
import StatusMessage from './components/StatusMessage';
import Header from './components/Header';
import NowPlaying from './components/NowPlaying';
import useSpotifyPlayer from './hooks/useSpotifyPlayer';
import useWebSocket from './hooks/useWebSocket';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || '';

function App() {
  const [authenticated, setAuthenticated] = useState(!SITE_PASSWORD);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('spotify_volume');
    return savedVolume ? parseInt(savedVolume) : 100;
  });
  const [shuffleOn, setShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const syncFunctionRef = useRef(null);

  // All tabs initialize player with sync capability
  const {
    deviceReady,
    playbackState,
    error,
    audioActivated,
    setAudioActivated,
    playerRef
  } = useSpotifyPlayer(authenticated, API_URL, (syncFunc) => {
    syncFunctionRef.current = syncFunc;
  });

  // WebSocket handles sync commands
  const { broadcastSync } = useWebSocket(authenticated, WS_URL, (syncData) => {
    // Received sync command from another device
    if (syncFunctionRef.current) {
      syncFunctionRef.current(syncData.trackUri, syncData.position, syncData.isPlaying);
    }
  });

  // Use local playback state
  const displayState = playbackState;

  // Set initial volume to player when ready
  useEffect(() => {
    if (playerRef.current && deviceReady && volume) {
      playerRef.current.setVolume(volume / 100);
    }
  }, [deviceReady, playerRef, volume]);

  // Sync shuffle and repeat state from Spotify
  useEffect(() => {
    if (displayState?.shuffle !== undefined) {
      setShuffleOn(displayState.shuffle);
    }
    if (displayState?.repeat !== undefined) {
      setRepeatMode(displayState.repeat);
    }
  }, [displayState?.shuffle, displayState?.repeat]);

  // Broadcast state changes to sync other devices
  useEffect(() => {
    if (displayState?.track?.uri && broadcastSync) {
      broadcastSync(
        displayState.track.uri,
        currentProgress,
        displayState.isPlaying
      );
    }
  }, [displayState?.track?.uri, displayState?.isPlaying, broadcastSync, currentProgress]);

  useEffect(() => {
    if (sessionStorage.getItem('auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  // Keep backend alive - ping every 10 minutes to prevent Render spin-down
  useEffect(() => {
    const pingBackend = async () => {
      try {
        await fetch(`${API_URL}/api/ping`);
        console.log('🏓 Backend ping successful');
      } catch {
        console.log('🏓 Backend ping failed (may be sleeping)');
      }
    };

    // Ping immediately on load
    pingBackend();

    // Then ping every 10 minutes (600000ms)
    const pingInterval = setInterval(pingBackend, 600000);

    return () => clearInterval(pingInterval);
  }, []);

  // Update progress every second when playing
  useEffect(() => {
    if (displayState?.isPlaying) {
      const interval = setInterval(() => {
        setCurrentProgress(prev => Math.min(prev + 1000, displayState.track.duration));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [displayState?.isPlaying, displayState?.track?.duration]);

  // Sync progress with playback state
  useEffect(() => {
    if (displayState?.progress !== undefined) {
      setCurrentProgress(displayState.progress);
    }
  }, [displayState?.progress]);

  const activateAudio = () => {
    if (!audioActivated && playerRef.current) {
      playerRef.current.resume().catch(() => {});
      setAudioActivated(true);
    }
  };

  const togglePlayPause = async () => {
    if (playerRef.current) {
      try {
        const state = await playerRef.current.getCurrentState();
        if (state) {
          if (state.paused) {
            await playerRef.current.resume();
          } else {
            await playerRef.current.pause();
          }
        }
      } catch (err) {
        console.error('Toggle play error:', err);
      }
    }
  };

  const skipToNext = async () => {
    if (playerRef.current) {
      try {
        await playerRef.current.nextTrack();
      } catch (err) {
        console.error('Next track error:', err);
      }
    }
  };

  const skipToPrevious = async () => {
    if (playerRef.current) {
      try {
        await playerRef.current.previousTrack();
      } catch (err) {
        console.error('Previous track error:', err);
      }
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    localStorage.setItem('spotify_volume', value.toString());
    if (playerRef.current) {
      playerRef.current.setVolume(value / 100);
    }
  };

  const handleShuffleToggle = async () => {
    const newShuffleState = !shuffleOn;
    setShuffleOn(newShuffleState);
    
    try {
      const tokenResponse = await fetch(`${API_URL}/api/token`);
      const { accessToken } = await tokenResponse.json();
      
      await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${newShuffleState}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } catch (err) {
      console.error('Shuffle toggle error:', err);
    }
  };

  const handleRepeatToggle = async () => {
    const newRepeatMode = (repeatMode + 1) % 3;
    setRepeatMode(newRepeatMode);
    
    const repeatStates = ['off', 'context', 'track'];
    
    try {
      const tokenResponse = await fetch(`${API_URL}/api/token`);
      const { accessToken } = await tokenResponse.json();
      
      await fetch(`https://api.spotify.com/v1/me/player/repeat?state=${repeatStates[newRepeatMode]}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } catch (err) {
      console.error('Repeat toggle error:', err);
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('auth');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <PasswordScreen onAuthenticate={() => setAuthenticated(true)} />;
  }

  return (
    <div className="h-screen bg-linear-to-b from-purple-900 via-gray-900 to-black flex flex-col items-center justify-between p-8 overflow-hidden" onClick={activateAudio}>
      {/* Top Bar */}
      <Header deviceReady={deviceReady} onLogout={handleLogout} />

      {error && <StatusMessage type="error" title={error} />}
      {!audioActivated && deviceReady && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-4 py-2 rounded-lg text-sm z-50">
          🎵 Click anywhere to activate audio
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center w-full max-w-7xl gap-16 px-4 md:px-8">
        <NowPlaying
          track={displayState?.track}
          isPlaying={displayState?.isPlaying || false}
          currentProgress={currentProgress}
          volume={volume}
          shuffleOn={shuffleOn}
          repeatMode={repeatMode}
          onTogglePlayPause={togglePlayPause}
          onPrevious={skipToPrevious}
          onNext={skipToNext}
          onVolumeChange={handleVolumeChange}
          onShuffleToggle={handleShuffleToggle}
          onRepeatToggle={handleRepeatToggle}
          formatTime={formatTime}
          deviceReady={deviceReady}
        />
      </div>

      {/* Bottom spacing */}
      <div></div>
    </div>
  );
}

export default App;
