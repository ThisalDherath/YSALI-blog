import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingPage from './pages/LoadingPage';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  
  return (
    <div className="relative w-full h-screen ">
      {/* Loading screen */}
      {isLoading && <LoadingPage onLoadingComplete={handleLoadingComplete} />}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

    </div>
  );
}