import { FaMusic } from 'react-icons/fa';

const EmptyState = ({ deviceReady }) => {
  if (!deviceReady) return null;

  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10">
      <FaMusic className="w-24 h-24 mx-auto mb-6 text-gray-600" />
      <h2 className="text-2xl font-bold text-white mb-3">
        Waiting for Music...
      </h2>
      <p className="text-gray-400 mb-6">
        Select this device from Spotify to start playing
      </p>
      <div className="inline-block bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-sm text-gray-300">
          Open Spotify app and select <span className="text-green-400 font-semibold">Multi-Room Player</span>
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
