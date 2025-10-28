import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart, Volume2, MoreHorizontal, LogOut } from 'lucide-react';
import PasswordScreen from './components/PasswordScreen';
import StatusMessage from './components/StatusMessage';
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
  const [isMasterTab, setIsMasterTab] = useState(false);

  // Check if this should be the master tab (plays audio)
  useEffect(() => {
    const checkMasterTab = () => {
      const masterTabId = localStorage.getItem('spotify_master_tab');
      const myTabId = sessionStorage.getItem('my_tab_id') || Date.now().toString();
      
      if (!sessionStorage.getItem('my_tab_id')) {
        sessionStorage.setItem('my_tab_id', myTabId);
      }

      // If no master or master is stale (>10 sec), become master
      const masterTimestamp = localStorage.getItem('spotify_master_timestamp');
      const isStale = !masterTimestamp || (Date.now() - parseInt(masterTimestamp)) > 10000;
      
      if (!masterTabId || isStale) {
        localStorage.setItem('spotify_master_tab', myTabId);
        localStorage.setItem('spotify_master_timestamp', Date.now().toString());
        setIsMasterTab(true);
      } else if (masterTabId === myTabId) {
        setIsMasterTab(true);
      } else {
        setIsMasterTab(false);
      }
    };

    checkMasterTab();
    const interval = setInterval(() => {
      if (isMasterTab) {
        // Update timestamp to keep master alive
        localStorage.setItem('spotify_master_timestamp', Date.now().toString());
      }
      checkMasterTab();
    }, 5000);

    return () => clearInterval(interval);
  }, [isMasterTab]);

  const {
    deviceReady,
    playerReady,
    playbackState,
    error,
    audioActivated,
    setAudioActivated,
    playerRef
  } = useSpotifyPlayer(authenticated && isMasterTab, API_URL); // Only master tab initializes player

  // Re-enable WebSocket for all tabs to receive playback state
  const { wsPlaybackState } = useWebSocket(authenticated, playerReady, WS_URL, () => {});

  // Use WebSocket state for non-master tabs, player state for master tab
  const displayState = isMasterTab ? playbackState : (wsPlaybackState || playbackState);

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
      } catch (error) {
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

  const progressPercentage = displayState?.track 
    ? (currentProgress / displayState.track.duration) * 100 
    : 0;

  return (
    <div className="h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black flex flex-col items-center justify-between p-8 overflow-hidden" onClick={activateAudio}>
      {/* Top Bar */}
      <div className="w-full max-w-7xl flex items-center justify-between">
        <button className="text-white/70 hover:text-white transition-colors">
          <MoreHorizontal size={24} />
        </button>
        <div className="flex items-center gap-4">
          {/* Master/Slave indicator */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isMasterTab ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
            <div className={`w-2 h-2 rounded-full ${isMasterTab ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
            <span className={`text-xs font-semibold ${isMasterTab ? 'text-green-400' : 'text-blue-400'}`}>
              {isMasterTab ? '🎵 Master (Playing Audio)' : '📱 Display Only'}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10">
            <div className={`w-2 h-2 rounded-full ${deviceReady ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
            <span className={`text-xs font-semibold ${deviceReady ? 'text-green-400' : 'text-yellow-400'}`}>
              {deviceReady ? 'Ready' : 'Connecting...'}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {error && <StatusMessage type="error" title={error} />}
      {!audioActivated && deviceReady && isMasterTab && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-4 py-2 rounded-lg text-sm z-50">
          🎵 Master Tab - Click anywhere to activate audio
        </div>
      )}
      {!isMasterTab && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-500/90 text-white px-4 py-2 rounded-lg text-sm z-50">
          📱 Display Tab - Audio plays from master tab
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center w-full max-w-7xl gap-16">
        {displayState?.track ? (
          <>
            {/* Left Side - Controls and Info */}
            <div className="flex-1 max-w-2xl">
              {/* Song Info */}
              <div className="mb-12">
                <h1 className="text-white text-6xl font-bold mb-3 leading-tight">{displayState.track.name}</h1>
                <p className="text-white/70 text-2xl">{displayState.track.artists}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-10">
                <div className="relative w-full bg-white/20 h-1.5 rounded-full mb-2 cursor-pointer group">
                  <div
                    className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="flex justify-between text-white/60 text-sm">
                  <span>{formatTime(currentProgress)}</span>
                  <span>{formatTime(displayState.track.duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="mb-10">
                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-6 mb-8">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShuffleOn(!shuffleOn);
                    }}
                    className={`transition-colors ${shuffleOn ? 'text-green-500' : 'text-white/70 hover:text-white'}`}
                  >
                    <Shuffle size={22} />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      skipToPrevious();
                    }}
                    className="text-white/70 hover:text-white transition-colors hover:scale-110 transform"
                  >
                    <SkipBack size={28} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                    className="w-14 h-14 rounded-full bg-white hover:scale-105 transition-transform flex items-center justify-center shadow-xl"
                  >
                    {displayState.isPlaying ? (
                      <Pause size={24} className="text-black" fill="black" />
                    ) : (
                      <Play size={24} className="text-black ml-0.5" fill="black" />
                    )}
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      skipToNext();
                    }}
                    className="text-white/70 hover:text-white transition-colors hover:scale-110 transform"
                  >
                    <SkipForward size={28} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRepeatMode((repeatMode + 1) % 3);
                    }}
                    className={`transition-colors relative ${repeatMode > 0 ? 'text-green-500' : 'text-white/70 hover:text-white'}`}
                  >
                    <Repeat size={22} />
                  </button>
                </div>

                {/* Like and Volume Controls */}
                <div className="flex items-center gap-6">
                  <button className="text-white/70 hover:text-white transition-colors">
                    <Heart size={24} />
                  </button>

                  <div className="flex items-center gap-3 flex-1 max-w-xs">
                    <Volume2 size={20} className="text-white/70" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Album Artwork */}
            <div className="flex items-center">
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-orange-500/20 rounded-3xl blur-3xl"></div>
                <img
                  src={displayState.track.image}
                  alt={displayState.track.name}
                  className="relative w-[480px] h-[480px] object-cover rounded-lg shadow-2xl"
                />
                {/* Playing indicator */}
                {displayState.isPlaying && (
                  <div className="absolute bottom-4 right-4 bg-green-500 rounded-lg p-3 shadow-xl">
                    <div className="flex gap-1 items-end h-4">
                      <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '60%'}}></div>
                      <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '40%', animationDelay: '0.2s'}}></div>
                      <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '80%', animationDelay: '0.4s'}}></div>
                      <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '50%', animationDelay: '0.6s'}}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🎵</span>
            </div>
            <p className="text-white/70 text-xl">No track playing</p>
            {deviceReady && (
              <p className="text-white/40 text-sm mt-2">Open Spotify and select "Spotify Multi Room"</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom spacing */}
      <div></div>
    </div>
  );
}

export default App;
