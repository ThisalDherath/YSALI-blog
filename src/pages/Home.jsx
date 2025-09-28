import React, { useState, useEffect } from "react";
import FullPageNavigation from "../components/navbar";
import LiquidEther from "../components/LiquidEther";
import TiltedCard from "../components/TiltedCard";

export default function Home() {
  const [liquidKey, setLiquidKey] = useState(0);
  const [SplashCursorVisible, setSplashCursorVisible] = useState(true);

  // Restart LiquidEther every 5 minutes to prevent memory leaks
  useEffect(() => {
    const interval = setInterval(() => {
      setLiquidKey((prev) => prev + 1);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-black select-none"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* LiquidEther with key prop to force remount */}
      <div
        style={{
          position: "absolute",
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
          key={liquidKey} // This forces a complete remount
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={25}
          cursorSize={80}
          isViscous={false}
          viscous={30}
          iterationsViscous={12}
          iterationsPoisson={12}
          resolution={0.25}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Rest of your components */}
      <div style={{ position: "relative", zIndex: 3 }}>
        <FullPageNavigation />
      </div>

      <div
        className="flex items-center justify-center min-h-screen w-full"
        style={{ position: "relative", zIndex: 2 }}
      >
        <h1
          className="text-4xl sm:text-6xl text-white"
          style={{
            fontFamily: "Gliker, sans-serif",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 2,
          }}
        >
          Day in YSALI
        </h1>
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1000px", zIndex: 2 }}
      >
        <div className="w-102 h-102">
          <TiltedCard
            mediaType="cloudinary-video"
            videoSrc="https://res.cloudinary.com/djugx3lpe/video/upload/v1759017126/SnapInsta.to_AQORT37ZH8oPw7LAS72hCriOSKjdCUN2KhxGog_1R6P7Mh2nRwfPaxt0Vu6tIAOD63wSauUWc6dD3xVDLC4PmnEaeyVA-H4iKPmywUs_d5ftb9.mp4"
            altText="Cloudinary Video"
            captionText="Our Journey"
            containerHeight="400px"
            containerWidth="400px"
            imageHeight="500px"
            imageWidth="500px"
            autoplay={true}
            muted={true}
            loop={true}
            controls={false}
          />
        </div>
      </div>
    </div>
  );
}
