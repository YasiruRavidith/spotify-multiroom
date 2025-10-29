import { FaMobileAlt, FaPlay, FaListUl, FaMousePointer, FaVolumeUp } from 'react-icons/fa';

const Instructions = () => {
  const steps = [
    { icon: <FaMobileAlt />, text: 'Open Spotify on your phone or computer' },
    { icon: <FaPlay />, text: 'Play any song' },
    { icon: <FaListUl />, text: 'Tap the "Devices Available" icon' },
    { icon: <FaMousePointer />, text: 'Select "Web Potify"' },
    { icon: <FaVolumeUp />, text: 'Music will start playing on ALL devices with this page open' }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4">How to Use</h3>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mt-0.5">
              {step.icon}
            </div>
            <span className="text-sm leading-relaxed pt-1">
              <span className="text-gray-400 font-medium">{index + 1}.</span> {step.text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Instructions;
