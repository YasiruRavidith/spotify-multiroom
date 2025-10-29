import PropTypes from 'prop-types';
import { FaSpotify} from 'react-icons/fa';

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
            className="absolute bottom-2 right-2 "
            style={{ padding: '2px' }}
          >
            <FaSpotify className="w-10 h-10 animate-pulse text-red-500" />
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
