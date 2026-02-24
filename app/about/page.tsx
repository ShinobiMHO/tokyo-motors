import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Gavel, Users, Award } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ============================================================
// About — Histoire de Tokyo Motors
// ============================================================

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Tokyo Motors — based in Tokyo, Japan. We connect supercar enthusiasts in the USA and France with Japan\'s finest collector vehicles.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Header avec image */}
      <div className="relative pt-20 min-h-[50vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80"
            alt="Tokyo city view"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>
        <div className="relative container-main pb-16">
          <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white">
            About
            <br />
            <span className="text-[#c9a96e] italic">Tokyo Motors</span>
          </h1>
        </div>
      </div>

      {/* ===== STORY ===== */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Texte */}
            <div>
              <p className="text-[#a0a0a0] text-lg leading-relaxed mb-6">
                Tokyo Motors was born from a simple observation: Japan is home to some of the
                world&apos;s most pristine supercars — yet most enthusiasts in the USA and Europe
                have no way to access them.
              </p>
              <p className="text-[#a0a0a0] text-base leading-relaxed mb-6">
                We are a team of automotive obsessives based in <strong className="text-white">Minato-ku, Tokyo</strong>.
                We spend our days at Japan&apos;s premier auction houses, in private collectors&apos; garages,
                and at dealer showrooms — searching for exactly the kind of car that makes collectors
                stop breathing for a second.
              </p>
              <p className="text-[#a0a0a0] text-base leading-relaxed mb-6">
                The Japanese car market is unique. Owners treat their vehicles as investments.
                Mileages are comically low. Service histories are immaculate. And thanks to Japan&apos;s
                strict vehicle inspection system (&ldquo;Shaken&rdquo;), any defect is documented and addressed.
              </p>
              <p className="text-[#a0a0a0] text-base leading-relaxed mb-8">
                We connect you directly to this market. No middlemen. No dealer markups.
                Just our 10% sourcing fee, and a car that will exceed your expectations.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1a1a1a]">
                {[
                  { value: '50+', label: 'Cars exported' },
                  { value: '15+', label: 'Auction houses' },
                  { value: '100%', label: 'Client satisfaction' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[#c9a96e] font-serif text-3xl font-bold">{stat.value}</p>
                    <p className="text-[#a0a0a0] text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Colonne droite : valeurs */}
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: 'Based in Tokyo',
                  desc: "Our office and operations are in Minato-ku, Tokyo — the heart of Japan's luxury car district. We're on the ground, every day.",
                },
                {
                  icon: <Gavel className="w-6 h-6" />,
                  title: 'Auction Access',
                  desc: "We're registered members of USS Tokyo, TAA Yokohama, and multiple JU Network auction houses. We bid directly — no broker fees.",
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: 'Private Network',
                  desc: 'Decades of relationships with Japanese collectors and dealers give us access to cars before they ever reach the public market.',
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: 'Zero Compromises',
                  desc: "We only present cars we would buy ourselves. If it doesn't meet our standards, we keep looking. Your name is on the car — so is ours.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 bg-[#141414] border border-[#1a1a1a] p-5 hover:border-[#c9a96e]/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-[#a0a0a0] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION JAPON ===== */}
      <section className="py-20 bg-[#111111]">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Why Japan
            </p>
            <h2 className="font-serif text-4xl font-bold text-white mb-6">
              The Japanese Supercar Market
            </h2>
            <p className="text-[#a0a0a0] text-base leading-relaxed mb-8">
              Japan is the world&apos;s best-kept secret for supercar buyers. Here&apos;s why:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'The Shaken System',
                desc: "Japan's mandatory biennial vehicle inspection (車検, Shaken) means every car on the road must meet strict safety and emissions standards. Defects are documented and repaired — creating a culture of meticulous maintenance.",
              },
              {
                title: 'Cultural Relationship with Cars',
                desc: 'Japanese collectors treat supercars as art. Many are rarely driven, stored in temperature-controlled garages, and professionally detailed regularly. Finding a Lamborghini with 8,000 km is not unusual here.',
              },
              {
                title: 'Auction Transparency',
                desc: "Japan's auto auction system is the most transparent in the world. Every vehicle receives a detailed inspection grade (1-5+), with documented faults noted on a standardized sheet. No surprises.",
              },
              {
                title: 'Price Advantage',
                desc: "Japanese supercars are typically 20-35% cheaper than equivalent vehicles in the US or EU market — due to lower domestic demand for older models and the yen's favorable exchange rate.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#141414] border border-[#1a1a1a] p-6 hover:border-[#c9a96e]/20 transition-colors">
                <h3 className="text-white font-semibold text-base mb-3">{item.title}</h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-main text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">
            Work With Us
          </h2>
          <p className="text-[#a0a0a0] mb-8 max-w-md mx-auto">
            Ready to find your perfect supercar in Japan? Start with a conversation.
          </p>
          <Link href="/contact" className="btn-gold">
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
