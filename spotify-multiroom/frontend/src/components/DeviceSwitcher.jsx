import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Monitor, Smartphone, Speaker, Laptop, ChevronDown } from 'lucide-react';

const DeviceSwitcher = ({ currentDeviceId }) => {
  const [devices, setDevices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDevices = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const tokenResponse = await fetch(`${API_URL}/api/token`);
      const { accessToken } = await tokenResponse.json();

      const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDevices(data.devices || []);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const transferPlayback = async (deviceId) => {
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const tokenResponse = await fetch(`${API_URL}/api/token`);
      const { accessToken } = await tokenResponse.json();

      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: true
        })
      });

      // Refresh devices list to get updated active status
      setTimeout(() => {
        fetchDevices();
        setIsOpen(false);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error transferring playback:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDevices();
    }
  }, [isOpen]);

  const getDeviceIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'computer':
        return <Monitor size={18} />;
      case 'smartphone':
        return <Smartphone size={18} />;
      case 'speaker':
        return <Speaker size={18} />;
      default:
        return <Laptop size={18} />;
    }
  };

  const activeDevice = devices.find(d => d.is_active);
  const currentDevice = activeDevice || devices.find(d => d.id === currentDeviceId);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 transition-colors rounded-full bg-white/10 ml-5 text-red-400"
        style={{ padding: '8px 12px', gap: '2px'}}
        disabled={isLoading}
      >
        {currentDevice ? (
          <>
            {getDeviceIcon(currentDevice.type)}
            <span className="text-sm font-medium hidden sm:inline">{currentDevice.name}</span>
          </>
        ) : (
          <>
            <Speaker size={18} />
            <span className="text-sm font-medium hidden sm:inline">Select Device</span>
          </>
        )}
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-white/5 border border-white/10 rounded-3xl shadow-xl z-50 overflow-hidden" style={{ padding: '8px 12px', gap: '2px',marginTop: '4px' }}>
            <div className="p-2">
              <div className="text-xs text-gray-400 px-3 py-2 font-semibold" style={{marginLeft:'5px'}}>
                Available Devices
              </div>
              
              {devices.length === 0 ? (
                <div className="px-3 py-4 text-sm text-gray-400 text-center">
                  No devices found.
                </div>
              ) : (
                <div className="space-y-1" style={{ padding: '1px'}}>
                  {devices.map((device) => (
                    <button
                      key={device.id}
                      onClick={() => transferPlayback(device.id)}
                      disabled={device.is_active || isLoading}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl transition-colors text-left ${
                        device.is_active
                          ? 'bg-red-500/20 text-red-400'
                          : 'hover:bg-white/10 text-white'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                       style={{ padding: '5px 8px', gap: '2px'}}
                    >
                      {getDeviceIcon(device.type)}
                      <div className="flex-1 min-w-0" >
                        <div className="text-sm font-medium truncate">
                          {device.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {device.type}
                        </div>
                      </div>
                      {device.is_active && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs text-green-400">Active</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

DeviceSwitcher.propTypes = {
  currentDeviceId: PropTypes.string
};

export default DeviceSwitcher;
