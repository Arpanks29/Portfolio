import { motion } from 'framer-motion';

const ContactPanel = () => {
    const contacts = [
        { type: "Email", value: "dev@example.com", icon: "📧" },
        { type: "GitHub", value: "github.com/dev", icon: "💻" },
        { type: "LinkedIn", value: "linkedin/dev", icon: "🔗" },
        { type: "Twitter", value: "@dev", icon: "🐦" },
        { type: "Location", value: "San Francisco, CA", icon: "📍" }
    ];

    return (
        <div className="h-full p-3">
            <h3 className="text-sm font-semibold text-purple-400 mb-2">Contact</h3>
            <div className="grid grid-cols-2 gap-2">
                {contacts.map((contact, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center gap-2 bg-white/5 rounded-lg p-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span className="text-sm">{contact.icon}</span>
                        <div className="overflow-hidden">
                            <div className="text-[10px] text-white/50">{contact.type}</div>
                            <div className="text-xs text-white/90 truncate">{contact.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ContactPanel;