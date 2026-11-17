import React, { useState } from 'react';

/**
 * AdminLogin - Secure Authentication Gateway for NexFero Executive Portal
 */
export default function AdminLogin({ onLoginSuccess, onNavigateHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        if (rememberMe) {
          localStorage.setItem('nexfero_admin_token', data.token);
          localStorage.setItem('nexfero_admin_user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('nexfero_admin_token', data.token);
          sessionStorage.setItem('nexfero_admin_user', JSON.stringify(data.user));
        }
        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess(data.user);
        return;
      } else {
        setErrorMessage(data.message || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      // Local fallback for offline/preview environments
      if (email.trim().toLowerCase() === 'admin@nexfero.com' && password === 'Nexfero@2026!') {
        const dummyUser = { email: 'admin@nexfero.com', name: 'NexFero Executive Administrator', role: 'Superadmin' };
        localStorage.setItem('nexfero_admin_token', 'local_jwt_nexfero_token_2026');
        localStorage.setItem('nexfero_admin_user', JSON.stringify(dummyUser));
        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess(dummyUser);
        return;
      }
      setErrorMessage('Unable to connect to auth service. Use admin@nexfero.com / Nexfero@2026!');
    }

    setIsLoading(false);
  };

  const handleFillDemo = () => {
    setEmail('admin@nexfero.com');
    setPassword('Nexfero@2026!');
    setErrorMessage('');
  };

  return (
    <div className="admin-login-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000F0F',
      backgroundImage: 'radial-gradient(ellipse at 50% 20%, rgba(3, 98, 76, 0.28) 0%, rgba(0, 15, 15, 0.95) 75%)',
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '460px',
        width: '100%',
        backgroundColor: '#032221',
        border: '1px solid rgba(44, 194, 149, 0.35)',
        borderRadius: '16px',
        padding: '2.8rem 2.4rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 223, 129, 0.12)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src="/logo.png"
            onError={(e) => { e.currentTarget.src = '/public/logo.png'; }}
            alt="NexFero Innovations Logo"
            style={{ height: '48px', width: 'auto', marginBottom: '1.2rem', objectFit: 'contain' }}
          />
          <h1 style={{
            fontSize: '1.45rem',
            fontWeight: 700,
            color: '#F1F7F6',
            letterSpacing: '0.04em',
            margin: '0 0 0.4rem 0'
          }}>
            Executive Management Portal
          </h1>
          <p style={{ fontSize: '0.86rem', color: '#A8CDC4', margin: 0 }}>
            Authorized personnel access for NexFero Innovations
          </p>
        </div>

        {/* Demo Credentials Quick-Fill Banner */}
        <div style={{
          backgroundColor: 'rgba(3, 98, 76, 0.35)',
          border: '1px dashed rgba(249, 190, 74, 0.5)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.82rem'
        }}>
          <div>
            <div style={{ color: '#FFD477', fontWeight: 600 }}>Default Admin Credentials:</div>
            <div style={{ color: '#F1F7F6', fontFamily: 'monospace' }}>admin@nexfero.com / Nexfero@2026!</div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            style={{
              background: 'rgba(249, 190, 74, 0.18)',
              border: '1px solid #F9BE4A',
              color: '#FFD477',
              borderRadius: '4px',
              padding: '0.35rem 0.65rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '8px',
            color: '#FCA5A5',
            padding: '0.75rem 1rem',
            fontSize: '0.84rem',
            marginBottom: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>⚠</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#A8CDC4',
              marginBottom: '0.4rem'
            }}>
              Administrative Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nexfero.com"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                backgroundColor: '#000F0F',
                border: '1px solid rgba(44, 194, 149, 0.3)',
                borderRadius: '8px',
                color: '#F1F7F6',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#A8CDC4'
              }}>
                Security Key
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2CC295',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPassword ? 'Hide Key' : 'Show Key'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                backgroundColor: '#000F0F',
                border: '1px solid rgba(44, 194, 149, 0.3)',
                borderRadius: '8px',
                color: '#F1F7F6',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.8rem',
            fontSize: '0.84rem'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A8CDC4', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#00DF81' }}
              />
              <span>Keep session active</span>
            </label>
            <span style={{ color: '#707D7D', fontSize: '0.78rem' }}>256-bit TLS Encrypted</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-gold"
            style={{
              width: '100%',
              padding: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              opacity: isLoading ? 0.75 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <span>Authenticating Secure Connection...</span>
            ) : (
              <>
                <span>Enter Administration Suite</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            type="button"
            onClick={onNavigateHome}
            style={{
              background: 'none',
              border: 'none',
              color: '#A8CDC4',
              fontSize: '0.85rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            ← Return to NexFero Innovations Public Portal
          </button>
        </div>
      </div>
    </div>
  );
}
