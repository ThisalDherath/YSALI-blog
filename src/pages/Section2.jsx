import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timelineEvents = [
  {
    id: 1,
    date: "2020",
    title: "Started Journey",
    description: "Began my journey in software development with a passion for creating innovative solutions.",
    details: "This was the beginning of my programming journey where I discovered my love for coding and problem-solving.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    date: "2021",
    title: "First Project",
    description: "Completed my first major project using React and Node.js technologies.",
    details: "Built a full-stack web application that helped me understand the fundamentals of modern web development.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    date: "2022",
    title: "University",
    description: "Enrolled in Software Engineering program at Westminster University.",
    details: "Started formal education in software engineering, learning advanced concepts and industry best practices.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    date: "2023",
    title: "Team Lead",
    description: "Became IT Team Lead at Alchemy Solutions, leading innovative projects.",
    details: "Took on leadership responsibilities, managing development teams and delivering high-quality software solutions.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    date: "2024",
    title: "AR/VR Focus",
    description: "Specialized in AR/VR technologies and machine learning applications.",
    details: "Expanded expertise into emerging technologies, working on immersive experiences and AI-powered applications.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=250&fit=crop"
  },
  {
    id: 6,
    date: "2025",
    title: "Final Year",
    description: "Entering final year with focus on innovative tech solutions.",
    details: "Currently in my final year, working on cutting-edge projects that bridge theory with practical applications.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop"
  }
];

// Mobile Vertical Timeline Component
const MobileVerticalTimeline = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-white text-4xl md:text-6xl font-black mb-4">
          My Journey
        </h2>
        <p className="text-purple-200/70 text-sm">
          Tap on cards to explore
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-purple-500 to-purple-400" />
        
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative mb-8 pl-20"
          >
            {/* Timeline node */}
            <div className="absolute left-0 top-0 w-16 h-16 rounded-full border-4 border-purple-500 bg-black flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-purple-300 font-bold text-sm">{event.date}</span>
            </div>
            
            {/* Card */}
            <div className="bg-black border-2 border-purple-400 rounded-xl shadow-2xl overflow-hidden" style={{ boxShadow: "0 10px 40px rgba(139, 92, 246, 0.4)" }}>
              {/* Image */}
              <div className="w-full h-40 overflow-hidden bg-purple-900/20">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-purple-200 text-sm mb-3 leading-relaxed">{event.description}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{event.details}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Desktop Horizontal Timeline Components
