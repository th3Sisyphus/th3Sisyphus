import React from 'react'
import { questsData } from '../data/portfolioData'

export default function QuestsSection() {
  const featuredQuest = questsData.find((q) => q.featured)
  const otherQuests = questsData.filter((q) => !q.featured)

  return (
    <section id="quests" className="relative py-28 border-t-2 border-[#23232f] bg-[#0a0a0c]/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-14 border-l-4 border-[#00e5ff] pl-4 sm:pl-6">
          <span className="text-[#00e5ff] font-pixel text-xs tracking-wider uppercase block mb-1">
            Archived Missions & Academic Campaigns
          </span>
          <h2 className="font-comic text-4xl sm:text-6xl text-[#f4f1ea] uppercase tracking-wide leading-none">
            Quest Chronicle
          </h2>
          <p className="mt-2 text-[#c8c4b9] font-mono text-sm max-w-xl">
            Skripsi Game AI, perjalanan kuliah, kepemimpinan proyek, dan side quest di luar layar.
          </p>
        </div>

        {/* Featured Quest: Skripsi Game AI */}
        {featuredQuest && (
          <article className="border-2 border-[#f4f1ea] bg-[#0a0a0c]/95 p-6 sm:p-8 shadow-[8px_8px_0px_#00e5ff] mb-12 relative">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#23232f]">
              <div className="flex items-center gap-3">
                <span className="bg-[#00e5ff] text-[#0a0a0c] font-pixel text-xs px-2.5 py-0.5 font-bold uppercase">
                  {featuredQuest.type}
                </span>
                <span className="font-pixel text-xs text-[#22c55e]">IN PROGRESS</span>
              </div>
              <span className="bg-[#121218] text-[#f59e0b] font-pixel text-xs px-3 py-1 border border-[#f59e0b]/50 uppercase">
                {featuredQuest.period}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Thesis Details */}
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-wider block font-semibold">
                  {featuredQuest.organization}
                </span>

                <h3 className="font-comic text-3xl sm:text-5xl text-[#f4f1ea] uppercase tracking-wide leading-none">
                  {featuredQuest.title}
                </h3>

                <p className="text-[#c8c4b9] font-mono text-sm leading-relaxed">
                  {featuredQuest.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-3">
                  {featuredQuest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#121218] text-[#00e5ff] font-mono text-xs px-2.5 py-1 border border-[#00e5ff]/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Research Preview */}
              <div className="lg:col-span-5">
                <div className="border-2 border-[#23232f] hover:border-[#00e5ff] bg-[#121218] p-2 transition-colors">
                  <img
                    src={featuredQuest.image}
                    alt={featuredQuest.caption}
                    className="w-full h-auto aspect-video object-cover [image-rendering:pixelated]"
                    loading="lazy"
                  />
                  <div className="mt-2 p-2 bg-[#0a0a0c] border border-[#23232f] flex justify-between items-center text-[10px] font-pixel text-[#a39f94]">
                    <span className="text-[#00e5ff]">{featuredQuest.caption}</span>
                    <span className="text-[#22c55e]">ACTIVE</span>
                  </div>
                </div>
              </div>

            </div>
          </article>
        )}

        {/* Other Quests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherQuests.map((quest) => (
            <article
              key={quest.id}
              className="border-2 border-[#f4f1ea] bg-[#0a0a0c]/90 p-6 sm:p-7 shadow-[6px_6px_0px_#e62429] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#23232f]">
                  <span className="font-pixel text-[11px] text-[#22c55e] uppercase">{quest.period}</span>
                  <span className="bg-[#121218] text-[#f59e0b] font-pixel text-xs px-2.5 py-0.5 border border-[#23232f] uppercase">
                    {quest.type}
                  </span>
                </div>

                <span className="font-mono text-xs text-[#e62429] uppercase tracking-wider block font-semibold mb-1">
                  {quest.organization}
                </span>

                <h3 className="font-comic text-2xl sm:text-4xl text-[#f4f1ea] uppercase tracking-wide leading-none">
                  {quest.title}
                </h3>

                <p className="mt-3 text-[#c8c4b9] font-mono text-xs sm:text-sm leading-relaxed">
                  {quest.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-[#23232f]">
                {quest.tags.map((t) => (
                  <span
                    key={t}
                    className="bg-[#121218] text-[#f4f1ea] font-mono text-xs px-2.5 py-1 border border-[#23232f]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
