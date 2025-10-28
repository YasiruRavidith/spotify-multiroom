import { useEffect, useRef } from 'react';

const useWebSocket = (authenticated, playerReady, WS_URL, setPlaybackState) => {
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    if (!authenticated || !playerReady) return;

    const connectWebSocket = () => {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to WebSocket server');
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        if (message.type === 'playback' || message.type === 'playback_update') {
          if (message.data) {
            setPlaybackState(message.data);
          }
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [authenticated, playerReady, WS_URL, setPlaybackState]);

  return wsRef;
};

export default useWebSocket;
