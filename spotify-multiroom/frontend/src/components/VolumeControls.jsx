import PropTypes from 'prop-types';
import { Heart, Volume2 } from 'lucide-react';

export default function VolumeControls({ volume, onVolumeChange }) {
  return (
    <div 
      style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
      }}
    >
      <div 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '200px'
        }}
      >
        <Volume2 
          size={20} 
          className="text-white/70"
          style={{ flexShrink: 0 }}
        />
        <div 
          className="relative bg-white/20 rounded-full"
          style={{ 
            flex: 1,
            height: '4px'
          }}
        >
          <div 
            className="absolute bg-red-500 rounded-full"
            style={{ 
              top: 0,
              left: 0,
              height: '100%',
              width: `${volume}%`,
              transition: 'width 0.15s'
            }}
          ></div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer'
            }}
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
