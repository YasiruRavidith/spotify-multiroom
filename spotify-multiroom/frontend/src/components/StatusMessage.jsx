import { FaExclamationTriangle, FaSpinner, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const StatusMessage = ({ type, title, message, children }) => {
  const styles = {
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-200',
      icon: <FaExclamationTriangle className="w-5 h-5 text-red-400" />
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-200',
      icon: <FaSpinner className="w-5 h-5 text-yellow-400 animate-spin" />
    },
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-200',
      icon: <FaCheckCircle className="w-5 h-5 text-green-400" />
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-200',
      icon: <FaInfoCircle className="w-5 h-5 text-blue-400" />
    }
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`${style.bg} border ${style.border} rounded-2xl p-6 mb-6 backdrop-blur-sm`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          {style.icon}
        </div>
        <div className="flex-1">
          {title && (
            <p className={`font-semibold ${style.text} mb-2`}>
              {title}
            </p>
          )}
          {message && (
            <p className={`text-sm ${style.text} opacity-90`}>
              {message}
            </p>
          )}
          {children && (
            <div className={`mt-3 ${style.text}`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusMessage;
