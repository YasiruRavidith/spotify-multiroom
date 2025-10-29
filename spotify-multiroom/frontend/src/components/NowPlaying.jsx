import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import PlaybackControls from './PlaybackControls';
import VolumeControls from './VolumeControls';
import AlbumArtwork from './AlbumArtwork';
import { FaSpotify, FaLock } from 'react-icons/fa';

export default function NowPlaying({
  track,
  isPlaying,
  currentProgress,
  volume,
  shuffleOn,
  repeatMode,
  onTogglePlayPause,
  onPrevious,
  onNext,
  onVolumeChange,
  onShuffleToggle,
  onRepeatToggle,
  formatTime,
  deviceReady
}) {
  if (!track) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center h-full text-center">
        <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-6xl"><FaSpotify className="w-20 h-20 text-green-500" /></span>
        </div>
        <p className="text-white/70 text-xl">No track playing</p>
        {deviceReady && (
          <p className="text-white/40 text-sm mt-2">Open Spotify and select "Spotify Multi Room"</p>
        )}
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col md:flex-row items-center justify-center w-full"
      style={{ 
        gap: '32px',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}
    >
      {/* Mobile: Album Artwork at top, Desktop: at right */}
      <div className="order-1 md:order-2">
        <AlbumArtwork track={track} isPlaying={isPlaying} />
      </div>

      {/* Mobile: Controls at bottom, Desktop: at left */}
      <div 
        className="flex-1 w-full order-2 md:order-1"
        style={{ maxWidth: '768px' }}
      >
        {/* Song Info */}
        <div style={{ marginBottom: '32px' }}>
          <h1 
            className="text-white font-bold leading-tight text-center md:text-left"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
          >
            {track.name}
          </h1>
          <p 
            className="text-white/70 text-center md:text-left"
            style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginTop: '12px' }}
          >
            {track.artists}
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          currentProgress={currentProgress}
          duration={track.duration}
          formatTime={formatTime}
        />

        {/* Controls */}
        <div style={{ marginTop: '32px' }}>
          {/* Playback Controls */}
          <PlaybackControls
            isPlaying={isPlaying}
            shuffleOn={shuffleOn}
            repeatMode={repeatMode}
            onTogglePlayPause={onTogglePlayPause}
            onPrevious={onPrevious}
            onNext={onNext}
            onShuffleToggle={onShuffleToggle}
            onRepeatToggle={onRepeatToggle}
          />

          {/* Like and Volume Controls - Hidden on mobile */}
          <div 
            className="hidden md:flex md:justify-start"
            style={{ marginTop: '32px' }}
          >
            <VolumeControls
              volume={volume}
              onVolumeChange={onVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

NowPlaying.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string.isRequired,
    artists: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }),
  isPlaying: PropTypes.bool.isRequired,
  currentProgress: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  shuffleOn: PropTypes.bool.isRequired,
  repeatMode: PropTypes.number.isRequired,
  onTogglePlayPause: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  onShuffleToggle: PropTypes.func.isRequired,
  onRepeatToggle: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
  deviceReady: PropTypes.bool.isRequired
};

