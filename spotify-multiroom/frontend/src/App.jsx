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
  const [volume, setVolume] = useState(65);
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
    if (playerRef.current) {
      playerRef.current.setVolume(value / 100);
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
      <div className="flex-1 flex items-center justify-center w-full max-w-7xl gap-16">
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
          onShuffleToggle={() => setShuffleOn(!shuffleOn)}
          onRepeatToggle={() => setRepeatMode((repeatMode + 1) % 3)}
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
