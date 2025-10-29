import PropTypes from 'prop-types';
import { Heart, Volume2 } from 'lucide-react';

export default function VolumeControls({ volume, onVolumeChange }) {
  return (
    <div className="flex items-center gap-6">
      <button className="text-white/70 hover:text-white transition-colors">
        <Heart size={24} />
      </button>

      <div className="flex items-center gap-3 flex-1 max-w-xs">
        <Volume2 size={20} className="text-white/70" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

VolumeControls.propTypes = {
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired
};
