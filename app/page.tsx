import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Shield,
  Camera,
  Gavel,
  Package,
  Star,
  MessageCircle,
  TrendingDown,
  DollarSign,
  FileCheck,
  Home,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarCard from '@/components/CarCard'
import PriceComparisonCarousel from '@/components/PriceComparisonCarousel'
import { DEMO_CARS } from '@/lib/supabase'
import { whatsappLink } from '@/lib/config'

// ============================================================
// Homepage — Page d'accueil Tokyo Motors
// ============================================================

export default function HomePage() {
  // 3 voitures mises en avant pour la section "Featured Cars"
  const featuredCars = DEMO_CARS.filter((car) => car.featured).slice(0, 3)

  return (
    <>
      <Navbar />

      {/* ===== HERO — Section plein écran ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=90"
            alt="Ferrari 488 Pista — Tokyo Motors"
            fill
            className="object-cover scale-105"
            priority
            quality={90}
          />
          {/* Overlay noir pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
        </div>

        {/* Contenu du hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Label haut */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <span className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase">
              Tokyo · Japan
            </span>
            <div className="w-8 h-px bg-[#c9a96e]" />
          </div>

          {/* Titre principal */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
            Your Dream
            <br />
            <span className="italic text-[#c9a96e]">Supercar</span>
            <br />
            From Japan
          </h1>

          {/* Sous-titre */}
          <p className="text-[#a0a0a0] text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We source, inspect, and export the finest Japanese supercars directly
            to your door in the USA and France. Ferrari, Lamborghini, McLaren and more —
            at just 10% commission.
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory" className="btn-gold text-sm">
              Browse Inventory
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/how-it-works" className="btn-outline-gold text-sm">
              How It Works
            </Link>
          </div>

          {/* Stats rapides */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '10%', label: 'Commission only' },
              { value: '50+', label: 'Cars sourced' },
              { value: '100%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[#c9a96e] font-serif text-2xl font-bold">{stat.value}</p>
                <p className="text-[#a0a0a0] text-xs tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flèche scroll bas */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a96e]/60 to-transparent" />
        </div>
      </section>

      {/* ===== WHY BUY FROM JAPAN ===== */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-main">
          {/* Titre section */}
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              The Tokyo Advantage
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Buy From Japan?
            </h2>
            <p className="text-[#a0a0a0] text-base max-w-2xl mx-auto">
              Japan&apos;s supercar market is structurally different. Lower demand, stricter laws, and a unique ownership culture create conditions you simply won&apos;t find anywhere else.
            </p>
          </div>

          {/* 6 avantages en grille */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Gauge className="w-6 h-6" />,
                title: 'Ultra Low Mileage',
                desc: 'Japanese drivers average just 8,000 km/year — vs 24,000 in the USA and 15,000 in France. Tokyo has the world\'s best public transit, so supercars are driven for pleasure only.',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Immaculate Maintenance',
                desc: 'Japan\'s "Shaken" inspection system (every 2 years, ¥100k–200k) forces owners to maintain their cars perfectly. Full service records are standard. Neglected cars don\'t exist here.',
              },
              {
                icon: <TrendingDown className="w-6 h-6" />,
                title: 'Prices 20–40% Below Market',
                desc: 'The Japanese luxury car market is smaller — fewer buyers means faster depreciation. A Ferrari 488 GTB that sells for $249,000 in the USA regularly lists for $168,000 in Japan. Same car. Same mileage.',
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: 'Yen at a 30-Year Low',
                desc: 'The Japanese yen is at its weakest level since 1990 (155.74 JPY per USD). Every supercar you buy from Japan today is at a historic discount. This window will not last forever.',
              },
              {
                icon: <FileCheck className="w-6 h-6" />,
                title: 'Total Transparency at Auction',
                desc: 'Japanese auction houses (USS, TAA, JU) grade every car 1–5 and document every scratch, dent, and mechanical issue. No hidden accidents. No flood damage. No rebuilt titles.',
              },
              {
                icon: <Home className="w-6 h-6" />,
                title: 'Garaged & Preserved',
                desc: 'Japanese supercar owners keep their cars in covered garages year-round. No road salt. No UV damage. No hailstorms. Bodywork and interiors stay factory-fresh for decades.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#141414] border border-[#1a1a1a] p-6 hover:border-[#c9a96e]/30 transition-all duration-300 group"
              >
                {/* Icône */}
                <div className="w-12 h-12 bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] mb-4 group-hover:bg-[#c9a96e]/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REAL PRICE COMPARISONS ===== */}
      <section className="bg-[#0a0a0a] pb-0">
        <div className="container-main">
          {/* Section header */}
          <div className="text-center pt-16 pb-12">
            <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Side by Side
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Real Price Comparisons
            </h2>
            <p className="text-[#a0a0a0] text-base max-w-xl mx-auto">
              Same car. Same year. Same mileage.{' '}
              <span className="text-white font-medium">The difference is staggering.</span>
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-12 h-px bg-[#c9a96e]/40" />
              <p className="text-[#666666] text-xs tracking-wider">
                All prices verified · 1 USD = 155.74 JPY (live rate)
              </p>
              <div className="w-12 h-px bg-[#c9a96e]/40" />
            </div>
          </div>
        </div>

        {/* Full-width carousel */}
        <div className="max-w-6xl mx-auto px-0 sm:px-4 lg:px-8">
          <PriceComparisonCarousel />
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-10">
          <p className="text-[#666666] text-sm mb-4">
            Ready to buy at the Japanese price?
          </p>
          <Link href="/contact" className="btn-gold text-sm">
            Start My Car Search
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-padding bg-[#111111]">
        <div className="container-main">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Simple Process
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-[#a0a0a0] text-base max-w-xl mx-auto">
              From your first message to your car in your garage — in 4 simple steps.
            </p>
          </div>

          {/* 4 étapes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              {
                num: '01',
                title: 'Tell Us Your Dream Car',
                desc: "Contact us with your wish — brand, model, year, budget. No dream is too specific. We'll find it.",
              },
              {
                num: '02',
                title: 'We Source & Inspect',
                desc: 'We search our network, attend auctions, and personally inspect every candidate. You receive full reports.',
              },
              {
                num: '03',
                title: 'Full Logistics Handled',
                desc: 'We manage export paperwork, ocean shipping, customs clearance for the USA or France. Zero hassle.',
              },
              {
                num: '04',
                title: 'Car Delivered to You',
                desc: 'Your supercar arrives ready to register. We assist with final steps. Then — just enjoy the drive.',
              },
            ].map((step, idx) => (
              <div
                key={step.num}
                className={`relative p-8 border border-[#1a1a1a] hover:border-[#c9a96e]/30 transition-colors duration-300 ${
                  idx < 3 ? 'lg:border-r-0' : ''
                }`}
              >
                {/* Numéro */}
                <p className="text-[#c9a96e]/30 font-serif text-6xl font-bold leading-none mb-4">
                  {step.num}
                </p>
                <h3 className="text-white font-semibold text-base mb-3">{step.title}</h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">{step.desc}</p>

                {/* Flèche entre étapes (desktop) */}
                {idx < 3 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-[#111111] border border-[#1a1a1a] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-[#c9a96e]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA bas */}
          <div className="text-center mt-12">
            <Link href="/how-it-works" className="btn-outline-gold">
              Learn More About The Process
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED CARS ===== */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                Currently Available
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white">
                Featured Cars
              </h2>
            </div>
            <Link
              href="/inventory"
              className="flex items-center gap-2 text-[#c9a96e] text-sm hover:gap-3 transition-all duration-200"
            >
              View All Inventory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grille des voitures vedettes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car, idx) => (
              <CarCard key={car.id} car={car} priority={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== NOTRE COMMISSION ===== */}
      <section className="section-padding bg-[#111111]">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Texte */}
              <div>
                <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                  Transparent Pricing
                </p>
                <h2 className="font-serif text-4xl font-bold text-white mb-6">
                  Our Commission
                </h2>
                <div className="gold-divider mb-6" />
                <p className="text-[#a0a0a0] text-base leading-relaxed mb-6">
                  We believe in complete transparency. Our fee is simple, fair, and fixed. Beyond sourcing, we leverage our private network of dealers, collectors, and auction insiders to negotiate the best possible price — so your 10% pays for itself many times over.
                </p>

                {/* La grande formule */}
                <div className="bg-[#141414] border border-[#c9a96e]/30 p-8 mb-6">
                  <p className="text-5xl font-serif font-bold text-[#c9a96e] mb-2">10%</p>
                  <p className="text-white font-medium text-base">
                    of the purchase price in Japan
                  </p>
                  <p className="text-[#a0a0a0] text-sm mt-2">
                    No hidden fees. No setup fee. No surprises.
                  </p>
                </div>

                {/* Ce qui est inclus */}
                <ul className="space-y-3">
                  {[
                    'Full car sourcing & auction access',
                    'Private network research & deep market sourcing',
                    'Price negotiation to secure the best possible deal',
                    'Physical inspection + test drive',
                    'Complete photo & video report',
                    'Export paperwork & documentation',
                    'Liaison with shipping company',
                    'Import guidance for USA or France',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                      <CheckCircle2 className="w-4 h-4 text-[#c9a96e] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exemple de calcul */}
              <div>
                <h3 className="text-white font-semibold text-base mb-6 uppercase tracking-wider">
                  Example Calculation
                </h3>
                <div className="space-y-4">
                  {/* Ferrari */}
                  <div className="bg-[#141414] border border-[#1a1a1a] p-5">
                    <p className="text-[#a0a0a0] text-xs uppercase tracking-wider mb-3">Ferrari 488 Pista</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#a0a0a0]">Purchase price Japan</span>
                        <span className="text-white">¥74,235,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#a0a0a0]">Tokyo Motors fee (10%)</span>
                        <span className="text-[#c9a96e]">¥7,423,500</span>
                      </div>
                      <div className="h-px bg-[#1a1a1a]" />
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-white">Your total</span>
                        <span className="text-white">¥81,658,500</span>
                      </div>
                    </div>
                  </div>

                  {/* Porsche */}
                  <div className="bg-[#141414] border border-[#1a1a1a] p-5">
                    <p className="text-[#a0a0a0] text-xs uppercase tracking-wider mb-3">Porsche 911 GT3 992</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#a0a0a0]">Purchase price Japan</span>
                        <span className="text-white">¥31,464,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#a0a0a0]">Tokyo Motors fee (10%)</span>
                        <span className="text-[#c9a96e]">¥3,146,400</span>
                      </div>
                      <div className="h-px bg-[#1a1a1a]" />
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-white">Your total</span>
                        <span className="text-white">¥34,610,400</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#666666] text-xs">
                    * Shipping and import taxes are separate and vary by destination. We provide full quotes upfront.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL / TRUST ===== */}
      <section className="section-padding bg-[#0a0a0a]">
        <div className="container-main text-center">
          <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
            Client Trust
          </p>
          <h2 className="font-serif text-4xl font-bold text-white mb-12">
            What Our Clients Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                text: "Tokyo Motors found my dream Ferrari 488 Pista with only 8,200 km. The entire process was seamless — from Japan to my garage in Miami in 6 weeks.",
                name: 'Michael C.',
                location: 'Miami, Florida',
              },
              {
                text: "J'avais des doutes sur l'importation depuis le Japon, mais l'équipe de Tokyo Motors a géré tout de A à Z. Ma Porsche GT3 est parfaite.",
                name: 'Julien M.',
                location: 'Lyon, France',
              },
              {
                text: "The McLaren 720S I got through Tokyo Motors was in better condition than anything I'd seen in the US market — and 30% cheaper. Incredible.",
                name: 'Robert T.',
                location: 'Dallas, Texas',
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-[#141414] border border-[#1a1a1a] p-6 hover:border-[#c9a96e]/20 transition-colors duration-300"
              >
                {/* Étoiles */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c9a96e] text-[#c9a96e]" />
                  ))}
                </div>
                <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-[#666666] text-xs mt-1">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24 bg-[#111111]">
        <div className="container-main text-center">
          <h2 className="font-serif text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Find Your
            <br />
            <span className="text-[#c9a96e] italic">Perfect Supercar?</span>
          </h2>
          <p className="text-[#a0a0a0] text-base max-w-lg mx-auto mb-10">
            Tell us your dream car. We&apos;ll do the rest.
            No obligation. Free sourcing consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Start Your Search
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
