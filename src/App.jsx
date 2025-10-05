import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoadingPage from './pages/LoadingPage';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageTransition>
              <Gallery />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Loading screen */}
      {isLoading && <LoadingPage onLoadingComplete={handleLoadingComplete} />}

      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}