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
    <div 
      className="min-h-screen bg-linear-to-b from-purple-900 via-gray-900 to-black flex items-center justify-center"
      style={{ padding: '16px' }}
    >
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '48px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <div 
              style={{
                width: '120px',
                height: '120px',
                background: '#EF4444',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
                padding: '20px'
              }}
            >
              <img 
                src="/spotify.png" 
                alt="Spotify" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Title */}
          <h1 
            style={{
              fontSize: '36px',
              fontWeight: '900',
              textAlign: 'center',
              marginBottom: '12px',
              color: 'white',
              letterSpacing: '-0.5px'
            }}
          >
            Web Potify
          </h1>
          <p 
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              marginBottom: '48px',
              fontSize: '16px'
            }}
          >
            Enter password to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <FaLock 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '18px'
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{
                  width: '100%',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '16px',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#EF4444'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                autoFocus
                disabled={loading}
              />
            </div>

            {error && (
              <div 
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '2px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '16px',
                  padding: '16px',
                  color: '#FCA5A5',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#DC2626' : '#EF4444',
                color: 'white',
                fontWeight: '700',
                paddingTop: '16px',
                paddingBottom: '16px',
                borderRadius: '16px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                transition: 'all 0.2s',
                opacity: loading ? 0.5 : 1
              }}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
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
