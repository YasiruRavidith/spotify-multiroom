import PropTypes from 'prop-types';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';

export default function PlaybackControls({
  isPlaying,
  shuffleOn,
  repeatMode,
  onTogglePlayPause,
  onPrevious,
  onNext,
  onShuffleToggle,
  onRepeatToggle
}) {
  return (
    <div className="flex items-center justify-center gap-6 mb-8">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onShuffleToggle();
        }}
        className={`transition-colors ${shuffleOn ? 'text-red-500' : 'text-white/70 hover:text-white'}`}
      >
        <Shuffle size={22} />
      </button>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="text-red-200/70 hover:text-red-500 transition-colors hover:scale-110 transform"
      >
        <SkipBack size={28} />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onTogglePlayPause();
        }}
        className="w-14 h-14 rounded-full bg-red-500 hover:scale-105 transition-transform flex items-center justify-center shadow-xl"
      >
        {isPlaying ? (
          <Pause size={24} className="text-black" fill="black" />
        ) : (
          <Play size={24} className="text-black ml-0.5 " fill="black" />
        )}
      </button>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="text-red-200/70 hover:text-red-500 transition-colors hover:scale-110 transform"
      >
        <SkipForward size={28} />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRepeatToggle();
        }}
        className={`transition-colors relative ${repeatMode > 0 ? 'text-red-500' : 'text-white/70 hover:text-white'}`}
        title={repeatMode === 0 ? 'Repeat Off' : repeatMode === 1 ? 'Repeat All' : 'Repeat One'}
      >
        <Repeat size={22} />
        {repeatMode === 2 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">
            1
          </span>
        )}
      </button>
    </div>
  );
}

PlaybackControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  shuffleOn: PropTypes.bool.isRequired,
  repeatMode: PropTypes.number.isRequired,
  onTogglePlayPause: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onShuffleToggle: PropTypes.func.isRequired,
  onRepeatToggle: PropTypes.func.isRequired
};
