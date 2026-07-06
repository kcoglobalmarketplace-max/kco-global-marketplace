import React, { useState } from 'react';
import LoginRegistrationSystem from './Login & Registration System';
import MarketplaceHome from './MarketplaceHome';

function App() {
  // Global authentication state tracking session authorization
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSession, setUserSession] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUserSession(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserSession(null);
    setIsAuthenticated(false);
  };

  // Guard routing logic: If not logged in, force authentication terminal first
  if (!isAuthenticated) {
    return (
      <LoginRegistrationSystem onAuthSuccess={handleLoginSuccess} />
    );
  }

  // Once authenticated, render full Marketplace access
  return (
    <MarketplaceHome user={userSession} onLogout={handleLogout} />
  );
}

export default App;