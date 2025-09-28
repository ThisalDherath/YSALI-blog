import React, { useState, useEffect } from "react";
import FullPageNavigation from "../components/navbar";
import LiquidEther from "../components/LiquidEther";
import TiltedCard from "../components/TiltedCard";

export default function Home() {
  const [liquidKey, setLiquidKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLaptop(width >= 768 && width < 1600);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Restart LiquidEther every 5 minutes to prevent memory leaks
  useEffect(() => {
    const interval = setInterval(() => {
      setLiquidKey((prev) => prev + 1);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-black select-none"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* LiquidEther Background */}
      <div
        style={{
          position: "absolute",
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

      {/* Navigation */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <FullPageNavigation />
      </div>

      {/* Main Content Container */}
      <div
        className="flex items-center justify-center min-h-screen w-full"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
          
          {/* Card Container - Position varies by screen size */}
          {!isMobile && (
            <div 
              className="absolute"
              style={{ 
                perspective: "1000px",
                zIndex: 1,
                pointerEvents: "auto",
                left: isLaptop ? "50%" : "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
              }}
            >
              <TiltedCard
                mediaType="cloudinary-video"
                videoSrc="https://res.cloudinary.com/djugx3lpe/video/upload/v1759017126/SnapInsta.to_AQORT37ZH8oPw7LAS72hCriOSKjdCUN2KhxGog_1R6P7Mh2nRwfPaxt0Vu6tIAOD63wSauUWc6dD3xVDLC4PmnEaeyVA-H4iKPmywUs_d5ftb9.mp4"
                altText="Cloudinary Video"
                captionText="Our Journey"
                containerHeight={isLaptop ? "600px" : "600px"}
                containerWidth={isLaptop ? "600px" : "600px"}
                imageHeight={isLaptop ? "600px" : "600px"}
                imageWidth={isLaptop ? "700px" : "700px"}
                autoplay={true}
                muted={true}
                loop={true}
                controls={false}
                disableTilt={false}
              />
            </div>
          )}

          {/* Content Wrapper */}
          <div 
            className="relative w-full"
            style={{ 
              zIndex: 5,
              pointerEvents: "none"
            }}
          >
            {/* Desktop/Laptop Layout */}
            {!isMobile && (
              <div 
                className="flex flex-col"
              >
                <h1
                  className="text-white"
                  style={{
                    fontFamily: "Gliker, sans-serif",
                    fontWeight: "900",
                    textShadow: "0 6px 30px rgba(0,0,0,0.8)",
                    letterSpacing: "-0.02em",
                    pointerEvents: "none"
                  }}
                >
                  {/* First line - "stories" with left margin */}
                  <div 
                    className="leading-[0.85]"
                    style={{ 
                      marginLeft: isLaptop ? "30rem" : "40rem",
                      fontSize: isLaptop ? "9rem" : "11rem",
                      pointerEvents: "none"
                    }}
                  >
                    stories
                  </div>
                  
                  {/* Second line - "through" with button on same line */}
                  <div 
                    className="flex items-center justify-between leading-[0.85]"
                    style={{ 
                      pointerEvents: "none"
                    }}
                  >
                    <div 
                      style={{ 
                        marginLeft: isLaptop ? "20rem" : "27rem",
                        fontSize: isLaptop ? "9rem" : "11rem",
                        pointerEvents: "none"
                      }}
                    >
                      through
                    </div>
                    
                    <button
                      className="px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 ml-4 whitespace-nowrap"
                      style={{
                        background: "linear-gradient(135deg, #FFD700, #FFA500)",
                        color: "#000",
                        boxShadow: "0 4px 20px rgba(255, 215, 0, 0.4)",
                        pointerEvents: "auto",
                        marginRight: isLaptop ? "10rem" : "20rem"
                      }}
                    >
                      Discover our journey
                    </button>
                  </div>

                  {/* Third line - "experience" heavily indented */}
                  <div 
                    className="leading-[0.85]"
                    style={{ 
                      marginLeft: isLaptop ? "35rem" : "35rem",
                      fontSize: isLaptop ? "9rem" : "11rem",
                      backgroundClip: "text",
                      pointerEvents: "none"
                    }}
                  >
                    experience
                  </div>
                </h1>
              </div>
            )}

            {/* Mobile Layout - Centered with text over card */}
            {isMobile && (
              <div className="flex flex-col items-center justify-center text-center px-6">
                <div className="relative flex items-center justify-center">
                  {/* Card with rounded corners wrapper */}
                  <div 
                    className="rounded-3xl overflow-hidden"
                    style={{ 
                      zIndex: 1,
                      pointerEvents: "auto",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <div style={{ transform: "scale(1.3)", transformOrigin: "center" }}>
                      <TiltedCard
                        mediaType="cloudinary-video"
                        videoSrc="https://res.cloudinary.com/djugx3lpe/video/upload/v1759017126/SnapInsta.to_AQORT37ZH8oPw7LAS72hCriOSKjdCUN2KhxGog_1R6P7Mh2nRwfPaxt0Vu6tIAOD63wSauUWc6dD3xVDLC4PmnEaeyVA-H4iKPmywUs_d5ftb9.mp4"
                        altText="Cloudinary Video"
                        captionText="Our Journey"
                        containerHeight="450px"
                        containerWidth="350px"
                        imageHeight="450px"
                        imageWidth="400px"
                        autoplay={true}
                        muted={true}
                        loop={true}
                        controls={false}
                        disableTilt={true}
                      />
                    </div>
                  </div>

                  {/* Text overlay on card */}
                  <div 
                    className="absolute"
                    style={{
                      zIndex: 3,
                      pointerEvents: "none"
                    }}
                  >
                    <h1
                      className="text-white"
                      style={{
                        fontFamily: "Gliker, sans-serif",
                        fontWeight: "900",
                        textShadow: "0 6px 30px rgba(0,0,0,0.8)",
                        letterSpacing: "-0.02em",
                        pointerEvents: "none"
                      }}
                    >
                      <div className="text-6xl leading-tight mb-0">
                        conversion
                      </div>
                      <div className="text-6xl leading-tight mb-0">
                        through
                      </div>
                      <div 
                        className="text-6xl leading-tight mb-4"
                        style={{ 
                          background: "linear-gradient(135deg, #FFD700, #FFA500)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        immersion
                      </div>
                    </h1>
                    
                    {/* Button below text, still over card */}
                    <button
                      className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #FFD700, #FFA500)",
                        color: "#000",
                        boxShadow: "0 4px 20px rgba(255, 215, 0, 0.4)",
                        pointerEvents: "auto"
                      }}
                    >
                      Discover what we do
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div
        className="hidden md:block absolute bottom-8 left-8"
        style={{ zIndex: 5 }}
      >
        <div
          className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center animate-bounce"
        >
          <svg
            className="w-6 h-6 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}