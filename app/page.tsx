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
  Linkedin,
  ExternalLink,
  MousePointer,
  Layers,
  Globe,
  Cpu,
} from "lucide-react"

export default function ArpanPortfolio() {
  const [currentScene, setCurrentScene] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const sceneProgress = useTransform(scrollYProgress, [0, 1], [0, 6])

  // Smoother custom cursor
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 30, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12)
      cursorY.set(e.clientY - 12)
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

  // Track interactions for engagement
  const handleInteraction = () => {
    setInteractionCount((prev) => {
      const newCount = prev + 1
      if (newCount >= 10) {
        setSecretUnlocked(true)
        return 0
      }
      return newCount
    })
  }

  const scenes = [
    { id: "intro", title: "The Vision", color: "#667eea" },
    { id: "philosophy", title: "The Philosophy", color: "#764ba2" },
    { id: "skills", title: "The Craft", color: "#f093fb" },
    { id: "projects", title: "The Impact", color: "#f5576c" },
    { id: "approach", title: "The Process", color: "#4facfe" },
    { id: "collaboration", title: "The Partnership", color: "#43e97b" },
    { id: "future", title: "The Next Chapter", color: "#38ef7d" },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-950 text-white overflow-hidden cursor-none">
      {/* Subtle Frosted Glass Overlay */}
      <div className="fixed inset-0 bg-white/[0.02] backdrop-blur-[0.5px] z-10 pointer-events-none" />

      {/* Smooth Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border border-white"
          animate={{
            scale: cursorVariant === "hover" ? 1.5 : cursorVariant === "click" ? 0.8 : 1,
            backgroundColor: cursorVariant === "hover" ? "rgba(255,255,255,0.1)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>

      {/* Subtle Background Animation */}
      <div className="fixed inset-0 opacity-20">
        <SubtleBackgroundAnimation />
      </div>

      {/* Scene Navigation */}
      <div className="fixed top-8 right-8 z-40 flex flex-col gap-3">
        {scenes.map((scene, index) => (
          <motion.button
            key={scene.id}
            className={`w-3 h-3 rounded-full border border-white/30 transition-all duration-300 ${
              currentScene === index ? "bg-white scale-125" : "bg-transparent hover:bg-white/50"
            }`}
            onClick={() => {
              const element = document.getElementById(scene.id)
              element?.scrollIntoView({ behavior: "smooth" })
              handleInteraction()
            }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* LinkedIn Link */}
      <motion.a
        href="https://linkedin.com/in/arpanksingh"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-8 left-8 z-40 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Linkedin className="w-5 h-5" />
      </motion.a>

      {/* Scene 1: The Vision */}
      <section id="intro" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-slate-950 to-purple-900/30" />

        <div className="max-w-6xl mx-auto px-8 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              className="text-7xl md:text-8xl font-black mb-8 leading-none"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                ARPAN
              </span>
              <br />
              <span className="text-white">K SINGH</span>
            </motion.h1>

            <motion.div
              className="text-2xl md:text-3xl mb-12 text-gray-300 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Transforming complex business challenges into{" "}
              <motion.span
                className="text-yellow-400 font-bold"
                animate={{
                  textShadow: ["0 0 0px #fbbf24", "0 0 20px #fbbf24", "0 0 0px #fbbf24"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                elegant digital experiences
              </motion.span>{" "}
              that drive measurable growth and competitive advantage.
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {["Product Designer", "Full-Stack Developer", "Brand Strategist", "Growth Engineer"].map(
                (skill, index) => (
                  <motion.div
                    key={skill}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-full"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(99, 102, 241, 0.3)",
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

            <ScrollIndicator />
          </motion.div>
        </div>
      </section>

      {/* Scene 2: The Philosophy */}
      <section id="philosophy" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-950 to-indigo-900/30" />

        <div className="max-w-6xl mx-auto px-8 relative z-20">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              THE PHILOSOPHY
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <PhilosophyCard
              icon={<Target className="w-8 h-8" />}
              title="Purpose-Driven Design"
              description="Every pixel serves a purpose. Every interaction drives an outcome. Design decisions are rooted in user psychology and business objectives."
              color="from-purple-500 to-indigo-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <PhilosophyCard
              icon={<Layers className="w-8 h-8" />}
              title="Systems Thinking"
              description="Solutions are architected as interconnected systems that scale gracefully and adapt to evolving business needs."
              color="from-indigo-500 to-blue-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <PhilosophyCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Continuous Innovation"
              description="Staying ahead means embracing emerging technologies and methodologies while maintaining focus on proven fundamentals."
              color="from-blue-500 to-cyan-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />
          </div>

          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              The intersection of <span className="text-purple-400 font-semibold">creative vision</span>,{" "}
              <span className="text-indigo-400 font-semibold">technical expertise</span>, and{" "}
              <span className="text-blue-400 font-semibold">strategic thinking</span> creates solutions that don't just
              meet requirements—they exceed expectations and drive transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scene 3: The Craft */}
      <section id="skills" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-slate-950 to-purple-900/30" />

        <div className="max-w-7xl mx-auto px-8 relative z-20">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              THE CRAFT
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard
              icon={<Code className="w-8 h-8" />}
              title="Full-Stack Development"
              description="Modern web technologies and frameworks for scalable, performant applications"
              skills={["React/Next.js", "Node.js", "Python", "TypeScript", "GraphQL", "PostgreSQL"]}
              color="from-blue-500 to-cyan-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <SkillCard
              icon={<Palette className="w-8 h-8" />}
              title="Product Design"
              description="User-centered design that balances aesthetics with functionality and business goals"
              skills={["UI/UX Design", "Figma", "Design Systems", "Prototyping", "User Research", "Accessibility"]}
              color="from-purple-500 to-pink-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <SkillCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Growth Strategy"
              description="Data-driven approaches to user acquisition, retention, and revenue optimization"
              skills={["Analytics", "A/B Testing", "SEO/SEM", "Conversion Optimization", "Product Marketing"]}
              color="from-green-500 to-emerald-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <SkillCard
              icon={<Cpu className="w-8 h-8" />}
              title="AI Integration"
              description="Leveraging artificial intelligence to enhance user experiences and business processes"
              skills={["GenAI", "Machine Learning", "AI/ML APIs", "Automation", "Data Analysis"]}
              color="from-yellow-500 to-orange-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <SkillCard
              icon={<Users className="w-8 h-8" />}
              title="Team Collaboration"
              description="Cross-functional leadership and mentoring to deliver exceptional results"
              skills={["Team Leadership", "Agile/Scrum", "Mentoring", "Strategy", "Stakeholder Management"]}
              color="from-red-500 to-pink-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <SkillCard
              icon={<Crown className="w-8 h-8" />}
              title="Brand Development"
              description="Strategic brand positioning and visual identity that resonates with target audiences"
              skills={["Brand Strategy", "Visual Identity", "Market Research", "Content Strategy", "Brand Guidelines"]}
              color="from-indigo-500 to-purple-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />
          </div>
        </div>
      </section>

      {/* Scene 4: The Impact */}
      <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-slate-950 to-pink-900/30" />

        <div className="max-w-7xl mx-auto px-8 relative z-20">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">THE IMPACT</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <ProjectShowcase
              title="Enterprise Analytics Platform"
              description="Transformed complex data visualization into intuitive insights, driving $10M+ in revenue through improved decision-making and user adoption."
              impact={[
                { label: "Revenue Impact", value: "$10M+", icon: <TrendingUp /> },
                { label: "User Satisfaction", value: "94%", icon: <Heart /> },
                { label: "Performance Boost", value: "300%", icon: <Lightning /> },
              ]}
              tech={["React", "D3.js", "Node.js", "PostgreSQL", "Redis"]}
              color="from-green-400 to-blue-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <ProjectShowcase
              title="Global SaaS Platform"
              description="Architected scalable infrastructure serving 90K+ daily users across multiple regions with enterprise-grade reliability."
              impact={[
                { label: "Daily Users", value: "90K+", icon: <Users /> },
                { label: "Global Reach", value: "12 Countries", icon: <Globe /> },
                { label: "Uptime", value: "99.9%", icon: <Award /> },
              ]}
              tech={["Next.js", "GraphQL", "Microservices", "Docker", "AWS"]}
              color="from-purple-400 to-pink-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <ProjectShowcase
              title="AI-Enhanced Workflow"
              description="Integrated generative AI to automate complex analysis processes, reducing manual effort by 75% while improving accuracy."
              impact={[
                { label: "Efficiency Gain", value: "400%", icon: <Zap /> },
                { label: "Accuracy Rate", value: "96%", icon: <Target /> },
                { label: "Time Saved", value: "75%", icon: <Lightning /> },
              ]}
              tech={["Python", "OpenAI API", "FastAPI", "React", "TensorFlow"]}
              color="from-yellow-400 to-red-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <ProjectShowcase
              title="Brand Transformation"
              description="Elevated brand positioning and visual identity, resulting in significant market differentiation and premium pricing power."
              impact={[
                { label: "Brand Recognition", value: "280%", icon: <Crown /> },
                { label: "Market Premium", value: "45%", icon: <Gem /> },
                { label: "Customer Retention", value: "100%", icon: <Heart /> },
              ]}
              tech={["Brand Strategy", "Design Systems", "Market Research", "Content Strategy"]}
              color="from-indigo-400 to-purple-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />
          </div>
        </div>
      </section>

      {/* Scene 5: The Process */}
      <section id="approach" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-950 to-cyan-900/30" />

        <div className="max-w-6xl mx-auto px-8 relative z-20">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              THE PROCESS
            </span>
          </motion.h2>

          <ProcessTimeline setCursorVariant={setCursorVariant} onInteraction={handleInteraction} />
        </div>
      </section>

      {/* Scene 6: The Partnership */}
      <section id="collaboration" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-slate-950 to-emerald-900/30" />

        <div className="max-w-6xl mx-auto px-8 relative z-20">
          <motion.h2
            className="text-6xl font-black text-center mb-20"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              THE PARTNERSHIP
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <StatCard
              number="100%"
              label="Project Success Rate"
              description="Every project delivered on time, within scope, exceeding expectations through systematic approach and clear communication"
              icon={<Award className="w-12 h-12" />}
              color="from-green-400 to-emerald-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <StatCard
              number="50%"
              label="Average Efficiency Gain"
              description="Typical improvement in performance, user satisfaction, and operational efficiency across projects"
              icon={<Lightning className="w-12 h-12" />}
              color="from-blue-400 to-cyan-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />

            <StatCard
              number="5+"
              label="Years of Excellence"
              description="Consistent delivery of high-impact solutions across diverse industries and technical challenges"
              icon={<Crown className="w-12 h-12" />}
              color="from-purple-400 to-pink-500"
              setCursorVariant={setCursorVariant}
              onInteraction={handleInteraction}
            />
          </div>

          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Collaboration thrives on <span className="text-green-400 font-semibold">transparent communication</span>,{" "}
              <span className="text-emerald-400 font-semibold">shared vision</span>, and{" "}
              <span className="text-cyan-400 font-semibold">mutual respect</span>. The best solutions emerge when
              diverse perspectives unite around common goals.
            </p>

            <div className="flex justify-center gap-8">
              {[
                { icon: <Coffee />, label: "Strategy Sessions" },
                { icon: <Code />, label: "Collaborative Development" },
                { icon: <Sparkles />, label: "Creative Workshops" },
                { icon: <Target />, label: "Goal Alignment" },
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
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.4,
                  }}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scene 7: The Next Chapter */}
      <section id="future" className="min-h-screen py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-950 to-green-900/30" />

        <div className="max-w-6xl mx-auto px-8 text-center relative z-20">
          <motion.h2
            className="text-6xl font-black mb-12"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              THE NEXT CHAPTER
            </span>
          </motion.h2>

          <motion.p
            className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Every great product starts with a vision. Every successful transformation begins with the right partnership.{" "}
            <br />
            <br />
            <span className="text-emerald-400 font-bold">
              Ready to turn ambitious ideas into market-leading realities?
            </span>
          </motion.p>

          <InteractiveCallToAction
            setCursorVariant={setCursorVariant}
            onInteraction={handleInteraction}
            interactionCount={interactionCount}
          />
        </div>
      </section>

      {/* Secret Achievement */}
      <AnimatePresence>
        {secretUnlocked && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 backdrop-blur-md border border-white/20 rounded-3xl p-12 max-w-2xl text-center"
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
                <Magic className="w-full h-full text-emerald-400" />
              </motion.div>

              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                🎉 ENGAGEMENT MASTER! 🎉
              </h3>

              <p className="text-xl text-gray-300 mb-6">
                This level of interaction shows genuine interest in collaboration. That's exactly the kind of engagement
                that leads to extraordinary results.
              </p>

              <p className="text-lg text-gray-400 mb-8">
                This attention to detail and user engagement? That's what every project receives. Ready to experience
                this dedication firsthand? 🚀
              </p>

              <div className="flex gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold"
                  onClick={() =>
                    window.open("mailto:arpan@example.com?subject=Let's Create Something Extraordinary", "_blank")
                  }
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  Start the Conversation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSecretUnlocked(false)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Continue Exploring
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
function SubtleBackgroundAnimation() {
  return (
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
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
      animate={{ y: [0, 8, 0] }}
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

function PhilosophyCard({
  icon,
  title,
  description,
  color,
  setCursorVariant,
  onInteraction,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  setCursorVariant: (variant: string) => void
  onInteraction: () => void
}) {
  return (
    <motion.div
      className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      onClick={onInteraction}
      whileHover={{ scale: 1.02, rotateY: 2 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      <div className="relative z-10">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>

        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
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
  onInteraction,
}: {
  icon: React.ReactNode
  title: string
  description: string
  skills: string[]
  color: string
  setCursorVariant: (variant: string) => void
  onInteraction: () => void
}) {
  return (
    <motion.div
      className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      onClick={onInteraction}
      whileHover={{ scale: 1.03, rotateY: 3 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      <div className="relative z-10">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
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
              transition={{ delay: index * 0.05 }}
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
  onInteraction,
}: {
  title: string
  description: string
  impact: { label: string; value: string; icon: React.ReactNode }[]
  tech: string[]
  color: string
  setCursorVariant: (variant: string) => void
  onInteraction: () => void
}) {
  return (
    <motion.div
      className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      onClick={onInteraction}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
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

function ProcessTimeline({
  setCursorVariant,
  onInteraction,
}: {
  setCursorVariant: (variant: string) => void
  onInteraction: () => void
}) {
  const steps = [
    {
      title: "Discovery & Strategy",
      description: "Understanding business objectives, user needs, and technical constraints",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Design & Prototyping",
      description: "Creating user-centered designs with iterative feedback and validation",
      icon: <Palette className="w-6 h-6" />,
    },
    {
      title: "Development & Testing",
      description: "Building scalable solutions with comprehensive testing and quality assurance",
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: "Launch & Optimization",
      description: "Deploying with monitoring, analytics, and continuous improvement cycles",
      icon: <Rocket className="w-6 h-6" />,
    },
  ]

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-emerald-500 rounded-full"></div>

      <div className="space-y-16">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            onClick={onInteraction}
          >
            <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-md hover:bg-white/10 transition-colors duration-300">
                <h4 className="text-xl font-bold text-cyan-300 mb-3">{step.title}</h4>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            </div>

            <div className="relative z-10">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(6, 182, 212, 0)",
                    "0 0 20px rgba(6, 182, 212, 0.5)",
                    "0 0 0 rgba(6, 182, 212, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
              >
                {step.icon}
              </motion.div>
            </div>

            <div className="flex-1"></div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StatCard({
  number,
  label,
  description,
  icon,
  color,
  setCursorVariant,
  onInteraction,
}: {
  number: string
  label: string
  description: string
  icon: React.ReactNode
  color: string
  setCursorVariant: (variant: string) => void
  onInteraction: () => void
}) {
  return (
    <motion.div
      className="group text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 transition-colors duration-300"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      onClick={onInteraction}
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

function InteractiveCallToAction({
  setCursorVariant,
  onInteraction,
  interactionCount,
}: {
  setCursorVariant: (variant: string) => void
  onInteraction: () => void
  interactionCount: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative p-8 bg-gradient-to-br from-emerald-900/20 to-green-900/20 backdrop-blur-sm border border-emerald-500/30 rounded-3xl"
        onMouseEnter={() => {
          setCursorVariant("hover")
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setCursorVariant("default")
          setIsHovered(false)
        }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 text-emerald-300">Ready to Transform Your Vision?</h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Every exceptional product begins with a conversation. Let's explore how strategic design and development can
            elevate your business to new heights.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            className="group relative px-12 py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full text-xl font-bold text-white shadow-2xl overflow-hidden"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            onClick={() => {
              onInteraction()
              window.open("mailto:arpan@example.com?subject=Let's Create Something Extraordinary Together", "_blank")
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "0%" : "-100%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Start the Conversation
              <MousePointer className="w-5 h-5" />
            </span>
          </motion.button>

          <motion.a
            href="https://linkedin.com/in/arpanksingh"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 border-2 border-emerald-500/50 rounded-full text-lg font-semibold text-emerald-300 backdrop-blur-sm hover:bg-emerald-500/10 transition-all duration-300"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            onClick={onInteraction}
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(16, 185, 129, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Connect on LinkedIn
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </div>

        {interactionCount > 5 && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-emerald-400">
              🎯 {interactionCount} interactions and counting! This engagement level shows serious interest.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
