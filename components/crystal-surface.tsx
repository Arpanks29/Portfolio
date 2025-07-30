"use client"

import { useEffect, useRef, memo } from "react"
import { motion } from "framer-motion"

interface Point {
  x: number
  y: number
}

interface Triangle {
  points: [Point, Point, Point]
  normal: Point
  elevation: number
}

interface CrystalSurfaceConfig {
  POINTS_COUNT: number
  MARGIN: number
  REFLECTION_INTENSITY: number
  SHINE_RADIUS: number
  AMBIENT_LIGHT: number
  BLUR_AMOUNT: number
  EDGE_VISIBILITY: number
  TRIANGLE_OPACITY: number
  COLOR: {
    HUE: number
    SATURATION: number
    BRIGHTNESS_MULTIPLIER: number
  }
  GRADIENT: {
    INTENSITY: number
  }
}

interface CrystalSurfaceProps {
  realityMode: "architect" | "innovator" | "transformer" | "visionary"
  opacity: number
}

const DEFAULT_CONFIG: CrystalSurfaceConfig = {
  POINTS_COUNT: 35, // Increased for more detail
  MARGIN: 50, // Reduced margin to allow points closer to edges
  REFLECTION_INTENSITY: 0.8, // Slightly reduced for subtlety
  SHINE_RADIUS: 350, // Adjusted shine radius
  AMBIENT_LIGHT: 0.03, // Reduced ambient light for darker feel
  BLUR_AMOUNT: 20, // Consistent with previous blur
  EDGE_VISIBILITY: 0.08, // Reduced edge visibility for softer lines
  TRIANGLE_OPACITY: 0.8, // Slightly reduced triangle opacity
  COLOR: {
    HUE: 0,
    SATURATION: 0,
    BRIGHTNESS_MULTIPLIER: 1,
  },
  GRADIENT: {
    INTENSITY: 0.6, // Adjusted gradient intensity
  },
}

