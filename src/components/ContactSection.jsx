import React, { useState } from 'react'
import { Radio, Send, ExternalLink, Github, Linkedin, Instagram, Mail, CheckCircle2 } from 'lucide-react'
import { channelsData, playerProfile } from '../data/portfolioData'

export default function ContactSection() {
  const channels = channelsData
  const [sender, setSender] = useState('')
  const [payload, setPayload] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Open user's email client with pre-filled content
    const subject = encodeURIComponent(`[Transmission] From: ${sender}`)
    const body = encodeURIComponent(`Sender: ${sender}\n\nPayload:\n${payload}`)
    window.location.href = `mailto:${playerProfile.socials.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const channelIcons = {
    github: <Github className="w-5 h-5 text-[#f4f1ea]" />,
    linkedin: <Linkedin className="w-5 h-5 text-[#00e5ff]" />,
    instagram: <Instagram className="w-5 h-5 text-[#e62429]" />,
    email: <Mail className="w-5 h-5 text-[#f59e0b]" />,
  }

  return (
    <section id="contact" className="relative py-28 border-t-2 border-[#23232f] bg-[#0a0a0c]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 border-l-4 border-[#22c55e] pl-4 sm:pl-6">
          <span className="text-[#22c55e] font-pixel text-xs tracking-wider uppercase block mb-1">
            Radio Outpost &amp; Direct Transmissions
          </span>
          <h2 className="font-comic text-4xl sm:text-6xl text-[#f4f1ea] uppercase tracking-wide leading-none">
            Open Comm Channel
          </h2>
          <p className="mt-2 text-[#c8c4b9] font-mono text-sm max-w-xl">
            Broadcast a transmission or establish a direct communication link for projects, collaborations, and research inquiries.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Established Frequencies (Left) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border-2 border-[#f4f1ea] bg-[#0a0a0c] p-6 shadow-[6px_6px_0px_#22c55e]">
              <span className="font-pixel text-xs text-[#22c55e] tracking-wider uppercase block pb-3 mb-4 border-b border-[#23232f]">
                ESTABLISHED FREQUENCIES
              </span>

              <div className="space-y-3">
                {channels.map((ch) => (
                  <a
                    key={ch.id}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-[#121218] hover:bg-[#181822] border-2 border-[#23232f] hover:border-[#f4f1ea] transition-all flex items-center justify-between group active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#0a0a0c] border border-[#23232f] flex items-center justify-center group-hover:border-[#f59e0b]">
                        {channelIcons[ch.id]}
                      </div>
                      <div>
                        <span className="font-comic text-xl text-[#f4f1ea] group-hover:text-[#f59e0b] transition-colors leading-none block uppercase">
                          {ch.name}
                        </span>
                        <span className="font-mono text-xs text-[#a39f94]">
                          {ch.address}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-[#0a0a0c] text-[#f59e0b] font-pixel text-[10px] px-2 py-0.5 border border-[#23232f]">
                        {ch.tag}
                      </span>
                      <ExternalLink className="w-4 h-4 text-[#a39f94] group-hover:text-[#f4f1ea]" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Outpost Terminal Status Card */}
            <div className="bg-[#121218] p-4 border border-[#23232f] font-mono text-xs text-[#a39f94] space-y-2">
              <div className="flex items-center justify-between text-[#22c55e]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#22c55e] inline-block animate-ping"></span>
                  RADAR BEACON ONLINE
                </span>
                <span className="font-pixel text-[10px]">FREQ: 142.85 MHz</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Terminal messages are routed directly to primary comm link. All transmissions are acknowledged within 24 standard hours.
              </p>
            </div>
          </div>

          {/* Transmission Terminal Form (Right) */}
          <div className="lg:col-span-7">
            <div className="border-2 border-[#f4f1ea] bg-[#0a0a0c] p-6 sm:p-8 shadow-[6px_6px_0px_#e62429]">
              <span className="font-pixel text-xs text-[#e62429] tracking-wider uppercase block pb-3 mb-6 border-b border-[#23232f]">
                TRANSMISSION TERMINAL // BROADCAST CONSOLE
              </span>

              {submitted ? (
                <div className="p-8 bg-[#121218] border-2 border-[#22c55e] text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#22c55e] mx-auto animate-bounce" />
                  <h3 className="font-comic text-3xl text-[#f4f1ea] uppercase">SIGNAL BROADCASTED</h3>
                  <p className="font-mono text-xs text-[#c8c4b9]">
                    Transmission dispatched to email pipeline. Thank you for connecting!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setSender('')
                      setPayload('')
                    }}
                    className="mt-4 px-4 py-2 bg-[#0a0a0c] text-[#22c55e] border border-[#22c55e] font-mono text-xs uppercase hover:bg-[#22c55e] hover:text-[#0a0a0c] transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-mono text-xs text-[#c8c4b9] uppercase tracking-wider mb-2 font-semibold">
                      Sender Call-sign / Identity
                    </label>
                    <input
                      type="text"
                      required
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      placeholder="e.g. Satoshi / Acme Corp / Research Colleague"
                      className="w-full bg-[#121218] border-2 border-[#23232f] focus:border-[#f59e0b] focus:outline-none p-3.5 font-mono text-sm text-[#f4f1ea] placeholder-[#57534e] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#c8c4b9] uppercase tracking-wider mb-2 font-semibold">
                      Transmission Payload
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={payload}
                      onChange={(e) => setPayload(e.target.value)}
                      placeholder="Detail your project brief, collaboration proposal, or message..."
                      className="w-full bg-[#121218] border-2 border-[#23232f] focus:border-[#f59e0b] focus:outline-none p-3.5 font-mono text-sm text-[#f4f1ea] placeholder-[#57534e] transition-colors resize-y"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-[#e62429] hover:bg-[#ff3338] text-[#f4f1ea] font-comic text-2xl uppercase tracking-wider border-2 border-[#f4f1ea] shadow-[5px_5px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-3"
                    >
                      <Radio className="w-5 h-5 animate-pulse" />
                      Broadcast Signal
                      <Send className="w-5 h-5 ml-1" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
