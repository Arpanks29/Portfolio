"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Linkedin, Brain, Zap, Layers, Sparkles, ArrowRight, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Reality Modes with clear purposes
type RealityMode = "architect" | "innovator" | "transformer" | "visionary"

// Custom Cursor Component
const CustomCursor = ({ realityMode }: { realityMode: RealityMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  const modeColors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  useEffect(() => {
    let trailId = 0
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Add to trail
      setTrail((prev) => [
        ...prev.slice(-8),
        {
          x: e.clientX,
          y: e.clientY,
          id: trailId++,
        },
      ])
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(
        target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a"),
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
      {/* Trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-1 h-1 rounded-full pointer-events-none z-[9999]"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            backgroundColor: modeColors[realityMode],
            opacity: ((index + 1) / trail.length) * 0.6,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.8 }}
        />
      ))}

      {/* Main Cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full border-2 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          borderColor: modeColors[realityMode],
          backgroundColor: isHovering ? modeColors[realityMode] : "transparent",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="fixed w-10 h-10 rounded-full border pointer-events-none z-[9998]"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          borderColor: `${modeColors[realityMode]}40`,
        }}
        animate={{
          scale: isHovering ? 0.8 : 1,
          opacity: 0.6,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}

// Story Progress Component
const StoryProgress = ({ progress, currentChapter }: { progress: number; currentChapter: string }) => {
  return (
    <motion.div
      className="fixed bottom-8 left-8 z-40 max-w-sm"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-quantum-teal animate-pulse" />
          <span className="text-white/90 text-sm font-medium">Story Progress</span>
        </div>
        <Progress value={progress * 100} className="mb-2 h-1" />
        <p className="text-white/70 text-xs leading-relaxed">{currentChapter}</p>
      </div>
    </motion.div>
  )
}

// Reality Mode Indicator
const RealityModeIndicator = ({
  mode,
  isActive,
  onClick,
  description,
}: {
  mode: RealityMode
  isActive: boolean
  onClick: () => void
  description: string
}) => {
  const icons = {
    architect: <Layers className="w-5 h-5" />,
    innovator: <Zap className="w-5 h-5" />,
    transformer: <Brain className="w-5 h-5" />,
    visionary: <Sparkles className="w-5 h-5" />,
  }

  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  return (
    <motion.button
      onClick={onClick}
      className={`relative group w-14 h-14 rounded-full border-2 backdrop-blur-sm transition-all duration-300 ${
        isActive ? "bg-white/20 border-white shadow-lg" : "bg-black/20 border-white/30 hover:border-white/60"
      }`}
      style={{
        boxShadow: isActive ? `0 0 30px ${colors[mode]}60` : "none",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="flex items-center justify-center w-full h-full"
        style={{ color: isActive ? colors[mode] : "white" }}
      >
        {icons[mode]}
      </div>

      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap">
          <p className="text-white text-sm font-medium capitalize">{mode}</p>
          <p className="text-white/70 text-xs">{description}</p>
        </div>
      </div>
    </motion.button>
  )
}

// Floating Skill Orb
const SkillOrb = ({
  skill,
  delay,
  realityMode,
}: {
  skill: { name: string; level: number; category: string }
  delay: number
  realityMode: RealityMode
}) => {
  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, scale: 0, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      whileHover={{
        scale: 1.2,
        y: -10,
        transition: { duration: 0.3 },
      }}
      viewport={{ once: true }}
    >
      <div
        className="w-20 h-20 rounded-full border-2 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundColor: `${colors[realityMode]}20`,
          borderColor: `${colors[realityMode]}60`,
          boxShadow: `0 0 20px ${colors[realityMode]}30`,
        }}
      >
        {/* Skill Level Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="35" fill="none" stroke={`${colors[realityMode]}30`} strokeWidth="2" />
          <motion.circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke={colors[realityMode]}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: skill.level / 100 }}
            transition={{ duration: 2, delay: delay + 0.5 }}
            style={{
              strokeDasharray: "220",
              strokeDashoffset: "220",
            }}
          />
        </svg>

        <span className="text-white text-xs font-bold z-10">{skill.level}%</span>

        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap">
            <p className="text-white text-sm font-medium">{skill.name}</p>
            <p className="text-white/70 text-xs">{skill.category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Interactive Timeline
const TimelineEvent = ({
  event,
  index,
  realityMode,
}: {
  event: { year: string; title: string; description: string; impact: string }
  index: number
  realityMode: RealityMode
}) => {
  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
        {/* Timeline Node */}
        <motion.div
          className="w-6 h-6 rounded-full border-4 border-white relative z-10"
          style={{ backgroundColor: colors[realityMode] }}
          whileHover={{ scale: 1.5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: colors[realityMode] }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Content Card */}
        <motion.div
          className="flex-1 max-w-md p-6 rounded-2xl border backdrop-blur-sm"
          style={{
            backgroundColor: `${colors[realityMode]}10`,
            borderColor: `${colors[realityMode]}30`,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 20px 40px ${colors[realityMode]}20`,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="outline"
              className="text-xs font-bold"
              style={{
                borderColor: colors[realityMode],
                color: colors[realityMode],
              }}
            >
              {event.year}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
          <p className="text-white/80 text-sm mb-3 leading-relaxed">{event.description}</p>
          <p className="text-sm font-semibold" style={{ color: colors[realityMode] }}>
            {event.impact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Main Portfolio Component
export default function ArpanPortfolio() {
  const [realityMode, setRealityMode] = useState<RealityMode>("architect")
  const [storyProgress, setStoryProgress] = useState(0)
  const [currentChapter, setCurrentChapter] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  // Story chapters
  const storyChapters = [
    "Chapter 1: The Architect awakens to systematic design challenges...",
    "Chapter 2: Innovation sparks as complex problems demand elegant solutions...",
    "Chapter 3: Transformation begins through strategic thinking and execution...",
    "Chapter 4: Vision crystallizes into measurable business impact...",
    "Chapter 5: The future unfolds with infinite possibilities...",
  ]

  // Reality mode configurations
  const realityConfigs = {
    architect: {
      theme: "Systematic Design & Architecture",
      description: "Building foundations for scalable solutions",
      bgGradient: "from-cyan-900/20 via-slate-900 to-teal-900/20",
      accentColor: "#00E5D3",
    },
    innovator: {
      theme: "Creative Problem Solving",
      description: "Breaking boundaries with innovative approaches",
      bgGradient: "from-pink-900/20 via-slate-900 to-rose-900/20",
      accentColor: "#FF6B9D",
    },
    transformer: {
      theme: "Business Impact & Growth",
      description: "Converting insights into measurable results",
      bgGradient: "from-yellow-900/20 via-slate-900 to-amber-900/20",
      accentColor: "#FFD166",
    },
    visionary: {
      theme: "Future-Forward Thinking",
      description: "Anticipating tomorrow's challenges today",
      bgGradient: "from-purple-900/20 via-slate-900 to-violet-900/20",
      accentColor: "#8A2BE2",
    },
  }

  // Skills data
  const skills = [
    { name: "UX Strategy", level: 95, category: "Design" },
    { name: "System Design", level: 90, category: "Architecture" },
    { name: "Data Analytics", level: 88, category: "Analysis" },
    { name: "AI Integration", level: 85, category: "Technology" },
    { name: "Team Leadership", level: 92, category: "Management" },
    { name: "Product Strategy", level: 89, category: "Business" },
  ]

  // Timeline data
  const timeline = [
    {
      year: "2024",
      title: "AI-Powered Analytics Revolution",
      description:
        "Led transformation of enterprise dashboards using machine learning insights, resulting in 40% faster decision-making across 10+ departments.",
      impact: "$10M+ revenue impact",
    },
    {
      year: "2023",
      title: "Cross-Platform Unification",
      description:
        "Architected seamless user experiences across web, mobile, and desktop platforms with 98% design consistency.",
      impact: "90K+ daily active users",
    },
    {
      year: "2022",
      title: "Friction Elimination Initiative",
      description:
        "Streamlined complex workflows across multiple SaaS platforms, reducing user onboarding time by 60%.",
      impact: "400% efficiency improvement",
    },
    {
      year: "2021",
      title: "Global Scale Architecture",
      description:
        "Designed scalable systems supporting international expansion across 15+ markets with localized experiences.",
      impact: "15+ markets launched",
    },
  ]

  // Update story progress based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      setStoryProgress(progress)
      const chapterIndex = Math.floor(progress * storyChapters.length)
      if (chapterIndex < storyChapters.length) {
        setCurrentChapter(storyChapters[chapterIndex])
      }
    })
    return unsubscribe
  }, [scrollYProgress])

  // Reality mode transition
  const switchReality = useCallback(
    (mode: RealityMode) => {
      if (mode === realityMode) return

      setIsTransitioning(true)
      setTimeout(() => {
        setRealityMode(mode)
        setIsTransitioning(false)
      }, 300)
    },
    [realityMode],
  )

  const currentConfig = realityConfigs[realityMode]

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-x-hidden bg-gradient-to-br ${currentConfig.bgGradient}`}
      style={{ cursor: "none" }}
    >
      {/* Custom Cursor */}
      <CustomCursor realityMode={realityMode} />

      {/* Story Progress */}
      <StoryProgress progress={storyProgress} currentChapter={currentChapter} />

      {/* Reality Mode Controls */}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-3">
        <div className="text-right mb-2">
          <p className="text-white/90 text-sm font-medium">{currentConfig.theme}</p>
          <p className="text-white/60 text-xs">{currentConfig.description}</p>
        </div>

        {(Object.keys(realityConfigs) as RealityMode[]).map((mode) => (
          <RealityModeIndicator
            key={mode}
            mode={mode}
            isActive={realityMode === mode}
            onClick={() => switchReality(mode)}
            description={realityConfigs[mode].description}
          />
        ))}
      </div>

      {/* LinkedIn Link */}
      <motion.a
        href="https://linkedin.com/in/arpan-k-singh/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-8 left-8 z-50 p-4 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Linkedin className="w-6 h-6 text-white" />
      </motion.a>

      {/* Reality Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(circle, ${currentConfig.accentColor}40, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: currentConfig.accentColor,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0.8, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-7xl md:text-9xl font-black leading-none mb-8"
              style={{
                background: `linear-gradient(135deg, ${currentConfig.accentColor}, white, ${currentConfig.accentColor})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              ARPAN
              <br />K SINGH
            </motion.h1>

            <motion.div
              className="text-2xl md:text-3xl mb-12 text-white/90 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Transforming complexity into clarity through{" "}
              <motion.span
                style={{ color: currentConfig.accentColor }}
                animate={{
                  textShadow: [
                    `0 0 0px ${currentConfig.accentColor}`,
                    `0 0 20px ${currentConfig.accentColor}`,
                    `0 0 0px ${currentConfig.accentColor}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                systematic innovation
              </motion.span>
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="px-8 py-4 rounded-full text-lg font-semibold border-2 backdrop-blur-sm relative overflow-hidden group"
                style={{
                  borderColor: currentConfig.accentColor,
                  color: currentConfig.accentColor,
                }}
                onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: currentConfig.accentColor }}
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
                className="px-8 py-4 rounded-full text-lg font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Connect
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Constellation */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-5xl md:text-6xl font-black text-center mb-16"
            style={{
              background: `linear-gradient(90deg, ${currentConfig.accentColor}, white)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            SKILLS CONSTELLATION
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
            {skills.map((skill, index) => (
              <SkillOrb key={skill.name} skill={skill} delay={index * 0.1} realityMode={realityMode} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2
            className="text-5xl md:text-6xl font-black text-center mb-20"
            style={{
              background: `linear-gradient(90deg, white, ${currentConfig.accentColor})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            TRANSFORMATION TIMELINE
          </motion.h2>

          {/* Timeline Line */}
          <div className="relative">
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{ backgroundColor: `${currentConfig.accentColor}40` }}
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            />

            <div className="space-y-16">
              {timeline.map((event, index) => (
                <TimelineEvent key={event.year} event={event} index={index} realityMode={realityMode} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.h2
            className="text-5xl md:text-6xl font-black mb-12"
            style={{
              background: `linear-gradient(135deg, ${currentConfig.accentColor}, white, ${currentConfig.accentColor})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            LET'S CREATE IMPACT
          </motion.h2>

          <motion.p
            className="text-xl text-white/80 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to transform your next challenge into a breakthrough solution?
            <br />
            <span className="font-semibold" style={{ color: currentConfig.accentColor }}>
              Let's architect the future together.
            </span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:arpansingh30@gmail.com"
              className="px-10 py-4 rounded-full text-lg font-semibold border-2 backdrop-blur-sm relative overflow-hidden group"
              style={{
                borderColor: currentConfig.accentColor,
                color: currentConfig.accentColor,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: currentConfig.accentColor }}
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
              className="px-10 py-4 rounded-full text-lg font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">© 2024 Arpan K Singh. Crafted with precision and passion.</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="mailto:arpansingh30@gmail.com"
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/arpan-k-singh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
