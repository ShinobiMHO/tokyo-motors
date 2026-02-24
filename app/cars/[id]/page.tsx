import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Mail, Gauge, Calendar, Palette, Settings, Zap, CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarGallery from '@/components/CarGallery'
import ContactForm from '@/components/ContactForm'
import {
  DEMO_CARS,
  formatYen,
  formatUSD,
  formatEUR,
  formatKm,
  calculateCommission,
  getStatusColor,
  getStatusLabel,
  type Car,
} from '@/lib/supabase'
import { whatsappLink, TM_CONTACT_EMAIL } from '@/lib/config'
import { createClient } from '@supabase/supabase-js'

// ============================================================
// Car Detail — Page détail d'une voiture
// Galerie, specs complètes, formulaire de contact
// ============================================================

// Générer les métadonnées dynamiques SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const car = await getCarById(params.id)
  if (!car) return { title: 'Car Not Found' }

  return {
    title: `${car.year} ${car.brand} ${car.model} — From Japan`,
    description: `${car.year} ${car.brand} ${car.model}, ${formatKm(car.mileage_km)}, ${car.color}. ${car.description.slice(0, 150)}...`,
    openGraph: {
      images: car.images?.[0] ? [car.images[0]] : [],
    },
  }
}

// Récupérer une voiture par ID (Supabase d'abord, fallback sur données demo)
async function getCarById(id: string): Promise<Car | null> {
  try {
    // Variables préfixées TM_ pour isoler Tokyo Motors des autres projets
    const supabaseUrl = process.env.NEXT_PUBLIC_TM_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_TM_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      const client = createClient(supabaseUrl, supabaseKey)
      const { data, error } = await client.from('cars').select('*').eq('id', id).single()
      if (!error && data) return data
    }
  } catch (err) {
    console.error('Supabase car fetch error:', err)
  }

  // Fallback : données de démo
  return DEMO_CARS.find((c) => c.id === id) || null
}

