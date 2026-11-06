import React, { useMemo, useState } from 'react'
import { Sparkles, CheckCircle2, Package } from 'lucide-react'
import { inventoryData, playerProfile } from '../data/portfolioData'
import TabBar from './TabBar'

const TABS = [
  { id: 'techArsenal', label: 'Tech Arsenal', caption: 'EQUIPPED ARTIFACTS', badge: 'ARTIFACT' },
  { id: 'personalGear', label: 'Personal Gear', caption: 'DAILY LOADOUT', badge: 'ITEM' },
  { id: 'tavernLogs', label: 'Tavern Logs', caption: 'HOBBY & MEDIA LOGS', badge: 'LOG' },
]

// Token badge dari inisial nama, mis. "PHP & Laravel" -> "PL"
function toToken(name) {
  const words = name.split(/[^A-Za-z0-9]+/).filter(Boolean)
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function InventoryVault() {
  const [activeTab, setActiveTab] = useState('techArsenal')
  const [selected, setSelected] = useState({})

  const tabMeta = TABS.find((t) => t.id === activeTab) || TABS[0]

  const items = useMemo(
    () =>
      (inventoryData[activeTab] || []).map((item) => ({
        ...item,
        token: toToken(item.name),
      })),
    [activeTab]
  )

  const activeData = items.find((i) => i.id === selected[activeTab]) || items[0]

  return (
    <section id="vault" className="relative py-28 border-t-2 border-[#23232f] bg-[#0a0a0c]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 border-l-4 border-[#f59e0b] pl-4 sm:pl-6">
          <div className="flex items-center gap-2 text-[#f59e0b] font-pixel text-xs tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            Equipment, Gear & Side Quests
          </div>
          <h2 className="font-comic text-4xl sm:text-6xl text-[#f4f1ea] uppercase tracking-wide leading-none">
            The Vault
          </h2>
          <p className="mt-2 text-[#c8c4b9] font-mono text-sm max-w-2xl">
            Semua artefak teknologi setara di sini: tanpa bar, tanpa persentase. Plus gear harian dan log hobi.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-8">
          <TabBar
            tabs={TABS}
            active={activeTab}
            onChange={setActiveTab}
            label="Vault sections"
          />
        </div>

        {/* Main Vault Panel */}
        <div className="border-2 border-[#f4f1ea] bg-[#0a0a0c]/95 shadow-[8px_8px_0px_#e62429] p-6 sm:p-8">

          {/* Vault Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 mb-6 border-b-2 border-[#23232f] font-mono text-xs">
            <div className="bg-[#121218] p-3 border border-[#23232f] flex flex-col justify-between gap-1">
              <span className="font-pixel text-[11px] text-[#e62429]">ACTIVE SHELF</span>
              <span className="font-comic text-xl text-[#f4f1ea] uppercase tracking-wider">
                {tabMeta.label}
              </span>
            </div>
            <div className="bg-[#121218] p-3 border border-[#23232f] flex flex-col justify-between gap-1">
              <span className="font-pixel text-[11px] text-[#00e5ff] flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                ITEMS STORED
              </span>
              <span className="font-comic text-xl text-[#f4f1ea] uppercase tracking-wider">
                {items.length} {tabMeta.badge}
                {items.length === 1 ? '' : 'S'}
              </span>
            </div>
            <div className="bg-[#121218] p-3 border border-[#23232f] flex flex-col justify-between gap-1">
              <span className="font-pixel text-[11px] text-[#f59e0b]">CLASS SPECIALIZATION</span>
              <span className="font-comic text-xl text-[#f4f1ea] uppercase tracking-wider">
                {playerProfile.role}
              </span>
            </div>
          </div>

          {/* Inventory Grid & Inspector Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Item Slots Grid */}
            <div className="lg:col-span-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-pixel text-xs text-[#a39f94] tracking-wider uppercase">
                  {tabMeta.caption} [{items.length}]
                </span>
                <span className="font-mono text-[11px] text-[#f59e0b]">CLICK TO INSPECT</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {items.map((item) => {
                  const isSelected = activeData && activeData.id === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelected((prev) => ({ ...prev, [activeTab]: item.id }))}
                      aria-pressed={isSelected}
                      className={`relative p-3 flex flex-col items-center justify-start text-center transition-all border-2 ${
                        isSelected
                          ? 'bg-[#181822] border-[#f59e0b] shadow-[4px_4px_0px_#e62429] -translate-y-1'
                          : 'bg-[#121218] border-[#23232f] hover:border-[#f4f1ea] hover:bg-[#15151e]'
                      }`}
                    >
                      <div
                        className={`min-w-10 h-10 px-1.5 mb-2 flex items-center justify-center font-pixel text-xs font-bold border ${
                          isSelected
                            ? 'bg-[#f59e0b] text-[#0a0a0c] border-[#f4f1ea]'
                            : 'bg-[#0a0a0c] text-[#f59e0b] border-[#23232f]'
                        }`}
                      >
                        {item.token}
                      </div>

                      <span className="font-comic text-base uppercase tracking-wider text-[#f4f1ea] leading-tight line-clamp-2">
                        {item.name}
                      </span>
                      <span className="mt-1 font-mono text-[10px] text-[#a39f94]">
                        {item.tag || item.category}
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
            {activeData && (
              <div className="lg:col-span-7 bg-[#121218] border-2 border-[#23232f] p-6 relative">
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-pixel text-[#22c55e] bg-[#0a0a0c] px-2 py-1 border border-[#22c55e]/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeTab === 'techArsenal' ? 'EQUIPPED' : 'STORED'}
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3 pr-24">
                  {activeData.tag && (
                    <span className="inline-block bg-[#e62429] text-[#f4f1ea] font-pixel text-[10px] px-2.5 py-0.5 border border-[#f4f1ea] uppercase tracking-wider">
                      {activeData.tag}
                    </span>
                  )}
                  <span className="inline-block bg-[#0a0a0c] text-[#f59e0b] font-pixel text-[10px] px-2.5 py-0.5 border border-[#23232f] uppercase tracking-wider">
                    {activeData.category}
                  </span>
                </div>

                <h3 className="font-comic text-3xl sm:text-4xl text-[#f4f1ea] uppercase tracking-wider leading-none">
                  {activeData.name}
                </h3>

                <p className="mt-6 text-[#c8c4b9] font-mono text-xs sm:text-sm leading-relaxed border-t border-[#23232f] pt-4">
                  {activeData.desc}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
