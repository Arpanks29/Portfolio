import { motion } from 'framer-motion';
import TimelinePanel from './dashboard/TimelinePanel';
import SkillsPanel from './dashboard/SkillsPanel';
import ProjectsPanel from './dashboard/ProjectsPanel';
import StatsPanel from './dashboard/StatsPanel';
import ContactPanel from './dashboard/ContactPanel';
import EducationPanel from './dashboard/EducationPanel';

const DashboardPanel = ({ index, panelControls }) => {
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
            className={`transform-gpu ${panels[index].className}`}
            style={{
                gridArea: panels[index].gridArea,
                backgroundColor: panelControls.backgroundColor,
                borderRadius: panelControls.borderRadius,
                border: `${panelControls.borderWidth} solid ${panelControls.borderColor}`,
                backdropFilter: `blur(${panelControls.glassEffect.blur})`,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <PanelComponent />
        </motion.div>
    );
};

export default DashboardPanel;