export default async function CarDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const car = await getCarById(params.id)

  // Si la voiture n'existe pas → page 404
  if (!car) notFound()

  const commissionJpy = calculateCommission(car.price_jpy)

  return (
    <>
      <Navbar />

      <div className="pt-24 pb-20 bg-[#0a0a0a]">
        <div className="container-main">

          {/* Bouton retour */}
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Inventory
          </Link>

          {/* Layout principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Colonne gauche (2/3) — galerie + détails */}
            <div className="lg:col-span-2 space-y-10">

              {/* Titre + badge statut */}
              <div>
                <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
                  <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase">
                    {car.brand}
                  </p>
                  <span className={`status-badge ${getStatusColor(car.status)}`}>
                    {getStatusLabel(car.status)}
                  </span>
                </div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white">
                  {car.model}
                </h1>
                <p className="text-[#a0a0a0] text-lg mt-1">{car.year}</p>
              </div>

              {/* Galerie photos */}
              <CarGallery images={car.images} carName={`${car.brand} ${car.model}`} />

              {/* Specs techniques */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-white mb-6">
                  Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: <Calendar className="w-4 h-4" />,
                      label: 'Year',
                      value: car.year.toString(),
                    },
                    {
                      icon: <Gauge className="w-4 h-4" />,
                      label: 'Mileage',
                      value: formatKm(car.mileage_km),
                    },
                    {
                      icon: <Palette className="w-4 h-4" />,
                      label: 'Color',
                      value: car.color,
                    },
                    {
                      icon: <Settings className="w-4 h-4" />,
                      label: 'Transmission',
                      value: car.transmission,
                    },
                    {
                      icon: <Zap className="w-4 h-4" />,
                      label: 'Engine',
                      value: car.engine,
                    },
                    {
                      icon: <CheckCircle2 className="w-4 h-4" />,
                      label: 'Status',
                      value: getStatusLabel(car.status),
                    },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center gap-4 bg-[#141414] border border-[#1a1a1a] p-4"
                    >
                      <div className="text-[#c9a96e] shrink-0">{spec.icon}</div>
                      <div>
                        <p className="text-[#666666] text-xs uppercase tracking-wider">{spec.label}</p>
                        <p className="text-white text-sm font-medium mt-0.5">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-white mb-4">
                  About This Car
                </h2>
                <div className="h-px bg-[#1a1a1a] mb-6" />
                <p className="text-[#a0a0a0] text-base leading-relaxed">{car.description}</p>
              </div>

              {/* Section "Why this car from Japan?" */}
              <div className="bg-[#141414] border border-[#c9a96e]/20 p-8">
                <h2 className="font-serif text-2xl font-bold text-white mb-6">
                  Why This Car From Japan?
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Japanese market quality',
                      desc: "Japanese owners maintain their vehicles immaculately. This " + car.brand + " " + car.model + " is no exception — full dealer service history.",
                    },
                    {
                      title: 'No accidents, no flood history',
                      desc: "Japan's strict vehicle inspection system means any accident history is documented. We verify every car's clean record.",
                    },
                    {
                      title: 'Genuine kilometers',
                      desc: `${formatKm(car.mileage_km)} is exceptional for a ${car.year} ${car.brand}. Japanese supercars are driven sparingly, often stored in climate-controlled garages.`,
                    },
                    {
                      title: 'Price advantage',
                      desc: `Comparable ${car.brand} ${car.model}s in the US or European market cost 20-35% more. Our 10% commission keeps your total well below market.`,
                    },
                  ].map((point) => (
                    <div key={point.title} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#c9a96e] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-medium text-sm">{point.title}</p>
                        <p className="text-[#a0a0a0] text-sm mt-1">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite (1/3) — prix + contact */}
            <div className="space-y-6">

              {/* Bloc prix */}
              <div className="bg-[#141414] border border-[#1a1a1a] p-6 sticky top-24">
                <p className="text-[#a0a0a0] text-xs uppercase tracking-wider mb-1">
                  Japan purchase price
                </p>
                <p className="text-[#c9a96e] font-serif text-3xl font-bold mb-1">
                  {formatYen(car.price_jpy)}
                </p>
                <p className="text-[#a0a0a0] text-sm mb-6">
                  ≈ {formatUSD(car.price_usd_estimate)} · {formatEUR(car.price_eur_estimate)}
                </p>

                {/* Breakdown commission */}
                <div className="bg-[#111111] border border-[#1a1a1a] p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#a0a0a0]">Purchase price</span>
                    <span className="text-white">{formatYen(car.price_jpy)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#a0a0a0]">Commission (10%)</span>
                    <span className="text-[#c9a96e]">{formatYen(commissionJpy)}</span>
                  </div>
                  <div className="h-px bg-[#1a1a1a]" />
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-white">Total (excl. shipping)</span>
                    <span className="text-white">{formatYen(car.price_jpy + commissionJpy)}</span>
                  </div>
                  <p className="text-[#666666] text-xs pt-1">
                    * Shipping + taxes quoted separately.
                  </p>
                </div>

                {/* Boutons de contact rapide */}
                <div className="space-y-3">
                  <a
                    href={whatsappLink(`Hi! I'm interested in the ${car.year} ${car.brand} ${car.model}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask on WhatsApp
                  </a>
                  <a
                    href={`mailto:${TM_CONTACT_EMAIL}?subject=${encodeURIComponent(`Inquiry: ${car.year} ${car.brand} ${car.model}`)}`}
                    className="btn-outline-gold w-full justify-center"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact en bas (pleine largeur) */}
          <div className="mt-16 max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-white mb-2">
              Interested in This Car?
            </h2>
            <p className="text-[#a0a0a0] text-sm mb-8">
              Send us a message and we&apos;ll get back to you within a few hours.
            </p>
            <ContactForm
              prefilledCar={`${car.year} ${car.brand} ${car.model}`}
              compact
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
