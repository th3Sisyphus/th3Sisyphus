import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, Sprout } from 'lucide-react'
import { fieldNotesData, fieldNoteCategories } from '../data/portfolioData'
import TabBar from './TabBar'

const CATEGORY_COLORS = {
  'Game AI & Tech': '#00e5ff',
  'Coffee & Music': '#f59e0b',
  Thoughts: '#22c55e',
}

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function ReaderModal({ note, onClose }) {
  const closeRef = useRef(null)
  const accent = CATEGORY_COLORS[note.category] || '#f59e0b'
  const paragraphs = note.content.split(/\n{2,}/).filter(Boolean)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      if (previousFocus && previousFocus.focus) previousFocus.focus()
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-[#0a0a0c]/90"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      data-lenis-prevent
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-title"
        className="w-full max-w-3xl max-h-[88vh] flex flex-col border-4 border-[#f4f1ea] bg-[#0a0a0c] shadow-[10px_10px_0px_#e62429] text-[#f4f1ea]"
      >
        {/* Dialog Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-4 border-[#f4f1ea] bg-[#121218]">
          <div className="flex flex-wrap items-center gap-2 font-pixel text-[11px]">
            <span
              className="px-2.5 py-0.5 text-[#0a0a0c] font-bold uppercase"
              style={{ backgroundColor: accent }}
            >
              {note.category}
            </span>
            <span className="text-[#22c55e] uppercase">{note.status}</span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e62429] hover:bg-[#ff3338] text-[#f4f1ea] font-comic text-lg uppercase tracking-wider border-2 border-[#f4f1ea] shadow-[3px_3px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <X className="w-4 h-4" />
            [X] Close
          </button>
        </div>

        {/* Dialog Body */}
        <div className="overflow-y-auto px-5 sm:px-10 py-8" data-lenis-prevent>
          <p className="font-pixel text-[11px] text-[#a39f94] uppercase tracking-wider">
            Entry logged · {formatDate(note.date)}
          </p>
          <h3
            id="reader-title"
            className="mt-2 font-comic text-4xl sm:text-5xl uppercase tracking-wide leading-none text-[#f4f1ea] drop-shadow-[2px_2px_0px_#e62429]"
          >
            {note.title}
          </h3>
          <p
            className="mt-4 font-mono text-sm text-[#c8c4b9] border-l-4 pl-4"
            style={{ borderColor: accent }}
          >
            {note.summary}
          </p>

          <div className="mt-6 space-y-5 font-sans text-base leading-[1.8] text-[#e9e5da] max-w-[65ch]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function GardenSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openNoteId, setOpenNoteId] = useState(null)

  const tabs = fieldNoteCategories.map((c) => ({ id: c, label: c }))

  const visibleNotes = useMemo(
    () =>
      activeCategory === 'All'
        ? fieldNotesData
        : fieldNotesData.filter((n) => n.category === activeCategory),
    [activeCategory]
  )

  const openNote = fieldNotesData.find((n) => n.id === openNoteId) || null
  const closeNote = useCallback(() => setOpenNoteId(null), [])

  return (
    <section id="notes" className="relative py-28 border-t-2 border-[#23232f] bg-[#0a0a0c]/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 border-l-4 border-[#e62429] pl-4 sm:pl-6">
          <span className="text-[#e62429] font-pixel text-xs tracking-wider uppercase flex items-center gap-2 mb-1">
            <Sprout className="w-4 h-4" />
            The Archives & Dev Logs
          </span>
          <h2 className="font-comic text-4xl sm:text-6xl text-[#f4f1ea] uppercase tracking-wide leading-none">
            Field Notes
          </h2>
          <p className="mt-2 text-[#c8c4b9] font-mono text-sm max-w-xl">
            Catatan skripsi Game AI, eksperimen seduhan kopi, dan pemikiran bebas. Klik kartu untuk membaca.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <TabBar
            tabs={tabs}
            active={activeCategory}
            onChange={setActiveCategory}
            label="Filter field notes by category"
          />
        </div>

        {/* Notes Grid */}
        {visibleNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleNotes.map((note) => {
              const accent = CATEGORY_COLORS[note.category] || '#f59e0b'
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setOpenNoteId(note.id)}
                  aria-haspopup="dialog"
                  className="group text-left border-2 border-[#f4f1ea] bg-[#0a0a0c]/90 p-6 sm:p-7 shadow-[6px_6px_0px_#e62429] flex flex-col justify-between transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#e62429] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[3px_3px_0px_#e62429]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-[#23232f]">
                      <span
                        className="font-pixel text-[11px] px-2 py-0.5 text-[#0a0a0c] font-bold uppercase"
                        style={{ backgroundColor: accent }}
                      >
                        {note.category}
                      </span>
                      <span className="bg-[#121218] text-[#22c55e] font-pixel text-[11px] px-2.5 py-0.5 border border-[#23232f] uppercase">
                        {note.status}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-[#a39f94] uppercase tracking-wider block mb-1">
                      {formatDate(note.date)}
                    </span>

                    <h3 className="font-comic text-2xl sm:text-4xl text-[#f4f1ea] group-hover:text-[#f59e0b] transition-colors uppercase tracking-wide leading-none">
                      {note.title}
                    </h3>

                    <p className="mt-3 text-[#c8c4b9] font-mono text-xs sm:text-sm leading-relaxed">
                      {note.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#23232f] font-pixel text-[11px] text-[#f59e0b] uppercase">
                    <span>Read entry</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="border-2 border-dashed border-[#23232f] bg-[#121218]/80 p-10 text-center">
            <p className="font-pixel text-xs text-[#a39f94] uppercase tracking-wider">
              Belum ada catatan di kategori ini
            </p>
          </div>
        )}
      </div>

      {openNote && <ReaderModal note={openNote} onClose={closeNote} />}
    </section>
  )
}
