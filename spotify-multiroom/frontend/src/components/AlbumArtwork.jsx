import PropTypes from 'prop-types';

export default function AlbumArtwork({ track, isPlaying }) {
  if (!track) return null;

  return (
    <div className="flex items-center justify-center w-full md:w-auto">
      <div className="relative group">
        <div 
          className="absolute bg-linear-to-br from-purple-500/30 via-pink-500/30 to-orange-500/20 rounded-3xl blur-3xl"
          style={{
            inset: '-32px'
          }}
        ></div>
        <img
          src={track.image}
          alt={track.name}
          className="relative object-cover rounded-lg shadow-2xl"
          style={{
            width: 'min(80vw, 480px)',
            height: 'min(80vw, 480px)',
            maxWidth: '480px',
            maxHeight: '480px'
          }}
        />
        {/* Playing indicator */}
        {isPlaying && (
          <div 
            className="absolute bottom-2 right-2 bg-red-500 rounded-lg shadow-xl"
            style={{ padding: '8px' }}
          >
            <div className="flex items-end" style={{ gap: '2px', height: '16px' }}>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '60%'}}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '40%', animationDelay: '0.2s'}}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '90%', animationDelay: '0.4s'}}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '50%', animationDelay: '0.6s'}}></div>
              <div className="w-1 bg-white rounded-full animate-pulse" style={{height: '70%', animationDelay: '0.8s'}}></div>
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
