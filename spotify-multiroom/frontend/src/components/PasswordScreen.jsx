import { useState } from 'react';
import { FaSpotify, FaLock } from 'react-icons/fa';

const PasswordScreen = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      
      if (data.valid) {
        sessionStorage.setItem('auth', 'true');
        onAuthenticate();
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Connection error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center shadow-xl">
              <FaSpotify className="w-14 h-14 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-black text-center mb-2 text-white">
            Spotify Multi Room
          </h1>
          <p className="text-white/60 text-center mb-8 font-medium">
            Enter password to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 border-2 border-white/20 rounded-2xl focus:outline-none focus:border-green-500 transition bg-white/5 text-white placeholder-white/40"
                autoFocus
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border-2 border-red-500/40 rounded-2xl p-4 text-red-300 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform"
            >
              {loading ? 'Verifying...' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordScreen;
