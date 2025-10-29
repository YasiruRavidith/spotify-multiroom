import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import PlaybackControls from './PlaybackControls';
import VolumeControls from './VolumeControls';
import AlbumArtwork from './AlbumArtwork';

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
      <div className="text-center">
        <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-6xl">🎵</span>
        </div>
        <p className="text-white/70 text-xl">No track playing</p>
        {deviceReady && (
          <p className="text-white/40 text-sm mt-2">Open Spotify and select &quot;Spotify Multi Room&quot;</p>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Left Side - Controls and Info */}
      <div className="flex-1 max-w-2xl">
        {/* Song Info */}
        <div className="mb-12">
          <h1 className="text-white text-6xl font-bold mb-3 leading-tight">{track.name}</h1>
          <p className="text-white/70 text-2xl">{track.artists}</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          currentProgress={currentProgress}
          duration={track.duration}
          formatTime={formatTime}
        />

        {/* Controls */}
        <div className="mb-10">
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

          {/* Like and Volume Controls */}
          <VolumeControls
            volume={volume}
            onVolumeChange={onVolumeChange}
          />
        </div>
      </div>

      {/* Right Side - Album Artwork */}
      <AlbumArtwork track={track} isPlaying={isPlaying} />
    </>
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

