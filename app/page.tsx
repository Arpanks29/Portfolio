"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Linkedin, ExternalLink, Layers, Globe, Cpu, Eye, Hexagon, Star } from "lucide-react"

// Quantum Particle System
class QuantumParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number

  constructor(x: number, y: number, color = "#00E5D3") {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
    this.size = Math.random() * 3 + 1
    this.opacity = Math.random() * 0.8 + 0.2
    this.color = color
    this.life = 0
    this.maxLife = Math.random() * 200 + 100
  }

  update(mouseX: number, mouseY: number) {
    // Attract to mouse
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 150) {
      const force = (150 - distance) / 150
      this.vx += (dx / distance) * force * 0.1
      this.vy += (dy / distance) * force * 0.1
    }

    this.x += this.vx
    this.y += this.vy
    this.vx *= 0.99
    this.vy *= 0.99
    this.life++

    // Fade out near end of life
    if (this.life > this.maxLife * 0.8) {
      this.opacity *= 0.98
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()

    // Add glow effect
    ctx.shadowBlur = 10
    ctx.shadowColor = this.color
    ctx.fill()
    ctx.restore()
  }

  isDead() {
    return this.life > this.maxLife || this.opacity < 0.01
  }
}

export default function ArpanPortfolio() {
  const [currentSection, setCurrentSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [starPath, setStarPath] = useState<{ x: number; y: number }[]>([])
  const [talentAlchemyUnlocked, setTalentAlchemyUnlocked] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<QuantumParticle[]>([])
  const animationRef = useRef<number>()

  const { scrollYProgress } = useScroll()
  const sectionProgress = useTransform(scrollYProgress, [0, 1], [0, 4])

  // Smooth cursor
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 400 })
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 400 })

  // Initialize particle system
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    particlesRef.current = []
    for (let i = 0; i < 100; i++) {
      particlesRef.current.push(
        new QuantumParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() > 0.7 ? "#FF6B9D" : Math.random() > 0.5 ? "#FFD166" : "#00E5D3",
        ),
      )
    }
  }, [])

  // Animate particles
  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.update(mousePosition.x, mousePosition.y)
      particle.draw(ctx)
      return !particle.isDead()
    })

    // Add new particles occasionally
    if (Math.random() < 0.02 && particlesRef.current.length < 150) {
      particlesRef.current.push(
        new QuantumParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() > 0.7 ? "#FF6B9D" : Math.random() > 0.5 ? "#FFD166" : "#00E5D3",
        ),
      )
    }

    animationRef.current = requestAnimationFrame(animateParticles)
  }, [mousePosition])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12)
      cursorY.set(e.clientY - 12)
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (isDrawing) {
        setStarPath((prev) => [...prev.slice(-20), { x: e.clientX, y: e.clientY }])
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsDrawing(true)
        setStarPath([{ x: e.clientX, y: e.clientY }])
      }
    }

    const handleMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false)
        checkStarPattern()
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [cursorX, cursorY, isDrawing])

  // Check if drawn pattern resembles a star
  const checkStarPattern = () => {
    if (starPath.length < 10) return

    // Simple star detection - check for direction changes
    let directionChanges = 0
    for (let i = 2; i < starPath.length - 1; i++) {
      const prev = starPath[i - 1]
      const curr = starPath[i]
      const next = starPath[i + 1]

      const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x)
      const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x)
      const angleDiff = Math.abs(angle2 - angle1)

      if (angleDiff > Math.PI / 3) {
        directionChanges++
      }
    }

    if (directionChanges >= 4) {
      setTalentAlchemyUnlocked(true)
      setStarPath([])
    }
  }

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initParticles])

  // Start animation
  useEffect(() => {
    animateParticles()
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animateParticles])

  // Track scroll progress
  useEffect(() => {
    const unsubscribe = sectionProgress.onChange((latest) => {
      setCurrentSection(Math.floor(latest))
    })
    return () => unsubscribe()
  }, [sectionProgress])

  const sections = [
    { id: "hero", title: "The Vision", color: "#00E5D3" },
    { id: "experience", title: "Experience Cipher", color: "#FF6B9D" },
    { id: "systems", title: "Systems Decoder", color: "#FFD166" },
    { id: "perception", title: "Perception Key", color: "#00E5D3" },
    { id: "contact", title: "Possibilities", color: "#FF6B9D" },
  ]

  return (
    <div className="relative min-h-screen bg-deep-space text-white overflow-hidden cursor-none">
      {/* Quantum Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "linear-gradient(135deg, #0A192F 0%, #112240 50%, #0A192F 100%)" }}
      />

      {/* Frosted Glass Overlay */}
      <div className="fixed inset-0 bg-white/[0.02] backdrop-blur-[0.5px] z-10 pointer-events-none" />

      {/* Custom Hexagonal Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            scale: cursorVariant === "hover" ? 1.5 : 1,
            rotate: cursorVariant === "hover" ? 30 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <Hexagon
            className={`w-full h-full ${
              cursorVariant === "hover" ? "text-quantum-teal" : "text-white"
            } mix-blend-difference`}
            fill="currentColor"
            fillOpacity={0.3}
            stroke="currentColor"
            strokeWidth={1}
          />
        </motion.div>
      </motion.div>

      {/* Star Drawing Trail */}
      {isDrawing && starPath.length > 1 && (
        <svg className="fixed inset-0 pointer-events-none z-40">
          <path
            d={`M ${starPath[0].x} ${starPath[0].y} ${starPath
              .slice(1)
              .map((p) => `L ${p.x} ${p.y}`)
              .join(" ")}`}
            stroke="#FFD166"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
        </svg>
      )}

      {/* Navigation Dots */}
      <div className="fixed top-8 right-8 z-40 flex flex-col gap-3">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`w-3 h-3 rounded-full border border-white/30 transition-all duration-300 ${
              currentSection === index ? "bg-quantum-teal scale-125" : "bg-transparent hover:bg-white/50"
            }`}
            onClick={() => {
              const element = document.getElementById(section.id)
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* LinkedIn Profile Link */}
      <motion.a
        href="https://linkedin.com/in/arpan-k-singh/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-8 left-8 z-40 glass-panel p-3 rounded-full border border-quantum-teal/30 hover:border-quantum-teal/60 transition-all duration-300"
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: ["0 0 0 rgba(0, 229, 211, 0)", "0 0 20px rgba(0, 229, 211, 0.3)", "0 0 0 rgba(0, 229, 211, 0)"],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <Linkedin className="w-5 h-5 text-quantum-teal" />
      </motion.a>

      {/* Hero Section - The Catalyst Gallery */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative z-20">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <motion.div
            className="glass-panel p-12 rounded-3xl border border-white/10"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              className="text-7xl md:text-8xl font-black mb-8 leading-none"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <span className="bg-gradient-to-r from-quantum-teal via-innovation-pink to-value-gold bg-clip-text text-transparent">
                WHERE COMPLEXITY
              </span>
              <br />
              <span className="text-white">BECOMES ELEGANCE</span>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl mb-12 text-gray-300 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Product leadership through{" "}
              <motion.span
                className="text-quantum-teal font-bold"
                animate={{
                  textShadow: ["0 0 0px #00E5D3", "0 0 20px #00E5D3", "0 0 0px #00E5D3"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                intentional design
              </motion.span>
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {["Enterprise UX", "Full-Stack Architecture", "Strategic Branding", "AI Integration"].map(
                (skill, index) => (
                  <motion.div
                    key={skill}
                    className="glass-panel px-6 py-3 rounded-full border border-white/20"
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(0, 229, 211, 0.5)",
                    }}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                  >
                    {skill}
                  </motion.div>
                ),
              )}
            </motion.div>
          </motion.div>

          {/* Gateway System */}
          <motion.div
            className="mt-16 grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <GatewayCard
              icon={<Eye className="w-8 h-8" />}
              title="EXPERIENCE CIPHER"
              subtitle="Human-centered systems"
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
              hoverEffect="wireframe"
              setCursorVariant={setCursorVariant}
            />
            <GatewayCard
              icon={<Layers className="w-8 h-8" />}
              title="SYSTEMS DECODER"
              subtitle="Architecture with purpose"
              onClick={() => document.getElementById("systems")?.scrollIntoView({ behavior: "smooth" })}
              hoverEffect="geometric"
              setCursorVariant={setCursorVariant}
            />
            <GatewayCard
              icon={<Star className="w-8 h-8" />}
              title="PERCEPTION KEY"
              subtitle="Strategic brand resonance"
              onClick={() => document.getElementById("perception")?.scrollIntoView({ behavior: "smooth" })}
              hoverEffect="constellation"
              setCursorVariant={setCursorVariant}
            />
          </motion.div>
        </div>
      </section>

      {/* Experience Cipher Section */}
      <section id="experience" className="min-h-screen py-20 relative z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-teal/10 via-transparent to-innovation-pink/10" />

        <div className="max-w-7xl mx-auto px-8 relative">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-quantum-teal to-innovation-pink bg-clip-text text-transparent">
              EXPERIENCE CIPHER
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <InteractiveShowcase
              title="Analytics Revolution"
              description="Transformed chaotic enterprise dashboards into intuitive insights, driving $10M+ revenue through improved decision-making."
              impact="$10M+ product impact"
              interactionType="dashboard-toggle"
              color="from-quantum-teal to-blue-500"
              setCursorVariant={setCursorVariant}
            />

            <InteractiveShowcase
              title="Friction Eliminator"
              description="Streamlined complex workflows across 10+ SaaS platforms, removing barriers that hindered user adoption."
              impact="10+ SaaS revamps"
              interactionType="obstacle-removal"
              color="from-innovation-pink to-purple-500"
              setCursorVariant={setCursorVariant}
            />

            <InteractiveShowcase
              title="Cross-Platform Harmony"
              description="Unified fragmented user experiences into cohesive brand journeys with 98% consistency scores."
              impact="Brand consistency achieved"
              interactionType="connection-builder"
              color="from-value-gold to-orange-500"
              setCursorVariant={setCursorVariant}
            />
          </div>
        </div>
      </section>

      {/* Systems Decoder Section */}
      <section id="systems" className="min-h-screen py-20 relative z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-value-gold/10 via-transparent to-quantum-teal/10" />

        <div className="max-w-7xl mx-auto px-8 relative">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-value-gold to-quantum-teal bg-clip-text text-transparent">
              SYSTEMS DECODER
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <InteractiveShowcase
              title="AI Insight Engine"
              description="Integrated generative AI to crystallize raw data into actionable insights, reducing analysis time by 75%."
              impact="GenAI integration mastery"
              interactionType="data-crystallization"
              color="from-purple-500 to-pink-500"
              setCursorVariant={setCursorVariant}
            />

            <InteractiveShowcase
              title="Scalability Simulator"
              description="Architected adaptive systems serving 90K+ daily users across 5+ global deployments with 99.9% uptime."
              impact="5+ global deployments"
              interactionType="architecture-expansion"
              color="from-blue-500 to-cyan-500"
              setCursorVariant={setCursorVariant}
            />

            <InteractiveShowcase
              title="Efficiency Forge"
              description="Optimized legacy architectures to achieve 60% cost savings while improving performance by 300%."
              impact="60% cost optimization"
              interactionType="component-optimization"
              color="from-green-500 to-emerald-500"
              setCursorVariant={setCursorVariant}
            />
          </div>
        </div>
      </section>

      {/* Perception Key Section */}
      <section id="perception" className="min-h-screen py-20 relative z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-innovation-pink/10 via-transparent to-value-gold/10" />

        <div className="max-w-7xl mx-auto px-8 relative">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-innovation-pink to-value-gold bg-clip-text text-transparent">
              PERCEPTION KEY
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <InteractiveShowcase
              title="Trust Algorithm"
              description="Engineered stakeholder alignment systems achieving 100% client retention through transparent methodologies."
              impact="100% retention rate"
              interactionType="trust-balance"
              color="from-green-400 to-emerald-500"
              setCursorVariant={setCursorVariant}
            />

            <InteractiveShowcase
              title="Global Engagement"
              description="Designed culturally adaptive interfaces serving 90K+ daily interactions across diverse markets."
              impact="90K+ daily interactions"
              interactionType="cultural-adaptation"
              color="from-blue-400 to-purple-500"
              setCursorVariant={setCursorVariant}
            />

            <InteractiveShowcase
              title="Identity Evolution"
              description="Transformed generic brand positioning into distinctive market presence with 280% recognition increase."
              impact="Unified brand ecosystems"
              interactionType="identity-morph"
              color="from-yellow-400 to-red-500"
              setCursorVariant={setCursorVariant}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 relative z-20">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <motion.h2
            className="text-6xl font-black mb-12"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-quantum-teal to-innovation-pink bg-clip-text text-transparent">
              DISCUSS POSSIBILITIES
            </span>
          </motion.h2>

          <motion.div
            className="glass-panel p-12 rounded-3xl border border-white/10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
              Complexity distilled to elegant solutions.{" "}
              <span className="text-quantum-teal font-bold">Architecture engineered for impact.</span>
              <br />
              Brands transformed through strategic perception.
            </p>

            <motion.button
              className="glass-panel px-12 py-4 rounded-full border border-quantum-teal/50 text-xl font-bold text-quantum-teal hover:bg-quantum-teal/10 transition-all duration-300"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              onClick={() => window.open("mailto:arpansingh30@gmail.com?subject=Discussing Possibilities", "_blank")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 229, 211, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Connect via Email
                <ExternalLink className="w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Talent Alchemy Easter Egg */}
      <AnimatePresence>
        {talentAlchemyUnlocked && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-panel p-12 rounded-3xl border border-value-gold/50 max-w-2xl text-center"
              initial={{ scale: 0.5, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: 90 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-6"
              >
                <Star className="w-full h-full text-value-gold" />
              </motion.div>

              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-value-gold to-innovation-pink bg-clip-text text-transparent">
                ✨ TALENT ALCHEMY UNLOCKED ✨
              </h3>

              <div className="space-y-6 mb-8">
                <div className="glass-panel p-4 rounded-xl border border-quantum-teal/30">
                  <h4 className="text-xl font-bold text-quantum-teal mb-2">NVIDIA GenAI Certified</h4>
                  <p className="text-gray-300">Advanced AI integration and machine learning implementation expertise</p>
                </div>

                <div className="glass-panel p-4 rounded-xl border border-innovation-pink/30">
                  <h4 className="text-xl font-bold text-innovation-pink mb-2">Solution Philosophy</h4>
                  <p className="text-gray-300">
                    "Every complex challenge contains the seeds of its own elegant solution. The art lies in patient
                    cultivation."
                  </p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-value-gold to-innovation-pink hover:from-yellow-500 hover:to-pink-500 text-black font-bold"
                  onClick={() =>
                    window.open("mailto:arpansingh30@gmail.com?subject=Talent Alchemy Discovery", "_blank")
                  }
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  Explore Collaboration
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTalentAlchemyUnlocked(false)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Continue Journey
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Gateway Card Component
function GatewayCard({
  icon,
  title,
  subtitle,
  onClick,
  hoverEffect,
  setCursorVariant,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  onClick: () => void
  hoverEffect: string
  setCursorVariant: (variant: string) => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      className="glass-panel p-8 rounded-2xl border border-white/10 text-left hover:border-quantum-teal/30 transition-all duration-500"
      onClick={onClick}
      onMouseEnter={() => {
        setCursorVariant("hover")
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setCursorVariant("default")
        setIsHovered(false)
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-quantum-teal/20 text-quantum-teal">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400">{subtitle}</p>
        </div>
      </div>

      {/* Hover Effect Preview */}
      <div className="h-16 relative overflow-hidden rounded-lg bg-white/5">
        <AnimatePresence>{isHovered && <HoverEffectPreview effect={hoverEffect} />}</AnimatePresence>
      </div>
    </motion.button>
  )
}

// Hover Effect Preview Component
function HoverEffectPreview({ effect }: { effect: string }) {
  switch (effect) {
    case "wireframe":
      return (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-12 h-8 border border-quantum-teal/50 rounded"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )
    case "geometric":
      return (
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-value-gold rounded-sm"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 45 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      )
    case "constellation":
      return (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-innovation-pink rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      )
    default:
      return null
  }
}

// Interactive Showcase Component
function InteractiveShowcase({
  title,
  description,
  impact,
  interactionType,
  color,
  setCursorVariant,
}: {
  title: string
  description: string
  impact: string
  interactionType: string
  color: string
  setCursorVariant: (variant: string) => void
}) {
  const [isInteracting, setIsInteracting] = useState(false)

  return (
    <motion.div
      className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

      {/* Interactive Element */}
      <div className="mb-6 h-24 relative overflow-hidden rounded-xl bg-white/5">
        <InteractiveElement
          type={interactionType}
          color={color}
          isActive={isInteracting}
          onInteraction={setIsInteracting}
        />
      </div>

      <div className={`text-sm font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{impact}</div>
    </motion.div>
  )
}

// Interactive Element Component
function InteractiveElement({
  type,
  color,
  isActive,
  onInteraction,
}: {
  type: string
  color: string
  isActive: boolean
  onInteraction: (active: boolean) => void
}) {
  switch (type) {
    case "dashboard-toggle":
      return (
        <motion.button
          className="w-full h-full flex items-center justify-center"
          onClick={() => onInteraction(!isActive)}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className={`w-16 h-12 rounded border-2 ${
              isActive ? "border-quantum-teal bg-quantum-teal/20" : "border-gray-500 bg-gray-500/20"
            } transition-all duration-300`}
            animate={{
              borderColor: isActive ? "#00E5D3" : "#6B7280",
            }}
          >
            <div className="p-2 space-y-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-1 rounded ${isActive ? "bg-quantum-teal" : "bg-gray-400"}`}
                  animate={{
                    width: isActive ? ["20%", "80%", "60%"][i] : "40%",
                  }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.button>
      )

    case "obstacle-removal":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="w-4 h-4 bg-innovation-pink rounded-full cursor-pointer"
            drag
            dragConstraints={{ left: -50, right: 50, top: -20, bottom: 20 }}
            onDragStart={() => onInteraction(true)}
            onDragEnd={() => onInteraction(false)}
            whileDrag={{ scale: 1.2 }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-xs text-gray-400">Drag to remove friction</div>
          </div>
        </div>
      )

    case "connection-builder":
      return (
        <div className="relative w-full h-full flex items-center justify-around">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-value-gold rounded-full"
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
                opacity: isActive ? [0.5, 1, 0.5] : 0.7,
              }}
              transition={{
                duration: 1,
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.2,
              }}
              onMouseEnter={() => onInteraction(true)}
              onMouseLeave={() => onInteraction(false)}
            />
          ))}
        </div>
      )

    case "data-crystallization":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-purple-500 rounded-full"
            animate={{
              rotate: isActive ? 360 : 0,
              scale: isActive ? [1, 1.2, 1] : 1,
            }}
            transition={{
              rotate: { duration: 2, repeat: isActive ? Number.POSITIVE_INFINITY : 0, ease: "linear" },
              scale: { duration: 1, repeat: isActive ? Number.POSITIVE_INFINITY : 0 },
            }}
            onMouseEnter={() => onInteraction(true)}
            onMouseLeave={() => onInteraction(false)}
          >
            <div className="w-full h-full flex items-center justify-center">
              <Cpu className="w-4 h-4 text-purple-500" />
            </div>
          </motion.div>
        </div>
      )

    case "architecture-expansion":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="grid grid-cols-3 gap-1"
            animate={{
              scale: isActive ? 1.2 : 1,
            }}
            onMouseEnter={() => onInteraction(true)}
            onMouseLeave={() => onInteraction(false)}
          >
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-sm"
                animate={{
                  opacity: isActive ? [0.3, 1, 0.3] : 0.6,
                }}
                transition={{
                  duration: 0.5,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </div>
      )

    case "component-optimization":
      return (
        <div className="relative w-full h-full flex items-center justify-center gap-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-8 rounded ${i < 3 ? "bg-green-500" : "bg-gray-500"}`}
              animate={{
                height: isActive && i >= 3 ? 0 : 32,
                opacity: isActive && i >= 3 ? 0 : 1,
              }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => onInteraction(true)}
              onMouseLeave={() => onInteraction(false)}
            />
          ))}
        </div>
      )

    case "trust-balance":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="w-16 h-1 bg-gray-600 rounded-full relative"
            onMouseEnter={() => onInteraction(true)}
            onMouseLeave={() => onInteraction(false)}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              animate={{
                width: isActive ? "100%" : "60%",
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      )

    case "cultural-adaptation":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="w-8 h-8 relative"
            onMouseEnter={() => onInteraction(true)}
            onMouseLeave={() => onInteraction(false)}
          >
            <Globe className="w-full h-full text-blue-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: isActive ? 360 : 0 }}
              transition={{ duration: 3, repeat: isActive ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  style={{
                    top: `${25 + Math.sin(i * 1.5) * 20}%`,
                    left: `${25 + Math.cos(i * 1.5) * 20}%`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      )

    case "identity-morph":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-yellow-400"
            animate={{
              borderRadius: isActive ? "20%" : "50%",
              rotate: isActive ? 45 : 0,
              borderColor: isActive ? "#EF4444" : "#FBBF24",
            }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => onInteraction(true)}
            onMouseLeave={() => onInteraction(false)}
          />
        </div>
      )

    default:
      return null
  }
}
