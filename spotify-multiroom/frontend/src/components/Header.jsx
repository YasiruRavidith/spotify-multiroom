import { FaSpotify } from 'react-icons/fa';

const Header = ({ deviceReady }) => {
  return (
    <div className="flex justify-between items-center pb-6 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
          <FaSpotify className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Spotify Multi Room
          </h1>
          <p className="text-xs text-gray-500 font-medium">Synchronized Playback</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${deviceReady ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
        <span className={`text-sm font-semibold ${deviceReady ? 'text-green-600' : 'text-yellow-600'}`}>
          {deviceReady ? 'Ready' : 'Connecting...'}
        </span>
      </div>
    </div>
  );
};

export default Header;
