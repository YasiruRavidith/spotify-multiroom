import PropTypes from 'prop-types';

export default function AlbumArtwork({ track, isPlaying }) {
  if (!track) return null;

  return (
    <div className="flex items-center">
      <div className="relative group">
        <div className="absolute -inset-8 bg-linear-to-br from-purple-500/30 via-pink-500/30 to-orange-500/20 rounded-3xl blur-3xl"></div>
        <img
          src={track.image}
          alt={track.name}
          className="relative w-[480px] h-[480px] object-cover rounded-lg shadow-2xl"
        />
        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute bottom-4 right-4 bg-green-500 rounded-lg p-20 shadow-xl">
            <div className="flex gap-1 items-end h-4">
              <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '60%'}}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '40%', animationDelay: '0.2s'}}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '80%', animationDelay: '0.4s'}}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '50%', animationDelay: '0.6s'}}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

AlbumArtwork.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }),
  isPlaying: PropTypes.bool.isRequired
};
