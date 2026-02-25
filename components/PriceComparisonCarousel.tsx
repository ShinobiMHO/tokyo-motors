'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { priceComparisons, type PriceComparison } from '@/lib/price-comparisons'

// ============================================================
// PriceComparisonCarousel — Dark luxury price comparison
// Shows real Japan vs USA price differences for identical cars
// ============================================================

function formatPrice(usd: number): string {
  return '$' + usd.toLocaleString('en-US')
}

function formatJpy(jpy: number): string {
  return '¥' + jpy.toLocaleString('en-US')
}

function ComparisonCard({ item }: { item: PriceComparison }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '560px' }}>
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <Image
          src={item.image_url}
          alt={`${item.brand} ${item.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          quality={85}
        />
        {/* Multi-layer dark overlay for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-8 lg:p-12" style={{ minHeight: '560px' }}>
        {/* Brand + Model title */}
        <div className="mb-6">
          <p className="text-[#c9a96e] text-xs font-medium tracking-[0.4em] uppercase mb-2">
            {item.brand}
          </p>
          <h3 className="text-white font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {item.model.toUpperCase()}
          </h3>
          <p className="text-[#a0a0a0] text-sm tracking-[0.2em] uppercase mt-1">
            {item.year} &bull; {item.mileage_km.toLocaleString('en-US')} KM
          </p>
          {/* Gold divider */}
          <div className="w-12 h-px bg-[#c9a96e] mt-4" />
        </div>

        {/* Price comparison grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Japan price */}
          <div className="bg-[#0a0a0a]/70 border border-[#c9a96e]/30 p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🇯🇵</span>
              <span className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase">Japan</span>
            </div>
            <p className="text-white font-serif text-2xl sm:text-3xl font-bold leading-none">
              {formatPrice(item.japan_price_usd)}
            </p>
            <p className="text-[#666666] text-xs mt-2 font-mono">
              {formatJpy(item.japan_price_jpy)}
            </p>
          </div>

          {/* USA price */}
          <div className="bg-[#0a0a0a]/70 border border-white/10 p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🇺🇸</span>
              <span className="text-[#a0a0a0] text-xs font-medium tracking-[0.3em] uppercase">USA Market</span>
            </div>
            <p className="text-[#a0a0a0] font-serif text-2xl sm:text-3xl font-bold leading-none line-through decoration-[#c9a96e]/50">
              {formatPrice(item.usa_price_usd)}
            </p>
            <p className="text-[#666666] text-xs mt-2">
              Same year &amp; mileage
            </p>
          </div>
        </div>

        {/* Savings badge + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Big savings badge */}
          <div className="bg-[#c9a96e] px-5 py-3 flex items-center gap-3">
            <div>
              <p className="text-[#0a0a0a] text-[10px] font-bold tracking-[0.2em] uppercase leading-none mb-1">
                You Save
              </p>
              <p className="text-[#0a0a0a] font-serif text-xl sm:text-2xl font-bold leading-none">
                {formatPrice(item.savings_usd)}
              </p>
            </div>
            <div className="w-px h-8 bg-[#0a0a0a]/30" />
            <p className="text-[#0a0a0a] font-bold text-lg sm:text-xl">
              {item.savings_percent.toFixed(0)}%
            </p>
          </div>

          {/* CTA button */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border border-[#c9a96e]/50 text-[#c9a96e] px-5 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300"
          >
            Find Me This Car
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PriceComparisonCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const total = priceComparisons.length

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }, [total])

  const goTo = useCallback((idx: number) => {
    setCurrent(idx)
    setIsAutoPlaying(false)
  }, [])

  // Auto-play every 5s
  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(goNext, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, goNext])

  // Pause autoplay on user interaction, resume after 10s
  const handleNav = useCallback((fn: () => void) => {
    setIsAutoPlaying(false)
    fn()
    const t = setTimeout(() => setIsAutoPlaying(true), 10000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-full bg-[#0a0a0a]">
      {/* Slide container */}
      <div className="relative overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {priceComparisons.map((item) => (
            <div key={item.id} className="w-full shrink-0">
              <ComparisonCard item={item} />
            </div>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => handleNav(goPrev)}
          aria-label="Previous car"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 border border-[#c9a96e]/50 bg-[#0a0a0a]/80 backdrop-blur-sm flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300 group"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleNav(goNext)}
          aria-label="Next car"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 border border-[#c9a96e]/50 bg-[#0a0a0a]/80 backdrop-blur-sm flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300 group"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots pagination */}
      <div className="flex items-center justify-center gap-2 py-6">
        {priceComparisons.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => goTo(idx)}
            aria-label={`Go to ${item.brand} ${item.model}`}
            className={`transition-all duration-300 ${
              idx === current
                ? 'w-8 h-1 bg-[#c9a96e]'
                : 'w-2 h-2 bg-[#333333] hover:bg-[#c9a96e]/50 rounded-full'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1a1a1a]">
          <div
            key={current}
            className="h-full bg-[#c9a96e]/40"
            style={{
              animation: 'carousel-progress 5s linear forwards',
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes carousel-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