// Helper to convert hex to HSL for dynamic coloring
const hexToHsl = (hex: string) => {
  let r = 0,
    g = 0,
    b = 0
  // Handle 3-digit hex
  if (hex.length === 4) {
    r = Number.parseInt(hex[1] + hex[1], 16)
    g = Number.parseInt(hex[2] + hex[2], 16)
    b = Number.parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = Number.parseInt(hex.slice(1, 3), 16)
    g = Number.parseInt(hex.slice(3, 5), 16)
    b = Number.parseInt(hex.slice(5, 7), 16)
  }

  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

const CrystalSurface = memo(({ realityMode, opacity }: CrystalSurfaceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trianglesRef = useRef<Triangle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | null>(null)

  const colors = {
    architect: "#00E5D3",
    innovator: "#FF6B9D",
    transformer: "#FFD166",
    visionary: "#8A2BE2",
  }
  const activeHexColor = colors[realityMode]
  const activeHslColor = hexToHsl(activeHexColor)

  const mergedConfig = {
    ...DEFAULT_CONFIG,
    COLOR: {
      HUE: activeHslColor.h,
      SATURATION: activeHslColor.s,
      BRIGHTNESS_MULTIPLIER: DEFAULT_CONFIG.COLOR.BRIGHTNESS_MULTIPLIER,
    },
  }

  const calculateCircumcenter = (a: Point, b: Point, c: Point): Point | null => {
    const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y))
    if (d === 0) return null

    const ux =
      ((a.x * a.x + a.y * a.y) * (b.y - c.y) +
        (b.x * b.x + b.y * b.y) * (c.y - a.y) +
        (c.x * c.x + c.y * c.y) * (a.y - b.y)) /
      d

    const uy =
      ((a.x * a.x + a.y * a.y) * (c.x - b.x) +
        (b.x * b.x + b.y * b.y) * (a.x - c.x) +
        (c.x * c.x + c.y * c.y) * (b.x - a.x)) /
      d

    return { x: ux, y: uy }
  }

  const isPointInCircumcircle = (point: Point, triangle: Triangle): boolean => {
    const center = calculateCircumcenter(...triangle.points)
    if (!center) return false

    const dx = center.x - point.x
    const dy = center.y - point.y
    const radius = Math.sqrt(dx * dx + dy * dy)

    const dx1 = center.x - triangle.points[0].x
    const dy1 = center.y - triangle.points[0].y
    const radius1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)

    return radius < radius1 + 0.001 // Add a small epsilon for floating point precision
  }

  const calculateReflection = (triangle: Triangle) => {
    const center = {
      x: (triangle.points[0].x + triangle.points[1].x + triangle.points[2].x) / 3,
      y: (triangle.points[0].y + triangle.points[1].y + triangle.points[2].y) / 3,
    }

    const dx = mouseRef.current.x - center.x
    const dy = mouseRef.current.y - center.y
    const distance = Math.sqrt(dx * dx + dy * dy) || 1 // Avoid division by zero

    const lightDirX = dx / distance
    const lightDirY = dy / distance

    const dotProduct = lightDirX * triangle.normal.x + lightDirY * triangle.normal.y
    const distanceFactor = Math.max(0, 1 - distance / mergedConfig.SHINE_RADIUS)

    return {
      intensity:
        mergedConfig.AMBIENT_LIGHT +
        Math.pow(Math.max(0, dotProduct), 2) * distanceFactor * mergedConfig.REFLECTION_INTENSITY * triangle.elevation,
      angle: Math.atan2(dy, dx),
    }
  }

  const calculateNormal = (points: [Point, Point, Point]): Point => {
    const [a, b] = points
    const dx1 = b.x - a.x
    const dy1 = b.y - a.y
    const length = Math.sqrt(dx1 * dx1 + dy1 * dy1)
    return { x: dx1 / length, y: dy1 / length }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const triangulate = (points: Point[], width: number, height: number): Triangle[] => {
      // Create super triangle that encompasses all points
      const superTriangle: Triangle = {
        points: [
          { x: -width, y: -height },
          { x: width * 2, y: -height },
          { x: width / 2, y: height * 2 },
        ],
        normal: { x: 0, y: 0 }, // Dummy normal for super triangle
        elevation: 1, // Dummy elevation
      }

      let triangles: Triangle[] = [superTriangle]

      // Add points one at a time
      points.forEach((point) => {
        const badTriangles = triangles.filter((triangle) => isPointInCircumcircle(point, triangle))

        const boundary: [Point, Point][] = []
        badTriangles.forEach((triangle) => {
          triangle.points.forEach((tp, i) => {
            const edge: [Point, Point] = [tp, triangle.points[(i + 1) % 3]]

            // Check if edge appears only once (not shared by two bad triangles)
            const isUnique = !badTriangles.some((otherTriangle) => {
              if (otherTriangle === triangle) return false
              return otherTriangle.points.some((otp, j) => {
                const otherEdge: [Point, Point] = [otp, otherTriangle.points[(j + 1) % 3]]
                return (
                  (edge[0] === otherEdge[0] && edge[1] === otherEdge[1]) ||
                  (edge[0] === otherEdge[1] && edge[1] === otherEdge[0])
                )
              })
            })

            if (isUnique) {
              boundary.push(edge)
            }
          })
        })

        // Remove bad triangles
        triangles = triangles.filter((t) => !badTriangles.includes(t))

        // Create new triangles from the point and boundary edges
        boundary.forEach((edge) => {
          const newTrianglePoints: [Point, Point, Point] = [point, edge[0], edge[1]]
          triangles.push({
            points: newTrianglePoints,
            normal: calculateNormal(newTrianglePoints),
            elevation: Math.random() * 0.3 + 0.7, // Random elevation for depth effect
          })
        })
      })

      // Remove triangles that share vertices with super triangle
      return triangles.filter(
        (triangle) =>
          !triangle.points.some(
            (p) => superTriangle.points.includes(p) || p.x < 0 || p.x > width || p.y < 0 || p.y > height, // Also filter out points outside canvas
          ),
      )
    }

    const generatePoints = () => {
      const points: Point[] = []

      // Add border points to ensure coverage
      points.push(
        { x: 0, y: 0 },
        { x: canvas.width, y: 0 },
        { x: canvas.width, y: canvas.height },
        { x: 0, y: canvas.height },
        { x: canvas.width / 2, y: 0 },
        { x: 0, y: canvas.height / 2 },
        { x: canvas.width, y: canvas.height / 2 },
        { x: canvas.width / 2, y: canvas.height },
      )

      // Add random internal points
      for (let i = 0; i < mergedConfig.POINTS_COUNT; i++) {
        points.push({
          x: mergedConfig.MARGIN + Math.random() * (canvas.width - 2 * mergedConfig.MARGIN),
          y: mergedConfig.MARGIN + Math.random() * (canvas.height - 2 * mergedConfig.MARGIN),
        })
      }

      trianglesRef.current = triangulate(points, canvas.width, canvas.height)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generatePoints()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas for redraw
      ctx.fillStyle = "#000000" // Ensure background is black
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (trianglesRef.current) {
        trianglesRef.current.forEach((triangle) => {
          const reflection = calculateReflection(triangle)
          const baseBrightness = Math.floor(reflection.intensity * 100 * mergedConfig.COLOR.BRIGHTNESS_MULTIPLIER) // Scale to 0-100 for HSL lightness

          const color1 = `hsla(${mergedConfig.COLOR.HUE}, ${mergedConfig.COLOR.SATURATION}%, ${baseBrightness}%, ${mergedConfig.TRIANGLE_OPACITY})`
          const color2 = `hsla(${mergedConfig.COLOR.HUE}, ${mergedConfig.COLOR.SATURATION}%, ${
            baseBrightness * mergedConfig.GRADIENT.INTENSITY
          }%, ${mergedConfig.TRIANGLE_OPACITY})`

          ctx.beginPath()
          ctx.moveTo(triangle.points[0].x, triangle.points[0].y)
          ctx.lineTo(triangle.points[1].x, triangle.points[1].y)
          ctx.lineTo(triangle.points[2].x, triangle.points[2].y)
          ctx.closePath()

          const gradient = ctx.createLinearGradient(
            triangle.points[0].x,
            triangle.points[0].y,
            triangle.points[1].x,
            triangle.points[1].y,
          )

          gradient.addColorStop(0, color1)
          gradient.addColorStop(1, color2)

          ctx.fillStyle = gradient
          ctx.fill()

          ctx.strokeStyle = `rgba(255, 255, 255, ${reflection.intensity * mergedConfig.EDGE_VISIBILITY})`
          ctx.lineWidth = 1
          ctx.stroke()
        })
      }
    }

    const animate = () => {
      draw()
      animationFrameId.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    handleResize() // Initial setup
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [realityMode]) // Re-run effect if config changes (e.g., realityMode)

  return (
    <motion.div
      className="crystal-surface"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <canvas ref={canvasRef} className="main-canvas" />
      <div
        className="glass-overlay"
        style={{
          backdropFilter: `blur(${DEFAULT_CONFIG.BLUR_AMOUNT}px)`,
          WebkitBackdropFilter: `blur(${DEFAULT_CONFIG.BLUR_AMOUNT}px)`,
        }}
      />
      {/* Bottom gradient fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />
    </motion.div>
  )
})

export default CrystalSurface
