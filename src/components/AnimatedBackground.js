import { motion } from 'framer-motion';
import { useMemo } from 'react';
import DashboardPanel from './DashboardPanel';

const AnimatedBackground = ({ controls }) => {
    const backgroundConfig = {
        availablePanels: ['DashboardPanel'],

        // Bento-style panel patterns (aspect ratios and relative sizes)
        bentoPatterns: [
            // Small cards
            { width: 3, height: 3, frequency: 0.03 },     // Square small
            { width: 4, height: 3, frequency: 0.05 },    // Wide small
            { width: 3, height: 4, frequency: 0.05 },    // Tall small

            // Medium cards
            { width: 4, height: 4, frequency: 0.02 },     // Square medium
            { width: 5, height: 3, frequency: 0.25 },    // Ultra wide
            { width: 3, height: 5, frequency: 0.33 },    // Ultra tall

            // Large feature cards
            { width: 5, height: 4, frequency: 0.415 },   // Large horizontal
            { width: 4, height: 5, frequency: 0.305 },   // Large vertical
        ],

        containerWidth: 100, // Percentage width
        baseCardSize: 200,    // Base card size in pixels
        gap: 1,              // Gap between cards in pixels
        animationSpeed: 280,  // Animation duration in seconds
        duplicateSets: 5,    // Sets for seamless loop
    };

    // Bento layout algorithm that fills space organically
    const bentoLayout = useMemo(() => {
        const createBentoSection = (sectionHeight) => {
            const panels = [];
            const occupiedCells = new Set();
            let panelId = 0;

            // Calculate grid dimensions
            const gridWidth = Math.floor(window.innerWidth / (backgroundConfig.baseCardSize + backgroundConfig.gap));
            const gridHeight = Math.floor(sectionHeight / (backgroundConfig.baseCardSize + backgroundConfig.gap));

            // Helper function to check if area is free
            const isAreaFree = (x, y, width, height) => {
                for (let py = y; py < y + height && py < gridHeight; py++) {
                    for (let px = x; px < x + width && px < gridWidth; px++) {
                        if (occupiedCells.has(`${px},${py}`)) return false;
                    }
                }
                return true;
            };

            // Helper function to mark area as occupied
            const occupyArea = (x, y, width, height) => {
                for (let py = y; py < y + height && py < gridHeight; py++) {
                    for (let px = x; px < x + width && px < gridWidth; px++) {
                        occupiedCells.add(`${px},${py}`);
                    }
                }
            };

            // Select panel size based on frequency
            const selectPanelSize = (maxWidth, maxHeight) => {
                const availablePatterns = backgroundConfig.bentoPatterns.filter(pattern =>
                    pattern.width <= maxWidth && pattern.height <= maxHeight
                );

                if (availablePatterns.length === 0) return { width: 1, height: 1 };

                // Weighted random selection
                const random = Math.random();
                let cumulative = 0;

                for (const pattern of availablePatterns) {
                    cumulative += pattern.frequency;
                    if (random <= cumulative) return pattern;
                }

                return availablePatterns[0];
            };

            // Fill grid with bento-style placement
            let attempts = 0;
            const maxAttempts = gridWidth * gridHeight * 2;

            while (attempts < maxAttempts && occupiedCells.size < gridWidth * gridHeight * 0.95) {
                // Try random positions to create organic feel
                const x = Math.floor(Math.random() * gridWidth);
                const y = Math.floor(Math.random() * gridHeight);

                if (occupiedCells.has(`${x},${y}`)) {
                    attempts++;
                    continue;
                }

                // Calculate available space from this position
                let maxWidth = 0;
                let maxHeight = 0;

                // Check maximum width
                for (let w = 0; x + w < gridWidth && !occupiedCells.has(`${x + w},${y}`); w++) {
                    maxWidth = w + 1;
                }

                // Check maximum height
                for (let h = 0; y + h < gridHeight && !occupiedCells.has(`${x},${y + h}`); h++) {
                    maxHeight = h + 1;
                }

                // Select appropriate panel size
                const panelSize = selectPanelSize(Math.min(maxWidth, 4), Math.min(maxHeight, 4));

                // Verify the entire area is free
                if (isAreaFree(x, y, panelSize.width, panelSize.height)) {
                    occupyArea(x, y, panelSize.width, panelSize.height);

                    panels.push({
                        id: `bento-${panelId++}`,
                        x: x * (backgroundConfig.baseCardSize + backgroundConfig.gap),
                        y: y * (backgroundConfig.baseCardSize + backgroundConfig.gap),
                        width: panelSize.width * backgroundConfig.baseCardSize + (panelSize.width - 1) * backgroundConfig.gap,
                        height: panelSize.height * backgroundConfig.baseCardSize + (panelSize.height - 1) * backgroundConfig.gap,
                        gridWidth: panelSize.width,
                        gridHeight: panelSize.height,
                        panelType: panelId % 6,
                    });
                }

                attempts++;
            }

            // Fill remaining single cells with small panels
            for (let y = 0; y < gridHeight; y++) {
                for (let x = 0; x < gridWidth; x++) {
                    if (!occupiedCells.has(`${x},${y}`)) {
                        panels.push({
                            id: `bento-fill-${panelId++}`,
                            x: x * (backgroundConfig.baseCardSize + backgroundConfig.gap),
                            y: y * (backgroundConfig.baseCardSize + backgroundConfig.gap),
                            width: backgroundConfig.baseCardSize,
                            height: backgroundConfig.baseCardSize,
                            gridWidth: 1,
                            gridHeight: 1,
                            panelType: panelId % 6,
                        });
                    }
                }
            }

            return panels;
        };

        // Generate complete layout
        const sectionHeight = window.innerHeight * 1.2;
        const totalHeight = sectionHeight * backgroundConfig.duplicateSets;

        const allPanels = [];
        for (let set = 0; set < backgroundConfig.duplicateSets; set++) {
            const sectionPanels = createBentoSection(sectionHeight);
            sectionPanels.forEach(panel => {
                allPanels.push({
                    ...panel,
                    id: `${panel.id}-set-${set}`,
                    y: panel.y + (set * sectionHeight),
                    setIndex: set,
                });
            });
        }

        return {
            panels: allPanels,
            totalHeight,
            sectionHeight,
            totalSets: backgroundConfig.duplicateSets,
        };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ userSelect: 'none' }}>
            {/* Animated bento container */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    position: 'relative',
                    height: `${bentoLayout.totalHeight}px`,
                    width: '100%',
                    filter: `blur(${controls.panels.glassEffect.blur})`,
                    userSelect: 'none',
                    //  op, // Make background less prominent
                }}
                animate={{
                    y: [0, `-${bentoLayout.sectionHeight * (bentoLayout.totalSets - 1)}px`],
                }}
                transition={{
                    duration: backgroundConfig.animationSpeed,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                {/* Render bento panels */}
                {bentoLayout.panels.map((panel) => (
                    <motion.div
                        key={panel.id}
                        className="absolute pointer-events-none"
                        style={{
                            left: `${panel.x}px`,
                            top: `${panel.y}px`,
                            width: `${panel.width}px`,
                            height: `${panel.height}px`,
                            cursor: 'default',
                        }}
                        initial={{
                            scale: 0.8,
                            opacity: 0,
                            rotateX: Math.random() * 10 - 5,
                            rotateY: Math.random() * 10 - 5,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            rotateX: 0,
                            rotateY: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: Math.random() * 2,
                            ease: "easeOut"
                        }}
                    >
                        <div
                            className="w-full h-full pointer-events-none"
                            style={{
                                borderRadius: `${Math.min(panel.gridWidth, panel.gridHeight) * 8}px`, // Adaptive border radius
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                cursor: 'default',
                                userSelect: 'none',
                            }}
                        >
                            <DashboardPanel
                                index={panel.panelType}
                                panelControls={{
                                    ...controls.panels,
                                    borderRadius: `${Math.min(panel.gridWidth, panel.gridHeight) * 8}px`,
                                    borderWidth: '0px',
                                    backgroundColor: panel.gridWidth * panel.gridHeight > 2
                                        ? controls.panels.backgroundColor
                                        : '#252525', // Slightly different color for larger panels
                                }}
                                onHover={() => { }}
                                isAnimationComplete={true}
                                isHovered={false}
                                isBackground={true}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    margin: 0,
                                    padding: 0,
                                }}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Enhanced blur overlay with gradient */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    backgroundColor: `rgba(20, 20, 20, ${controls.panels.glassEffect.opacity * 1})`,
                    // backdropFilter: `blur(${controls.panels.glassEffect.blur}) saturate(150%)`,
                }}
            />
        </div>
    );
};

export default AnimatedBackground;