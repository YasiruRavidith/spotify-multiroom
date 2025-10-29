import PropTypes from 'prop-types';
import { MoreHorizontal, LogOut } from 'lucide-react';

export default function Header({ deviceReady, onLogout }) {
  return (
    <div className="w-full max-w-7xl flex items-center justify-between" style={{ marginTop: '10px' }}>
      <button 
          onClick={onLogout}
          className="text-white/70 hover:text-white transition-colors flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10"
          title="Logout"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10" style={{ gap: '10px' }}>
          <div className={`w-2 h-2 rounded-full ${deviceReady ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
          <span className={`text-xs font-semibold ${deviceReady ? 'text-green-400' : 'text-yellow-400'}`}>
            {deviceReady ? '🎵 Playing' : 'Connecting...'}
          </span>
        </div>
        
      </div>
    </div>
  );
}

Header.propTypes = {
  deviceReady: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired
};

