import { motion } from 'framer-motion';
import panelDetailsData from '../data/panelDetails.json';

const DetailInfoPanel = ({ panelIndex, position }) => {
    // Get panel details from JSON data
    const currentPanel = panelDetailsData[panelIndex.toString()];

    // If no data exists for this panel index, don't render
    if (!currentPanel) {
        console.warn(`No details found for panel index: ${panelIndex}`);
        return null;
    }

    // Add arrow pointing to the hovered panel based on position
    const getArrowClasses = () => {
        switch (position.position) {
            case 'left':
                return 'after:absolute after:right-[-8px] after:top-1/2 after:-translate-y-1/2 after:border-l-8 after:border-l-gray-900/95 after:border-y-8 after:border-y-transparent';
            case 'right':
                return 'after:absolute after:left-[-8px] after:top-1/2 after:-translate-y-1/2 after:border-r-8 after:border-r-gray-900/95 after:border-y-8 after:border-y-transparent';
            case 'top':
                return 'after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:border-t-8 after:border-t-gray-900/95 after:border-x-8 after:border-x-transparent';
            case 'bottom':
                return 'after:absolute after:top-[-8px] after:left-1/2 after:-translate-x-1/2 after:border-b-8 after:border-b-gray-900/95 after:border-x-8 after:border-x-transparent';
            default:
                return '';
        }
    };

    return (
        <motion.div
            className="fixed z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
                left: position.x,
                top: position.y,
                width: '320px',
            }}
        >
            <div className={`bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 shadow-2xl relative ${getArrowClasses()}`}>
                <h3 className="text-lg font-bold text-white mb-2">{currentPanel.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{currentPanel.description}</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {currentPanel.details.map((detail, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-2 text-xs text-gray-400"
                        >
                            <span className="text-purple-400 mt-1">•</span>
                            <span>{detail}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default DetailInfoPanel;