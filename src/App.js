import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import DashboardPanel from './components/DashboardPanel';

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoother transform values - removed invalid easing syntax
  const sectionBTranslateX = useTransform(scrollYProgress, [0, 0.8], ['5%', '0%']);
  const sectionBTranslateY = useTransform(scrollYProgress, [0, 0.8], ['-15%', '0%']);
  const sectionBRotateX = useTransform(scrollYProgress, [0, 0.8], [20, 0]);
  const sectionBRotateY = useTransform(scrollYProgress, [0, 0.8], [-20, 0]);
  const sectionBRotateZ = useTransform(scrollYProgress, [0, 0.8], [5, 0]);
  const sectionBScale = useTransform(scrollYProgress, [0, 0.8], [0.8, 1]);

  const sectionBRight = useTransform(scrollYProgress, [0, 0.8], ['-10%', '0%']);
  const sectionBWidth = useTransform(scrollYProgress, [0, 0.8], ['70%', '100%']);

  // Section A transforms
  const sectionAScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);
  const sectionAOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sectionATranslateX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-120%']);
  const sectionAWidth = useTransform(scrollYProgress, [0, 0.6], ['55%', '0%']);

  // Overlay transforms
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.8, 0]);

  // Dynamic border radius - starts rounded, becomes sharp
  const dashboardBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.8],
    ['1.5rem', '0rem']
  );

  const controls = {
    // Section A
    sectionAWidth: '55%',

    // Section B Position Controls
    sectionB: {
      translateZ: '0px',
      perspective: '1500px',
      originX: 'center',
      originY: 'center',
      opacity: 1,
      width: '70%',
    },

    // Overlay Controls
    overlay: {
      color: 'rgba(0,0,0,0.8)',
      angle: '75deg',
    },

    // Shadow Controls
    shadow: {
      opacity: 0.3,
      blur: '20px',
      spread: '0px',
      distance: '15px',
      color: 'rgba(0,0,0,0.3)',
    },

    // Animation Controls
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

  return (
    // Hide scrollbars with CSS classes
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
            x: sectionATranslateX,
          }}
          transition={{ ease: "easeOut" }} // Add smooth transition
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
            }}
            transition={{ ease: "easeOut" }} // Add smooth transition
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
              }}
            >
              {[...Array(6)].map((_, index) => (
                <DashboardPanel key={index} index={index} panelControls={controls.panels} />
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
              ${controls.overlay.color} 75%)`,
            opacity: overlayOpacity
          }}
        />
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
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        html {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}

export default App;