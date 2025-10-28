import { useState, useEffect, useRef, useCallback } from 'react';

const useSpotifyPlayer = (authenticated, API_URL) => {
  const [deviceReady, setDeviceReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [playbackState, setPlaybackState] = useState(null);
  const [error, setError] = useState('');
  const [audioActivated, setAudioActivated] = useState(false);
  const playerRef = useRef(null);
  const wsRef = useRef(null);

  const initializePlayer = useCallback(async () => {
    try {
      const tokenResponse = await fetch(`${API_URL}/api/token`);
      await tokenResponse.json();

      const player = new window.Spotify.Player({
        name: 'Spotify Multi-Room Player',
        getOAuthToken: async (cb) => {
          const response = await fetch(`${API_URL}/api/token`);
          const data = await response.json();
          cb(data.accessToken);
        },
        volume: 1.0
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization error:', message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication error:', message);
        setError('Spotify authentication failed. Please check your credentials.');
      });

      player.addListener('account_error', ({ message }) => {
        console.error('Account error:', message);
        setError('Spotify Premium required for playback.');
      });

      player.addListener('playback_error', ({ message }) => {
        console.error('Playback error:', message);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceReady(true);
        setPlayerReady(true);
        
        fetch(`${API_URL}/api/register-device`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId: device_id })
        });

        setTimeout(() => {
          player.activateElement().catch(() => {});
        }, 100);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        setDeviceReady(false);
      });

      // Playback state updates
      player.addListener('player_state_changed', (state) => {
        if (!state) return;

        const track = state.track_window.current_track;
        setPlaybackState({
          isPlaying: !state.paused,
          progress: state.position,
          track: {
            name: track.name,
            artists: track.artists.map(a => a.name).join(', '),
            album: track.album.name,
            image: track.album.images[0]?.url,
            uri: track.uri,
            duration: track.duration_ms
          }
        });

        // Only mark as activated, don't auto-resume
        if (!state.paused) {
          setAudioActivated(true);
        }

        if (wsRef.current && wsRef.current.readyState === 1) {
          wsRef.current.send(JSON.stringify({
            type: 'playback_update',
            data: {
              isPlaying: !state.paused,
              progress: state.position,
              track: track
            }
          }));
        }
      });

      const connected = await player.connect();
      
      if (connected) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
        playerRef.current = player;
      }
    } catch (error) {
      console.error('Error initializing player:', error);
      setError('Failed to initialize Spotify player');
    }
  }, [API_URL, setAudioActivated]);

  useEffect(() => {
    if (!authenticated) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      initializePlayer();
    };

    const autoActivate = () => {
      setAudioActivated(true);
      document.removeEventListener('mousemove', autoActivate);
      document.removeEventListener('touchstart', autoActivate);
      document.removeEventListener('keydown', autoActivate);
    };
    
    document.addEventListener('mousemove', autoActivate, { once: true });
    document.addEventListener('touchstart', autoActivate, { once: true });
    document.addEventListener('keydown', autoActivate, { once: true });
    
    setTimeout(() => setAudioActivated(true), 1000);

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
      document.removeEventListener('mousemove', autoActivate);
      document.removeEventListener('touchstart', autoActivate);
      document.removeEventListener('keydown', autoActivate);
    };
  }, [authenticated, initializePlayer]);

  return {
    deviceReady,
    playerReady,
    playbackState,
    error,
    audioActivated,
    setAudioActivated,
    playerRef,
    wsRef
  };
};

export default useSpotifyPlayer;
