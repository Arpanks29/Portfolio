"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import {
  Linkedin,
  ExternalLink,
  Eye,
  Brain,
  Zap,
  Code,
  Layers,
  Sparkles,
  Triangle,
  Circle,
  Square,
  Star,
  Hexagon,
} from "lucide-react"

// Reality Modes
type RealityMode = "quantum" | "neural" | "cosmic" | "matrix"

// Impossible Geometry Component
const ImpossibleCube = ({ size = 100, rotation = 0 }) => {
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* This creates an impossible cube using CSS transforms */}
      <div
        className="absolute inset-0 border-2 border-quantum-teal transform-gpu"
        style={{
          clipPath: "polygon(0 0, 70% 0, 100% 30%, 30% 100%, 0 70%)",
          transform: "rotateX(45deg) rotateY(45deg)",
        }}
      />
      <div
        className="absolute inset-0 border-2 border-innovation-pink transform-gpu"
        style={{
          clipPath: "polygon(30% 0, 100% 0, 100% 70%, 70% 100%, 0 30%)",
          transform: "rotateX(-45deg) rotateY(-45deg)",
        }}
      />
      <div
        className="absolute inset-0 border-2 border-value-gold transform-gpu"
        style={{
          clipPath: "polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)",
          transform: "rotateZ(45deg)",
        }}
      />
    </div>
  )
}

// Liquid Text Component
const LiquidText = ({ children, className = "" }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        })
      }
    }

    const element = textRef.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
      return () => element.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={textRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          filter: `blur(${Math.abs(mousePos.x + mousePos.y) / 10}px)`,
        }}
      >
        {children}
      </div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
          filter: "blur(2px)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Morphing Shape Component
const MorphingShape = ({ shapes, currentIndex, size = 60 }) => {
  const shapeComponents = {
    triangle: Triangle,
    circle: Circle,
    square: Square,
    star: Star,
    hexagon: Hexagon,
  }

  const CurrentShape = shapeComponents[shapes[currentIndex] as keyof typeof shapeComponents]

  return (
    <motion.div
      className="relative"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
    >
      <CurrentShape
        size={size}
        className="text-quantum-teal drop-shadow-lg"
        style={{
          filter: "drop-shadow(0 0 10px currentColor)",
        }}
      />
    </motion.div>
  )
}

// Reality Distortion Field
const RealityField = ({ mode, children }: { mode: RealityMode; children: React.ReactNode }) => {
  const getFieldStyle = () => {
    switch (mode) {
      case "quantum":
        return {
          background: "radial-gradient(circle at 50% 50%, rgba(0,229,211,0.1) 0%, transparent 70%)",
          backdropFilter: "blur(1px) hue-rotate(0deg)",
          animation: "quantum-pulse 3s ease-in-out infinite",
        }
      case "neural":
        return {
          background: "linear-gradient(45deg, rgba(255,107,157,0.1) 0%, rgba(138,43,226,0.1) 100%)",
          backdropFilter: "blur(2px) contrast(1.2)",
          animation: "neural-wave 4s ease-in-out infinite",
        }
      case "cosmic":
        return {
          background:
            "conic-gradient(from 0deg, rgba(255,209,102,0.1), rgba(255,107,157,0.1), rgba(0,229,211,0.1), rgba(255,209,102,0.1))",
          backdropFilter: "blur(3px) saturate(1.5)",
          animation: "cosmic-rotation 6s linear infinite",
        }
      case "matrix":
        return {
          background: "repeating-linear-gradient(90deg, transparent, rgba(0,255,0,0.03) 2px, transparent 4px)",
          backdropFilter: "blur(0.5px) brightness(1.1)",
          animation: "matrix-scan 2s linear infinite",
        }
    }
  }

  return (
    <div className="relative" style={getFieldStyle()}>
      {children}
    </div>
  )
}

// Typing Animation Component
const TypewriterText = ({ text, speed = 50, className = "" }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-6 bg-current ml-1"
      />
    </span>
  )
}

