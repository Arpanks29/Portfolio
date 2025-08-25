import { motion } from 'framer-motion';

const TimelinePanel = () => {
    const timeline = [
        { year: '2023', role: 'Sr. Frontend Dev', company: 'Tech Corp', tech: 'React, Next.js' },
        { year: '2022', role: 'Frontend Lead', company: 'Digital Agency', tech: 'Vue, Nuxt' },
        { year: '2021', role: 'Full Stack', company: 'Startup Inc', tech: 'MERN Stack' },
        { year: '2020', role: 'Backend Dev', company: 'Tech Solutions', tech: 'Node, Python' },
        { year: '2019', role: 'Jr. Developer', company: 'Web Services', tech: 'JavaScript, PHP' }
    ];

    return (
        <div className="h-full p-3">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">Experience Timeline</h3>
            <div className="space-y-2">
                {timeline.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 bg-white/5 rounded-lg p-2 text-xs"
                    >
                        <div className="font-mono text-purple-400 w-12">{item.year}</div>
                        <div className="flex-1">
                            <div className="text-white/90">{item.role}</div>
                            <div className="text-white/50 text-[10px]">{item.company}</div>
                            <div className="text-purple-400/70 text-[10px]">{item.tech}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TimelinePanel;