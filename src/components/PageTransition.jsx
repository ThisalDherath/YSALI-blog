import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const [dimension, setDimension] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  } L0 0`;
  
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const slideUp = {
    initial: {
      top: 0,
    },
    animate: {
      top: "-100vh",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      },
      transitionEnd: {
        top: "100vh",
      },
    },
    exit: {
      top: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const curve = {
    initial: {
      d: initialPath,
    },
    animate: {
      d: targetPath,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.3,
      },
    },
    exit: {
      d: initialPath,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <>
      {children}
      <motion.div
        variants={slideUp}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#0f0f0f] pointer-events-none z-50"
      >
        {dimension.width > 0 && (
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path
              variants={curve}
              initial="initial"
              animate="animate"
              exit="exit"
              fill="#0f0f0f"
            />
          </svg>
        )}
      </motion.div>
    </>
  );
};

export default PageTransition;