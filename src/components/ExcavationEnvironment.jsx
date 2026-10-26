import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export default function ExcavationEnvironment() {
  const voxelGroupRef = useRef()

  // Generate deterministic voxel ore debris chunks floating along the shaft
  const voxels = useMemo(() => {
    const items = []
    const colors = ['#f59e0b', '#fbbf24', '#e62429', '#23232f', '#713f12', '#00e5ff']
    for (let i = 0; i < 45; i++) {
      items.push({
        position: [
          (Math.sin(i * 1.7) * 9),
          -i * 0.5 - 2,
          (Math.cos(i * 1.3) * 7) - 6
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: 0.12 + Math.random() * 0.22,
        rotSpeed: [(Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.8, 0],
        color: colors[i % colors.length]
      })
    }
    return items
  }, [])

  useFrame((state, delta) => {
    if (voxelGroupRef.current) {
      voxelGroupRef.current.children.forEach((child, i) => {
        const v = voxels[i]
        if (v) {
          child.rotation.x += v.rotSpeed[0] * delta
          child.rotation.y += v.rotSpeed[1] * delta
        }
      })
    }
  })

  return (
    <group>
      {/* Ambient and Key Lighting */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 12, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -6, 2]} intensity={2.0} color="#f59e0b" distance={15} />
      <pointLight position={[5, -12, -4]} intensity={2.2} color="#e62429" distance={18} />
      <pointLight position={[0, -20, -8]} intensity={2.5} color="#00e5ff" distance={20} />

      {/* Floating 3D Gold Dust / Mine Sparkles */}
      <Sparkles
        count={100}
        scale={[18, 38, 25]}
        position={[0, -10, -6]}
        size={3.2}
        speed={0.4}
        color="#f59e0b"
        opacity={0.8}
      />

      {/* Crimson Embers */}
      <Sparkles
        count={50}
        scale={[14, 32, 20]}
        position={[0, -10, -5]}
        size={2.5}
        speed={0.6}
        color="#e62429"
        opacity={0.7}
      />

      {/* Floating Low-Poly Ore Voxels */}
      <group ref={voxelGroupRef}>
        {voxels.map((v, idx) => (
          <mesh key={idx} position={v.position} rotation={v.rotation} scale={v.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={v.color}
              roughness={0.4}
              metalness={0.7}
              emissive={v.color}
              emissiveIntensity={v.color === '#f59e0b' || v.color === '#00e5ff' ? 0.3 : 0.05}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
