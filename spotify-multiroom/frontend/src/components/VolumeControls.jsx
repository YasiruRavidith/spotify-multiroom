import PropTypes from 'prop-types';
import { Heart, Volume2 } from 'lucide-react';

export default function VolumeControls({ volume, onVolumeChange }) {
  return (
    <div className="flex items-center gap-6">


      <div className="flex items-center gap-3 flex-1 max-w-xs">
        <Volume2 size={20} className="text-white/70" />
        <div className="relative flex-1 h-1 bg-white/20 rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-150"
            style={{ width: `${volume}%` }}
          ></div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}

VolumeControls.propTypes = {
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired
};
