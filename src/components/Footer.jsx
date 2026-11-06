import React from 'react'
import { ArrowUp, Terminal, ShieldAlert } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-[#23232f] bg-[#0a0a0c] py-12 text-[#a39f94]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#23232f]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-comic text-3xl text-[#f4f1ea] tracking-wider uppercase">
                Yehezkiel Darren
              </span>
              <span className="bg-[#e62429] text-[#f4f1ea] font-pixel text-[10px] px-2 py-0.5 border border-[#f4f1ea]">
                TH3_SISYPHUS
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-[#c8c4b9]">
              3D WebGL Interactive Comic &amp; 2D Sandbox Portfolio Experience.
            </p>
          </div>

          {/* Jump to top */}
          <a
            href="#hero"
            className="flex items-center gap-2 px-4 py-2 bg-[#121218] hover:bg-[#181822] text-[#f4f1ea] font-mono text-xs border border-[#23232f] hover:border-[#f59e0b] transition-colors"
          >
            <span>Ascend to Surface</span>
            <ArrowUp className="w-4 h-4 text-[#f59e0b]" />
          </a>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#78716c]">
          <p>
            Built with React 19, Three.js, R3F, Drei, GSAP ScrollTrigger, Lenis &amp; Tailwind CSS.
          </p>
          <div className="flex items-center gap-3 font-pixel text-[10px] text-[#f59e0b]">
            <span>STATUS: SHAFT LEVEL DEPTH -21m</span>
            <span>•</span>
            <span>FPS: 60</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
