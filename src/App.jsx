import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingPage from './pages/LoadingPage';
import Home from './pages/Home';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Loading screen */}
      {isLoading && <LoadingPage onLoadingComplete={handleLoadingComplete} />}
      
      {/* Home page with slide-up animation */}
        <Home />
     
    </div>
  );
}