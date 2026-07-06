import React, { useState, useEffect } from 'react';

const MarketplaceInfoBar = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="info-bar">
      <span>{dateTime.toLocaleDateString()}</span>
      <span>{dateTime.toLocaleTimeString()}</span>
      <span>Location: Nigeria</span> {/* This will be dynamic based on the user's country */}
    </div>
  );
};

export default MarketplaceInfoBar;