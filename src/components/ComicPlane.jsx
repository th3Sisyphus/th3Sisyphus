import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import '../shaders/ComicShaderMaterial'

export default function ComicPlane({
  textureUrl,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [4, 2.25, 1],
  scrollVelocity = 0,
  onStrike = null,
  title = '',
  number = ''
}) {
  const meshRef = useRef()
  const materialRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [breakProgress, setBreakProgress] = useState(0)

  // Load texture
  const texture = useTexture(textureUrl)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = false

  // Mining strike handler
  const handlePointerDown = (e) => {
    e.stopPropagation()
    // Trigger momentary voxel break fracture
    setBreakProgress(0.85)
    if (onStrike) onStrike({ title, position })
  }

  useFrame((state, delta) => {
    if (!materialRef.current) return

    // Update running time
    materialRef.current.uTime = state.clock.getElapsedTime()

    // Smooth hover transition
    const targetHover = hovered ? 1.0 : 0.0
    materialRef.current.uHover = THREE.MathUtils.lerp(
      materialRef.current.uHover,
      targetHover,
      delta * 6
    )

    // Scroll velocity distortion
    materialRef.current.uScrollVelocity = THREE.MathUtils.lerp(
      materialRef.current.uScrollVelocity,
      scrollVelocity,
      delta * 8
    )

    // Smoothly restore fracture / break progress
    if (breakProgress > 0) {
      setBreakProgress((prev) => Math.max(0, prev - delta * 1.8))
    }
    materialRef.current.uBreakProgress = breakProgress

    // Subtle floating breath on the mesh
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() * 1.5 + position[0]) * 0.08
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Backing Comic Drop Shadow & Frame */}
      <mesh position={[0.08, -0.08, -0.04]} scale={[scale[0] * 1.02, scale[1] * 1.02, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#e62429" />
      </mesh>

      <mesh position={[0.04, -0.04, -0.02]} scale={[scale[0] * 1.01, scale[1] * 1.01, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#f4f1ea" />
      </mesh>

      {/* Main Interactive Shader Plane */}
      <mesh
        ref={meshRef}
        scale={scale}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
        onPointerDown={handlePointerDown}
      >
        <planeGeometry args={[1, 1, 32, 32]} />
        <comicShaderMaterial
          ref={materialRef}
          uTexture={texture}
          transparent={true}
        />
      </mesh>
    </group>
  )
}
