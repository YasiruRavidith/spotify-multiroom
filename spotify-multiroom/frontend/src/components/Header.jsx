import PropTypes from 'prop-types';
import { MoreHorizontal, LogOut } from 'lucide-react';
import DeviceSwitcher from './DeviceSwitcher';

export default function Header({ deviceReady, onLogout, currentDeviceId }) {
  return (
    <div 
      className="w-full max-w-7xl flex items-center justify-between px-4 md:px-0"
      style={{ marginTop: '10px' }}
    >
      <button 
        onClick={onLogout}
        className="text-white/70 hover:text-red-400 transition-colors flex items-center rounded-full hover:bg-white/10"
        title="Logout"
        style={{ padding: '8px 12px', gap: '6px' }}
      >
        <LogOut size={18} />
        <span className="text-sm hidden sm:inline">Logout</span>
      </button>
      <div className="flex items-center gap-2 md:gap-4" >
        {/* Device Switcher */}
        <DeviceSwitcher currentDeviceId={currentDeviceId} />
        
        {/* Connection Status */}
        <div 
          className="flex items-center rounded-full bg-white/10 ml-5"
          style={{ padding: '8px 12px', gap: '8px', marginRight: window.innerWidth <= 768 ? '16px' : '0px'}}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${deviceReady ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
          <span className={`text-xs md:text-sm font-semibold ${deviceReady ? 'text-green-400' : 'text-yellow-400'}`}>
            {deviceReady ? 'Online' : 'Connecting...'}
          </span>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  deviceReady: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  currentDeviceId: PropTypes.string
};

