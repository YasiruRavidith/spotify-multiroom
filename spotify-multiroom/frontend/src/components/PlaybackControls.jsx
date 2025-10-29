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
        onClick={onShuffleToggle}
        className={`transition-colors ${shuffleOn ? 'text-green-500' : 'text-white/70 hover:text-white'}`}
      >
        <Shuffle size={22} />
      </button>
      
      <button 
        onClick={onPrevious}
        className="text-white/70 hover:text-white transition-colors hover:scale-110 transform"
      >
        <SkipBack size={28} />
      </button>
      
      <button
        onClick={onTogglePlayPause}
        className="w-14 h-14 rounded-full bg-white hover:scale-105 transition-transform flex items-center justify-center shadow-xl"
      >
        {isPlaying ? (
          <Pause size={24} className="text-black" fill="black" />
        ) : (
          <Play size={24} className="text-black ml-0.5" fill="black" />
        )}
      </button>
      
      <button 
        onClick={onNext}
        className="text-white/70 hover:text-white transition-colors hover:scale-110 transform"
      >
        <SkipForward size={28} />
      </button>
      
      <button
        onClick={onRepeatToggle}
        className={`transition-colors relative ${repeatMode > 0 ? 'text-green-500' : 'text-white/70 hover:text-white'}`}
      >
        <Repeat size={22} />
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
