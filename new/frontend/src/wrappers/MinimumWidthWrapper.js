import React, { useState, useEffect } from 'react';

const MinimumWidthWrapper = ({ children, minWidth }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
        
      setWindowWidth(window.innerWidth);
    };
    console.log(window.innerWidth)
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowWidth < minWidth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>You need a bigger screen</p>
      </div>
    );
  }

  return children;
};

export default MinimumWidthWrapper;
