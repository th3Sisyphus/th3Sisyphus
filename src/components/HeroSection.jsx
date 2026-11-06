import React, { useState } from 'react'
import { Pickaxe, Compass, Terminal, MapPin, ScrollText, Hammer, BookOpen, Flame } from 'lucide-react'
import { playerProfile } from '../data/portfolioData'

export default function HeroSection({ gemCount, onMineBlock, currentBiome, onCycleBiome }) {
  const profile = playerProfile
  const { currentStatus } = profile
  const [mineFeedback, setMineFeedback] = useState(false)

  const handleMineClick = () => {
    setMineFeedback(true)
    onMineBlock()
    setTimeout(() => setMineFeedback(false), 300)
  }

  const questLog = [
    { key: 'doing', label: 'DOING', icon: Hammer, color: '#e62429', text: currentStatus.currentlyDoing },
    { key: 'learning', label: 'LEARNING', icon: BookOpen, color: '#00e5ff', text: currentStatus.currentlyLearning },
    { key: 'obsession', label: 'OBSESSION', icon: Flame, color: '#22c55e', text: currentStatus.currentObsession },
  ]

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center">

          {/* Left Column: Narrative Comic Box, Active Quest Log & Persona Specs */}
          <div className="lg:col-span-7 space-y-6">

            {/* Handle & Title Header */}
            <div className="flex flex-wrap items-center gap-3 font-pixel text-xs">
              <span className="bg-[#e62429] text-[#f4f1ea] px-3 py-1 border border-[#f4f1ea] shadow-[3px_3px_0px_#f59e0b]">
                @{profile.handle}
              </span>
              <span className="bg-[#121218] text-[#f59e0b] px-3 py-1 border border-[#23232f]">
                {profile.title}
              </span>
              <span className="text-[#a39f94] tracking-widest hidden sm:inline">
                [CLASS: GAME AI × FULL-STACK]
              </span>
            </div>

            {/* Main Hero Comic Box */}
            <div className="border-2 border-[#f4f1ea] bg-[#0a0a0c]/90 p-6 sm:p-8 shadow-[6px_6px_0px_#e62429] relative group">
              <div className="absolute -top-3 -right-3 bg-[#f59e0b] text-[#0a0a0c] font-pixel text-[10px] px-2 py-0.5 border border-[#0a0a0c] font-bold">
                PLAYER PROFILE
              </div>

              <h1 className="font-comic text-5xl sm:text-6xl lg:text-7xl text-[#f4f1ea] tracking-tight uppercase leading-[0.95] drop-shadow-[2px_2px_0px_#e62429]">
                {profile.name}
              </h1>

              <p className="mt-3 font-mono text-sm sm:text-base text-[#f59e0b] font-semibold flex items-start gap-2">
                <span className="inline-block w-2 h-2 mt-2 shrink-0 bg-[#f59e0b]"></span>
                {profile.role}
              </p>

              <p className="mt-4 text-[#c8c4b9] text-sm sm:text-base leading-relaxed border-l-2 border-[#e62429] pl-4">
                {profile.bioShort}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-6 py-3 bg-[#e62429] hover:bg-[#ff3338] text-[#f4f1ea] font-comic text-xl uppercase tracking-wider border-2 border-[#f4f1ea] shadow-[4px_4px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2"
                >
                  <Compass className="w-5 h-5" />
                  Inspect Artifacts
                </a>
                <a
                  href="#vault"
                  className="px-6 py-3 bg-[#121218] hover:bg-[#181822] text-[#f4f1ea] font-comic text-xl uppercase tracking-wider border-2 border-[#23232f] hover:border-[#f59e0b] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2"
                >
                  <Terminal className="w-5 h-5 text-[#f59e0b]" />
                  Open Vault
                </a>
                <a
                  href="#notes"
                  className="px-6 py-3 bg-[#121218] hover:bg-[#181822] text-[#f4f1ea] font-comic text-xl uppercase tracking-wider border-2 border-[#23232f] hover:border-[#f59e0b] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2"
                >
                  <ScrollText className="w-5 h-5 text-[#f59e0b]" />
                  Field Notes
                </a>
              </div>
            </div>

            {/* Active Quest Log (Now) */}
            <div
              className="border-4 border-[#0a0a0c] bg-[#f59e0b] shadow-[6px_6px_0px_#f4f1ea] relative"
              aria-label="Active quest log"
            >
              <div className="flex items-center justify-between gap-3 px-4 py-2 bg-[#0a0a0c] border-b-4 border-[#0a0a0c]">
                <span className="font-pixel text-xs text-[#f59e0b] tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#f59e0b] animate-pulse"></span>
                  ACTIVE QUEST LOG // NOW
                </span>
                <span className="font-pixel text-[10px] text-[#a39f94]">
                  UPDATED: {currentStatus.updatedAt}
                </span>
              </div>

              <dl className="divide-y-2 divide-[#0a0a0c]">
                {questLog.map(({ key, label, icon: Icon, color, text }) => (
                  <div key={key} className="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-1 sm:gap-4 px-4 py-3 items-start">
                    <dt className="font-pixel text-[11px] text-[#0a0a0c] font-bold flex items-center gap-2">
                      <span
                        className="w-5 h-5 flex items-center justify-center border-2 border-[#0a0a0c]"
                        style={{ backgroundColor: color }}
                      >
                        <Icon className="w-3 h-3 text-[#f4f1ea]" />
                      </span>
                      {label}
                    </dt>
                    <dd className="font-mono text-xs sm:text-[13px] text-[#0a0a0c] font-semibold leading-snug">
                      {text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Persona Attributes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-[#121218]/90 p-3 border border-[#23232f]">
                <span className="text-[#e62429] font-bold text-[11px] font-pixel flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> BASE CAMP
                </span>
                <span className="text-[#c8c4b9] mt-1 block leading-tight">{profile.location}</span>
              </div>
              <div className="sm:col-span-2 bg-[#121218]/90 p-3 border border-[#23232f]">
                <span className="text-[#f59e0b] font-bold block text-[11px] font-pixel">SUB-CLASSES</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {profile.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="bg-[#0a0a0c] text-[#f4f1ea] px-2 py-0.5 border border-[#23232f]"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: World Diorama Mining Console */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border-2 border-[#f4f1ea] bg-[#0a0a0c]/90 p-5 shadow-[6px_6px_0px_#f59e0b]">
              <div className="flex items-center justify-between pb-3 border-b border-[#23232f]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#e62429]"></span>
                  <span className="font-pixel text-xs text-[#f4f1ea] tracking-wider">
                    EXCAVATION SHAFT · ISLE #01
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-pixel text-xs text-[#f59e0b]">DEPTH: 0.0m</span>
                </div>
              </div>

              {/* Interactive Diorama Control Panel */}
              <div className="mt-4 p-4 bg-[#121218] border border-[#23232f] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#a39f94]">MINED RESOURCE VAULT:</span>
                  <div className="flex items-center gap-2 bg-[#0a0a0c] px-3 py-1 border border-[#f59e0b]">
                    <span className="font-pixel text-xs text-[#f59e0b] font-bold">
                      {gemCount.toLocaleString()} GEMS
                    </span>
                  </div>
                </div>

                <p className="font-mono text-xs text-[#c8c4b9] leading-relaxed">
                  Hover or click the floating island plane in WebGL space, or strike the mining block below to extract rare voxel ores and fuel the descent.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleMineClick}
                    className={`flex-1 py-3 px-4 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0a0a0c] font-comic text-xl uppercase tracking-wider font-bold border-2 border-[#0a0a0c] shadow-[3px_3px_0px_#e62429] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 ${
                      mineFeedback ? 'scale-95 bg-[#e62429] text-[#f4f1ea]' : ''
                    }`}
                  >
                    <Pickaxe className="w-5 h-5" />
                    Mine Block (+10)
                  </button>

                  <button
                    type="button"
                    onClick={onCycleBiome}
                    className="py-3 px-4 bg-[#0a0a0c] hover:bg-[#181822] text-[#f4f1ea] font-mono text-xs border border-[#23232f] hover:border-[#f59e0b] transition-all"
                  >
                    Biome: <span className="text-[#f59e0b] font-bold uppercase">{currentBiome}</span>
                  </button>
                </div>
              </div>

              {/* Real-time 3D Viewport Indicator */}
              <div className="mt-4 p-3 bg-[#0a0a0c] border border-[#23232f] flex items-center justify-between text-[11px] font-mono text-[#a39f94]">
                <span className="flex items-center gap-1.5 text-[#22c55e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping"></span>
                  CAMERA: 3D HERO PLANE
                </span>
                <span className="text-[#f59e0b] font-pixel text-[10px]">SCROLL TO DESCEND ↓</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
