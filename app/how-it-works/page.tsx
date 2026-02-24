import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageCircle,
  Search,
  Package,
  Car,
  ChevronDown,
  ArrowRight,
  Flag,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { whatsappLink } from '@/lib/config'

// ============================================================
// How It Works — Process détaillé + FAQ
// ============================================================

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how Tokyo Motors exports Japanese supercars to the USA and France. 5-step process, FAQ about the 25-year rule, homologation, shipping, and payment.',
}

// Les 5 étapes du processus
const STEPS = [
  {
    num: '01',
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Tell Us Your Dream Car',
    duration: 'Day 1',
    desc: "It starts with a simple message. Tell us exactly what you're looking for: brand, model, year, color, options, budget. No request is too specific — the more detail you give us, the better we can serve you.",
    details: [
      'Contact via WhatsApp, email, or the contact form',
      'We discuss your requirements and budget in detail',
      'We explain current market availability in Japan',
      'We provide a sourcing timeline estimate',
    ],
  },
  {
    num: '02',
    icon: <Search className="w-8 h-8" />,
    title: 'We Source & Inspect in Japan',
    duration: 'Days 2–14',
    desc: "We leverage our network of Japan's premier auto auctions (USS, TAA, JU Network), private dealers, and collectors. Every candidate vehicle is physically inspected by our team on the ground in Tokyo.",
    details: [
      'Search across 15+ premium auction houses',
      'Access to private seller network (not publicly listed)',
      'In-person inspection at the seller location',
      'Test drive and mechanical assessment',
      '200+ photo report including underbody, engine bay, interior',
      'Full video walkthrough sent to you within 24 hours',
    ],
  },
  {
    num: '03',
    icon: <Package className="w-8 h-8" />,
    title: 'Full Logistics Handled',
    duration: 'Days 15–45',
    desc: 'Once you approve a vehicle, we handle everything. Export documentation, customs paperwork, ocean freight booking, and coordination with your import agent in the USA or France.',
    details: [
      'Japan export certificate (Export Certificate / 輸出証明書)',
      'Bill of Lading and shipping documentation',
      'Insurance during transit',
      'Customs declaration preparation (HTS codes for USA, DAU for France)',
      'Shipping via RORO (Roll-on/Roll-off) for safe, salt-free transport',
      'Real-time tracking shared with you throughout',
    ],
  },
  {
    num: '04',
    icon: <Flag className="w-8 h-8" />,
    title: 'Customs & Import Clearance',
    duration: 'Days 45–55',
    desc: 'When your car arrives at the port, our partner customs brokers handle clearance on your behalf. We assist with all required documentation for smooth import.',
    details: [
      'For USA: Customs bond, CBP entry filing, EPA/DOT compliance guidance',
      'For France: Réception à titre isolé (RTI) guidance, TVA, homologation path',
      'Duty calculation and payment guidance',
      'Port release coordination',
      'Vehicle delivery to your address or designated garage',
    ],
  },
  {
    num: '05',
    icon: <Car className="w-8 h-8" />,
    title: 'Car Delivered to You',
    duration: 'Days 55–70',
    desc: "Your Japanese supercar arrives ready for registration. We provide all documentation needed and are available for any questions during the registration process.",
    details: [
      'Complete documentation package (title, export cert, BL, etc.)',
      'Odometer disclosure statement',
      'Guidance on state/DMV registration (USA) or DRIRE (France)',
      'Post-delivery support for 30 days',
      'Referral to trusted mechanics for any PDI or setup',
    ],
  },
]

