import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import DashboardPanel from './components/DashboardPanel';
import DetailInfoPanel from './components/DetailInfoPanel';

function App() {
  const containerRef = useRef(null);
  const dashboardRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [hoveredPanelRect, setHoveredPanelRect] = useState(null);

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

  // Dynamic border radius for dashboard
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
      borderRadius: '1.5rem', // Keep panels with fixed rounded corners
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
      const dashboardRect = dashboardRef.current?.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate panel position relative to dashboard container
      if (dashboardRect) {
        const relativeRect = {
          left: rect.left - dashboardRect.left,
          top: rect.top - dashboardRect.top,
          right: rect.right - dashboardRect.left,
          bottom: rect.bottom - dashboardRect.top,
          width: rect.width,
          height: rect.height
        };
        setHoveredPanelRect(relativeRect);
      }

      // Detail panel dimensions
      const detailPanelWidth = 320;
      const detailPanelHeight = 280;
      const margin = 20;

      // Calculate available space on all sides
      const spaceLeft = rect.left;
      const spaceRight = viewportWidth - rect.right;
      const spaceTop = rect.top;
      const spaceBottom = viewportHeight - rect.bottom;

      let x, y, position;

      // Determine best horizontal position
      if (spaceRight >= detailPanelWidth + margin) {
        x = rect.right + margin;
        position = 'right';
      } else if (spaceLeft >= detailPanelWidth + margin) {
        x = rect.left - detailPanelWidth - margin;
        position = 'left';
      } else {
        if (spaceBottom >= detailPanelHeight + margin) {
          x = Math.max(margin, Math.min(rect.left, viewportWidth - detailPanelWidth - margin));
          y = rect.bottom + margin;
          position = 'bottom';
        } else if (spaceTop >= detailPanelHeight + margin) {
          x = Math.max(margin, Math.min(rect.left, viewportWidth - detailPanelWidth - margin));
          y = rect.top - detailPanelHeight - margin;
          position = 'top';
        } else {
          if (spaceRight >= spaceLeft) {
            x = Math.min(rect.right + margin, viewportWidth - detailPanelWidth - margin);
            position = 'right';
          } else {
            x = Math.max(margin, rect.left - detailPanelWidth - margin);
            position = 'left';
          }
        }
      }

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
      setHoveredPanelRect(null);
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
              ref={dashboardRef}
              className="w-full h-full p-6 relative"
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

              {/* Hover Overlay with hole cut out for hovered panel */}
              {hoveredPanel !== null && isAnimationComplete && hoveredPanelRect && (
                <>
                  {/* Four overlay rectangles around the hovered panel */}
                  {/* Top overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: controls.hoverOverlay.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      backgroundColor: controls.hoverOverlay.color,
                      clipPath: `polygon(0 0, 100% 0, 100% ${hoveredPanelRect.top}px, 0 ${hoveredPanelRect.top}px)`
                    }}
                  />

                  {/* Bottom overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: controls.hoverOverlay.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      backgroundColor: controls.hoverOverlay.color,
                      clipPath: `polygon(0 ${hoveredPanelRect.bottom}px, 100% ${hoveredPanelRect.bottom}px, 100% 100%, 0 100%)`
                    }}
                  />

                  {/* Left overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: controls.hoverOverlay.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      backgroundColor: controls.hoverOverlay.color,
                      clipPath: `polygon(0 ${hoveredPanelRect.top}px, ${hoveredPanelRect.left}px ${hoveredPanelRect.top}px, ${hoveredPanelRect.left}px ${hoveredPanelRect.bottom}px, 0 ${hoveredPanelRect.bottom}px)`
                    }}
                  />

                  {/* Right overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: controls.hoverOverlay.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      backgroundColor: controls.hoverOverlay.color,
                      clipPath: `polygon(${hoveredPanelRect.right}px ${hoveredPanelRect.top}px, 100% ${hoveredPanelRect.top}px, 100% ${hoveredPanelRect.bottom}px, ${hoveredPanelRect.right}px ${hoveredPanelRect.bottom}px)`
                    }}
                  />

                  {/* Corner overlays to handle the rounded corners */}
                  {/* Top-left corner */}
                  <motion.div
                    className="absolute pointer-events-none z-31"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: controls.hoverOverlay.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      left: hoveredPanelRect.left,
                      top: hoveredPanelRect.top,
                      width: parseFloat(controls.panels.borderRadius) * 16,
                      height: parseFloat(controls.panels.borderRadius) * 16,
                      backgroundColor: controls.hoverOverlay.color,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                      maskImage: `radial-gradient(circle at bottom right, transparent ${parseFloat(controls.panels.borderRadius) * 16}px, black ${parseFloat(controls.panels.borderRadius) * 16}px)`,
                      WebkitMaskImage: `radial-gradient(circle at bottom right, transparent ${parseFloat(controls.panels.borderRadius) * 16}px, black ${parseFloat(controls.panels.borderRadius) * 16}px)`
                    }}
                  />

                  {/* Top-right corner */}
                  <motion.div
                    className="absolute pointer-events-none z-31"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: controls.hoverOverlay.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      left: hoveredPanelRect.right - parseFloat(controls.panels.borderRadius) * 16,
                      top: hoveredPanelRect.top,
                      width: parseFloat(controls.panels.borderRadius) * 16,
                      height: parseFloat(controls.panels.borderRadius) * 16,
                      backgroundColor: controls.hoverOverlay.color,
                      maskImage: `radial-gradient(circle at bottom left, transparent ${parseFloat(controls.panels.borderRadius) * 16}px, black ${parseFloat(controls.panels.borderRadius) * 16}px)`,
                      WebkitMaskImage: `radial-gradient(circle at bottom left, transparent ${parseFloat(controls.panels.borderRadius) * 16}px, black ${parseFloat(controls.panels.borderRadius) * 16}px)`
                    }}
                  />

                  {/* Bottom-left corner */}
                  <motion.div
                    className="absolute pointer-events-none z-31"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: controls.hoverOverlay.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      left: hoveredPanelRect.left,
                      top: hoveredPanelRect.bottom - parseFloat(controls.panels.borderRadius) * 16,
                      width: parseFloat(controls.panels.borderRadius) * 16,
                      height: parseFloat(controls.panels.borderRadius) * 16,
                      backgroundColor: controls.hoverOverlay.color,
                      maskImage: `radial-gradient(circle at top right, transparent ${parseFloat(controls.panels.borderRadius) * 16}px, black ${parseFloat(controls.panels.borderRadius) * 16}px)`,
                      WebkitMaskImage: `radial-gradient(circle at top right, transparent ${parseFloat(controls.panels.borderRadius) * 16}px, black ${parseFloat(controls.panels.borderRadius) * 16}px)`
                    }}
                  />

                  {/* Bottom-right corner */}
                  <motion.div
                    className="absolute pointer-events-none z-31"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: controls.hoverOverlay.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      left: hoveredPanelRect.right - parseFloat(controls.panels.borderRadius) * 16,
                      top: hoveredPanelRect.bottom - parseFloat(controls.panels.borderRadius) * 16,
                      width: parseFloat(controls.panels.borderRadius) * 16,
                      height: parseFloat(controls.panels.borderRadius) * 16,
                      backgroundColor: controls.hoverOverlay.color,
                      maskImage: `radial-gradient(circle at top left, transparent ${parseFloat(controls.panels.borderRadius) * 16}px, black ${parseFloat(controls.panels.borderRadius) * 16}px)`,
                      WebkitMaskImage: `radial-gradient(circle at top left, transparent ${parseFloat(controls.panels.borderRadius) * 16}px, black ${parseFloat(controls.panels.borderRadius) * 16}px)`
                    }}
                  />
                </>
              )}
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
