"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Linkedin, Brain, Zap, Layers, Sparkles, ArrowRight, Mail, Eye, Target, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Reality Modes
type RealityMode = "architect" | "innovator" | "transformer" | "visionary"

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

// Enhanced Timeline Event
const TimelineEvent = ({
  event,
  index,
  realityMode,
}: {
  event: { year: string; title: string; description: string; impact: string; category: string }
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
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
        {/* Timeline Node */}
        <motion.div
          className="relative w-6 h-6 rounded-full border-4 border-white z-10 flex-shrink-0"
          style={{ backgroundColor: colors[realityMode] }}
          whileHover={{ scale: 1.2 }}
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
        <motion.div className="flex-1 max-w-md" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
          <GlassCard className="p-6 relative overflow-hidden">
            <ProofParticles achievement={event.impact} color={colors[realityMode]} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <Badge
                  className="text-xs font-bold px-3 py-1"
                  style={{
                    backgroundColor: `${colors[realityMode]}20`,
                    color: colors[realityMode],
                    border: `1px solid ${colors[realityMode]}40`,
                  }}
                >
                  {event.year}
                </Badge>
                <Badge variant="outline" className="text-xs text-white/70 border-white/30">
                  {event.category}
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
              <p className="text-white/80 text-sm mb-3 leading-relaxed">{event.description}</p>
              <p className="text-sm font-semibold" style={{ color: colors[realityMode] }}>
                {event.impact}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Story Section Component
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
      icon: <Layers className="w-6 h-6" />,
    },
    {
      phase: "Discovery",
      title: "The Problem Decoder",
      story:
        "Through countless user interviews and data deep-dives, I discovered that the most valuable insights hide in the spaces between what people say and what they actually do.",
      insight: "True innovation comes from translating unspoken needs into elegant solutions.",
      icon: <Eye className="w-6 h-6" />,
    },
    {
      phase: "Innovation",
      title: "The Boundary Breaker",
      story:
        "When conventional approaches hit walls, I learned to question the walls themselves. Some of my biggest breakthroughs came from asking 'What if we're solving the wrong problem?'",
      insight: "Constraints are often self-imposed. The real magic happens when you reframe the entire challenge.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      phase: "Impact",
      title: "The Value Creator",
      story:
        "Ideas without execution are just dreams. I mastered the art of turning insights into measurable business impact, learning that the best solutions feel inevitable in hindsight.",
      insight: "Sustainable transformation requires both vision and relentless execution discipline.",
      icon: <Target className="w-6 h-6" />,
    },
    {
      phase: "Evolution",
      title: "The Future Architect",
      story:
        "Today, I don't just solve current problems—I architect solutions for challenges that don't exist yet. The future belongs to those who can see around corners.",
      insight: "The most powerful transformations prepare organizations for futures they can't yet imagine.",
      icon: <Brain className="w-6 h-6" />,
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
            <motion.div
              key={beat.phase}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 relative overflow-hidden" intensity="medium">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Phase Indicator */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${colors[realityMode]}20` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{ color: colors[realityMode] }}>{beat.icon}</div>
                    </motion.div>
                    <Badge
                      className="text-xs font-bold"
                      style={{
                        backgroundColor: `${colors[realityMode]}20`,
                        color: colors[realityMode],
                        border: `1px solid ${colors[realityMode]}40`,
                      }}
                    >
                      {beat.phase}
                    </Badge>
                  </div>

                  {/* Story Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">{beat.title}</h3>
                    <p className="text-white/80 text-lg mb-4 leading-relaxed">{beat.story}</p>
                    <div
                      className="text-base font-semibold italic border-l-4 pl-4"
                      style={{
                        color: colors[realityMode],
                        borderColor: colors[realityMode],
                      }}
                    >
                      "{beat.insight}"
                    </div>
                  </div>
                </div>

                {/* Subtle background pattern */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-5"
                  style={{
                    background: `radial-gradient(circle, ${colors[realityMode]} 2px, transparent 2px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Journey Visualization
const JourneyVisualization = ({ realityMode }: { realityMode: RealityMode }) => {
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

  return (
    <GlassCard className="p-8 relative overflow-hidden" intensity="medium">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.title}
            className="text-center relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Progress Circle */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90">
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
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm font-bold">{milestone.progress}%</span>
              </div>
            </div>

            <h4 className="text-white font-bold text-sm mb-1">{milestone.title}</h4>
            <p className="text-white/70 text-xs">{milestone.desc}</p>

            {/* Connection Line */}
            {index < milestones.length - 1 && (
              <div className="hidden md:block absolute top-10 left-full w-6 h-0.5 bg-white/20" />
            )}
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

// Skills Grid
const SkillsGrid = ({ realityMode }: { realityMode: RealityMode }) => {
  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }

  const skills = [
    { name: "UX Strategy", level: 95, category: "Design" },
    { name: "System Design", level: 90, category: "Architecture" },
    { name: "Data Analytics", level: 88, category: "Analysis" },
    { name: "AI Integration", level: 85, category: "Technology" },
    { name: "Team Leadership", level: 92, category: "Management" },
    { name: "Product Strategy", level: 89, category: "Business" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-6 text-center relative overflow-hidden" intensity="light">
            <ProofParticles achievement={`${skill.level}%`} color={colors[realityMode]} />

            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke={colors[realityMode]}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: skill.level / 100 }}
                    transition={{ duration: 2, delay: index * 0.1 }}
                    style={{
                      strokeDasharray: "176",
                      strokeDashoffset: "176",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{skill.level}%</span>
                </div>
              </div>

              <h4 className="text-white font-bold text-sm mb-1">{skill.name}</h4>
              <p className="text-white/70 text-xs">{skill.category}</p>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}

// Main Portfolio Component
export default function ArpanPortfolio() {
  const [realityMode, setRealityMode] = useState<RealityMode>("architect")
  const [timelineCategory, setTimelineCategory] = useState<RealityMode>("architect")
  const [showTimelineControls, setShowTimelineControls] = useState(false)

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
          "Designed RESTful API architecture enabling seamless third-party integrations and internal service communication.",
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
      {/* Subtle Background Pattern */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${colors[realityMode]} 2px, transparent 2px)`,
          backgroundSize: "50px 50px",
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
      <section id="journey" className="py-20">
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

      {/* Skills Section */}
      <section className="py-20">
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
              EXPERTISE MASTERY
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Quantified competencies across the transformation spectrum, each percentage representing years of
              deliberate practice.
            </p>
          </motion.div>

          <SkillsGrid realityMode={realityMode} />
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
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{
                background: `linear-gradient(to bottom, transparent, ${colors[timelineCategory]}, transparent)`,
              }}
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            />

            <div className="space-y-16">
              {timelineData[timelineCategory].map((event, index) => (
                <TimelineEvent
                  key={`${timelineCategory}-${event.year}`}
                  event={event}
                  index={index}
                  realityMode={realityMode}
                />
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
