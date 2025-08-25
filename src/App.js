import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import DashboardPanel from './components/DashboardPanel';
import DetailInfoPanel from './components/DetailInfoPanel';

function App() {
  const containerRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Check if animation is complete
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      setIsAnimationComplete(progress >= 0.8);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // ... existing transform values remain the same ...
  const sectionBTranslateX = useTransform(scrollYProgress, [0, 0.8], ['5%', '0%']);
  const sectionBTranslateY = useTransform(scrollYProgress, [0, 0.8], ['-15%', '0%']);
  const sectionBRotateX = useTransform(scrollYProgress, [0, 0.8], [20, 0]);
  const sectionBRotateY = useTransform(scrollYProgress, [0, 0.8], [-20, 0]);
  const sectionBRotateZ = useTransform(scrollYProgress, [0, 0.8], [5, 0]);
  const sectionBScale = useTransform(scrollYProgress, [0, 0.8], [0.8, 1]);

  const sectionBRight = useTransform(scrollYProgress, [0, 0.8], ['-10%', '0%']);
  const sectionBWidth = useTransform(scrollYProgress, [0, 0.8], ['70%', '100%']);

  const sectionAScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
  const sectionAOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sectionAWidth = useTransform(scrollYProgress, [0, 0.6], ['55%', '10%']);

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 0]);

  const dashboardBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.8],
    ['1.5rem', '0rem']
  );

  const controls = {
    sectionAWidth: '55%',
    sectionB: {
      translateZ: '0px',
      perspective: '1500px',
      originX: 'center',
      originY: 'center',
      opacity: 1,
      width: '70%',
    },
    overlay: {
      color: 'rgba(0,0,0,0.9)',
      angle: '70deg',
    },
    shadow: {
      opacity: 1,
      blur: '2px',
      spread: '100px',
      distance: '40px',
      color: 'rgba(0,0,0,0.9)',
    },
    animation: {
      breathingDuration: 3,
      breathingGlowIntensity: '20px',
    },
    panels: {
      gap: '1.5rem',
      borderRadius: '1.5rem',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: '1px',
      backgroundColor: '#1a1a1a',
      containerBackground: '#141414',
      glassEffect: {
        opacity: 0.1,
        blur: '12px',
      }
    },
    // New hover overlay controls
    hoverOverlay: {
      opacity: 0.7, // Controllable opacity (0-1)
      color: 'rgba(0, 0, 0, 1)' // Controllable color
    }
  };

  const breathingAnimation = {
    scale: [1, 1.1, 1],
    textShadow: [
      `0 0 0px #a855f7`,
      `0 0 ${controls.animation.breathingGlowIntensity} #a855f7`,
      `0 0 0px #a855f7`
    ],
    transition: {
      duration: controls.animation.breathingDuration,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const handlePanelHover = (index, event, isEntering) => {
    if (!isAnimationComplete) return;

    if (isEntering) {
      const rect = event.currentTarget.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Detail panel dimensions
      const detailPanelWidth = 320;
      const detailPanelHeight = 280; // Approximate height
      const margin = 20; // Margin from edges and hovered panel

      // Calculate available space on all sides
      const spaceLeft = rect.left;
      const spaceRight = viewportWidth - rect.right;
      const spaceTop = rect.top;
      const spaceBottom = viewportHeight - rect.bottom;

      let x, y, position;

      // Determine best horizontal position
      if (spaceRight >= detailPanelWidth + margin) {
        // Show on right side
        x = rect.right + margin;
        position = 'right';
      } else if (spaceLeft >= detailPanelWidth + margin) {
        // Show on left side
        x = rect.left - detailPanelWidth - margin;
        position = 'left';
      } else {
        // Not enough horizontal space, try vertical positioning
        if (spaceBottom >= detailPanelHeight + margin) {
          // Show below
          x = Math.max(margin, Math.min(rect.left, viewportWidth - detailPanelWidth - margin));
          y = rect.bottom + margin;
          position = 'bottom';
        } else if (spaceTop >= detailPanelHeight + margin) {
          // Show above
          x = Math.max(margin, Math.min(rect.left, viewportWidth - detailPanelWidth - margin));
          y = rect.top - detailPanelHeight - margin;
          position = 'top';
        } else {
          // Fallback: show on the side with more space, allow some overlap if necessary
          if (spaceRight >= spaceLeft) {
            x = Math.min(rect.right + margin, viewportWidth - detailPanelWidth - margin);
            position = 'right';
          } else {
            x = Math.max(margin, rect.left - detailPanelWidth - margin);
            position = 'left';
          }
        }
      }

      // For left/right positioning, center vertically within viewport constraints
      if (position === 'left' || position === 'right') {
        const preferredY = rect.top + (rect.height - detailPanelHeight) / 2;
        y = Math.max(margin, Math.min(preferredY, viewportHeight - detailPanelHeight - margin));
      }

      setHoverPosition({
        x,
        y,
        position,
        panelRect: rect
      });
      setHoveredPanel(index);
    } else {
      setHoveredPanel(null);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky container that stays in view during scroll */}
      <div className="sticky top-0 h-screen w-screen bg-gray-100 overflow-hidden">
        {/* Section A - Hero */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-white flex items-center justify-center z-30"
          style={{
            width: sectionAWidth,
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
            filter: `drop-shadow(${controls.shadow.distance} 0 ${controls.shadow.blur} ${controls.shadow.color})`,
            scale: sectionAScale,
            opacity: sectionAOpacity,
            willChange: 'transform, opacity',
          }}
          transition={{ ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-bold px-12 -translate-x-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Create your{' '}
            <motion.span
              className="text-purple-500 inline-block"
              animate={breathingAnimation}
            >
              amazing
            </motion.span>{' '}
            website today
          </motion.h1>
        </motion.div>

        {/* Section B - Dashboard */}
        <motion.div
          className="absolute top-0 h-full z-10"
          style={{
            width: sectionBWidth,
            right: sectionBRight,
            perspective: controls.sectionB.perspective,
            willChange: 'transform',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              x: sectionBTranslateX,
              y: sectionBTranslateY,
              rotateX: sectionBRotateX,
              rotateY: sectionBRotateY,
              rotateZ: sectionBRotateZ,
              scale: sectionBScale,
              transformOrigin: `${controls.sectionB.originX} ${controls.sectionB.originY}`,
              opacity: controls.sectionB.opacity,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            transition={{ ease: "easeOut" }}
          >
            {/* Dashboard Grid Container with dynamic border radius */}
            <motion.div
              className="w-full h-full p-6"
              style={{
                display: 'grid',
                gridTemplateRows: 'auto repeat(3, 1fr) auto',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: controls.panels.gap,
                maxHeight: '100vh',
                backgroundColor: controls.panels.containerBackground,
                boxShadow: '0 0 50px rgba(0,0,0,0.3)',
                borderRadius: dashboardBorderRadius,
                willChange: 'border-radius',
                transform: 'translateZ(0)',
              }}
            >
              {[...Array(6)].map((_, index) => (
                <DashboardPanel
                  key={index}
                  index={index}
                  panelControls={controls.panels}
                  onHover={handlePanelHover}
                  isAnimationComplete={isAnimationComplete}
                  isHovered={hoveredPanel === index}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
          style={{
            background: `linear-gradient(${controls.overlay.angle}, 
              transparent 45%, 
              ${controls.overlay.color} 85%)`,
            opacity: overlayOpacity,
            willChange: 'opacity',
          }}
        />

        {/* Hover Overlay - covers entire dashboard area when hovering */}
        {hoveredPanel !== null && isAnimationComplete && (
          <motion.div
            className="absolute top-0 h-full z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: controls.hoverOverlay.opacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: sectionBWidth,
              right: sectionBRight,
              backgroundColor: controls.hoverOverlay.color,
              transform: `
                translateX(${sectionBTranslateX}) 
                translateY(${sectionBTranslateY}) 
                rotateX(${sectionBRotateX}deg) 
                rotateY(${sectionBRotateY}deg) 
                rotateZ(${sectionBRotateZ}deg) 
                scale(${sectionBScale})
              `,
              transformOrigin: `${controls.sectionB.originX} ${controls.sectionB.originY}`,
              perspective: controls.sectionB.perspective,
              borderRadius: dashboardBorderRadius,
            }}
          />
        )}

        {/* Detail Info Panel */}
        {hoveredPanel !== null && isAnimationComplete && (
          <DetailInfoPanel
            panelIndex={hoveredPanel}
            position={hoverPosition}
          />
        )}
      </div>

      {/* Much longer spacer div to ensure animation completes fully */}
      <div className="h-[500vh] bg-transparent" />

      {/* Optional: Content after the animation */}
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">More Content Below</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            This section appears after the scroll animation completes. You can add more content here.
          </p>
        </div>
      </div>

      {/* Global styles to hide scrollbars */}
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
        
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        
        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default App;