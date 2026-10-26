import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import ComicPlane from './ComicPlane'
import ExcavationEnvironment from './ExcavationEnvironment'

gsap.registerPlugin(ScrollTrigger)

export default function Scene({ scrollVelocity = 0, onMineStrike = null }) {
  const { camera, viewport } = useThree()
  const mouseTilt = useRef({ x: 0, y: 0 })
  const isMobile = viewport.width < 7.0

  // Plane scales adapted to viewport
  const planeScale = isMobile ? [2.8, 1.6, 1] : [3.8, 2.15, 1]

  // Positions along descending mineshaft
  const planesData = [
    {
      id: 'hero',
      url: '/assets/hero-island.jpg',
      position: isMobile ? [0, 0.5, -0.5] : [1.6, 0.1, -0.5],
      rotation: [0, isMobile ? 0 : -0.16, 0],
      title: 'Hero Island Isle #01'
    },
    {
      id: 'kameka',
      url: '/assets/project-kameka.jpg',
      position: isMobile ? [0, -7.0, -4.5] : [-2.2, -7.0, -4.5],
      rotation: [0.06, isMobile ? 0 : 0.22, -0.03],
      title: 'KAMEKA Order Vault'
    },
    {
      id: 'zombies',
      url: '/assets/project-wave-of-zombies.jpg',
      position: isMobile ? [0, -14.0, -8.5] : [2.2, -14.0, -8.5],
      rotation: [-0.04, isMobile ? 0 : -0.22, 0.03],
      title: 'Wave of Zombies'
    },
    {
      id: 'research',
      url: '/assets/research-indo-nlp.jpg',
      position: [0, -21.0, -12.5],
      rotation: [0.08, 0, 0],
      title: 'Indo-NLP Hoax Detector'
    }
  ]

  // Master GSAP Timeline synchronized with ScrollTrigger
  useEffect(() => {
    // Initial camera positioning
    camera.position.set(0, 0, 4.4)
    camera.rotation.set(0, 0, 0)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      })

      // Section 1 -> Section 2 (Hero to Kameka / Inventory)
      tl.to(
        camera.position,
        {
          x: isMobile ? 0 : -1.0,
          y: -7.0,
          z: isMobile ? -0.8 : -0.6,
          ease: 'power2.inOut',
          duration: 2
        },
        0
      )
      .to(
        camera.rotation,
        {
          x: 0.04,
          y: isMobile ? 0 : 0.15,
          z: 0,
          ease: 'power2.inOut',
          duration: 2
        },
        0
      )

      // Section 2 -> Section 3 (Kameka to Wave of Zombies)
      .to(
        camera.position,
        {
          x: isMobile ? 0 : 1.0,
          y: -14.0,
          z: isMobile ? -4.8 : -4.6,
          ease: 'power2.inOut',
          duration: 2
        },
        2
      )
      .to(
        camera.rotation,
        {
          x: -0.04,
          y: isMobile ? 0 : -0.15,
          z: 0,
          ease: 'power2.inOut',
          duration: 2
        },
        2
      )

      // Section 3 -> Section 4 (Wave of Zombies to Research Indo-NLP)
      .to(
        camera.position,
        {
          x: 0,
          y: -21.0,
          z: -8.5,
          ease: 'power2.inOut',
          duration: 2
        },
        4
      )
      .to(
        camera.rotation,
        {
          x: 0.06,
          y: 0,
          z: 0,
          ease: 'power2.inOut',
          duration: 2
        },
        4
      )

      // Section 4 -> Section 5 (Pull back to show full constellation at Contact)
      .to(
        camera.position,
        {
          x: 0,
          y: -9.5,
          z: 14.5,
          ease: 'power2.inOut',
          duration: 2.5
        },
        6
      )
      .to(
        camera.rotation,
        {
          x: -0.15,
          y: 0,
          z: 0,
          ease: 'power2.inOut',
          duration: 2.5
        },
        6
      )
    })

    return () => {
      ctx.revert()
    }
  }, [camera, isMobile])

  // Mouse Parallax & Dynamic Pitch
  useFrame((state, delta) => {
    // Pointer is normalized (-1 to 1)
    const targetX = state.pointer.x * 0.35
    const targetY = state.pointer.y * 0.25

    mouseTilt.current.x = THREE.MathUtils.lerp(mouseTilt.current.x, targetX, delta * 3)
    mouseTilt.current.y = THREE.MathUtils.lerp(mouseTilt.current.y, targetY, delta * 3)

    // Subtle parallax offset added to current scroll position
    camera.position.x += mouseTilt.current.x * 0.05
    camera.position.y += mouseTilt.current.y * 0.05
  })

  return (
    <>
      <ExcavationEnvironment />

      {planesData.map((p) => (
        <ComicPlane
          key={p.id}
          textureUrl={p.url}
          position={p.position}
          rotation={p.rotation}
          scale={planeScale}
          scrollVelocity={scrollVelocity}
          onStrike={onMineStrike}
          title={p.title}
        />
      ))}
    </>
  )
}
