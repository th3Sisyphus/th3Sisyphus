import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import Cursor from './components/Cursor'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [gemCount, setGemCount] = useState(1450)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [currentBiome, setCurrentBiome] = useState('daylight')
  const containerRef = useRef(null)
  const lenisRef = useRef(null)

  // Cycle through Biomes: daylight -> sunset -> starlight
  const biomes = ['daylight', 'sunset', 'starlight']
  const handleCycleBiome = useCallback(() => {
    setCurrentBiome((prev) => {
      const nextIdx = (biomes.indexOf(prev) + 1) % biomes.length
      return biomes[nextIdx]
    })
  }, [])

  // Mining strike triggers +10 gems
  const handleMineStrike = useCallback(() => {
    setGemCount((prev) => prev + 10)
  }, [])

  // Initialize Lenis & Sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })
    lenisRef.current = lenis

    // Listen to scroll events to update ScrollTrigger & extract velocity
    const handleScroll = (e) => {
      ScrollTrigger.update()
      setScrollVelocity(e.velocity || 0)
    }
    lenis.on('scroll', handleScroll)

    // Synchronize Lenis with GSAP's internal ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Refresh triggers after DOM layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(refreshTimer)
      gsap.ticker.remove(updateTicker)
      lenis.off('scroll', handleScroll)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Biome atmospheric background gradients
  const biomeBgClasses = {
    daylight: 'bg-[#0a0a0c]',
    sunset: 'bg-gradient-to-b from-[#140b0e] via-[#0a0a0c] to-[#0f090b]',
    starlight: 'bg-gradient-to-b from-[#070b14] via-[#0a0a0c] to-[#080d17]',
  }

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen text-[#f4f1ea] transition-colors duration-700 ${
        biomeBgClasses[currentBiome] || 'bg-[#0a0a0c]'
      }`}
    >
      {/* Interactive Pickaxe Cursor & Debris Particles */}
      <Cursor onMineStrike={handleMineStrike} />

      {/* Fixed Full-Viewport 3D WebGL Canvas Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          eventSource={containerRef}
          eventPrefix="client"
          camera={{ position: [0, 0, 4.4], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full pointer-events-none"
        >
          <Suspense fallback={null}>
            <Scene scrollVelocity={scrollVelocity} onMineStrike={handleMineStrike} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable DOM Overlay */}
      <Overlay
        gemCount={gemCount}
        onMineBlock={handleMineStrike}
        currentBiome={currentBiome}
        onCycleBiome={handleCycleBiome}
      />
    </div>
  )
}
