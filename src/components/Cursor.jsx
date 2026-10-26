import React, { useEffect, useRef, useState, useCallback } from 'react'

// Lightweight Web Audio 8-bit Pickaxe Strike Synthesizer
function playPickaxeSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    
    // Impact noise burst
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    
    // Rapid pitch drop for pickaxe 'chink'
    const now = ctx.currentTime
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.08)
    
    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.1)
  } catch (err) {
    // Audio context might be restricted before gesture
  }
}

export default function Cursor({ onMineStrike }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isSwinging, setIsSwinging] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const cursorRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const floatersRef = useRef([])
  const mousePos = useRef({ x: -100, y: -100 })
  const smoothPos = useRef({ x: -100, y: -100 })
  const animationFrameId = useRef(null)

  // Floating text messages
  const floatMessages = ['+10 GEMS!', 'MINED!', '+25 EXP!', 'CRIT! ⛏️', 'RARE ORE!', '+50 XP!']

  // Spawn debris particles and text on click
  const spawnDebris = useCallback((x, y) => {
    // 1. Spawning physics debris particles
    const particleCount = 14 + Math.floor(Math.random() * 8)
    const colors = ['#f59e0b', '#fbbf24', '#e62429', '#f4f1ea', '#713f12', '#22c55e']

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2.5 + Math.random() * 7.5
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3.5, // upward boost
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: 0.02 + Math.random() * 0.03,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.3
      })
    }

    // 2. Spawning floating score / gem tags
    const msg = floatMessages[Math.floor(Math.random() * floatMessages.length)]
    floatersRef.current.push({
      x: x + (Math.random() - 0.5) * 30,
      y: y - 20,
      text: msg,
      life: 1.0,
      decay: 0.025,
      color: msg.includes('CRIT') ? '#e62429' : msg.includes('GEMS') ? '#f59e0b' : '#22c55e'
    })
  }, [])

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = (e) => {
      setIsSwinging(true)
      spawnDebris(e.clientX, e.clientY)
      playPickaxeSound()
      if (onMineStrike) {
        onMineStrike({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseUp = () => {
      setIsSwinging(false)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Canvas size sync
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Render loop for smooth cursor spring + canvas particles
    const loop = () => {
      // Spring lerp for cursor
      smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * 0.45
      smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * 0.45

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${smoothPos.current.x}px, ${smoothPos.current.y}px, 0)`
      }

      // Draw particles on canvas
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw Debris Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i]
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.28 // Gravity
          p.vx *= 0.98 // Air friction
          p.rotation += p.vRot
          p.life -= p.decay

          if (p.life <= 0) {
            particlesRef.current.splice(i, 1)
            continue
          }

          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          ctx.globalAlpha = Math.max(0, p.life)
          ctx.fillStyle = p.color
          // Pixel block particle
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
          ctx.restore()
        }

        // Draw Floating text popups
        for (let i = floatersRef.current.length - 1; i >= 0; i--) {
          const f = floatersRef.current[i]
          f.y -= 1.4 // float up
          f.life -= f.decay

          if (f.life <= 0) {
            floatersRef.current.splice(i, 1)
            continue
          }

          ctx.save()
          ctx.font = 'bold 13px "Silkscreen", monospace'
          ctx.globalAlpha = Math.max(0, f.life)
          ctx.fillStyle = '#0a0a0c'
          // Shadow stroke
          ctx.fillText(f.text, f.x + 1, f.y + 1)
          ctx.fillStyle = f.color
          ctx.fillText(f.text, f.x, f.y)
          ctx.restore()
        }
      }

      animationFrameId.current = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('resize', handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isVisible, spawnDebris, onMineStrike])

  if (isTouchDevice) {
    return null
  }

  return (
    <>
      {/* 2D Canvas for block debris particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />

      {/* Custom Pickaxe Cursor Sprite */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          marginLeft: '-12px',
          marginTop: '-12px',
        }}
      >
        <div
          className={`origin-[25%_75%] transition-transform duration-75 ${
            isSwinging ? '-rotate-45 scale-125' : 'rotate-0 scale-100'
          }`}
        >
          <img
            src={isSwinging ? '/assets/golden-pickaxe-active.png' : '/assets/golden-pickaxe.png'}
            alt=""
            className="w-10 h-10 select-none drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] [image-rendering:pixelated]"
            onError={(e) => {
              // Fallback to SVG pickaxe if png has any path issue
              e.target.src = isSwinging ? '/assets/cursor-pickaxe-active.svg' : '/assets/cursor-pickaxe.svg'
            }}
          />
        </div>
      </div>
    </>
  )
}
