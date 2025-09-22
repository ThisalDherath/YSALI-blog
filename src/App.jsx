import React, { useState, useEffect } from 'react';
import LoadingPage from './pages/LoadingPage';
import Home from './pages/Home';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    // Simulate loading time - replace with your actual loading logic
    const timer = setTimeout(() => {
      setShowTransition(true);
      // Additional delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // 800ms for fade transition
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Home page always rendered underneath */}
      <div className="absolute inset-0">
        <Home />
      </div>
      
      {/* Loading screen overlay */}
      {isLoading && (
        <div 
          className={`absolute inset-0 z-50 transition-opacity duration-800 ease-in-out ${
            showTransition ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundColor: '#000000', // Match your loading screen background
          }}
        >
          <LoadingPage />
        </div>
      )}
    </div>
  );
}