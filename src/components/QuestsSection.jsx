import React from 'react'
import { Award, Compass, CheckCircle2, ChevronRight, Terminal } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function QuestsSection() {
  const { quests } = portfolioData
  const featuredQuest = quests.find((q) => q.featured)
  const duoQuests = quests.filter((q) => !q.featured)

  return (
    <section id="experience" className="relative py-28 border-t-2 border-[#23232f] bg-[#0a0a0c]/85">
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
            Archived research expeditions, engineering architecture leadership, and media operations.
          </p>
        </div>

        {/* Featured Quest: Indo-NLP Researcher */}
        {featuredQuest && (
          <article className="border-2 border-[#f4f1ea] bg-[#0a0a0c]/95 p-6 sm:p-8 shadow-[8px_8px_0px_#00e5ff] mb-12 relative">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#23232f]">
              <div className="flex items-center gap-3">
                <span className="bg-[#00e5ff] text-[#0a0a0c] font-pixel text-xs px-2.5 py-0.5 font-bold">
                  EXPEDITION // 01
                </span>
                <span className="font-pixel text-xs text-[#22c55e]">{featuredQuest.status}</span>
              </div>
              <span className="bg-[#121218] text-[#f59e0b] font-pixel text-xs px-3 py-1 border border-[#f59e0b]/50">
                {featuredQuest.xp}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Thesis Details */}
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-wider block font-semibold">
                  {featuredQuest.affiliation}
                </span>

                <h3 className="font-comic text-3xl sm:text-5xl text-[#f4f1ea] uppercase tracking-wide leading-none">
                  {featuredQuest.title}
                </h3>

                <p className="text-[#c8c4b9] font-mono text-sm leading-relaxed">
                  {featuredQuest.body}
                </p>

                {/* Task Bullets */}
                <ul className="space-y-2 pt-2">
                  {featuredQuest.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-mono text-xs sm:text-sm text-[#f4f1ea]">
                      <ChevronRight className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {featuredQuest.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#121218] text-[#00e5ff] font-mono text-xs px-2.5 py-1 border border-[#00e5ff]/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Research Screen Preview */}
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
                    <span className="text-[#22c55e]">VALIDATED</span>
                  </div>
                </div>
              </div>

            </div>
          </article>
        )}

        {/* Asymmetric Duo: Side-by-Side Quests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {duoQuests.map((quest) => (
            <article
              key={quest.id}
              className="border-2 border-[#f4f1ea] bg-[#0a0a0c]/90 p-6 sm:p-7 shadow-[6px_6px_0px_#e62429] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#23232f]">
                  <span className="font-pixel text-[11px] text-[#22c55e]">{quest.status}</span>
                  <span className="bg-[#121218] text-[#f59e0b] font-pixel text-xs px-2.5 py-0.5 border border-[#23232f]">
                    {quest.xp}
                  </span>
                </div>

                <span className="font-mono text-xs text-[#e62429] uppercase tracking-wider block font-semibold mb-1">
                  {quest.affiliation}
                </span>

                <h3 className="font-comic text-2xl sm:text-4xl text-[#f4f1ea] uppercase tracking-wide leading-none">
                  {quest.title}
                </h3>

                <p className="mt-3 text-[#c8c4b9] font-mono text-xs sm:text-sm leading-relaxed">
                  {quest.body}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-[#23232f]">
                {quest.tags.map((t, i) => (
                  <span
                    key={i}
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
