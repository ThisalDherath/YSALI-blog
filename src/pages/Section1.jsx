import React, { useState, useEffect, memo } from "react";
import TiltedCard from "../components/TiltedCard";

const Section1 = memo(() => {
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

  // Memoized TiltedCard props to prevent unnecessary re-renders
  const cardProps = {
    mediaType: "cloudinary-video",
    videoSrc: "https://res.cloudinary.com/djugx3lpe/video/upload/v1759017126/SnapInsta.to_AQORT37ZH8oPw7LAS72hCriOSKjdCUN2KhxGog_1R6P7Mh2nRwfPaxt0Vu6tIAOD63wSauUWc6dD3xVDLC4PmnEaeyVA-H4iKPmywUs_d5ftb9.mp4",
    altText: "Cloudinary Video",
    captionText: "Our Journey",
    autoplay: true,
    muted: true,
    loop: true,
    controls: false,
  };

  const handleButtonClick = () => {
    // Add your navigation logic here
    console.log("Discover button clicked");
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
        
        {/* Desktop/Laptop Card Container */}
        {!isMobile && (
          <div 
            className="absolute"
            style={{ 
              perspective: "1000px",
              zIndex: 1,
              pointerEvents: "auto",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <TiltedCard
              {...cardProps}
              containerHeight="600px"
              containerWidth="600px"
              imageHeight="600px"
              imageWidth="700px"
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
            <div className="flex flex-col">
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
                    onClick={handleButtonClick}
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
                      {...cardProps}
                      containerHeight="450px"
                      containerWidth="350px"
                      imageHeight="450px"
                      imageWidth="400px"
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
                    onClick={handleButtonClick}
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
    </section>
  );
});

Section1.displayName = "Section1";

export default Section1;