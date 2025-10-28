import { FaPlay, FaPause } from 'react-icons/fa';

const NowPlaying = ({ playbackState, formatTime }) => {
  if (!playbackState?.track) return null;

  const { track, isPlaying, progress, device } = playbackState;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 mb-8">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      
      <div className="relative z-10 p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* Album Art with glow effect */}
          {track.image && (
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-3xl group-hover:bg-green-500/30 transition-all duration-500"></div>
              <img
                src={track.image}
                alt={track.name}
                className="relative w-80 h-80 rounded-3xl shadow-2xl object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* Play/Pause overlay indicator */}
              <div className={`absolute bottom-4 right-4 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border-2 ${isPlaying ? 'bg-green-500/90 border-green-400' : 'bg-gray-700/90 border-gray-500'} shadow-xl`}>
                {isPlaying ? (
                  <FaPlay className="w-6 h-6 text-white ml-1" />
                ) : (
                  <FaPause className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
          )}

          {/* Track Info */}
          <div className="flex-1 flex flex-col justify-center text-center lg:text-left w-full">
            {/* Status badge */}
            <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
              <div className={`px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 ${isPlaying ? 'bg-green-500/20 border border-green-500/50' : 'bg-gray-500/20 border border-gray-500/50'}`}>
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className={`text-sm font-semibold uppercase tracking-wider ${isPlaying ? 'text-green-300' : 'text-gray-300'}`}>
                  {isPlaying ? 'Now Playing' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Track details */}
            <div className="mb-8">
              <h2 className="text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-tight bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {track.name}
              </h2>
              <p className="text-3xl text-gray-200 mb-3 font-semibold">
                {track.artists}
              </p>
              <p className="text-xl text-gray-400 font-medium">
                {track.album}
              </p>
            </div>

            {/* Progress Bar */}
            {track.duration && (
              <div className="space-y-3 mb-6">
                <div className="relative w-full bg-slate-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full transition-all duration-1000 ease-linear shadow-lg shadow-green-500/50"
                    style={{ width: `${(progress / track.duration) * 100}%` }}
                  >
                    <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                  </div>
                </div>
                <div className="flex justify-between text-base text-gray-300 font-medium">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(track.duration)}</span>
                </div>
              </div>
            )}

            {/* Device Info */}
            {device && (
              <div className="pt-6 border-t border-white/10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/30 rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-300">
                    Playing on <span className="text-white font-bold">{device.name}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
