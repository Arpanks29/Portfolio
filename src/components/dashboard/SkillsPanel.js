import { motion } from 'framer-motion';

const SkillsPanel = () => {
    const skills = {
        "Frontend": ["React", "Vue", "Next.js", "TypeScript", "Tailwind"],
        "Backend": ["Node.js", "Python", "PostgreSQL", "MongoDB"],
        "DevOps": ["Docker", "AWS", "CI/CD", "Git"],
        "Tools": ["Figma", "Jest", "Webpack", "VS Code"]
    };

    return (
        <div className="h-full p-3">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">Skills Matrix</h3>
            <div className="grid grid-cols-2 gap-2">
                {Object.entries(skills).map(([category, items], idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-2">
                        <div className="text-[10px] text-white/70 mb-1">{category}</div>
                        <div className="flex flex-wrap gap-1">
                            {items.map((skill, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="text-[10px] px-2 py-1 rounded-full bg-purple-400/20 text-purple-400"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsPanel;