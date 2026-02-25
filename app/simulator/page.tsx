import type { Metadata } from 'next'
import ImportCalculator from '@/components/ImportCalculator'

export const metadata: Metadata = {
  title: 'Import Cost Simulator | Tokyo Motors',
  description: 'Calculate the exact all-in cost of importing a supercar from Japan to the USA or France — customs, shipping, taxes, and our 10% commission.',
}

export default function SimulatorPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">

      {/* ── Hero ── */}
      <section className="border-b border-[#141414] pt-28 pb-16">
        <div className="container-main">
          <div className="max-w-2xl">
            <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Transparency First
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6">
              Import Cost<br />Simulator
            </h1>
            <div className="gold-divider mb-6" />
            <p className="text-[#a0a0a0] text-lg leading-relaxed">
              Enter a Japan purchase price and instantly see every import fee — shipping, customs, taxes, 
              and our 10% commission — for the USA or France.
              No surprises. No hidden costs.
            </p>
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section className="section-padding">
        <div className="container-main">
          <ImportCalculator />
        </div>
      </section>

      {/* ── How the fees work ── */}
      <section className="section-padding bg-[#080808] border-t border-[#141414]">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Fee Breakdown
            </p>
            <h2 className="font-serif text-3xl font-bold text-white mb-10">
              What Every Line Means
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* USA */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🇺🇸</span>
                  <h3 className="text-white font-semibold text-lg">Japan → USA</h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Customs Duty — 2.5%',
                      body: 'The US standard tariff on imported passenger vehicles (CBP). Applied on the CIF value (Cost + Insurance + Freight).',
                    },
                    {
                      title: 'Merchandise Processing Fee',
                      body: '0.3464% of CIF value, capped at $634.62. A CBP user fee charged on every formal import entry.',
                    },
                    {
                      title: 'Harbor Maintenance Fee',
                      body: '0.125% of CIF value. Collected by CBP and used to maintain US ports and waterways.',
                    },
                    {
                      title: 'EPA/DOT Compliance',
                      body: 'Modern supercars (Ferrari, Lamborghini, Porsche, McLaren, Bentley) are manufactured to global standards. Compliance typically requires only documentation — no major modifications.',
                    },
                    {
                      title: 'NOT included: State Sales Tax',
                      body: 'Varies by state: 0% in Oregon/Montana to 10.25% in California. Paid at vehicle registration, not at customs.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="border-l-2 border-[#1e1e1e] pl-4">
                      <p className="text-white text-sm font-medium mb-1">{item.title}</p>
                      <p className="text-[#666] text-xs leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* France */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🇫🇷</span>
                  <h3 className="text-white font-semibold text-lg">Japan → France</h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Droit de douane — 0%',
                      body: 'L\'Accord de Partenariat Économique UE-Japon (EPA) a progressivement supprimé les droits de douane sur les véhicules japonais depuis 2019. Taux effectif 0% en 2026.',
                    },
                    {
                      title: 'TVA import — 20%',
                      body: 'TVA appliquée sur la valeur CIF à l\'entrée en France. C\'est le poste de coût le plus important après le malus pour les véhicules de valeur modérée.',
                    },
                    {
                      title: 'Malus CO₂ (barème 2024)',
                      body: 'Taxe à la première immatriculation en France, calculée sur les émissions CO₂ WLTP. Seuil 2024 : 118 g/km. Plafond : 60 000 € à 226 g/km. La plupart des supercars thermiques sont au plafond.',
                    },
                    {
                      title: 'Malus Poids',
                      body: '10 €/kg au-dessus de 1 800 kg (plafond 50 000 €). Concerne principalement les SUV : Urus (2 197 kg → ~4 000 €), Rolls-Royce Ghost (2 490 kg → ~6 900 €).',
                    },
                    {
                      title: 'Homologation',
                      body: 'Pour les marques homologuées EU (Ferrari, Lamborghini, Porsche…), un certificat de conformité suffit. Les feux, le compteur et les équipements de sécurité doivent être conformes à la réglementation UE.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="border-l-2 border-[#1e1e1e] pl-4">
                      <p className="text-white text-sm font-medium mb-1">{item.title}</p>
                      <p className="text-[#666] text-xs leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-[#0a0a0a] border-t border-[#141414]">
        <div className="container-main text-center">
          <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
            Ready to Import?
          </p>
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            We handle every step.
          </h2>
          <p className="text-[#a0a0a0] max-w-xl mx-auto mb-10 leading-relaxed">
            From sourcing the right car at auction in Japan, to delivery at your door in the US or France — 
            Tokyo Motors manages the entire process for a transparent 10% commission.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#c9a96e] text-black px-12 py-4 font-medium text-sm tracking-widest uppercase hover:bg-[#d4b97e] transition-colors duration-200"
          >
            Start Your Import
          </a>
        </div>
      </section>

    </main>
  )
}
