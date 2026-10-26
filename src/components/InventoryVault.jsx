import React, { useState } from 'react'
import { Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function InventoryVault() {
  const { skills } = portfolioData
  const skillKeys = Object.keys(skills)
  const [activeSlot, setActiveSlot] = useState('laravel')

  const activeData = skills[activeSlot] || skills['laravel']

  return (
    <section id="skills" className="relative py-28 border-t-2 border-[#23232f] bg-[#0a0a0c]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 border-l-4 border-[#f59e0b] pl-4 sm:pl-6">
          <div className="flex items-center gap-2 text-[#f59e0b] font-pixel text-xs tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            Character Attributes & Equipment
          </div>
          <h2 className="font-comic text-4xl sm:text-6xl text-[#f4f1ea] uppercase tracking-wide leading-none">
            Inventory & Tech Attributes
          </h2>
          <p className="mt-2 text-[#c8c4b9] font-mono text-sm max-w-2xl">
            Equipped skill items, database catalysts, and computational specializations calibrated for production platforms.
          </p>
        </div>

        {/* Inventory Vault Shell with Flanking Torches */}
        <div className="relative">
          
          {/* Main Vault Panel */}
          <div className="border-2 border-[#f4f1ea] bg-[#0a0a0c]/95 shadow-[8px_8px_0px_#e62429] p-6 sm:p-8">
            
            {/* Player Stats Top Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 mb-6 border-b-2 border-[#23232f] font-mono text-xs">
              
              {/* Health */}
              <div className="bg-[#121218] p-3 border border-[#23232f]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-pixel text-[11px] text-[#e62429] flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    HEALTH
                  </span>
                  <span className="text-[#f4f1ea] font-bold">100 / 100</span>
                </div>
                <div className="w-full bg-[#1c1917] h-2.5 border border-[#23232f] overflow-hidden">
                  <div className="bg-[#22c55e] h-full w-full"></div>
                </div>
              </div>

              {/* Mana */}
              <div className="bg-[#121218] p-3 border border-[#23232f]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-pixel text-[11px] text-[#00e5ff] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    MANA
                  </span>
                  <span className="text-[#f4f1ea] font-bold">85 / 85</span>
                </div>
                <div className="w-full bg-[#1c1917] h-2.5 border border-[#23232f] overflow-hidden">
                  <div className="bg-[#00e5ff] h-full w-[85%]"></div>
                </div>
              </div>

              {/* Class Specialization */}
              <div className="bg-[#121218] p-3 border border-[#23232f] flex flex-col justify-between">
                <span className="font-pixel text-[11px] text-[#f59e0b]">CLASS SPECIALIZATION</span>
                <span className="font-comic text-xl text-[#f4f1ea] uppercase tracking-wider">
                  Full-Stack Alchemist
                </span>
              </div>
            </div>

            {/* Inventory Grid & Inspector Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: 8 Item Slots Grid */}
              <div className="lg:col-span-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-pixel text-xs text-[#a39f94] tracking-wider uppercase">
                    EQUIPPED SLOTS [8/8]
                  </span>
                  <span className="font-mono text-[11px] text-[#f59e0b]">CLICK TO INSPECT</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {skillKeys.map((key) => {
                    const item = skills[key]
                    const isSelected = activeSlot === key
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveSlot(key)}
                        className={`relative p-3 flex flex-col items-center justify-center text-center transition-all border-2 ${
                          isSelected
                            ? 'bg-[#181822] border-[#f59e0b] shadow-[4px_4px_0px_#e62429] -translate-y-1'
                            : 'bg-[#121218] border-[#23232f] hover:border-[#f4f1ea] hover:bg-[#15151e]'
                        }`}
                      >
                        {/* Slot Token Badge */}
                        <div
                          className={`w-10 h-10 mb-2 flex items-center justify-center font-pixel text-xs font-bold border ${
                            isSelected
                              ? 'bg-[#f59e0b] text-[#0a0a0c] border-[#f4f1ea]'
                              : 'bg-[#0a0a0c] text-[#f59e0b] border-[#23232f]'
                          }`}
                        >
                          {item.token}
                        </div>

                        <span className="font-comic text-sm uppercase tracking-wider text-[#f4f1ea] leading-tight line-clamp-1">
                          {item.name.split(' ')[0]}
                        </span>
                        <span className="font-mono text-[10px] text-[#a39f94]">
                          {item.token === 'LV12' ? 'v12' : item.token}
                        </span>

                        {isSelected && (
                          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#e62429] border border-[#f4f1ea]"></span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right: Item Detail Inspector Pane */}
              <div className="lg:col-span-7 bg-[#121218] border-2 border-[#23232f] p-6 relative">
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-pixel text-[#22c55e] bg-[#0a0a0c] px-2 py-1 border border-[#22c55e]/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  EQUIPPED
                </div>

                <span className="inline-block bg-[#e62429] text-[#f4f1ea] font-pixel text-[10px] px-2.5 py-0.5 border border-[#f4f1ea] uppercase tracking-wider mb-2">
                  {activeData.rarity}
                </span>

                <h3 className="font-comic text-3xl sm:text-4xl text-[#f4f1ea] uppercase tracking-wider leading-none">
                  {activeData.name}
                </h3>
                
                <p className="font-mono text-xs text-[#f59e0b] font-semibold mt-1">
                  {activeData.subtitle}
                </p>

                {/* RPG Stat Bars */}
                <div className="mt-6 space-y-4">
                  {/* Stat 1 */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1">
                      <span className="text-[#c8c4b9] font-bold">{activeData.stat1Key}</span>
                      <span className="text-[#f59e0b] font-pixel">{activeData.stat1Val}</span>
                    </div>
                    <div className="w-full bg-[#0a0a0c] h-3 border border-[#23232f] overflow-hidden p-0.5">
                      <div
                        className="bg-[#f59e0b] h-full transition-all duration-300"
                        style={{ width: `${activeData.stat1Pct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1">
                      <span className="text-[#c8c4b9] font-bold">{activeData.stat2Key}</span>
                      <span className="text-[#00e5ff] font-pixel">{activeData.stat2Val}</span>
                    </div>
                    <div className="w-full bg-[#0a0a0c] h-3 border border-[#23232f] overflow-hidden p-0.5">
                      <div
                        className="bg-[#00e5ff] h-full transition-all duration-300"
                        style={{ width: `${activeData.stat2Pct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Lore / Description */}
                <p className="mt-6 text-[#c8c4b9] font-mono text-xs sm:text-sm leading-relaxed border-t border-[#23232f] pt-4">
                  {activeData.desc}
                </p>

                {/* Tag Pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#0a0a0c] text-[#f4f1ea] font-mono text-xs px-2.5 py-1 border border-[#23232f]"
                    >
                      +{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
