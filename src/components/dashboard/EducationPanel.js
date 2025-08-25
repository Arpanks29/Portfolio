import { motion } from 'framer-motion';

const EducationPanel = () => {
    const education = [
        {
            degree: "MSc Computer Science",
            school: "Tech University",
            year: "2020",
            achievements: ["ML Research", "4.0 GPA", "Honors"]
        },
        {
            degree: "BSc Software Engineering",
            school: "State University",
            year: "2018",
            achievements: ["Dean's List", "Research Grant"]
        }
    ];

    return (
        <div className="h-full p-3">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">Education</h3>
            <div className="space-y-2">
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        className="bg-white/5 rounded-lg p-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-xs text-white/90">{edu.degree}</div>
                                <div className="text-[10px] text-white/50">{edu.school}</div>
                            </div>
                            <div className="text-[10px] text-purple-400">{edu.year}</div>
                        </div>
                        <div className="flex gap-1 mt-1">
                            {edu.achievements.map((achievement, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/70">
                                    {achievement}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default EducationPanel;