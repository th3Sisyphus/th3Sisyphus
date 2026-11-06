import React from 'react'

// Tab/filter bar. Class tombol meniru nav link di Navbar.jsx
export default function TabBar({ tabs, active, onChange, label }) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex flex-wrap items-center gap-2"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`px-3.5 py-1.5 font-comic text-lg uppercase tracking-wider transition-all duration-150 border-2 ${
              isActive
                ? 'text-[#f59e0b] bg-[#181822] border-[#23232f] border-b-[#f59e0b]'
                : 'text-[#f4f1ea] border-transparent hover:text-[#f59e0b] hover:bg-[#121218] hover:border-[#23232f] active:translate-x-0.5 active:translate-y-0.5'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
