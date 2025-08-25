import { motion } from 'framer-motion';

const ProjectsPanel = () => {
    const projects = [
        { name: "E-commerce Platform", tech: "Next.js, Stripe", status: "Live" },
        { name: "AI Dashboard", tech: "React, TensorFlow", status: "Dev" },
        { name: "Mobile App", tech: "React Native", status: "QA" },
        { name: "Analytics Tool", tech: "Vue, D3.js", status: "Live" },
        { name: "CRM System", tech: "MERN Stack", status: "Dev" }
    ];

    return (
        <div className="h-full p-3">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">Recent Projects</h3>
            <div className="grid grid-cols-1 gap-2">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center gap-2 bg-white/5 rounded-lg p-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex-1">
                            <div className="text-xs text-white/90">{project.name}</div>
                            <div className="text-[10px] text-purple-400/70">{project.tech}</div>
                        </div>
                        <div className={`text-[10px] px-2 py-1 rounded-full ${project.status === 'Live' ? 'bg-green-400/20 text-green-400' :
                                project.status === 'Dev' ? 'bg-yellow-400/20 text-yellow-400' :
                                    'bg-blue-400/20 text-blue-400'
                            }`}>
                            {project.status}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPanel;