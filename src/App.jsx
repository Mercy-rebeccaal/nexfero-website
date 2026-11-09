import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import './styles/global.css';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentRoute === '/privacy' || currentRoute === '/privacy.html') {
    return <PrivacyPolicy />;
  }
  if (currentRoute === '/terms' || currentRoute === '/terms.html') {
    return <Terms />;
  }
  if (currentRoute === '/404' || currentRoute === '/404.html') {
    return <NotFound />;
  }

  return <Home />;
}

