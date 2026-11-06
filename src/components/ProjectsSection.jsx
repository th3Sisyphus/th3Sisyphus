import React, { useMemo, useState } from 'react'
import { ExternalLink, Github, Sun, Moon, Sunset, Activity } from 'lucide-react'
import { projectsData, projectCategories } from '../data/portfolioData'
import TabBar from './TabBar'

export default function ProjectsSection({ currentBiome, onCycleBiome }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const tabs = projectCategories.map((c) => ({ id: c, label: c }))

  const visibleProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projectsData
        : projectsData.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  const weatherIcons = {
    daylight: <Sun className="w-4 h-4 text-[#f59e0b]" />,
    sunset: <Sunset className="w-4 h-4 text-[#ff5722]" />,
    starlight: <Moon className="w-4 h-4 text-[#00e5ff]" />,
  }

  return (
    <section id="projects" className="relative py-28 border-t-2 border-[#23232f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Biome Machine Wrap */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="border-l-4 border-[#e62429] pl-4 sm:pl-6">
            <span className="text-[#e62429] font-pixel text-xs tracking-wider uppercase block mb-1">
              Excavated Code Modules
            </span>
            <h2 className="font-comic text-4xl sm:text-6xl text-[#f4f1ea] uppercase tracking-wide leading-none">
              Crafted Artifacts
            </h2>
            <p className="mt-2 text-[#c8c4b9] font-mono text-sm max-w-xl">
              Game AI, game dev, and full-stack systems engineered with clean architecture and playable mechanics.
            </p>
          </div>

          {/* Retro Weather Controller */}
          <button
            type="button"
            onClick={onCycleBiome}
            className="self-start md:self-auto px-4 py-2 bg-[#121218] hover:bg-[#181822] text-[#f4f1ea] font-mono text-xs border-2 border-[#f4f1ea] shadow-[3px_3px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2.5"
          >
            {weatherIcons[currentBiome] || <Sun className="w-4 h-4 text-[#f59e0b]" />}
            <span>[ BIOME ATMOSPHERE: <strong className="text-[#f59e0b] uppercase">{currentBiome}</strong> ]</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <TabBar
            tabs={tabs}
            active={activeCategory}
            onChange={setActiveCategory}
            label="Filter artifacts by category"
          />
        </div>

        {/* Artifacts Stack */}
        <div className="space-y-16">
          {visibleProjects.map((project, index) => {
            const isReversed = index % 2 === 1
            return (
              <article
                key={project.id}
                className={`border-2 border-[#f4f1ea] bg-[#0a0a0c]/90 shadow-[6px_6px_0px_#e62429] p-6 sm:p-8 relative ${
                  isReversed ? 'lg:border-r-8' : 'lg:border-l-8'
                }`}
              >
                {/* Comic Cell Badge Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#23232f]">
                  <div className="flex items-center gap-3 font-pixel text-xs">
                    <span className="bg-[#e62429] text-[#f4f1ea] px-2.5 py-0.5 border border-[#f4f1ea]">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[#f59e0b] uppercase tracking-wider">
                      {project.subtitle}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#a39f94] bg-[#121218] px-2 py-0.5 border border-[#23232f]">
                    CLASS: {project.category}
                  </span>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                  {/* Visual Preview Box */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="border-2 border-[#23232f] hover:border-[#f59e0b] bg-[#121218] p-2 relative group overflow-hidden transition-colors">
                      <div className="overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover:scale-105 [image-rendering:pixelated]"
                          loading="lazy"
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#a39f94]">
                        <span className="flex items-center gap-1 text-[#22c55e]">
                          <Activity className="w-3 h-3" />
                          IN-ENGINE SNAPSHOT
                        </span>
                        <span className="text-[#f59e0b]">3D PLANE SYNCED</span>
                      </div>
                    </div>
                  </div>

                  {/* Information & Narrative Box */}
                  <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <h3 className="font-comic text-3xl sm:text-5xl text-[#f4f1ea] uppercase tracking-wider leading-none">
                      {project.title}
                    </h3>

                    <p className="text-[#c8c4b9] font-mono text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Specs */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tech.map((spec) => (
                        <span
                          key={spec}
                          className="bg-[#181822] text-[#f4f1ea] font-mono text-xs px-3 py-1 border border-[#23232f]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Launch Action */}
                    <div className="pt-2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#e62429] hover:bg-[#ff3338] text-[#f4f1ea] font-comic text-xl uppercase tracking-wider border-2 border-[#f4f1ea] shadow-[4px_4px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                      >
                        <Github className="w-5 h-5" />
                        Launch Repository
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>

                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
