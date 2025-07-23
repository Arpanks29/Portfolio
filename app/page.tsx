"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Zap,
  Rocket,
  Target,
  Crown,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Coffee,
  Code,
  Palette,
  TrendingUp,
  Users,
  Award,
  Heart,
  CloudLightningIcon as Lightning,
  Gem,
  MagnetIcon as Magic,
} from "lucide-react"

export default function ArpanPortfolio() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const [konami, setKonami] = useState([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const sceneProgress = useTransform(scrollYProgress, [0, 1], [0, 5])

  // Custom cursor
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [cursorX, cursorY])

  useEffect(() => {
    const unsubscribe = sceneProgress.onChange((latest) => {
      setCurrentScene(Math.floor(latest))
    })
    return () => unsubscribe()
  }, [sceneProgress])

  // Konami code for secret
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "KeyB",
        "KeyA",
      ]
      const newKonami = [...konami, e.code].slice(-10)
      setKonami(newKonami)

      if (JSON.stringify(newKonami) === JSON.stringify(konamiCode)) {
        setSecretUnlocked(true)
        setKonami([])
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [konami])

  const scenes = [
    { id: "intro", title: "The Problem Solver", color: "#ff6b6b" },
    { id: "skills", title: "The Skill Arsenal", color: "#4ecdc4" },
    { id: "projects", title: "The Magic Happens", color: "#45b7d1" },
    { id: "impact", title: "The Results Speak", color: "#f9ca24" },
    { id: "future", title: "Your Next Level", color: "#6c5ce7" },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className={`w-full h-full rounded-full border-2 border-white ${
            cursorVariant === "hover"
              ? "scale-150 bg-white/20"
              : cursorVariant === "click"
                ? "scale-75 bg-white/40"
                : ""
          }`}
          animate={{
            scale: cursorVariant === "hover" ? 1.5 : cursorVariant === "click" ? 0.75 : 1,
            backgroundColor: cursorVariant === "hover" ? "rgba(255,255,255,0.2)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Scene Navigation */}
      <div className="fixed top-8 right-8 z-40 flex gap-2">
        {scenes.map((scene, index) => (
          <motion.button
            key={scene.id}
            className={`w-3 h-3 rounded-full border-2 border-white/30 ${
              currentScene === index ? "bg-white" : "bg-transparent"
            }`}
            onClick={() => {
              const element = document.getElementById(scene.id)
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>

      {/* Audio Controls */}
      <div className="fixed top-8 left-8 z-40 flex gap-4">
        <motion.button
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          onClick={() => setIsPlaying(!isPlaying)}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>
        <motion.button
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          onClick={() => setSoundEnabled(!soundEnabled)}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Scene 1: The Problem Solver */}
      <section id="intro" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/20" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              className="text-8xl md:text-9xl font-black mb-8 leading-none"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                ARPAN
              </span>
              <br />
              <span className="text-white">K SINGH</span>
            </motion.h1>

            <motion.div
              className="text-2xl md:text-3xl mb-12 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              I don't just build products.{" "}
              <motion.span
                className="text-yellow-400 font-bold"
                animate={{
                  textShadow: ["0 0 0px #fbbf24", "0 0 20px #fbbf24", "0 0 0px #fbbf24"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                I craft experiences that make competitors jealous.
              </motion.span>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {["UX Wizard", "Code Ninja", "Brand Alchemist", "Growth Hacker"].map((skill, index) => (
                <motion.div
                  key={skill}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-full"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(147, 51, 234, 0.3)",
                  }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.2,
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>

            <ScrollIndicator />
          </motion.div>
        </div>
      </section>

      {/* Scene 2: The Skill Arsenal */}
      <section id="skills" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-black to-blue-900/20" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              THE ARSENAL
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard
              icon={<Code className="w-8 h-8" />}
              title="Full-Stack Mastery"
              description="React, Next.js, Node.js, Python - I speak fluent code in multiple languages"
              skills={["React/Next.js", "Node.js", "Python", "TypeScript", "GraphQL"]}
              color="from-blue-500 to-cyan-500"
              setCursorVariant={setCursorVariant}
            />

            <SkillCard
              icon={<Palette className="w-8 h-8" />}
              title="Design Sorcery"
              description="From wireframes to pixel-perfect UIs that users actually want to use"
              skills={["UI/UX Design", "Figma", "Adobe Suite", "Prototyping", "User Research"]}
              color="from-purple-500 to-pink-500"
              setCursorVariant={setCursorVariant}
            />

            <SkillCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Growth Engineering"
              description="Data-driven strategies that turn visitors into customers and customers into advocates"
              skills={["Analytics", "A/B Testing", "SEO", "Conversion Optimization", "Growth Hacking"]}
              color="from-green-500 to-emerald-500"
              setCursorVariant={setCursorVariant}
            />

            <SkillCard
              icon={<Zap className="w-8 h-8" />}
              title="AI Integration"
              description="NVIDIA certified - I make AI work for business, not just demos"
              skills={["GenAI", "Machine Learning", "AI/ML Integration", "Automation", "Data Science"]}
              color="from-yellow-500 to-orange-500"
              setCursorVariant={setCursorVariant}
            />

            <SkillCard
              icon={<Users className="w-8 h-8" />}
              title="Team Leadership"
              description="I don't just manage - I inspire teams to build legendary products"
              skills={["Team Leadership", "Agile/Scrum", "Mentoring", "Strategy", "Cross-functional"]}
              color="from-red-500 to-pink-500"
              setCursorVariant={setCursorVariant}
            />

            <SkillCard
              icon={<Crown className="w-8 h-8" />}
              title="Brand Elevation"
              description="Transforming generic brands into market leaders that customers love"
              skills={["Brand Strategy", "Market Positioning", "Visual Identity", "Storytelling", "Brand Architecture"]}
              color="from-indigo-500 to-purple-500"
              setCursorVariant={setCursorVariant}
            />
          </div>
        </div>
      </section>

      {/* Scene 3: The Magic Happens */}
      <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-indigo-900/20" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              WHERE MAGIC HAPPENS
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <ProjectShowcase
              title="$10M Revenue Product"
              description="Transformed a cluttered enterprise dashboard into an intuitive analytics platform that users actually love using."
              impact={[
                { label: "Revenue Generated", value: "$10M+", icon: <TrendingUp /> },
                { label: "User Satisfaction", value: "94%", icon: <Heart /> },
                { label: "Load Time Improvement", value: "300%", icon: <Lightning /> },
              ]}
              tech={["React", "Node.js", "PostgreSQL", "Redis", "AWS"]}
              color="from-green-400 to-blue-500"
              setCursorVariant={setCursorVariant}
            />

            <ProjectShowcase
              title="Global SaaS Platform"
              description="Built a scalable platform serving 90K+ daily users across 12 countries with 99.9% uptime."
              impact={[
                { label: "Daily Active Users", value: "90K+", icon: <Users /> },
                { label: "Countries Served", value: "12", icon: <Target /> },
                { label: "Uptime", value: "99.9%", icon: <Award /> },
              ]}
              tech={["Next.js", "GraphQL", "Microservices", "Docker", "Kubernetes"]}
              color="from-purple-400 to-pink-500"
              setCursorVariant={setCursorVariant}
            />

            <ProjectShowcase
              title="AI-Powered Insights Engine"
              description="Integrated GenAI to transform 4-hour manual analysis into 15-minute automated insights."
              impact={[
                { label: "Time Saved", value: "400%", icon: <Zap /> },
                { label: "Accuracy Rate", value: "96%", icon: <Target /> },
                { label: "Cost Reduction", value: "65%", icon: <TrendingUp /> },
              ]}
              tech={["Python", "TensorFlow", "OpenAI", "FastAPI", "React"]}
              color="from-yellow-400 to-red-500"
              setCursorVariant={setCursorVariant}
            />

            <ProjectShowcase
              title="Brand Transformation"
              description="Elevated a generic B2B brand into a premium market leader with 280% increase in brand recognition."
              impact={[
                { label: "Brand Recognition", value: "280%", icon: <Crown /> },
                { label: "Market Premium", value: "45%", icon: <Gem /> },
                { label: "Customer Loyalty", value: "92%", icon: <Heart /> },
              ]}
              tech={["Brand Strategy", "Visual Design", "Market Research", "Content Strategy"]}
              color="from-indigo-400 to-purple-500"
              setCursorVariant={setCursorVariant}
            />
          </div>
        </div>
      </section>

      {/* Scene 4: The Results Speak */}
      <section id="impact" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-black to-orange-900/20" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              THE NUMBERS DON'T LIE
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <StatCard
              number="100%"
              label="Project Success Rate"
              description="Every project delivered on time, on budget, exceeding expectations"
              icon={<Award className="w-12 h-12" />}
              color="from-green-400 to-emerald-500"
              setCursorVariant={setCursorVariant}
            />

            <StatCard
              number="$10M+"
              label="Revenue Generated"
              description="Direct revenue impact from products I've built and optimized"
              icon={<TrendingUp className="w-12 h-12" />}
              color="from-blue-400 to-cyan-500"
              setCursorVariant={setCursorVariant}
            />

            <StatCard
              number="90K+"
              label="Daily Active Users"
              description="People using products I've designed and developed every single day"
              icon={<Users className="w-12 h-12" />}
              color="from-purple-400 to-pink-500"
              setCursorVariant={setCursorVariant}
            />

            <StatCard
              number="300%"
              label="Average Performance Boost"
              description="Typical improvement in speed, efficiency, and user satisfaction"
              icon={<Lightning className="w-12 h-12" />}
              color="from-yellow-400 to-orange-500"
              setCursorVariant={setCursorVariant}
            />
          </div>

          <TestimonialCarousel setCursorVariant={setCursorVariant} />
        </div>
      </section>

      {/* Scene 5: Your Next Level */}
      <section id="future" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />

        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <motion.h2
            className="text-6xl font-black mb-12"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              READY FOR YOUR NEXT LEVEL?
            </span>
          </motion.h2>

          <motion.p
            className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I don't just join teams - I elevate them. I don't just build features - I create experiences. I don't just
            follow trends - I set them. <br />
            <br />
            <span className="text-yellow-400 font-bold">Your competitors are already worried. They should be.</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-bold text-white shadow-2xl"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("mailto:arpan@example.com?subject=Let's Build Something Amazing", "_blank")}
            >
              Let's Build Something Amazing
              <Rocket className="inline ml-2 w-6 h-6" />
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-white/30 rounded-full text-lg font-semibold text-white backdrop-blur-sm"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              Download Resume
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            className="flex justify-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { icon: <Coffee />, label: "Coffee Chats" },
              { icon: <Code />, label: "Code Reviews" },
              { icon: <Sparkles />, label: "Creative Sessions" },
              { icon: <Target />, label: "Strategy Calls" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-2 text-gray-400"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{
                  scale: 1.1,
                  color: "#ffffff",
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.3,
                }}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Secret Easter Egg */}
      <AnimatePresence>
        {secretUnlocked && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md border border-white/20 rounded-3xl p-12 max-w-2xl text-center"
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
                <Magic className="w-full h-full text-yellow-400" />
              </motion.div>

              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                🎉 SECRET UNLOCKED! 🎉
              </h3>

              <p className="text-xl text-gray-300 mb-6">
                You found the Konami code! Here's a secret: I built this entire portfolio in one sitting while listening
                to lo-fi hip hop and drinking way too much coffee. ☕
              </p>

              <p className="text-lg text-gray-400 mb-8">
                This attention to detail and hidden features? That's what I bring to every project. Imagine what we
                could build together! 🚀
              </p>

              <div className="flex gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
                  onClick={() => window.open("mailto:arpan@example.com?subject=I Found Your Secret!", "_blank")}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  Hire the Easter Egg Master
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSecretUnlocked(false)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Keep Exploring
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Component Definitions
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
    >
      <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
        <motion.div
          className="w-1 h-3 bg-white rounded-full mt-2"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        />
      </div>
    </motion.div>
  )
}

function SkillCard({
  icon,
  title,
  description,
  skills,
  color,
  setCursorVariant,
}: {
  icon: React.ReactNode
  title: string
  description: string
  skills: string[]
  color: string
  setCursorVariant: (variant: string) => void
}) {
  return (
    <motion.div
      className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 text-white`}
        >
          {icon}
        </div>

        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectShowcase({
  title,
  description,
  impact,
  tech,
  color,
  setCursorVariant,
}: {
  title: string
  description: string
  impact: { label: string; value: string; icon: React.ReactNode }[]
  tech: string[]
  color: string
  setCursorVariant: (variant: string) => void
}) {
  return (
    <motion.div
      className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">{description}</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {impact.map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                {item.value}
              </div>
              <div className="text-sm text-gray-400">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {tech.map((technology, index) => (
            <motion.span
              key={technology}
              className={`px-3 py-1 bg-gradient-to-r ${color} bg-opacity-20 rounded-full text-sm text-white border border-white/20`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              {technology}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function StatCard({
  number,
  label,
  description,
  icon,
  color,
  setCursorVariant,
}: {
  number: string
  label: string
  description: string
  icon: React.ReactNode
  color: string
  setCursorVariant: (variant: string) => void
}) {
  return (
    <motion.div
      className="group text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div
        className={`w-20 h-20 bg-gradient-to-br ${color} rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>

      <motion.div
        className={`text-5xl font-black mb-2 bg-gradient-to-r ${color} bg-clip-text text-transparent`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {number}
      </motion.div>

      <h3 className="text-xl font-bold mb-4 text-white">{label}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

function TestimonialCarousel({ setCursorVariant }: { setCursorVariant: (variant: string) => void }) {
  const testimonials = [
    {
      quote: "Arpan doesn't just deliver - he transforms. Our product went from good to industry-leading.",
      author: "Senior VP, Fortune 500 Company",
      role: "Enterprise Client",
    },
    {
      quote: "The most creative problem-solver I've worked with. He sees solutions where others see obstacles.",
      author: "CTO, Global SaaS Platform",
      role: "Technical Leadership",
    },
    {
      quote: "Our conversion rates doubled within 3 months. Arpan's UX magic is real.",
      author: "Head of Product, Fintech Startup",
      role: "Product Strategy",
    },
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <div className="text-6xl text-yellow-400 mb-4">"</div>
          <p className="text-2xl text-gray-300 mb-8 italic leading-relaxed">{testimonials[current].quote}</p>
          <div className="text-white font-bold text-lg">{testimonials[current].author}</div>
          <div className="text-gray-400">{testimonials[current].role}</div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              current === index ? "bg-yellow-400" : "bg-white/30"
            }`}
            onClick={() => setCurrent(index)}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          />
        ))}
      </div>
    </div>
  )
}
