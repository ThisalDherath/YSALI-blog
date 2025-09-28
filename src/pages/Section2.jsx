import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample timeline data - you can replace this with your actual data
const timelineEvents = [
  {
    id: 1,
    date: "2020",
    title: "Started Journey",
    description: "Began my journey in software development with a passion for creating innovative solutions.",
    details: "This was the beginning of my programming journey where I discovered my love for coding and problem-solving."
  },
  {
    id: 2,
    date: "2021",
    title: "First Project",
    description: "Completed my first major project using React and Node.js technologies.",
    details: "Built a full-stack web application that helped me understand the fundamentals of modern web development."
  },
  {
    id: 3,
    date: "2022",
    title: "University",
    description: "Enrolled in Software Engineering program at Westminster University.",
    details: "Started formal education in software engineering, learning advanced concepts and industry best practices."
  },
  {
    id: 4,
    date: "2023",
    title: "Team Lead",
    description: "Became IT Team Lead at Alchemy Solutions, leading innovative projects.",
    details: "Took on leadership responsibilities, managing development teams and delivering high-quality software solutions."
  },
  {
    id: 5,
    date: "2024",
    title: "AR/VR Focus",
    description: "Specialized in AR/VR technologies and machine learning applications.",
    details: "Expanded expertise into emerging technologies, working on immersive experiences and AI-powered applications."
  },
  {
    id: 6,
    date: "2025",
    title: "Final Year",
    description: "Entering final year with focus on innovative tech solutions.",
    details: "Currently in my final year, working on cutting-edge projects that bridge theory with practical applications."
  }
];

const TimelineCard = ({ event, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-black/90 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 shadow-2xl"
          style={{
            minWidth: "280px",
            maxWidth: "320px",
            zIndex: 50
          }}
        >
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm mr-3">
              {event.date.slice(-2)}
            </div>
            <h3 className="text-white font-semibold text-lg">{event.title}</h3>
          </div>
          <p className="text-purple-200 text-sm mb-2">{event.description}</p>
          <p className="text-gray-300 text-xs leading-relaxed">{event.details}</p>
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
      onMouseLeave={onLeave}
      style={{ 
        width: "400px", // Fixed width for consistent spacing
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {/* Timeline dot with date - positioned to intersect with the line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        className={`
          w-20 h-20 rounded-full border-4 border-purple-500 bg-black flex items-center justify-center
          cursor-pointer transition-all duration-300 hover:scale-110 hover:border-purple-400
          relative z-20
          ${hoveredId === event.id ? 'scale-110 border-purple-400 shadow-lg shadow-purple-500/50' : ''}
        `}
        style={{
          // Circle is positioned to be exactly in the center, intersecting the line
          position: "relative",
          top: 0,
          backgroundColor: "black" // Ensure circle has solid background to cut through line
        }}
      >
        <span className="text-purple-300 font-bold text-lg">{event.date}</span>
      </motion.div>

      {/* Event title positioned below the circle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
        className="absolute top-24 text-center"
        style={{ zIndex: 15 }}
      >
        <h4 className="text-white font-semibold text-base mb-2">{event.title}</h4>
        <p className="text-purple-200/70 text-sm">{event.date}</p>
      </motion.div>

      {/* Hover card positioned above the circle */}
      <div style={{ position: "absolute", top: "-140px", left: "50%", transform: "translateX(-50%)" }}>
        <TimelineCard event={event} isVisible={hoveredId === event.id} />
      </div>
    </div>
  );
};

const Section2 = memo(() => {
  const [timelineOffset, setTimelineOffset] = useState(0);
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current.parentElement; // The 200vh container
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if we're in the timeline scroll zone
      if (containerRect.top <= 0 && containerRect.bottom > windowHeight) {
        // We're in the sticky zone - calculate scroll progress
        const scrolledIntoView = Math.abs(containerRect.top);
        const totalScrollDistance = containerRect.height - windowHeight;
        const scrollProgress = Math.min(1, scrolledIntoView / totalScrollDistance);

        // Calculate timeline movement (move from left to right)
        const maxTimelineScroll = (timelineEvents.length - 1) * 400;
        const newOffset = scrollProgress * maxTimelineScroll;
        
        setTimelineOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center relative"
      style={{ 
        
        
        position: "sticky",
        top: 0,
        zIndex: 2
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "Gliker, sans-serif",
              fontWeight: "900",
              fontSize: "clamp(3rem, 6vw, 8rem)",
              textShadow: "0 6px 30px rgba(0,0,0,0.8)",
              letterSpacing: "-0.02em",
              
             
              lineHeight: "1.1"
            }}
          >
            My Journey
          </h2>
          <p className="text-purple-200/70 text-lg">Scroll to explore the timeline</p>
        </motion.div>

        {/* Horizontal Timeline Container */}
        <div className="w-full relative overflow-hidden h-96">
          {/* Starting Circle - positioned at the left edge, centered on line */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20"
          >
            <div className="w-24 h-24 rounded-full border-4 border-purple-400 bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-white font-bold text-sm">START</span>
            </div>
          </motion.div>
          
          {/* Extended Timeline Line - goes beyond screen to the right */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400"
            style={{
              left: '0', // Starts from left edge
              width: `calc(100vw + ${timelineEvents.length * 400 + 400}px)`, // Extends beyond right edge
              zIndex: 5
            }}
          />
          
          {/* Timeline Events Container */}
          <div className="w-full h-full relative">
            <motion.div
              className="absolute flex items-center"
              style={{
                left: `${200 - timelineOffset}px`, // Start from left side (200px from edge), move right by subtracting offset
                top: '50%',
                transform: 'translateY(-50%)',
                width: `${timelineEvents.length * 400 + 400}px`, // Container width
                zIndex: 10
              }}
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
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
            </motion.div>
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
                width: `${Math.min(100, (timelineOffset / ((timelineEvents.length - 1) * 400)) * 100)}%`
              }}
            />
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-purple-200/50 text-sm">
            Scroll to move through the timeline horizontally
          </p>
        </motion.div>

        {/* Background Decorative Elements */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ zIndex: -1, pointerEvents: "none" }}
        >
          {/* Animated background orbs */}
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
    </section>
  );
});

Section2.displayName = "Section2";

export default Section2;