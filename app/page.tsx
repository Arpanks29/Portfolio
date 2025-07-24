"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { motion, AnimatePresence, useScroll } from "framer-motion"
import {
  Linkedin,
  Brain,
  Zap,
  Layers,
  Sparkles,
  ArrowRight,
  Mail,
  Eye,
  ChevronDown,
  Award,
  TrendingUp,
  Users,
  Code,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Reality Modes
type RealityMode = "architect" | "innovator" | "transformer" | "visionary"

// Breathing Background Animation
const BreathingBackground = ({ color }: { color: string }) => {
  return (
    <motion.div
      className="absolute inset-0 rounded-full opacity-20"
      style={{ backgroundColor: color }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

// Enhanced Skill Card with Better Layout
const EnhancedSkillCard = ({
  skill,
  delay,
  color,
  index,
}: {
  skill: {
    name: string
    level: number
    category: string
    description: string
    achievements: string[]
    learnedAt: string
    icon: React.ReactNode
  }
  delay: number
  color: string
  index: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setShowDetails(!showDetails)}
      whileHover={{ y: -8 }}
      layout
    >
      {/* Main Card Container */}
      <motion.div
        className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 relative overflow-hidden min-h-[320px] flex flex-col"
        style={{
          borderColor: isHovered ? `${color}60` : "rgba(255,255,255,0.2)",
        }}
        animate={{
          boxShadow: isHovered ? `0 20px 40px ${color}20, 0 0 30px ${color}15` : "0 10px 20px rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 0.4 }}
        layout
      >
        {/* Breathing background layers */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-5"
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: delay * 0.5,
          }}
        />

        {/* Header Section */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 rounded-2xl"
              style={{ backgroundColor: `${color}20` }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ color }} className="w-8 h-8 flex items-center justify-center">
                {skill.icon}
              </div>
            </motion.div>
            <div>
              <motion.h3
                className="text-xl font-bold text-white mb-1"
                animate={{
                  color: isHovered ? color : "white",
                }}
                transition={{ duration: 0.3 }}
              >
                {skill.name}
              </motion.h3>
              <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                {skill.category}
              </Badge>
            </div>
          </div>

          {/* Progress Circle */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <motion.circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: skill.level / 100 }}
                transition={{
                  duration: 2,
                  delay: delay + 0.5,
                  ease: "easeInOut",
                }}
                style={{
                  strokeDasharray: "220",
                  strokeDashoffset: "220",
                  filter: `drop-shadow(0 0 8px ${color})`,
                }}
                animate={{
                  filter: isHovered ? `drop-shadow(0 0 15px ${color})` : `drop-shadow(0 0 8px ${color})`,
                  strokeWidth: isHovered ? 4 : 3,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-white text-lg font-bold"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  textShadow: isHovered ? `0 0 15px ${color}` : `0 0 8px ${color}`,
                }}
              >
                {skill.level}%
              </motion.span>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.div className="flex-1 relative z-10" layout>
          <p className="text-white/80 text-sm leading-relaxed mb-4">{skill.description}</p>

          <div className="flex items-center gap-2 text-xs text-white/60 mb-4">
            <Award className="w-3 h-3" />
            <span>Learned at {skill.learnedAt}</span>
          </div>

          {/* Achievements Preview */}
          <motion.div
            className="space-y-2"
            initial={{ height: 60 }}
            animate={{ height: showDetails ? "auto" : 60 }}
            transition={{ duration: 0.4 }}
            style={{ overflow: "hidden" }}
          >
            {skill.achievements.slice(0, showDetails ? undefined : 2).map((achievement, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2 text-xs text-white/70"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <TrendingUp className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color }} />
                <span>{achievement}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Expand/Collapse Button */}
          {skill.achievements.length > 2 && (
            <motion.button
              className="mt-4 text-xs font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color }}
              onClick={(e) => {
                e.stopPropagation()
                setShowDetails(!showDetails)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showDetails ? "Show Less" : `+${skill.achievements.length - 2} More`}
              <motion.div animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="w-3 h-3" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>

        {/* Floating particles on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full pointer-events-none"
                  style={{ backgroundColor: color }}
                  initial={{
                    opacity: 0,
                    x: "50%",
                    y: "50%",
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Mastery Level Indicator */}
        <motion.div
          className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold"
          style={{
            backgroundColor: `${color}20`,
            color: color,
            border: `1px solid ${color}40`,
          }}
          animate={{
            scale: isHovered ? 1.05 : 1,
            boxShadow: isHovered ? `0 0 15px ${color}30` : "none",
          }}
        >
          {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : "Proficient"}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Glass Morphism Card Component
const GlassCard = ({
  children,
  className = "",
  intensity = "medium",
}: {
  children: React.ReactNode
  className?: string
  intensity?: "light" | "medium" | "strong"
}) => {
  const intensityClasses = {
    light: "bg-white/5 backdrop-blur-sm border-white/10",
    medium: "bg-white/10 backdrop-blur-md border-white/20",
    strong: "bg-white/15 backdrop-blur-lg border-white/30",
  }

  return <div className={`${intensityClasses[intensity]} border rounded-2xl ${className}`}>{children}</div>
}

// Floating Proof Particles
const ProofParticles = ({ achievement, color }: { achievement: string; color: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-60"
          style={{
            backgroundColor: color,
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}

// Sophisticated Cursor
const SophisticatedCursor = ({ realityMode }: { realityMode: RealityMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(
        target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest("[data-interactive]"),
      )
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          backgroundColor: colors[realityMode],
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border pointer-events-none z-[9998]"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          borderColor: `${colors[realityMode]}60`,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}

// Timeline Category Selector
const TimelineCategorySelector = ({
  activeCategory,
  onCategoryChange,
  isVisible,
  realityMode,
}: {
  activeCategory: RealityMode
  onCategoryChange: (category: RealityMode) => void
  isVisible: boolean
  realityMode: RealityMode
}) => {
  const categories = [
    { key: "architect" as RealityMode, label: "Architecture", icon: <Layers className="w-4 h-4" /> },
    { key: "innovator" as RealityMode, label: "Innovation", icon: <Zap className="w-4 h-4" /> },
    { key: "transformer" as RealityMode, label: "Transformation", icon: <Brain className="w-4 h-4" /> },
    { key: "visionary" as RealityMode, label: "Vision", icon: <Sparkles className="w-4 h-4" /> },
  ]

  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-8 right-8 z-50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-4">
            <p className="text-white text-sm font-medium mb-3 text-center">Timeline Focus</p>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.key}
                  onClick={() => onCategoryChange(category.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.key
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  style={{
                    borderLeft:
                      activeCategory === category.key ? `3px solid ${colors[category.key]}` : "3px solid transparent",
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  {category.label}
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Enhanced Timeline Event with Dynamic Colored Glass
const TimelineEvent = ({
  event,
  index,
  realityMode,
  timelineCategory,
}: {
  event: { year: string; title: string; description: string; impact: string; category: string }
  index: number
  realityMode: RealityMode
  timelineCategory: RealityMode
}) => {
  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  const [isHovered, setIsHovered] = useState(false)
  const activeColor = colors[timelineCategory]

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
        {/* Timeline Node */}
        <motion.div
          className="relative w-6 h-6 rounded-full border-4 border-white flex-shrink-0"
          style={{ backgroundColor: activeColor, zIndex: 25 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: activeColor }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Enhanced Content Card with Dynamic Colored Glass */}
        <motion.div
          className="flex-1 max-w-md relative"
          style={{ zIndex: 20 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl p-6"
            style={{
              background: `
                radial-gradient(circle at center, 
                  rgba(255, 255, 255, 0.08) 0%, 
                  rgba(255, 255, 255, 0.06) 40%,
                  ${activeColor}08 70%,
                  ${activeColor}12 100%
                ),
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.08) 0%, 
                  rgba(255, 255, 255, 0.04) 50%,
                  ${activeColor}06 100%
                )
              `,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${activeColor}40`,
              boxShadow: isHovered
                ? `0 0 30px ${activeColor}30, 0 0 60px ${activeColor}15, inset 0 0 20px ${activeColor}10`
                : `0 0 20px ${activeColor}20, inset 0 0 10px ${activeColor}05`,
            }}
            animate={{
              borderColor: isHovered ? `${activeColor}60` : `${activeColor}40`,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Animated Border Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: `linear-gradient(45deg, 
                  transparent 0%, 
                  ${activeColor}20 25%, 
                  transparent 50%, 
                  ${activeColor}20 75%, 
                  transparent 100%
                )`,
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : ["0% 0%", "0% 0%"],
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                ease: "linear",
              }}
            />

            {/* Enhanced Proof Particles with Timeline Color */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full opacity-60"
                  style={{
                    backgroundColor: activeColor,
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Content with enhanced styling */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <Badge
                  className="text-xs font-bold px-3 py-1"
                  style={{
                    backgroundColor: `${activeColor}20`,
                    color: activeColor,
                    border: `1px solid ${activeColor}40`,
                    boxShadow: `0 0 10px ${activeColor}20`,
                  }}
                >
                  {event.year}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs border-white/30"
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    borderColor: `${activeColor}30`,
                  }}
                >
                  {event.category}
                </Badge>
              </div>

              <motion.h3
                className="text-lg font-bold text-white mb-2"
                animate={{
                  textShadow: isHovered ? `0 0 15px ${activeColor}60` : "none",
                }}
              >
                {event.title}
              </motion.h3>

              <p className="text-white/80 text-sm mb-3 leading-relaxed">{event.description}</p>

              <motion.p
                className="text-sm font-semibold"
                style={{ color: activeColor }}
                animate={{
                  textShadow: isHovered ? `0 0 10px ${activeColor}40` : "none",
                }}
              >
                {event.impact}
              </motion.p>
            </div>

            {/* Corner Accent Lights */}
            <motion.div
              className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right, ${activeColor}20 0%, transparent 70%)`,
              }}
              animate={{
                opacity: isHovered ? 0.6 : 0.3,
              }}
              transition={{ duration: 0.4 }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none"
              style={{
                background: `radial-gradient(circle at bottom left, ${activeColor}15 0%, transparent 70%)`,
              }}
              animate={{
                opacity: isHovered ? 0.4 : 0.2,
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Interactive Showcase Component for Transformation Story
const InteractiveShowcase = ({
  title,
  description,
  insight,
  interactionType,
  color,
  phase,
  index,
}: {
  title: string
  description: string
  insight: string
  interactionType: string
  color: string
  phase: string
  index: number
}) => {
  const [isInteracting, setIsInteracting] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")

  return (
    <motion.div
      className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Interactive Element */}
        <div className="flex-shrink-0 w-full lg:w-80">
          <div className="mb-4">
            <Badge
              className="text-xs font-bold mb-2"
              style={{
                backgroundColor: `${color}20`,
                color: color,
                border: `1px solid ${color}40`,
              }}
            >
              {phase}
            </Badge>
          </div>

          <div className="h-48 relative overflow-hidden rounded-xl bg-white/5 border border-white/10">
            <InteractiveElement
              type={interactionType}
              color={color}
              isActive={isInteracting}
              onInteraction={setIsInteracting}
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-white/60">{getInteractionHint(interactionType)}</p>
          </div>
        </div>

        {/* Story Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/80 text-lg mb-4 leading-relaxed">{description}</p>
          <div
            className="text-base font-semibold italic border-l-4 pl-4"
            style={{
              color: color,
              borderColor: color,
            }}
          >
            "{insight}"
          </div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-5"
        style={{
          background: `radial-gradient(circle, ${color} 2px, transparent 2px)`,
          backgroundSize: "20px 20px",
        }}
      />
    </motion.div>
  )
}

// Interactive Element Component
const InteractiveElement = ({
  type,
  color,
  isActive,
  onInteraction,
}: {
  type: string
  color: string
  isActive: boolean
  onInteraction: (active: boolean) => void
}) => {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [connectionPoints, setConnectionPoints] = useState<number[]>([])
  const [growthBars, setGrowthBars] = useState([20, 40, 30, 60, 45])
  const [visionNodes, setVisionNodes] = useState(Array(6).fill(false))

  switch (type) {
    case "system-builder":
      return (
        <div
          className="relative w-full h-full flex items-center justify-center"
          onMouseEnter={() => onInteraction(true)}
          onMouseLeave={() => onInteraction(false)}
        >
          {/* Central Hub */}
          <motion.div
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center relative z-10"
            style={{ borderColor: color, backgroundColor: `${color}20` }}
            animate={{
              scale: isActive ? [1, 1.1, 1] : 1,
              boxShadow: isActive ? `0 0 20px ${color}40` : "none",
            }}
            transition={{ duration: 1, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
          >
            <Layers className="w-6 h-6" style={{ color }} />
          </motion.div>

          {/* Orbiting Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                backgroundColor: color,
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: isActive ? Math.cos((i * 60 * Math.PI) / 180) * 60 - 8 : -8,
                y: isActive ? Math.sin((i * 60 * Math.PI) / 180) * 60 - 8 : -8,
                opacity: isActive ? [0.3, 1, 0.3] : 0.5,
                scale: isActive ? [0.8, 1.2, 0.8] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Connection Lines */}
          {isActive && (
            <svg className="absolute inset-0 w-full h-full">
              {[...Array(6)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + Math.cos((i * 60 * Math.PI) / 180) * 30}%`}
                  y2={`${50 + Math.sin((i * 60 * Math.PI) / 180) * 30}%`}
                  stroke={color}
                  strokeWidth="1"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
            </svg>
          )}
        </div>
      )

    case "pattern-matcher":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <motion.button
                key={i}
                className="w-8 h-8 rounded border-2 border-white/20 hover:border-white/40 transition-colors"
                style={{
                  backgroundColor: connectionPoints.includes(i) ? `${color}40` : "transparent",
                  borderColor: connectionPoints.includes(i) ? color : "rgba(255,255,255,0.2)",
                }}
                onClick={() => {
                  if (connectionPoints.includes(i)) {
                    setConnectionPoints(connectionPoints.filter((p) => p !== i))
                  } else {
                    setConnectionPoints([...connectionPoints, i])
                  }
                  onInteraction(connectionPoints.length > 3)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full mx-auto"
                  style={{ backgroundColor: connectionPoints.includes(i) ? color : "rgba(255,255,255,0.3)" }}
                  animate={{
                    scale: connectionPoints.includes(i) ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: connectionPoints.includes(i) ? Number.POSITIVE_INFINITY : 0 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Pattern Recognition Feedback */}
          {connectionPoints.length > 3 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <div
                className="text-sm font-bold px-3 py-1 rounded-full border"
                style={{ color, borderColor: color, backgroundColor: `${color}20` }}
              >
                Pattern Detected!
              </div>
            </motion.div>
          )}
        </div>
      )

    case "barrier-dissolver":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Draggable Energy Ball */}
          <motion.div
            className="w-8 h-8 rounded-full cursor-grab active:cursor-grabbing"
            style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}60` }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
            onDragStart={() => onInteraction(true)}
            onDragEnd={() => {
              onInteraction(false)
              setDragPosition({ x: 0, y: 0 })
            }}
            onDrag={(_, info) => {
              setDragPosition({ x: info.offset.x, y: info.offset.y })
            }}
            whileDrag={{ scale: 1.2 }}
            animate={{
              boxShadow: isActive ? `0 0 25px ${color}80` : `0 0 15px ${color}60`,
            }}
          />

          {/* Barrier Blocks */}
          {[...Array(12)].map((_, i) => {
            const row = Math.floor(i / 4)
            const col = i % 4
            const blockX = -60 + col * 30
            const blockY = -30 + row * 20
            const distance = Math.sqrt(Math.pow(dragPosition.x - blockX, 2) + Math.pow(dragPosition.y - blockY, 2))
            const shouldDissolve = distance < 40 && isActive

            return (
              <motion.div
                key={i}
                className="absolute w-6 h-4 border border-white/40"
                style={{
                  left: `calc(50% + ${blockX}px)`,
                  top: `calc(50% + ${blockY}px)`,
                  backgroundColor: shouldDissolve ? "transparent" : "rgba(255,255,255,0.1)",
                }}
                animate={{
                  opacity: shouldDissolve ? 0 : 1,
                  scale: shouldDissolve ? 0.5 : 1,
                  rotate: shouldDissolve ? 45 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            )
          })}

          {/* Energy Particles */}
          {isActive && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full pointer-events-none"
                  style={{
                    backgroundColor: color,
                    left: `calc(50% + ${dragPosition.x}px)`,
                    top: `calc(50% + ${dragPosition.y}px)`,
                  }}
                  animate={{
                    x: Math.cos((i * 45 * Math.PI) / 180) * 30,
                    y: Math.sin((i * 45 * Math.PI) / 180) * 30,
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                />
              ))}
            </>
          )}
        </div>
      )

    case "growth-accelerator":
      return (
        <div className="relative w-full h-full flex items-end justify-center gap-2 px-8 pb-8">
          {growthBars.map((height, i) => (
            <motion.button
              key={i}
              className="w-8 rounded-t transition-colors hover:opacity-80"
              style={{
                height: `${height}%`,
                backgroundColor: color,
                opacity: 0.7,
              }}
              onClick={() => {
                const newBars = [...growthBars]
                newBars[i] = Math.min(100, newBars[i] + 15)
                setGrowthBars(newBars)
                onInteraction(true)
                setTimeout(() => onInteraction(false), 1000)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                height: `${height}%`,
                boxShadow: isActive ? `0 0 15px ${color}60` : "none",
              }}
              transition={{ duration: 0.5 }}
            />
          ))}

          {/* Growth Arrow */}
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2"
            animate={{
              y: isActive ? [-5, 5, -5] : 0,
              opacity: isActive ? 1 : 0.5,
            }}
            transition={{ duration: 1, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
          >
            <ArrowRight className="w-6 h-6 rotate-[-90deg]" style={{ color }} />
          </motion.div>

          {/* Value Indicators */}
          {isActive && (
            <>
              {growthBars.map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs font-bold"
                  style={{
                    left: `${20 + i * 15}%`,
                    bottom: `${growthBars[i] + 10}%`,
                    color,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  +{Math.floor(growthBars[i] * 0.8)}%
                </motion.div>
              ))}
            </>
          )}
        </div>
      )

    case "vision-crystallizer":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Central Vision Core */}
          <motion.div
            className="w-16 h-16 rounded-full border-2 flex items-center justify-center relative"
            style={{ borderColor: color, backgroundColor: `${color}10` }}
            animate={{
              scale: isActive ? [1, 1.1, 1] : 1,
              borderColor: isActive ? [color, `${color}80`, color] : color,
            }}
            transition={{ duration: 2, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
            onMouseEnter={() => onInteraction(true)}
            onMouseLeave={() => onInteraction(false)}
          >
            <Eye className="w-8 h-8" style={{ color }} />
          </motion.div>

          {/* Vision Network Nodes */}
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180
            const radius = 80
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <motion.button
                key={i}
                className="absolute w-6 h-6 rounded-full border-2"
                style={{
                  left: `calc(50% + ${x}px - 12px)`,
                  top: `calc(50% + ${y}px - 12px)`,
                  borderColor: visionNodes[i] ? color : "rgba(255,255,255,0.3)",
                  backgroundColor: visionNodes[i] ? `${color}40` : "transparent",
                }}
                onClick={() => {
                  const newNodes = [...visionNodes]
                  newNodes[i] = !newNodes[i]
                  setVisionNodes(newNodes)
                  onInteraction(newNodes.filter(Boolean).length > 3)
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: visionNodes[i] ? `0 0 10px ${color}60` : "none",
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full mx-auto"
                  style={{ backgroundColor: visionNodes[i] ? color : "rgba(255,255,255,0.5)" }}
                  animate={{
                    scale: visionNodes[i] ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 1, repeat: visionNodes[i] ? Number.POSITIVE_INFINITY : 0 }}
                />
              </motion.button>
            )
          })}

          {/* Connection Lines */}
          {isActive && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {visionNodes.map((isActive, i) => {
                if (!isActive) return null
                const angle = (i * 60 * Math.PI) / 180
                const radius = 80
                const x = 50 + (Math.cos(angle) * radius * 100) / 320
                const y = 50 + (Math.sin(angle) * radius * 100) / 192

                return (
                  <motion.line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke={color}
                    strokeWidth="2"
                    strokeOpacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )
              })}
            </svg>
          )}

          {/* Future Glimpse */}
          {visionNodes.filter(Boolean).length > 4 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <div
                className="text-sm font-bold px-4 py-2 rounded-full border backdrop-blur-sm"
                style={{ color, borderColor: color, backgroundColor: `${color}20` }}
              >
                Future Crystallized
              </div>
            </motion.div>
          )}
        </div>
      )

    default:
      return null
  }
}

// Helper function for interaction hints
const getInteractionHint = (type: string): string => {
  switch (type) {
    case "system-builder":
      return "Hover to activate system connections"
    case "pattern-matcher":
      return "Click dots to reveal hidden patterns"
    case "barrier-dissolver":
      return "Drag the energy to dissolve barriers"
    case "growth-accelerator":
      return "Click bars to accelerate growth"
    case "vision-crystallizer":
      return "Activate nodes to crystallize vision"
    default:
      return "Interact to explore"
  }
}

// Story Section Component with Creative Interactions
const StorySection = ({ realityMode }: { realityMode: RealityMode }) => {
  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  const storyBeats = [
    {
      phase: "Foundation",
      title: "The Systematic Thinker",
      story:
        "Every transformation begins with understanding systems. I learned that complexity isn't the enemy—it's the raw material for breakthrough solutions.",
      insight: "Systems thinking became my lens for seeing patterns others missed.",
      interactionType: "system-builder",
    },
    {
      phase: "Discovery",
      title: "The Problem Decoder",
      story:
        "Through countless user interviews and data deep-dives, I discovered that the most valuable insights hide in the spaces between what people say and what they actually do.",
      insight: "True innovation comes from translating unspoken needs into elegant solutions.",
      interactionType: "pattern-matcher",
    },
    {
      phase: "Innovation",
      title: "The Boundary Breaker",
      story:
        "When conventional approaches hit walls, I learned to question the walls themselves. Some of my biggest breakthroughs came from asking 'What if we're solving the wrong problem?'",
      insight: "Constraints are often self-imposed. The real magic happens when you reframe the entire challenge.",
      interactionType: "barrier-dissolver",
    },
    {
      phase: "Impact",
      title: "The Value Creator",
      story:
        "Ideas without execution are just dreams. I mastered the art of turning insights into measurable business impact, learning that the best solutions feel inevitable in hindsight.",
      insight: "Sustainable transformation requires both vision and relentless execution discipline.",
      interactionType: "growth-accelerator",
    },
    {
      phase: "Evolution",
      title: "The Future Architect",
      story:
        "Today, I don't just solve current problems—I architect solutions for challenges that don't exist yet. The future belongs to those who can see around corners.",
      insight: "The most powerful transformations prepare organizations for futures they can't yet imagine.",
      interactionType: "vision-crystallizer",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-5xl md:text-6xl font-black mb-6"
            style={{
              background: `linear-gradient(135deg, ${colors[realityMode]}, white)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            THE TRANSFORMATION STORY
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Every breakthrough is built on a foundation of systematic learning, deliberate practice, and the courage to
            question everything.
          </p>
        </motion.div>

        <div className="space-y-12">
          {storyBeats.map((beat, index) => (
            <InteractiveShowcase
              key={beat.phase}
              title={beat.title}
              phase={beat.phase}
              description={beat.story}
              insight={beat.insight}
              interactionType={beat.interactionType}
              color={colors[realityMode]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Journey Visualization with Mouse Tracking Glow
const JourneyVisualization = ({ realityMode }: { realityMode: RealityMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  const milestones = [
    { title: "Foundation", desc: "Systems Thinking", progress: 100 },
    { title: "Discovery", desc: "User Research", progress: 95 },
    { title: "Innovation", desc: "Creative Solutions", progress: 90 },
    { title: "Impact", desc: "Business Results", progress: 88 },
    { title: "Evolution", desc: "Future Vision", progress: 85 },
  ]

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // Calculate distance from mouse to each milestone
  const getDistanceFromMouse = (index: number) => {
    const milestoneX = (index / (milestones.length - 1)) * 100
    const milestoneY = 50 // Center vertically
    const distance = Math.sqrt(Math.pow(mousePosition.x - milestoneX, 2) + Math.pow(mousePosition.y - milestoneY, 2))
    return Math.max(0, 30 - distance) / 30 // Normalize to 0-1, with 30% being max glow distance
  }

  return (
    <motion.div
      className="relative rounded-2xl"
      animate={
        isHovering
          ? {
              boxShadow: [
                `0 0 20px ${colors[realityMode]}15, 0 0 40px ${colors[realityMode]}08, inset 0 0 20px ${colors[realityMode]}03`,
                `0 0 25px ${colors[realityMode]}20, 0 0 50px ${colors[realityMode]}12, inset 0 0 25px ${colors[realityMode]}05`,
                `0 0 20px ${colors[realityMode]}15, 0 0 40px ${colors[realityMode]}08, inset 0 0 20px ${colors[realityMode]}03`,
              ],
              border: `1px solid ${colors[realityMode]}30`,
            }
          : {
              boxShadow: "0 0 0px transparent",
              border: "1px solid transparent",
            }
      }
      transition={{
        boxShadow: {
          duration: isHovering ? 3.5 : 1.2,
          repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
          ease: [0.25, 0.1, 0.25, 1],
          repeatDelay: 0.5,
        },
        border: {
          duration: isHovering ? 1.5 : 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
    >
      <GlassCard className="p-8 relative overflow-hidden" intensity="medium">
        <div
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: "none" }}
        >
          {/* Mouse Tracking Glow Effect */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                className="absolute pointer-events-none z-10"
                style={{
                  left: `${mousePosition.x}%`,
                  top: `${mousePosition.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Main glow */}
                <div
                  className="w-32 h-32 rounded-full blur-xl opacity-60"
                  style={{
                    background: `radial-gradient(circle, ${colors[realityMode]}60, transparent 70%)`,
                  }}
                />
                {/* Inner glow */}
                <div
                  className="absolute inset-0 w-16 h-16 rounded-full blur-md opacity-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background: `radial-gradient(circle, ${colors[realityMode]}80, transparent 60%)`,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-20">
            {milestones.map((milestone, index) => {
              const glowIntensity = isHovering ? getDistanceFromMouse(index) : 0

              return (
                <motion.div
                  key={milestone.title}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Progress Circle with Dynamic Glow */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    {/* Glowing border effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: `0 0 ${20 + glowIntensity * 30}px ${colors[realityMode]}${Math.floor(
                          glowIntensity * 80,
                        )
                          .toString(16)
                          .padStart(2, "0")}`,
                        border: `2px solid ${colors[realityMode]}${Math.floor(20 + glowIntensity * 60)
                          .toString(16)
                          .padStart(2, "0")}`,
                      }}
                      animate={{
                        scale: 1 + glowIntensity * 0.1,
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    <svg className="w-full h-full -rotate-90 relative z-10">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke={colors[realityMode]}
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: milestone.progress / 100 }}
                        transition={{ duration: 2, delay: index * 0.2 }}
                        style={{
                          strokeDasharray: "220",
                          strokeDashoffset: "220",
                          filter: `drop-shadow(0 0 ${8 + glowIntensity * 12}px ${colors[realityMode]})`,
                        }}
                        animate={{
                          strokeWidth: 3 + glowIntensity * 2,
                        }}
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className="text-white text-sm font-bold"
                        style={{
                          textShadow: `0 0 ${8 + glowIntensity * 15}px ${colors[realityMode]}`,
                        }}
                        animate={{
                          scale: 1 + glowIntensity * 0.1,
                        }}
                      >
                        {milestone.progress}%
                      </motion.span>
                    </div>
                  </div>

                  <motion.h4
                    className="text-white font-bold text-sm mb-1"
                    style={{
                      textShadow: glowIntensity > 0.3 ? `0 0 10px ${colors[realityMode]}` : "none",
                    }}
                    animate={{
                      color: glowIntensity > 0.5 ? colors[realityMode] : "white",
                    }}
                  >
                    {milestone.title}
                  </motion.h4>
                  <p className="text-white/70 text-xs">{milestone.desc}</p>

                  {/* Connection Line with Glow */}
                  {index < milestones.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-10 left-full w-6 h-0.5 bg-white/20"
                      style={{
                        boxShadow: glowIntensity > 0.2 ? `0 0 8px ${colors[realityMode]}` : "none",
                        backgroundColor: glowIntensity > 0.3 ? `${colors[realityMode]}60` : "rgba(255,255,255,0.2)",
                      }}
                      animate={{
                        height: glowIntensity > 0.4 ? "3px" : "2px",
                      }}
                    />
                  )}

                  {/* Proximity Particles */}
                  <AnimatePresence>
                    {glowIntensity > 0.6 && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full pointer-events-none"
                            style={{
                              backgroundColor: colors[realityMode],
                              left: "50%",
                              top: "50%",
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              x: (Math.random() - 0.5) * 60,
                              y: (Math.random() - 0.5) * 60,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 2,
                              delay: i * 0.3,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// Enhanced Skills Grid with Better Layout
const EnhancedSkillsGrid = ({ realityMode }: { realityMode: RealityMode }) => {
  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  const skills = [
    {
      name: "UX Strategy",
      level: 95,
      category: "Design Leadership",
      description:
        "Comprehensive user experience strategy development, from research to implementation, driving product success through human-centered design principles.",
      achievements: [
        "Led UX transformation for 10+ enterprise products",
        "Increased user satisfaction by 40% across all touchpoints",
        "Established design systems used by 50+ teams globally",
        "Mentored 15+ designers to senior positions",
      ],
      learnedAt: "Stanford HCI + 8 years industry experience",
      icon: <Users className="w-8 h-8" />,
    },
    {
      name: "System Design",
      level: 90,
      category: "Architecture",
      description:
        "End-to-end system architecture design, from microservices to monoliths, ensuring scalability, reliability, and maintainability at enterprise scale.",
      achievements: [
        "Architected systems serving 90K+ daily users",
        "Reduced system latency by 60% through optimization",
        "Designed fault-tolerant systems with 99.9% uptime",
        "Led migration of 5+ legacy systems to cloud-native",
      ],
      learnedAt: "MIT + Google Cloud Architecture",
      icon: <Layers className="w-8 h-8" />,
    },
    {
      name: "Data Analytics",
      level: 88,
      category: "Intelligence",
      description:
        "Advanced data analysis and visualization, transforming complex datasets into actionable insights that drive strategic business decisions.",
      achievements: [
        "Built predictive models with 85% accuracy",
        "Automated reporting saving 200+ hours monthly",
        "Identified $2M+ revenue opportunities through analysis",
        "Created real-time dashboards for C-level executives",
      ],
      learnedAt: "Coursera ML + Tableau Certification",
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      name: "AI Integration",
      level: 85,
      category: "Emerging Tech",
      description:
        "Cutting-edge AI and machine learning integration, from natural language processing to computer vision, enhancing product capabilities.",
      achievements: [
        "Integrated GPT models reducing task time by 70%",
        "Built recommendation engines improving engagement 3x",
        "Deployed computer vision solutions for quality control",
        "NVIDIA GenAI certified professional",
      ],
      learnedAt: "NVIDIA Deep Learning Institute",
      icon: <Brain className="w-8 h-8" />,
    },
    {
      name: "Team Leadership",
      level: 92,
      category: "Management",
      description:
        "Cross-functional team leadership and strategic management, building high-performing teams that deliver exceptional results consistently.",
      achievements: [
        "Led teams of 20+ across design, engineering, and product",
        "Achieved 95% team retention rate over 3 years",
        "Delivered 15+ major projects on time and under budget",
        "Established agile processes adopted company-wide",
      ],
      learnedAt: "Executive Leadership Program + 6 years experience",
      icon: <Users className="w-8 h-8" />,
    },
    {
      name: "Product Strategy",
      level: 89,
      category: "Business",
      description:
        "Strategic product planning and roadmap development, aligning business objectives with user needs to drive sustainable growth and market success.",
      achievements: [
        "Launched 8+ products generating $10M+ revenue",
        "Increased product adoption by 150% year-over-year",
        "Established go-to-market strategies for global expansion",
        "Built product frameworks used across organization",
      ],
      learnedAt: "Product Management Certification + Startup experience",
      icon: <Code className="w-8 h-8" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {skills.map((skill, index) => (
        <EnhancedSkillCard
          key={skill.name}
          skill={skill}
          delay={index * 0.15}
          color={colors[realityMode]}
          index={index}
        />
      ))}
    </div>
  )
}

// Main Portfolio Component
export default function ArpanPortfolio() {
  const [realityMode, setRealityMode] = useState<RealityMode>("architect")
  const [timelineCategory, setTimelineCategory] = useState<RealityMode>("architect")
  const [showTimelineControls, setShowTimelineControls] = useState(false)
  const [isJourneyHovering, setIsJourneyHovering] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  // Timeline data
  const timelineData = {
    architect: [
      {
        year: "2024",
        title: "Enterprise Architecture Overhaul",
        description:
          "Redesigned core system architecture for 10+ SaaS platforms, implementing scalable design patterns and microservices architecture.",
        impact: "40% performance improvement",
        category: "System Architecture",
      },
      {
        year: "2023",
        title: "Cross-Platform Design System",
        description:
          "Built comprehensive design system spanning web, mobile, and desktop with 98% consistency across all touchpoints.",
        impact: "90K+ users unified experience",
        category: "Design Systems",
      },
      {
        year: "2022",
        title: "Scalable Infrastructure Design",
        description:
          "Architected cloud-native infrastructure supporting global expansion across 15+ markets with localized experiences.",
        impact: "15+ markets launched",
        category: "Infrastructure",
      },
      {
        year: "2021",
        title: "API Architecture Framework",
        description:
          'Designed RESTful API architecture enabling seamless third-party integrations and internal service "Designed RESTful API architecture enabling seamless third-party integrations and internal service communication.',
        impact: "50+ integrations enabled",
        category: "API Design",
      },
    ],
    innovator: [
      {
        year: "2024",
        title: "AI-Powered User Insights",
        description:
          "Pioneered machine learning algorithms to predict user behavior patterns, revolutionizing personalization strategies.",
        impact: "$2M+ revenue from personalization",
        category: "AI Innovation",
      },
      {
        year: "2023",
        title: "Voice Interface Revolution",
        description:
          "Created industry-first voice-controlled dashboard interface, reducing task completion time by 60%.",
        impact: "60% faster task completion",
        category: "Interface Innovation",
      },
      {
        year: "2022",
        title: "Augmented Reality Prototyping",
        description: "Developed AR-based product visualization tools that increased customer engagement by 300%.",
        impact: "300% engagement increase",
        category: "Emerging Tech",
      },
      {
        year: "2021",
        title: "Predictive Analytics Engine",
        description: "Built predictive models for user churn prevention, saving $5M+ in customer retention costs.",
        impact: "$5M+ retention savings",
        category: "Data Innovation",
      },
    ],
    transformer: [
      {
        year: "2024",
        title: "Revenue Optimization Platform",
        description:
          "Transformed pricing strategies through data-driven insights, resulting in 25% revenue increase across all product lines.",
        impact: "$10M+ revenue impact",
        category: "Business Growth",
      },
      {
        year: "2023",
        title: "Operational Efficiency Revolution",
        description:
          "Streamlined business processes across departments, reducing operational costs by 35% while improving output quality.",
        impact: "35% cost reduction",
        category: "Process Optimization",
      },
      {
        year: "2022",
        title: "Customer Success Transformation",
        description: "Redesigned customer journey mapping and success metrics, improving retention rates by 45%.",
        impact: "45% retention improvement",
        category: "Customer Success",
      },
      {
        year: "2021",
        title: "Digital Transformation Initiative",
        description:
          "Led company-wide digital transformation, modernizing legacy systems and improving team productivity by 200%.",
        impact: "200% productivity boost",
        category: "Digital Transformation",
      },
    ],
    visionary: [
      {
        year: "2024",
        title: "Future-Ready Platform Architecture",
        description:
          "Designed next-generation platform architecture anticipating Web3, IoT, and quantum computing integration needs.",
        impact: "5-year technology roadmap",
        category: "Future Planning",
      },
      {
        year: "2023",
        title: "Sustainable Design Framework",
        description:
          "Created carbon-neutral design principles and sustainable UX patterns, reducing digital carbon footprint by 40%.",
        impact: "40% carbon footprint reduction",
        category: "Sustainability",
      },
      {
        year: "2022",
        title: "Metaverse Experience Design",
        description:
          "Pioneered immersive virtual collaboration spaces, preparing organization for distributed future work models.",
        impact: "Next-gen collaboration ready",
        category: "Metaverse",
      },
      {
        year: "2021",
        title: "Ethical AI Framework",
        description:
          "Established ethical guidelines and bias detection systems for AI implementations, ensuring responsible innovation.",
        impact: "Ethical AI standards set",
        category: "Responsible AI",
      },
    ],
  }

  // Check if timeline section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTimelineControls(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
      style={{ cursor: "none" }}
    >
      {/* Animated Background Pattern */}
      <motion.div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${colors[realityMode]} 2px, transparent 2px)`,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
          opacity: isJourneyHovering ? 0.02 : 0.05,
        }}
        transition={{
          backgroundPosition: {
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          opacity: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
      />

      {/* Sophisticated Cursor */}
      <SophisticatedCursor realityMode={realityMode} />

      {/* Timeline Controls */}
      <TimelineCategorySelector
        activeCategory={timelineCategory}
        onCategoryChange={setTimelineCategory}
        isVisible={showTimelineControls}
        realityMode={realityMode}
      />

      {/* LinkedIn Link */}
      <motion.a
        href="https://linkedin.com/in/arpan-k-singh/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-8 left-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <GlassCard className="p-3" intensity="medium">
          <Linkedin className="w-6 h-6 text-white" />
        </GlassCard>
      </motion.a>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.h1
              className="text-6xl md:text-8xl font-black leading-tight mb-8"
              style={{
                background: `linear-gradient(135deg, ${colors[realityMode]}, white, ${colors[realityMode]})`,
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            >
              ARPAN K SINGH
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-white/90 mb-4 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Transformation Architect
            </motion.p>

            <motion.p
              className="text-lg text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Where systematic thinking meets breakthrough innovation. Turning complexity into clarity through
              deliberate design and measurable impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.button
                className="px-8 py-4 rounded-full text-lg font-semibold border-2 relative overflow-hidden group"
                style={{
                  borderColor: colors[realityMode],
                  color: colors[realityMode],
                }}
                onClick={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-interactive
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: colors[realityMode] }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors">
                  Explore Journey
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.button>

              <motion.a
                href="mailto:arpansingh30@gmail.com"
                className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-interactive
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Connect
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* Journey Section */}
      <section
        id="journey"
        className="py-20"
        onMouseEnter={() => setIsJourneyHovering(true)}
        onMouseLeave={() => setIsJourneyHovering(false)}
      >
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-black mb-6"
              style={{
                background: `linear-gradient(135deg, ${colors[realityMode]}, white)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              THE TRANSFORMATION JOURNEY
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              From systematic foundations to breakthrough innovations, each milestone represents a deliberate step
              toward mastery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <JourneyVisualization realityMode={realityMode} />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <StorySection realityMode={realityMode} />

      {/* Enhanced Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-black mb-6"
              style={{
                background: `linear-gradient(135deg, ${colors[realityMode]}, white)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              EXPERTISE MASTERY
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Deep expertise across the transformation spectrum, each skill representing years of deliberate practice
              and measurable impact in real-world applications.
            </p>
          </motion.div>

          <EnhancedSkillsGrid realityMode={realityMode} />
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-black mb-6"
              style={{
                background: `linear-gradient(135deg, white, ${colors[realityMode]})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              IMPACT TIMELINE
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Explore different facets of transformation through focused expertise areas. Each timeline reveals a unique
              perspective on systematic innovation.
            </p>
          </motion.div>

          {/* Timeline Line */}
          <div className="relative">
            <div className="space-y-16 relative">
              {/* Timeline Line - moved inside the cards container */}
              <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${colors[timelineCategory]}, transparent)`,
                  zIndex: 1,
                }}
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 2 }}
                viewport={{ once: true }}
              />

              {timelineData[timelineCategory].map((event, index) => (
                <div key={`${timelineCategory}-${event.year}`} className="relative" style={{ zIndex: 10 }}>
                  <TimelineEvent
                    event={event}
                    index={index}
                    realityMode={realityMode}
                    timelineCategory={timelineCategory}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-black mb-8"
              style={{
                background: `linear-gradient(135deg, ${colors[realityMode]}, white)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              CREATE IMPACT TOGETHER
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
              Ready to transform your next challenge into a breakthrough solution?
              <br />
              <span className="font-semibold" style={{ color: colors[realityMode] }}>
                Let's architect the future together.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                href="mailto:arpansingh30@gmail.com"
                className="px-10 py-4 rounded-full text-lg font-semibold border-2 relative overflow-hidden group"
                style={{
                  borderColor: colors[realityMode],
                  color: colors[realityMode],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-interactive
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: colors[realityMode] }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                  Start Conversation
                </span>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/arpan-k-singh/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full text-lg font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-interactive
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/60 text-sm">© 2024 Arpan K Singh. Crafted with precision and passion.</p>
            <div className="flex items-center gap-6">
              <motion.a
                href="mailto:arpansingh30@gmail.com"
                className="text-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                data-interactive
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/arpan-k-singh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                data-interactive
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
