"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ElegantShapeProps {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  color?: string // Custom color prop (e.g., "#00E5D3")
}

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  color = "#00E5D3", // Default to architect color
}: ElegantShapeProps) {
  // Helper to convert hex color to rgba for dynamic opacity
  const hexToRgba = (hex: string, alpha: number) => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
          )}
          style={{
            // Using inline styles for dynamic gradients and borders with RGBA colors
            background: `linear-gradient(to right, ${hexToRgba(color, 0.15)}, transparent)`,
            border: `2px solid ${hexToRgba(color, 0.15)}`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${hexToRgba(color, 0.2)}, transparent 70%)`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HeroBackgroundShapes() {
  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <ElegantShape
        delay={0.3}
        width={600}
        height={140}
        rotate={12}
        color={colors.architect}
        className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
      />

      <ElegantShape
        delay={0.5}
        width={500}
        height={120}
        rotate={-15}
        color={colors.innovator}
        className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
      />

      <ElegantShape
        delay={0.4}
        width={300}
        height={80}
        rotate={-8}
        color={colors.transformer}
        className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
      />

      <ElegantShape
        delay={0.6}
        width={200}
        height={60}
        rotate={20}
        color={colors.visionary}
        className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
      />

      <ElegantShape
        delay={0.7}
        width={150}
        height={40}
        rotate={-25}
        color={colors.architect}
        className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
      />
    </div>
  )
}
