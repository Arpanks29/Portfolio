import { motion } from 'framer-motion';
import TimelinePanel from './dashboard/TimelinePanel';
import SkillsPanel from './dashboard/SkillsPanel';
import ProjectsPanel from './dashboard/ProjectsPanel';
import StatsPanel from './dashboard/StatsPanel';
import ContactPanel from './dashboard/ContactPanel';
import EducationPanel from './dashboard/EducationPanel';

const DashboardPanel = ({ index, panelControls, onHover, isAnimationComplete, isHovered }) => {
    const panels = [
        // Row 1
        {
            component: StatsPanel,
            gridArea: "1 / 1 / 2 / 3",
            className: "h-32"
        },
        // Row 2 & 3
        {
            component: TimelinePanel,
            gridArea: "2 / 1 / 4 / 2",
            className: "h-[calc(100%-2rem)]"
        },
        {
            component: SkillsPanel,
            gridArea: "2 / 2 / 3 / 3",
            className: "h-full"
        },
        {
            component: ProjectsPanel,
            gridArea: "3 / 2 / 4 / 3",
            className: "h-full"
        },
        // Row 4
        {
            component: EducationPanel,
            gridArea: "4 / 1 / 5 / 2",
            className: "h-48"
        },
        {
            component: ContactPanel,
            gridArea: "4 / 2 / 5 / 3",
            className: "h-48"
        }
    ];

    if (index >= panels.length) return null;

    const PanelComponent = panels[index].component;

    return (
        <motion.div
            className={`transform-gpu transition-all duration-200 ${panels[index].className} ${isAnimationComplete ? 'hover:scale-105 hover:shadow-xl cursor-pointer' : ''
                }`}
            style={{
                gridArea: panels[index].gridArea,
                backgroundColor: panelControls.backgroundColor,
                borderRadius: panelControls.borderRadius,
                border: `${panelControls.borderWidth} solid ${panelControls.borderColor}`,
                backdropFilter: `blur(${panelControls.glassEffect.blur})`,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                // Ensure hovered panel stays above overlay (z-40), non-hovered stay below (z-10)
                zIndex: isHovered ? 45 : 10,
                position: 'relative',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={(e) => onHover(index, e, true)}
            onMouseLeave={(e) => onHover(index, e, false)}
            whileHover={isAnimationComplete ? {
                borderColor: 'rgba(168, 85, 247, 0.5)',
                boxShadow: '0 12px 40px rgba(168, 85, 247, 0.2)'
            } : {}}
        >
            <PanelComponent />
        </motion.div>
    );
};

export default DashboardPanel;