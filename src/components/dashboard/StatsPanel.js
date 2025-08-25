import { motion } from 'framer-motion';

const StatsPanel = () => {
    const stats = [
        { label: 'Experience', value: '5+', unit: 'years' },
        { label: 'Projects', value: '20+', unit: 'completed' },
        { label: 'Skills', value: '15+', unit: 'mastered' },
        { label: 'Awards', value: '5', unit: 'received' }
    ];

    return (
        <div className="h-full p-4">
            <div className="grid grid-cols-4 gap-4 h-full">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col items-center justify-center text-center bg-white/5 rounded-lg p-2"
                    >
                        <span className="text-2xl font-bold text-purple-400">{stat.value}</span>
                        <span className="text-xs text-gray-400">{stat.label}</span>
                        <span className="text-[10px] text-gray-500">{stat.unit}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default StatsPanel; 