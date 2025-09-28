import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DomeGallery from '../components/DomeGallery';

// LoadingPage Component
const words = ["Hello", "ආයුබෝවන්", "வணக்கம்", "नमस्ते", "নমস্কার", "नमस्कार", "السلام علیکم", "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "કુશળ મંગળ", "नमस्कार"];

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.55,
    transition: {
      duration: 1,
      delay: 0.2
    },
  },
};

const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2
    },
  },
};

const LoadingPage = ({ onLoadingComplete }) => {
  const [index, setIndex] = React.useState(0);
  const [dimension, setDimension] = React.useState({ width: 0, height: 0 });
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  React.useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onLoadingComplete && onLoadingComplete();
        }, 1000);
      }, 1000);
      return;
    }

    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index === 0 ? 1000 : 150
    );
  }, [index, onLoadingComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1]
      },
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.3
      },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black z-50"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="flex items-center text-[#ffffff] text-4xl md:text-5xl lg:text-6xl absolute z-10 font-medium"
            style={{
              top: dimension.width < 768 ? '45%' : '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-black drop-shadow-2xl">
              {words[index]}
            </h1>
          </motion.p>
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path
              variants={curve}
              initial="initial"
              animate={isExiting ? "exit" : "initial"}
              fill="#0f0f0fff"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default LoadingPage;