'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Gauge, Calendar, ArrowRight } from 'lucide-react'
import type { Car } from '@/lib/supabase'
import { formatYen, formatUSD, formatKm, getStatusColor, getStatusLabel } from '@/lib/supabase'

// ============================================================
// CarCard — Carte voiture pour la grille d'inventaire
// Design dark luxury avec hover effects
// ============================================================

interface CarCardProps {
  car: Car
  priority?: boolean // Charger l'image en priorité (pour les 3 premières cartes)
}

export default function CarCard({ car, priority = false }: CarCardProps) {
  // Première image de la voiture (ou placeholder si pas d'images)
  const mainImage = car.images?.[0] || 'https://placehold.co/800x500/141414/c9a96e?text=No+Image'

  return (
    <Link href={`/cars/${car.id}`} className="group block">
      <article className="bg-[#141414] border border-[#1a1a1a] overflow-hidden transition-all duration-300 hover:border-[#c9a96e]/40 hover:shadow-2xl hover:shadow-[#c9a96e]/5 hover:-translate-y-1">

        {/* Image de la voiture */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]">
          <Image
            src={mainImage}
            alt={`${car.brand} ${car.model} ${car.year}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 via-transparent to-transparent" />

          {/* Badge statut */}
          <div className="absolute top-3 right-3">
            <span className={`status-badge ${getStatusColor(car.status)}`}>
              {getStatusLabel(car.status)}
            </span>
          </div>

          {/* Badge "Featured" si mise en avant */}
          {car.featured && (
            <div className="absolute top-3 left-3">
              <span className="status-badge bg-[#c9a96e]/20 text-[#c9a96e] border-[#c9a96e]/40">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Informations de la voiture */}
        <div className="p-5">
          {/* Marque + modèle */}
          <div className="mb-3">
            <p className="text-[#a0a0a0] text-xs font-medium uppercase tracking-widest mb-1">
              {car.brand}
            </p>
            <h3 className="text-white font-serif font-bold text-xl leading-tight">
              {car.model}
            </h3>
          </div>

          {/* Stats : année + kilomètres */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-[#a0a0a0]">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs">{car.year}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#a0a0a0]">
              <Gauge className="w-3.5 h-3.5" />
              <span className="text-xs">{formatKm(car.mileage_km)}</span>
            </div>
          </div>

          {/* Séparateur */}
          <div className="h-px bg-[#1a1a1a] mb-4" />

          {/* Prix */}
          <div className="flex items-end justify-between">
            <div>
              {/* Prix en JPY */}
              <p className="text-[#666666] text-xs mb-1">Est. price</p>
              <p className="text-[#c9a96e] font-semibold text-base">
                {formatYen(car.price_jpy)}
              </p>
              {/* Prix USD */}
              <p className="text-[#a0a0a0] text-xs mt-0.5">
                ≈ {formatUSD(car.price_usd_estimate)}
              </p>
            </div>

            {/* Flèche voir détail */}
            <div className="w-9 h-9 border border-[#c9a96e]/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#c9a96e] group-hover:border-[#c9a96e]">
              <ArrowRight className="w-4 h-4 text-[#c9a96e] group-hover:text-black transition-colors duration-300" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
