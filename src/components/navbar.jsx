import React, { useState } from "react";

// Full Page Navigation Component
const FullPageNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const toggleNav = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsOpen(!isOpen);

      // Reset animation state after transition completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 1600);
    }
  };

  const navItems = [
    { id: 1, name: "work", badge: null },
    { id: 2, name: "solutions", badge: null },
    { id: 3, name: "about us", badge: null },
    { id: 4, name: "insights", badge: null },
    { id: 5, name: "careers", badge: null },
    { id: 6, name: "contact", badge: null },
  ];

  return (
    <>
      {/* Header with Logo and Menu Button */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between items-center bg-transparent">
        <div
          className="text-2xl sm:text-3xl font-bold text-purple-500"
          style={{ fontFamily: "Gliker, sans-serif" }}
        >
          YSALI
        </div>

        {/* Menu Button */}
        <button
          onClick={toggleNav}
          className="relative w-12 h-12 sm:w-14 sm:h-14 flex flex-col justify-center items-center group focus:outline-none rounded-full bg-purple-500 overflow-hidden"
          aria-label="Toggle navigation"
        >
          {/* Background color animation layers */}
          <div className="absolute inset-0 bg-transparent transition-all duration-300 ease-out group-hover:bg-green-200 group-hover:translate-y-0 translate-y-full" 
               style={{ transitionDelay: '0ms' }} />
          <div className="absolute inset-0 bg-transparent transition-all duration-300 ease-out group-hover:bg-yellow-200 group-hover:translate-y-0 translate-y-full" 
               style={{ transitionDelay: '200ms' }} />
          <div className="absolute inset-0 bg-transparent transition-all duration-300 ease-out group-hover:bg-purple-500 group-hover:translate-y-0 translate-y-full" 
               style={{ transitionDelay: '300ms' }} />
          
          <span
            className={`relative z-10 block w-5 sm:w-6 h-0.5 bg-gray-800 transition-all duration-500 ease-out ${
              isOpen ? "rotate-45 translate-y-0.5" : ""
            }`}
          />
          <span
            className={`relative z-10 block w-5 sm:w-6 h-0.5 bg-gray-800 transition-all duration-500 ease-out mt-1 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`relative z-10 block w-5 sm:w-6 h-0.5 bg-gray-800 transition-all duration-500 ease-out mt-1 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </header>

      {/* Full Page Navigation Overlay with Curved Bottom Edge */}
      <div
        className={`fixed inset-0 z-40 bg-gray-50 ${
          isOpen ? "" : "pointer-events-none"
        }`}
        style={{
          clipPath: isOpen
            ? "ellipse(150% 120% at 50% 0%)"
            : "ellipse(0% 0% at 50% 0%)",
          transition: "clip-path 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Secondary layer to fill the complete screen after curved animation */}
        <div
          className="absolute inset-0 bg-gray-50"
          style={{
            clipPath: isOpen
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: "clip-path 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: isOpen ? "800ms" : "0ms",
          }}
        />

        {/* Mobile Layout - Stack vertically */}
        <div className="flex flex-col md:flex-row h-full px-4 sm:px-6">
          {/* Navigation - Top on mobile, Right on desktop */}
          <div className="flex-1 flex flex-col justify-center items-center md:order-2">
            <nav className="text-center md:text-right w-full">
              {navItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`mb-1 sm:mb-2 transition-all duration-800 ease-out ${
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${500 + index * 100}ms` : "0ms",
                  }}
                >
                  <div
                    className="group relative inline-flex items-center justify-center md:justify-end cursor-pointer w-full"
                    onMouseEnter={() => setActiveItem(item.id)}
                    onMouseLeave={() => setActiveItem(null)}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Text with individual letter spans and weaving line effect */}
                    <div className="relative flex items-center">
                      <span
                        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-900 mr-2 sm:mr-4 flex relative"
                        style={{ fontFamily: "Gliker, sans-serif" }}
                      >
                        {/* Animated line that weaves through letters - only visible and animates on hover */}
                        <div className="absolute top-1/2 left-0 w-full h-3 sm:h-4 mt-2 transform -translate-y-1/2 overflow-hidden z-20">
                          {/* Main purple line - always visible when active */}
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div
                              className={`absolute top-0 left-0 w-full h-2 sm:h-3 bg-purple-500 transform transition-transform duration-500 ease-out ${
                                activeItem === item.id
                                  ? "translate-x-0"
                                  : "-translate-x-full"
                              }`}
                            ></div>
                          </div>
                        </div>
                        {item.name.split("").map((letter, idx) => (
                          <span
                            key={idx}
                            className={`relative transition-all duration-300 ${
                              idx % 2 === 0 ? "z-30" : "z-10"
                            }`}
                            style={{
                              transform:
                                activeItem === item.id
                                  ? "translateY(-1px) sm:translateY(-2px)"
                                  : "none",
                            }}
                          >
                            {letter}
                          </span>
                        ))}
                      </span>

                      {/* Badge */}
                      {item.badge && (
                        <span className="ml-1 sm:ml-2 md:ml-3 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-teal-400 text-gray-900 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold group-hover:bg-teal-300 transition-colors duration-300 relative z-30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Contact Info - Bottom on mobile, Left on desktop */}
          <div className="flex-1 flex flex-col justify-end md:justify-center md:order-1 pb-8 md:pb-0">
            <div
              className={`transition-all duration-700 ease-out text-center md:text-left ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                fontFamily: "Gliker, sans-serif",
                transitionDelay: isOpen ? "400ms" : "0ms",
              }}
            >
              <div className="text-purple-400 text-xs sm:text-sm mb-2">
                GET IN TOUCH
              </div>
              <a
                href="mailto:hello@poppr.be"
                className="block text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-purple-500 transition-colors duration-300 mb-1 sm:mb-2"
              >
                hello@poppr.be
              </a>
              <a
                href="tel:+32093353333"
                className="block text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-purple-500 transition-colors duration-300 mb-2 sm:mb-4"
              >
                +32 (0)9 335 33 33
              </a>
              <div className="text-gray-600 text-sm sm:text-base">
                <div>Stapelplein 70/303</div>
                <div>9000 Ghent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPageNavigation;