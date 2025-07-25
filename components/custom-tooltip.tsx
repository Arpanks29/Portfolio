"use client"

import { motion, AnimatePresence } from "framer-motion"
import type React from "react"

interface CustomTooltipProps {
  text: string | null
  x: number
  y: number
  color: string | null
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ text, x, y, color }) => {
  return (
    <AnimatePresence>
      {text && color && (
        <motion.div
          className="fixed z-[9999] pointer-events-none px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            left: x + 15, // Offset from cursor
            top: y + 15, // Offset from cursor
            backgroundColor: `${color}20`,
            color: color,
            border: `1px solid ${color}40`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: `0 0 15px ${color}30`,
          }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CustomTooltip