// Main Portfolio Component
export default function ArpanPortfolio() {
  const [realityMode, setRealityMode] = useState<RealityMode>("quantum")
  const [currentStory, setCurrentStory] = useState(0)
  const [mouseTrail, setMouseTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const [isRevealing, setIsRevealing] = useState(false)
  const [morphingIndex, setMorphingIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Reality mode colors
  const modeColors = {
    quantum: { primary: "#00E5D3", secondary: "#FF6B9D", accent: "#FFD166" },
    neural: { primary: "#8A2BE2", secondary: "#FF1493", accent: "#00CED1" },
    cosmic: { primary: "#FFD700", secondary: "#FF4500", accent: "#9370DB" },
    matrix: { primary: "#00FF00", secondary: "#008000", accent: "#ADFF2F" },
  }

  // Story progression
  const storyBeats = [
    "In the beginning, there was chaos...",
    "Complex problems demanded elegant solutions...",
    "Through systematic thinking, patterns emerged...",
    "Innovation crystallized into measurable impact...",
    "The future awaits new possibilities...",
  ]

  // Mouse trail effect
  useEffect(() => {
    let trailId = 0
    const handleMouseMove = (e: MouseEvent) => {
      setMouseTrail((prev) => [...prev.slice(-20), { x: e.clientX, y: e.clientY, id: trailId++ }])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Morphing shapes cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setMorphingIndex((prev) => (prev + 1) % 5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Story progression based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const newStory = Math.floor(progress * storyBeats.length)
      if (newStory !== currentStory && newStory < storyBeats.length) {
        setCurrentStory(newStory)
      }
    })
    return unsubscribe
  }, [scrollYProgress, currentStory, storyBeats.length])

  const switchReality = (mode: RealityMode) => {
    setIsRevealing(true)
    setTimeout(() => {
      setRealityMode(mode)
      setIsRevealing(false)
    }, 500)
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden cursor-none"
      style={{
        background: `linear-gradient(135deg, 
          ${modeColors[realityMode].primary}10 0%, 
          #0A192F 50%, 
          ${modeColors[realityMode].secondary}10 100%)`,
      }}
    >
      {/* Mouse Trail */}
      {mouseTrail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-50"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            backgroundColor: modeColors[realityMode].primary,
            opacity: ((index + 1) / mouseTrail.length) * 0.6,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Reality Mode Switcher */}
      <div className="fixed top-8 right-8 z-50 flex gap-2">
        {(["quantum", "neural", "cosmic", "matrix"] as RealityMode[]).map((mode) => (
          <motion.button
            key={mode}
            onClick={() => switchReality(mode)}
            className={`w-12 h-12 rounded-full border-2 backdrop-blur-sm transition-all duration-300 ${
              realityMode === mode ? `border-current bg-current/20` : "border-white/30 hover:border-white/60"
            }`}
            style={{
              color: modeColors[mode].primary,
              boxShadow: realityMode === mode ? `0 0 20px ${modeColors[mode].primary}40` : "none",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mode === "quantum" && <Zap className="w-5 h-5 mx-auto" />}
            {mode === "neural" && <Brain className="w-5 h-5 mx-auto" />}
            {mode === "cosmic" && <Sparkles className="w-5 h-5 mx-auto" />}
            {mode === "matrix" && <Code className="w-5 h-5 mx-auto" />}
          </motion.button>
        ))}
      </div>

      {/* LinkedIn Link */}
      <motion.a
        href="https://linkedin.com/in/arpan-k-singh/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-8 left-8 z-50 p-3 rounded-full backdrop-blur-sm border border-white/20"
        style={{
          backgroundColor: `${modeColors[realityMode].primary}20`,
          borderColor: `${modeColors[realityMode].primary}40`,
        }}
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Linkedin className="w-5 h-5" style={{ color: modeColors[realityMode].primary }} />
      </motion.a>

      {/* Story Narrator */}
      <div className="fixed bottom-8 left-8 z-40 max-w-md">
        <motion.div
          className="p-4 rounded-2xl backdrop-blur-md border"
          style={{
            backgroundColor: `${modeColors[realityMode].primary}10`,
            borderColor: `${modeColors[realityMode].primary}30`,
          }}
          key={currentStory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TypewriterText text={storyBeats[currentStory]} className="text-white text-lg font-medium" />
        </motion.div>
      </div>

      {/* Reality Transition Overlay */}
      <AnimatePresence>
        {isRevealing && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(circle, ${modeColors[realityMode].primary}40, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <RealityField mode={realityMode}>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          {/* Impossible Geometry Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <ImpossibleCube size={60 + i * 20} rotation={i * 45} />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <LiquidText className="mb-8">
                <h1
                  className="text-8xl md:text-9xl font-black leading-none"
                  style={{
                    background: `linear-gradient(45deg, 
                      ${modeColors[realityMode].primary}, 
                      ${modeColors[realityMode].secondary}, 
                      ${modeColors[realityMode].accent})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 20px currentColor)",
                  }}
                >
                  ARPAN
                  <br />K SINGH
                </h1>
              </LiquidText>

              <motion.div
                className="text-3xl md:text-4xl mb-12 text-white/90"
                animate={{
                  textShadow: [
                    `0 0 0px ${modeColors[realityMode].primary}`,
                    `0 0 20px ${modeColors[realityMode].primary}`,
                    `0 0 0px ${modeColors[realityMode].primary}`,
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <TypewriterText text="Where impossibility becomes innovation" speed={80} />
              </motion.div>

              {/* Morphing Shapes */}
              <div className="flex justify-center gap-8 mb-12">
                {["triangle", "circle", "square", "star", "hexagon"].map((shape, index) => (
                  <motion.div
                    key={shape}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    <MorphingShape
                      shapes={["triangle", "circle", "square", "star", "hexagon"]}
                      currentIndex={(morphingIndex + index) % 5}
                      size={40 + index * 5}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Cipher Section */}
        <section className="min-h-screen py-20 relative">
          <div className="max-w-7xl mx-auto px-8">
            <motion.h2
              className="text-7xl font-black text-center mb-20"
              style={{
                background: `linear-gradient(90deg, 
                  ${modeColors[realityMode].primary}, 
                  ${modeColors[realityMode].secondary})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              whileInView={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              EXPERIENCE CIPHER
            </motion.h2>

            {/* Floating Cards with Impossible Physics */}
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Analytics Revolution",
                  description:
                    "Transformed chaotic enterprise dashboards into intuitive insights, driving $10M+ revenue through improved decision-making.",
                  impact: "$10M+ product impact",
                  icon: <Eye className="w-8 h-8" />,
                },
                {
                  title: "Friction Eliminator",
                  description:
                    "Streamlined complex workflows across 10+ SaaS platforms, removing barriers that hindered user adoption.",
                  impact: "10+ SaaS revamps",
                  icon: <Zap className="w-8 h-8" />,
                },
                {
                  title: "Cross-Platform Harmony",
                  description:
                    "Unified fragmented user experiences into cohesive brand journeys with 98% consistency scores.",
                  impact: "Brand consistency achieved",
                  icon: <Layers className="w-8 h-8" />,
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: {
                      duration: 0.8,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                    },
                  }}
                  whileHover={{
                    y: -20,
                    rotateY: 10,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Card with impossible geometry */}
                  <div
                    className="p-8 rounded-3xl backdrop-blur-md border relative overflow-hidden"
                    style={{
                      backgroundColor: `${modeColors[realityMode].primary}10`,
                      borderColor: `${modeColors[realityMode].primary}30`,
                      boxShadow: `0 20px 40px ${modeColors[realityMode].primary}20`,
                    }}
                  >
                    {/* Impossible corner */}
                    <div
                      className="absolute -top-4 -right-4 w-8 h-8 border-2 transform rotate-45"
                      style={{
                        borderColor: modeColors[realityMode].secondary,
                        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0 100%)",
                      }}
                    />

                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative"
                      style={{ backgroundColor: `${modeColors[realityMode].primary}20` }}
                    >
                      <div style={{ color: modeColors[realityMode].primary }}>{project.icon}</div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white">{project.title}</h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                    <div className="text-sm font-semibold" style={{ color: modeColors[realityMode].accent }}>
                      {project.impact}
                    </div>

                    {/* Hover effect - particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            backgroundColor: modeColors[realityMode].primary,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Systems Decoder Section */}
        <section className="min-h-screen py-20 relative">
          <div className="max-w-7xl mx-auto px-8">
            <motion.h2
              className="text-7xl font-black text-center mb-20"
              style={{
                background: `conic-gradient(from 0deg, 
                  ${modeColors[realityMode].primary}, 
                  ${modeColors[realityMode].secondary}, 
                  ${modeColors[realityMode].accent}, 
                  ${modeColors[realityMode].primary})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              SYSTEMS DECODER
            </motion.h2>

            {/* Impossible Architecture Visualization */}
            <div className="relative h-96 mb-20">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 400"
                style={{ filter: `drop-shadow(0 0 10px ${modeColors[realityMode].primary})` }}
              >
                {/* Impossible connections */}
                <motion.path
                  d="M100,200 Q400,100 700,200 Q400,300 100,200"
                  fill="none"
                  stroke={modeColors[realityMode].primary}
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                <motion.path
                  d="M200,100 Q400,200 600,100 Q400,200 200,300"
                  fill="none"
                  stroke={modeColors[realityMode].secondary}
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                />

                {/* Nodes */}
                {[
                  { x: 100, y: 200, label: "AI Engine" },
                  { x: 400, y: 150, label: "Global Scale" },
                  { x: 700, y: 200, label: "Optimization" },
                ].map((node, index) => (
                  <g key={index}>
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="20"
                      fill={modeColors[realityMode].accent}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.3, type: "spring" }}
                    />
                    <motion.text
                      x={node.x}
                      y={node.y - 35}
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.3 + 0.5 }}
                    >
                      {node.label}
                    </motion.text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Achievement Stats with Impossible Counters */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { value: "90K+", label: "Daily Users", description: "Serving global audiences" },
                { value: "400%", label: "Efficiency Gain", description: "Through AI integration" },
                { value: "60%", label: "Cost Reduction", description: "Via optimization" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-8 rounded-3xl backdrop-blur-md border"
                  style={{
                    backgroundColor: `${modeColors[realityMode].primary}05`,
                    borderColor: `${modeColors[realityMode].primary}20`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="text-6xl font-black mb-4"
                    style={{ color: modeColors[realityMode].primary }}
                    animate={{
                      textShadow: [
                        `0 0 0px ${modeColors[realityMode].primary}`,
                        `0 0 20px ${modeColors[realityMode].primary}`,
                        `0 0 0px ${modeColors[realityMode].primary}`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {stat.value}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-white">{stat.label}</h3>
                  <p className="text-gray-400">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section with Reality Breach */}
        <section className="min-h-screen py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
            <motion.h2
              className="text-7xl font-black mb-12"
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, type: "spring" }}
              style={{
                background: `linear-gradient(45deg, 
                  ${modeColors[realityMode].primary}, 
                  ${modeColors[realityMode].secondary})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                transformStyle: "preserve-3d",
              }}
            >
              BREACH REALITY
            </motion.h2>

            <motion.div
              className="relative p-12 rounded-3xl backdrop-blur-md border max-w-4xl mx-auto"
              style={{
                backgroundColor: `${modeColors[realityMode].primary}10`,
                borderColor: `${modeColors[realityMode].primary}30`,
                boxShadow: `0 0 60px ${modeColors[realityMode].primary}30`,
              }}
              initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring" }}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
            >
              {/* Impossible portal effect */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30"
                style={{
                  background: `conic-gradient(from 0deg, 
                    ${modeColors[realityMode].primary}40, 
                    transparent, 
                    ${modeColors[realityMode].secondary}40, 
                    transparent)`,
                  animation: "spin 8s linear infinite",
                }}
              />

              <div className="relative z-10">
                <LiquidText>
                  <p className="text-2xl text-white mb-8 leading-relaxed">
                    Ready to transcend conventional boundaries?
                    <br />
                    <span className="font-bold" style={{ color: modeColors[realityMode].accent }}>
                      Let's architect the impossible together.
                    </span>
                  </p>
                </LiquidText>

                <motion.button
                  className="px-12 py-4 rounded-full text-xl font-bold backdrop-blur-sm border-2 relative overflow-hidden"
                  style={{
                    color: modeColors[realityMode].primary,
                    borderColor: modeColors[realityMode].primary,
                    backgroundColor: `${modeColors[realityMode].primary}10`,
                  }}
                  onClick={() =>
                    window.open("mailto:arpansingh30@gmail.com?subject=Breaching Reality Together", "_blank")
                  }
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 40px ${modeColors[realityMode].primary}60`,
                    backgroundColor: `${modeColors[realityMode].primary}20`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    style={{ backgroundColor: modeColors[realityMode].primary }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Initiate Contact
                    <ExternalLink className="w-5 h-5" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Background reality distortion */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: modeColors[realityMode].primary,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </section>
      </RealityField>
    </div>
  )
}
