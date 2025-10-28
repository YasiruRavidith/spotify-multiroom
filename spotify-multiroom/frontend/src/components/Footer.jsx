import { FaHeadphones } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-center gap-3 text-center">
        <FaHeadphones className="w-5 h-5 text-purple-500" />
        <p className="text-sm text-gray-600">
          Open this page on multiple devices to play synchronized music everywhere
        </p>
      </div>
    </div>
  );
};

export default Footer;
