import React, { useState, useEffect, useMemo } from "react";
import Masonry from "../components/Masonry";
import Navbar from "../components/navbar";
import LiquidEther from "../components/LiquidEther";

const Gallery = () => {
  const items = [
    {
      id: "1",
      img: "http://images.pexels.com/photos/1379640/pexels-photo-1379640.jpeg?_gl=1*oyf9qq*_ga*OTU2NzMyODc5LjE3NTMxNzQzNDk.*_ga_8JE65Q40S6*czE3NTk2NTAxMTMkbzEzJGcxJHQxNzU5NjUwMTc5JGo1NiRsMCRoMA..",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?_gl=1*cx4qr3*_ga*OTU2NzMyODc5LjE3NTMxNzQzNDk.*_ga_8JE65Q40S6*czE3NTk2NTAxMTMkbzEzJGcxJHQxNzU5NjUwMjc0JGo0MiRsMCRoMA..",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?_gl=1*vvq3xi*_ga*OTU2NzMyODc5LjE3NTMxNzQzNDk.*_ga_8JE65Q40S6*czE3NTk2NTAxMTMkbzEzJGcxJHQxNzU5NjUwMzA5JGo3JGwwJGgw",
      url: "https://example.com/three",
      height: 600,
    },
    {
      id: "4",
      img: "http://images.pexels.com/photos/1379640/pexels-photo-1379640.jpeg?_gl=1*oyf9qq*_ga*OTU2NzMyODc5LjE3NTMxNzQzNDk.*_ga_8JE65Q40S6*czE3NTk2NTAxMTMkbzEzJGcxJHQxNzU5NjUwMTc5JGo1NiRsMCRoMA..",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "5",
      img: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?_gl=1*cx4qr3*_ga*OTU2NzMyODc5LjE3NTMxNzQzNDk.*_ga_8JE65Q40S6*czE3NTk2NTAxMTMkbzEzJGcxJHQxNzU5NjUwMjc0JGo0MiRsMCRoMA..",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "6",
      img: "https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?_gl=1*vvq3xi*_ga*OTU2NzMyODc5LjE3NTMxNzQzNDk.*_ga_8JE65Q40S6*czE3NTk2NTAxMTMkbzEzJGcxJHQxNzU5NjUwMzA5JGo3JGwwJGgw",
      url: "https://example.com/three",
      height: 600,
    },
     {
      id: "7",
      img: "http://images.pexels.com/photos/1379640/pexels-photo-1379640.jpeg?_gl=1*oyf9qq*_ga*OTU2NzMyODc5LjE3NTMxNzQzNDk.*_ga_8JE65Q40S6*czE3NTk2NTAxMTMkbzEzJGcxJHQxNzU5NjUwMTc5JGo1NiRsMCRoMA..",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "8",
      img: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?_gl=1*cx4qr3*_ga*OTU2NzMyODc5LjE3NTMxNzQzNDk.*_ga_8JE65Q40S6*czE3NTk2NTAxMTMkbzEzJGcxJHQxNzU5NjUwMjc0JGo0MiRsMCRoMA..",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "9",
      img: "https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?_gl=1*vvq3xi*_ga*OTU2NzMyODc5LjE3NTMxNzQzNDk.*_ga_8JE65Q40S6*czE3NTk2NTAxMTMkbzEzJGcxJHQxNzU5NjUwMzA5JGo3JGwwJGgw",
      url: "https://example.com/three",
      height: 600,
    },
  ];

  const [liquidKey, setLiquidKey] = useState(0);

  // Restart LiquidEther every 5 minutes to prevent memory leaks
  useEffect(() => {
    const interval = setInterval(() => {
      setLiquidKey((prev) => prev + 1);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Memoize LiquidEther props to prevent unnecessary re-renders
  const liquidEtherProps = useMemo(
    () => ({
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
    }),
    []
  );

  return (
    <div
      className="w-full bg-black select-none"
      style={{ position: "relative" }}
    >
      {/* LiquidEther Background - Fixed positioned */}
      <div
        style={{
          position: "fixed",
          backgroundColor: "#0f0f0fff",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <LiquidEther key={liquidKey} {...liquidEtherProps} />
      </div>

      {/* Content Layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        <div
          className="mt-20 p-4 md:p-8 lg:p-16"
          style={{ minHeight: "100vh" }}
        >
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
