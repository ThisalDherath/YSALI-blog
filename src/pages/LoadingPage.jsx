import React, { useState, useEffect } from 'react';

const LoadingPage = ({ onLoadingComplete }) => {
  const [lettersVisible, setLettersVisible] = useState([false, false, false, false, false]);
  const [disappear, setDisappear] = useState(false);

  useEffect(() => {
    // Animate letters coming in one by one
    const timers = [];
    
    // Show letters with delay
    for (let i = 0; i < 5; i++) {
      timers.push(setTimeout(() => {
        setLettersVisible(prev => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, 300 * i));
    }

    // Start disappear animation after all letters are visible
    timers.push(setTimeout(() => {
      setDisappear(true);
    }, 300 * 5 + 800));

    // Complete loading after disappear animation
    timers.push(setTimeout(() => {
      onLoadingComplete();
    }, 300 * 5 + 1300));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 bg-[#1D1D1F] flex items-center justify-center z-50 transition-opacity duration-500 ${disappear ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex">
        {['Y', 'S', 'A', 'L', 'I'].map((letter, index) => (
          <div
            key={index}
            className={`text-6xl md:text-7xl font-bold text-purple-500 mx-1 transition-all duration-700 ease-out ${
              lettersVisible[index] 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-32 opacity-0'
            }`}
            style={{ 
              fontFamily: 'Gliker, sans-serif',
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;