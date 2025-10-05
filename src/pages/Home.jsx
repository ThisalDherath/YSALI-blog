import React, { useState, useEffect, useMemo } from "react";
import FullPageNavigation from "../components/navbar";
import LiquidEther from "../components/LiquidEther";
import Section1 from "./Section1";
import Section2 from "./Section2";

export default function Home() {
  const [liquidKey, setLiquidKey] = useState(0);

  // Restart LiquidEther every 5 minutes to prevent memory leaks
  useEffect(() => {
    const interval = setInterval(() => {
      setLiquidKey((prev) => prev + 1);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Memoize LiquidEther props to prevent unnecessary re-renders
  const liquidEtherProps = useMemo(() => ({
    colors: ["#5227FF", "#FF9FFC", "#B19EEF"],
    mouseForce: 25,
    cursorSize: 80,
    isViscous: false,
    viscous: 30,
    iterationsViscous: 12,
    iterationsPoisson: 12,
    resolution: 0.25,
    isBounce: false,
    autoDemo: true,
    autoSpeed: 0.3,
    autoIntensity: 1.8,
    takeoverDuration: 0.25,
    autoResumeDelay: 3000,
    autoRampDuration: 0.6,
  }), []);

  return (
    <>
      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Webkit Scrollbar (Chrome, Safari, Edge) */
          ::-webkit-scrollbar {
            width: 12px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(15, 15, 15, 0.8);
            border-radius: 6px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #8B5CF6, #A855F7, #9333EA);
            border-radius: 6px;
            border: 2px solid rgba(15, 15, 15, 0.8);
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #7C3AED, #8B5CF6, #7E22CE);
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
          }
          
          /* Firefox Scrollbar */
          * {
            scrollbar-width: thin;
            scrollbar-color: #8B5CF6 rgba(15, 15, 15, 0.8);
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            height: 100%;
          }
          
          /* Ensure body allows scrolling and prevents horizontal overflow */
          body {
            overflow-x: hidden;
            overflow-y: auto;
            max-width: 100vw;
            -webkit-overflow-scrolling: touch;
            position: relative;
            height: 100%;
          }

          /* Mobile: hide horizontal scrollbar and ensure smooth scrolling */
          @media (max-width: 768px) {
            html, body {
              overflow-x: hidden;
              -webkit-overflow-scrolling: touch;
              touch-action: pan-y;
              width: 100%;
              position: relative;
            }
            
            * {
              -webkit-overflow-scrolling: touch;
            }
          }
        `
      }} />
    
      <div
        className="w-full bg-black select-none"
        style={{ 
          position: "relative",
          overflowX: "hidden",
          maxWidth: "100vw",
          width: "100%"
        }}
      >
        {/* LiquidEther Background - Fixed positioned for all sections */}
        <div
          style={{
            position: "fixed",
            backgroundColor: "#0f0f0fff",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <LiquidEther
            key={liquidKey}
            {...liquidEtherProps}
          />
        </div>

        {/* Navigation - Fixed positioned */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10 }}>
          <FullPageNavigation />
        </div>

        {/* Sections Container */}
        <div 
          className="relative" 
          style={{ 
            zIndex: 2, 
            overflowX: "hidden",
            width: "100%",
            maxWidth: "100vw"
          }}
        >
          {/* Section 1 - Full viewport height */}
          <div style={{ height: "100vh", width: "100%" }}>
            <Section1 />
          </div>
          
          {/* Section 2 - Becomes fixed when fully in view */}
          <div 
            style={{ 
              position: "relative",
              height: "200vh", // Extended height for timeline scroll
              minHeight: "200vh",
              width: "100%",
              maxWidth: "100vw",
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y"
            }}
          >
            <Section2 />
          </div>
        </div>
      </div>
    </>
  );
}