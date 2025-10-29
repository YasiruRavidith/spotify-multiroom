import PropTypes from 'prop-types';

export default function ProgressBar({ currentProgress, duration, formatTime }) {
  const progressPercentage = duration ? (currentProgress / duration) * 100 : 0;

  return (
    <div className="mb-10 mt-10">
      <div className="relative w-full bg-white/20 h-1.5 rounded-full mb-2 cursor-pointer group">
        <div
          className="absolute top-0 left-0 h-full bg-red-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
      <div className="flex justify-between text-white/60 text-sm">
        <span>{formatTime(currentProgress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  currentProgress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  formatTime: PropTypes.func.isRequired
};
