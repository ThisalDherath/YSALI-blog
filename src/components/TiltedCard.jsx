import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  // Media source props
  mediaType = 'image', // 'image', 'youtube', 'cloudinary-video'
  imageSrc,
  videoSrc, 
  youtubeId, 
  altText = 'Our Journey',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  
  // Video-specific props
  autoplay = true,
  muted = true,
  loop = true,
  controls = false
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  const renderMedia = () => {
    const commonStyles = {
      width: '100%',
      height: '100%'
    };

    if (mediaType === 'youtube' && youtubeId) {
      const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?${autoplay ? 'autoplay=1&' : ''}${muted ? 'mute=1&' : ''}${loop ? `loop=1&playlist=${youtubeId}&` : ''}${controls ? '' : 'controls=0&'}modestbranding=1&rel=0`;
      
      return (
        <iframe
          src={youtubeUrl}
          title={altText}
          className="absolute top-0 left-0 w-full h-full rounded-[15px] will-change-transform [transform:translateZ(0)]"
          style={commonStyles}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (mediaType === 'cloudinary-video' && videoSrc) {
      return (
        <video
          src={videoSrc}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
          style={commonStyles}
        />
      );
    }

    // Default to image
    return (
      <img
        src={imageSrc}
        alt={altText}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
        style={commonStyles}
      />
    );
  };

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden text-white">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        {renderMedia()}

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}