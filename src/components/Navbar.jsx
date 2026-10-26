import React, { useState } from 'react'
import { Menu, X, Gem, Terminal, Compass } from 'lucide-react'

export default function Navbar({ gemCount = 1450, activeSection = 'about' }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#skills', label: 'Inventory', id: 'skills' },
    { href: '#projects', label: 'Artifacts', id: 'projects' },
    { href: '#experience', label: 'Quests', id: 'experience' },
    { href: '#contact', label: 'Comm Link', id: 'contact', isCta: true },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0c]/85 backdrop-blur-md border-b-2 border-[#23232f]">
      {/* Top Pixel Status Ticker */}
      <div className="bg-[#121218] border-b border-[#23232f] px-4 py-1 text-[11px] font-pixel text-[#c8c4b9] flex justify-between items-center tracking-wider">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#22c55e]">
            <span className="w-2 h-2 bg-[#22c55e] inline-block animate-pulse"></span>
            WEBGL: ACTIVE
          </span>
          <span className="hidden sm:inline text-[#a39f94]">|</span>
          <span className="hidden sm:inline text-[#f59e0b]">WORLD: EXCAVATION_CORE</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#f59e0b] bg-[#0a0a0c] px-2 py-0.5 border border-[#f59e0b]/40">
            <Gem className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="font-bold">{gemCount.toLocaleString()}</span>
            <span className="text-[9px] text-[#c8c4b9]">GEMS</span>
          </div>
          <span className="hidden md:inline text-[10px] text-[#a39f94]">FPS: 60 SYNC</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#about" className="flex items-center gap-2.5 group">
          <span className="bg-[#e62429] text-[#f4f1ea] font-pixel text-xs px-2 py-1 border border-[#f4f1ea] shadow-[2px_2px_0px_#0a0a0c] group-hover:bg-[#ff3338] transition-colors">
            P1
          </span>
          <div className="flex flex-col">
            <span className="font-comic text-2xl tracking-wider text-[#f4f1ea] group-hover:text-[#f59e0b] transition-colors leading-none">
              TH3_SISYPHUS
            </span>
            <span className="font-mono text-[10px] text-[#a39f94] tracking-widest uppercase">
              Yehezkiel Darren
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`px-3.5 py-1.5 font-comic text-lg uppercase tracking-wider transition-all duration-150 ${
                link.isCta
                  ? 'bg-[#e62429] hover:bg-[#ff3338] text-[#f4f1ea] border-2 border-[#f4f1ea] shadow-[3px_3px_0px_#f59e0b] hover:translate-x-0.5 hover:translate-y-0.5'
                  : activeSection === link.id
                  ? 'text-[#f59e0b] bg-[#181822] border-b-2 border-[#f59e0b]'
                  : 'text-[#f4f1ea] hover:text-[#f59e0b] hover:bg-[#121218]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#f4f1ea] bg-[#181822] border border-[#23232f] hover:bg-[#23232f]"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-[#e62429]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0c] border-b-2 border-[#e62429] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 font-comic text-xl uppercase tracking-wider border ${
                link.isCta
                  ? 'bg-[#e62429] text-[#f4f1ea] border-[#f4f1ea] text-center shadow-[4px_4px_0px_#f59e0b]'
                  : 'text-[#f4f1ea] bg-[#121218] border-[#23232f] hover:text-[#f59e0b]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