const TimelineCard = ({ event, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-black border-2 border-purple-400 rounded-xl shadow-2xl overflow-hidden"
          style={{
            minWidth: "320px",
            maxWidth: "360px",
            zIndex: 100,
            boxShadow: "0 20px 60px rgba(139, 92, 246, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.3)"
          }}
        >
          {/* Image */}
          <div className="w-full h-40 overflow-hidden bg-purple-900/20">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
              style={{ objectFit: "cover" }}
            />
          </div>
          
          {/* Content */}
          <div className="p-5">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                {event.date.slice(-2)}
              </div>
              <h3 className="text-white font-bold text-xl">{event.title}</h3>
            </div>
            <p className="text-purple-200 text-sm mb-3 leading-relaxed">{event.description}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{event.details}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TimelineEvent = ({ event, index, onHover, onLeave, hoveredId }) => {
  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => onHover(event.id)}
      onMouseLeave={() => onLeave()}
      style={{ 
        width: "clamp(300px, 25vw, 400px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        className={`
          w-20 h-20 rounded-full border-4 border-purple-500 bg-black flex items-center justify-center
          cursor-pointer transition-all duration-300 hover:scale-110 hover:border-purple-400
          relative
          ${hoveredId === event.id ? 'scale-110 border-purple-400 shadow-lg shadow-purple-500/50' : ''}
        `}
        style={{
          position: "relative",
          top: 0,
          backgroundColor: "black",
          zIndex: 20
        }}
      >
        <span className="text-purple-300 font-bold text-lg">{event.date}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
        className="absolute top-20 text-center"
        style={{ zIndex: 15 }}
      >
        <h4 className="text-white font-semibold text-base mb-1">{event.title}</h4>
        <p className="text-purple-200/70 text-sm">{event.date}</p>
      </motion.div>

      <div style={{ position: "absolute", top: "-220px", left: "50%", transform: "translateX(-50%)", zIndex: 100 }}>
        <TimelineCard event={event} isVisible={hoveredId === event.id} />
      </div>
    </div>
  );
};

const DesktopHorizontalTimeline = ({ scrollProgress, isFixed }) => {
  const [hoveredEventId, setHoveredEventId] = useState(null);
  
  const eventWidth = 350;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const startNodeSize = 40; // Half of the 80px start node
  const totalTimelineWidth = timelineEvents.length * eventWidth + 400;
  
  const maxOffset = totalTimelineWidth + (viewportWidth / 2) - startNodeSize;
  const timelineOffset = scrollProgress * maxOffset + startNodeSize;

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-center px-8 lg:px-16"
      style={{
        height: "100%",
        maxWidth: "100vw",
        paddingTop: "100px"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2
          className="text-white mb-4"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: "900",
            fontSize: "clamp(2rem, 8vw, 8rem)",
            textShadow: "0 6px 30px rgba(0,0,0,0.8)",
            letterSpacing: "-0.02em",
            lineHeight: "1.1"
          }}
        >
          My Journey
        </h2>
        <p className="text-purple-200/70 text-lg">
          Scroll down to explore • Hover over nodes to view details
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div 
        className="w-full relative"
        style={{ 
          height: "500px",
          overflow: "visible"
        }}
      >
        {/* Timeline Line */}
        <div 
          className="absolute top-1/2 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400"
          style={{
            left: '50%',
            width: `${totalTimelineWidth}px`,
            transform: `translateY(-50%) translateX(${-timelineOffset}px)`,
            transition: "transform 0.1s ease-out",
            zIndex: 5
          }}
        />
        
        {/* Start Node */}
        <div 
          className="absolute flex items-center"
          style={{
            left: '50%',
            top: '50%',
            transform: `translateY(-50%) translateX(${-timelineOffset}px)`,
            transition: "transform 0.1s ease-out",
            zIndex: 10
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-20 h-20 rounded-full border-4 border-purple-400 bg-black flex items-center justify-center shadow-lg shadow-purple-500/50"
          >
            <span className="text-purple-300 font-bold text-xs">START</span>
          </motion.div>
        </div>
        
        {/* Timeline Events Container */}
        <div 
          className="absolute flex items-center"
          style={{
            left: '50%',
            top: '50%',
            transform: `translateY(-50%) translateX(${-timelineOffset + startNodeSize}px)`,
            transition: "transform 0.1s ease-out",
            width: `${timelineEvents.length * eventWidth + 400}px`,
            zIndex: 10,
            height: "100%",
            paddingLeft: `${startNodeSize}px`
          }}
        >
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              index={index}
              onHover={setHoveredEventId}
              onLeave={() => setHoveredEventId(null)}
              hoveredId={hoveredEventId}
            />
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-12 flex items-center space-x-3"
      >
        <span className="text-purple-300 text-sm">Timeline Progress:</span>
        <div className="w-40 h-2 bg-purple-900/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
            style={{
              width: `${scrollProgress * 100}%`,
              transition: "width 0.1s ease-out"
            }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-purple-200/50 text-sm">
          Keep scrolling to move through the timeline
        </p>
      </motion.div>

      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: -1, pointerEvents: "none" }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #8B5CF6, transparent)",
              filter: "blur(20px)",
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Section2 = memo(() => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track main page scroll for desktop horizontal timeline
  useEffect(() => {
    if (isMobile) return; // Skip scroll tracking on mobile
    
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        if (!sectionRef.current) {
          ticking = false;
          return;
        }

        let container = sectionRef.current.parentElement;
        if (!container) {
          ticking = false;
          return;
        }

        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        const shouldBeFixed = scrollY >= containerTop && scrollY < (containerTop + containerHeight - windowHeight);
        
        setIsFixed(shouldBeFixed);

        if (shouldBeFixed) {
          const scrollIntoSection = scrollY - containerTop;
          const scrollRange = containerHeight - windowHeight;
          const progress = scrollRange > 0 ? Math.max(0, Math.min(1, scrollIntoSection / scrollRange)) : 0;
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMobile]);

  // Mobile view uses simple vertical timeline
  if (isMobile) {
    return (
      <section 
        ref={sectionRef}
        className="w-full min-h-screen py-12"
      >
        <MobileVerticalTimeline />
      </section>
    );
  }

  // Desktop view uses fixed horizontal scrolling timeline
  return (
    <section 
      ref={sectionRef}
      className="w-full flex items-center justify-center relative"
      style={{ 
        position: isFixed ? "fixed" : "relative",
        top: isFixed ? 0 : "auto",
        left: isFixed ? 0 : "auto",
        right: isFixed ? 0 : "auto",
        width: "100%",
        zIndex: 2,
        minHeight: "100vh",
        height: "100vh",
        maxWidth: "100vw",
        overflow: "hidden"
      }}
    >
      <DesktopHorizontalTimeline scrollProgress={scrollProgress} isFixed={isFixed} />
    </section>
  );
});

Section2.displayName = "Section2";

export default Section2;