import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import InventoryVault from './InventoryVault'
import ProjectsSection from './ProjectsSection'
import QuestsSection from './QuestsSection'
import ContactSection from './ContactSection'
import Footer from './Footer'

export default function Overlay({ gemCount, onMineBlock, currentBiome, onCycleBiome }) {
  const [activeSection, setActiveSection] = useState('about')

  // Track active section for navigation
  useEffect(() => {
    const sectionIds = ['about', 'skills', 'projects', 'experience', 'contact']
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative z-10 w-full min-h-screen text-[#f4f1ea] pointer-events-auto">
      <Navbar gemCount={gemCount} activeSection={activeSection} />

      <main id="main">
        <HeroSection
          gemCount={gemCount}
          onMineBlock={onMineBlock}
          currentBiome={currentBiome}
          onCycleBiome={onCycleBiome}
        />

        <InventoryVault />

        <ProjectsSection
          currentBiome={currentBiome}
          onCycleBiome={onCycleBiome}
        />

        <QuestsSection />

        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