// FAQ questions/réponses
const FAQ = [
  {
    q: "What is the 25-year rule in the USA?",
    a: "The USA's NHTSA requires imported vehicles to comply with Federal Motor Vehicle Safety Standards (FMVSS). However, vehicles 25 years or older are exempt. This means cars from 1999 and earlier can be imported without modifications. For newer cars (under 25 years), we guide you through compliance options or recommend vehicles that are already FMVSS-compliant as exported versions.",
  },
  {
    q: "How does homologation work in France?",
    a: "France (and the EU) requires all imported non-EU vehicles to go through a \"Réception à Titre Isolé\" (RTI) process. This involves a technical inspection at a certified center (DRIRE/DREAL). Most Japanese supercars from brands like Ferrari, Lamborghini, and Porsche can obtain RTI as they often share identical specs with EU models. We advise on each vehicle's homologation path before purchase.",
  },
  {
    q: "How long does the entire process take?",
    a: "Typically 8–12 weeks from first contact to car at your door. Sourcing takes 1–2 weeks, shipping takes 3–4 weeks (Japan to East Coast USA or France), and customs clearance takes 1–2 weeks. We provide a detailed timeline estimate for each order.",
  },
  {
    q: "How do I pay?",
    a: "Payment is made in two stages: 1) A deposit of 20% when the vehicle is confirmed (to secure the car), 2) The remaining 80% before shipping. We accept wire transfer (SWIFT) in USD, EUR, or JPY. We provide full banking details and a formal purchase agreement.",
  },
  {
    q: "What happens if the car is different from what was described?",
    a: "We provide a 200+ photo report and full video before you commit. You have the right to refuse any car that doesn't match our description — your deposit is fully refunded in that case. Our reputation is built on transparency.",
  },
  {
    q: "Do I need to visit Japan?",
    a: "No. Everything can be handled remotely. We are your eyes and hands on the ground in Japan. That said, we welcome clients who want to visit Tokyo and see their car in person — it's an incredible experience!",
  },
  {
    q: "What are the import taxes / duties?",
    a: "For the USA: Passenger vehicles carry a 2.5% duty on the customs value (CIF). State taxes vary. For France/EU: The import duty is 6.5% on CIF value, plus TVA (20%). We provide a full cost breakdown before any commitment.",
  },
  {
    q: "Is shipping by container or RORO?",
    a: "We use RORO (Roll-on/Roll-off) shipping, where your car is driven onto the ship. This is the standard method for vehicle shipping and is safe and reliable. Container shipping is available upon request for extra protection.",
  },
  {
    q: "What if the car breaks down during transit?",
    a: "All vehicles are insured during transit. Our shipping partners have decades of experience with high-value vehicles. In the extremely rare event of damage, insurance covers full replacement value.",
  },
  {
    q: "What's your commission exactly?",
    a: "10% of the Japanese purchase price. Nothing else from Tokyo Motors. You pay separately for: shipping (quoted upfront), import duties (varies by country), and your country's local taxes/registration fees. No surprises — we itemize everything before you commit.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-12 bg-[#0a0a0a]">
        <div className="container-main text-center max-w-3xl mx-auto">
          <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
            The Process
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white mb-6">
            How It Works
          </h1>
          <p className="text-[#a0a0a0] text-lg leading-relaxed">
            From your first message to your car parked in your garage.
            We handle everything — you just enjoy the result.
          </p>
        </div>
      </div>

      {/* ===== 5 ÉTAPES ===== */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container-main max-w-4xl mx-auto">
          <div className="relative">
            {/* Ligne verticale timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#1a1a1a] hidden lg:block" />

            <div className="space-y-12">
              {STEPS.map((step, idx) => (
                <div key={step.num} className="relative">
                  <div className="lg:pl-24">
                    {/* Point sur la timeline */}
                    <div className="hidden lg:flex absolute left-0 top-0 w-16 h-16 bg-[#141414] border border-[#c9a96e]/30 items-center justify-center text-[#c9a96e]">
                      {step.icon}
                    </div>

                    <div className="bg-[#141414] border border-[#1a1a1a] p-8 hover:border-[#c9a96e]/20 transition-colors duration-300">
                      {/* Header de l'étape */}
                      <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                        <div>
                          <span className="text-[#c9a96e]/40 font-serif text-4xl font-bold">{step.num}</span>
                          <h2 className="font-serif text-2xl font-bold text-white mt-1">
                            {step.title}
                          </h2>
                        </div>
                        <span className="text-xs text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/20 px-3 py-1">
                          {step.duration}
                        </span>
                      </div>

                      <p className="text-[#a0a0a0] text-base leading-relaxed mb-6">
                        {step.desc}
                      </p>

                      {/* Liste des détails */}
                      <ul className="space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2 text-sm text-[#a0a0a0]">
                            <span className="text-[#c9a96e] mt-0.5">›</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Connecteur entre étapes */}
                  {idx < STEPS.length - 1 && (
                    <div className="flex justify-center my-4 lg:hidden">
                      <ChevronDown className="w-5 h-5 text-[#c9a96e]/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 bg-[#111111]">
        <div className="container-main max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Common Questions
            </p>
            <h2 className="font-serif text-4xl font-bold text-white">
              FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, idx) => (
              <details
                key={idx}
                className="group bg-[#141414] border border-[#1a1a1a] hover:border-[#c9a96e]/20 transition-colors duration-200"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-white font-medium text-sm pr-4">{item.q}</span>
                  <ChevronDown className="w-4 h-4 text-[#c9a96e] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6">
                  <div className="h-px bg-[#1a1a1a] mb-4" />
                  <p className="text-[#a0a0a0] text-sm leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bas */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-main text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-[#a0a0a0] mb-8">
            Our team is available 7 days a week via WhatsApp or email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
