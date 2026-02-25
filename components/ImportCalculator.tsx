'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, Info, AlertCircle, CheckCircle } from 'lucide-react'

// ─── Exchange Rates ───────────────────────────────────────────────────────────
const JPY_USD = 155.74
const JPY_EUR = 183.45

// ─── French Malus CO2 2024 (barème officiel WLTP) ────────────────────────────
// Source: Loi de finances 2024, Article 1011 bis CGI
// Plafond : 60 000 € à partir de 226 g/km
const MALUS_TABLE_2024: [number, number][] = [
  [0,   0],     [117,  0],     [118,  50],    [119,  75],    [120, 100],
  [121, 150],   [122, 170],    [123, 190],    [124, 220],    [125, 270],
  [126, 330],   [127, 430],    [128, 527],    [129, 636],    [130, 756],
  [131, 896],   [132, 1071],   [133, 1276],   [134, 1521],   [135, 1815],
  [136, 2168],  [137, 2585],   [138, 3085],   [139, 3685],   [140, 4397],
  [141, 5250],  [142, 6270],   [143, 7491],   [144, 8945],   [145, 10680],
  [146, 12756], [147, 15234],  [148, 18188],  [149, 21725],  [150, 25956],
  [160, 40000], [175, 50000],  [186, 55000],  [200, 58000],  [226, 60000],
]

function computeMalusCO2(co2: number): number {
  if (co2 <= 117) return 0
  if (co2 >= 226) return 60000
  // Linear interpolation between table points
  for (let i = 0; i < MALUS_TABLE_2024.length - 1; i++) {
    const [g1, m1] = MALUS_TABLE_2024[i]
    const [g2, m2] = MALUS_TABLE_2024[i + 1]
    if (co2 >= g1 && co2 <= g2) {
      const t = (co2 - g1) / (g2 - g1)
      return Math.round(m1 + t * (m2 - m1))
    }
  }
  return 60000
}

// ─── Malus Poids 2024 ─────────────────────────────────────────────────────────
// 10 €/kg au-dessus de 1 800 kg (plafond 50 000 €)
function computeMalusPoids(weightKg: number): number {
  if (weightKg <= 1800) return 0
  return Math.min((weightKg - 1800) * 10, 50000)
}

// ─── Formatters ───────────────────────────────────────────────────────────────
const fmtJPY = (n: number) => '¥' + Math.round(n).toLocaleString('en-US')
const fmtUSD = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmtEUR = (n: number) => '€' + Math.round(n).toLocaleString('en-US')

// ─── Fee Line ─────────────────────────────────────────────────────────────────
interface FeeLine {
  label: string
  amount: number
  note?: string
  highlight?: boolean
  section?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ImportCalculator() {
  const [destination, setDestination] = useState<'usa' | 'france'>('usa')
  const [jpyInput, setJpyInput] = useState<string>('21000000')
  const [co2Input, setCo2Input] = useState<string>('250')
  const [weightInput, setWeightInput] = useState<string>('1600')
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  // Parsed values
  const jpyPrice = Math.max(0, parseFloat(jpyInput.replace(/[^0-9.]/g, '')) || 0)
  const co2 = Math.max(0, Math.min(500, parseInt(co2Input) || 250))
  const vehicleWeight = Math.max(0, parseInt(weightInput) || 1600)

  // ── USA Calculation ──────────────────────────────────────────────────────────
  const usaCalc = useMemo(() => {
    const carUSD = jpyPrice / JPY_USD
    const commission = jpyPrice / JPY_USD * 0.10

    // Fixed fees
    const exportHandling = 400          // Japan export handling + export cert
    const shipping = 4500               // Enclosed container Japan → US West Coast (recommended for supercars)
    const insurance = carUSD * 0.015    // 1.5% marine insurance
    const cif = carUSD + shipping + insurance  // Cost + Insurance + Freight

    // US Government fees
    const customsDuty = cif * 0.025     // 2.5% US customs duty (CBP)
    const mpf = Math.min(634.62, Math.max(32.71, cif * 0.003464))  // Merchandise Processing Fee
    const hmf = cif * 0.00125           // Harbor Maintenance Fee (0.125%)

    // Service fees
    const portHandling = 500            // Port destination charges / drayage
    const customsBroker = 600           // Licensed customs broker
    const epaDocumentation = 1500       // EPA Form 3520-1 + DOT Form HS-7 (most supercars are globally compliant)
    const usdaInspection = 100          // USDA/APHIS undercarriage inspection

    const totalImportCosts = (
      exportHandling + shipping + insurance +
      customsDuty + mpf + hmf +
      portHandling + customsBroker + epaDocumentation + usdaInspection
    )

    const totalBeforeCommission = carUSD + totalImportCosts
    const grandTotal = totalBeforeCommission + commission

    const fees: FeeLine[] = [
      { label: 'Japan Purchase Price', amount: carUSD, highlight: true },
      { label: '— JAPAN EXPORT —', amount: 0, section: true },
      { label: 'Export handling & documentation', amount: exportHandling, note: 'Japan side: export certificate, port fees' },
      { label: '— SHIPPING —', amount: 0, section: true },
      { label: 'Ocean freight (enclosed container)', amount: shipping, note: 'Japan → USA West Coast (LA/Long Beach). Standard for supercars.' },
      { label: 'Marine insurance (1.5%)', amount: insurance, note: 'Recommended. Covers full vehicle value during transit.' },
      { label: '— US CUSTOMS & GOVERNMENT FEES —', amount: 0, section: true },
      { label: 'US Customs Duty (2.5% of CIF)', amount: customsDuty, note: 'Standard rate for passenger vehicles. Applied on Cost+Insurance+Freight.' },
      { label: 'Merchandise Processing Fee (MPF)', amount: mpf, note: 'CBP fee: 0.3464% of CIF, capped at $634.62' },
      { label: 'Harbor Maintenance Fee (HMF)', amount: hmf, note: '0.125% of CIF. Collected by CBP.' },
      { label: '— DESTINATION / COMPLIANCE —', amount: 0, section: true },
      { label: 'Port handling & drayage', amount: portHandling, note: 'Unloading, port storage, local transport to warehouse' },
      { label: 'Licensed customs broker', amount: customsBroker, note: 'Required to clear customs on your behalf (CBP regulation)' },
      { label: 'EPA/DOT compliance documentation', amount: epaDocumentation, note: 'Forms 3520-1 + HS-7. Most modern supercars (Ferrari, Lambo, Porsche) are globally compliant and require minimal modification.' },
      { label: 'USDA/APHIS inspection', amount: usdaInspection, note: 'Undercarriage inspection for foreign soil/pests. Mandatory.' },
    ]

    return { carUSD, commission, totalImportCosts, totalBeforeCommission, grandTotal, fees }
  }, [jpyPrice])

  // ── France Calculation ───────────────────────────────────────────────────────
  const franceCalc = useMemo(() => {
    const carEUR = jpyPrice / JPY_EUR
    const commission = jpyPrice / JPY_EUR * 0.10

    const exportHandling = 350          // Japan export handling
    const shipping = 4200               // Japan → Le Havre (container)
    const insurance = carEUR * 0.015    // 1.5% marine insurance
    const cif = carEUR + shipping + insurance

    // EU Customs duty: 0% under EU-Japan EPA (in force since 2019, fully phased by 2026)
    const customsDuty = 0
    // TVA 20% on CIF + customs duty
    const tva = (cif + customsDuty) * 0.20
    // Agent en douane
    const customsAgent = 500
    // Malus CO2 (2024 barème officiel)
    const malusCO2 = computeMalusCO2(co2)
    // Malus poids
    const malusPoids = computeMalusPoids(vehicleWeight)
    // Homologation / Certificat de Conformité
    const homologation = 1500
    // Carte grise (immatriculation) — estimation for luxury supercar
    const carteGrise = 2000

    const totalImportCosts = (
      exportHandling + shipping + insurance +
      customsDuty + tva + customsAgent +
      malusCO2 + malusPoids + homologation + carteGrise
    )

    const totalBeforeCommission = carEUR + totalImportCosts
    const grandTotal = totalBeforeCommission + commission

    const fees: FeeLine[] = [
      { label: 'Japan Purchase Price', amount: carEUR, highlight: true },
      { label: '— JAPON : EXPORT —', amount: 0, section: true },
      { label: 'Frais export & documentation Japon', amount: exportHandling, note: 'Certificat d\'export, frais portuaires côté Japon' },
      { label: '— TRANSPORT —', amount: 0, section: true },
      { label: 'Fret maritime (container fermé)', amount: shipping, note: 'Japon → Le Havre. Container fermé recommandé pour les supercars.' },
      { label: 'Assurance maritime (1,5%)', amount: insurance, note: 'Couvre la valeur du véhicule pendant le transport.' },
      { label: '— DOUANES FRANÇAISES —', amount: 0, section: true },
      { label: 'Droit de douane UE (0%)', amount: customsDuty, note: 'Taux réduit à 0% sous l\'Accord UE-Japon (EPA, en vigueur depuis 2019, pleinement applicable en 2026).' },
      { label: 'TVA import (20%)', amount: tva, note: 'TVA sur valeur CIF (prix + assurance + fret). Applicable à l\'importation de tout véhicule hors UE.' },
      { label: 'Agent en douane', amount: customsAgent, note: 'Déclarant en douane pour le dédouanement en France.' },
      { label: '— FISCALITÉ AUTOMOBILE —', amount: 0, section: true },
      { label: `Malus CO₂ (${co2} g/km — barème 2024)`, amount: malusCO2, note: malusCO2 >= 60000 ? '⚠️ Plafond atteint (226 g/km+). La plupart des supercars sont au plafond.' : 'Taxe sur les émissions CO₂ lors de la 1ère immatriculation en France (Art. 1011 bis CGI).' },
      { label: `Malus poids (${vehicleWeight} kg)`, amount: malusPoids, note: vehicleWeight <= 1800 ? 'Pas de malus poids (< 1 800 kg)' : `10 €/kg au-dessus de 1 800 kg. Plafond 50 000 €.` },
      { label: '— IMMATRICULATION —', amount: 0, section: true },
      { label: 'Homologation / Certificat de Conformité', amount: homologation, note: 'Réception à titre isolé (RTI) ou certificat de conformité pour les marques homologuées.' },
      { label: 'Carte grise (estimation supercar)', amount: carteGrise, note: 'Dépend de la puissance fiscale et de la région. Estimation conservatrice pour un véhicule +200 CV.' },
    ]

    return { carEUR, commission, totalImportCosts, totalBeforeCommission, grandTotal, fees, tva, malusCO2, malusPoids }
  }, [jpyPrice, co2, vehicleWeight])

  const calc = destination === 'usa' ? usaCalc : franceCalc
  const fmt = destination === 'usa' ? fmtUSD : fmtEUR
  const currency = destination === 'usa' ? 'USD' : 'EUR'
  const carPrice = destination === 'usa' ? usaCalc.carUSD : franceCalc.carEUR

  return (
    <div className="max-w-4xl mx-auto">
      {/* ── Destination Toggle ── */}
      <div className="flex gap-3 mb-10">
        <button
          onClick={() => setDestination('usa')}
          className={`flex-1 py-4 px-6 border text-sm font-medium tracking-wider uppercase transition-all duration-200 ${
            destination === 'usa'
              ? 'bg-[#c9a96e] text-black border-[#c9a96e]'
              : 'bg-transparent text-[#a0a0a0] border-[#2a2a2a] hover:border-[#c9a96e]/40'
          }`}
        >
          🇯🇵 Japan → 🇺🇸 USA
        </button>
        <button
          onClick={() => setDestination('france')}
          className={`flex-1 py-4 px-6 border text-sm font-medium tracking-wider uppercase transition-all duration-200 ${
            destination === 'france'
              ? 'bg-[#c9a96e] text-black border-[#c9a96e]'
              : 'bg-transparent text-[#a0a0a0] border-[#2a2a2a] hover:border-[#c9a96e]/40'
          }`}
        >
          🇯🇵 Japan → 🇫🇷 France
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ── LEFT: Inputs ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Car price */}
          <div>
            <label className="block text-[#c9a96e] text-xs font-medium tracking-widest uppercase mb-3">
              Car Price (Japan, ¥ JPY)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-lg font-bold">¥</span>
              <input
                type="text"
                value={jpyInput}
                onChange={(e) => setJpyInput(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-[#c9a96e]/60 text-white text-xl font-light pl-10 pr-4 py-4 outline-none transition-colors duration-200"
                placeholder="21000000"
              />
            </div>
            <p className="text-[#555] text-xs mt-2">
              ≈ {destination === 'usa'
                ? fmtUSD(jpyPrice / JPY_USD)
                : fmtEUR(jpyPrice / JPY_EUR)
              } {currency} <span className="text-[#444]">(rate: {destination === 'usa' ? `¥${JPY_USD}/USD` : `¥${JPY_EUR}/EUR`})</span>
            </p>
          </div>

          {/* France-specific inputs */}
          {destination === 'france' && (
            <>
              <div>
                <label className="block text-[#c9a96e] text-xs font-medium tracking-widest uppercase mb-3">
                  CO₂ Emissions (g/km)
                  <span className="text-[#555] normal-case ml-2 font-normal">(found in tech specs)</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min={0}
                    max={450}
                    value={co2}
                    onChange={(e) => setCo2Input(e.target.value)}
                    className="w-full accent-[#c9a96e] mb-3"
                  />
                  <div className="flex justify-between text-[#444] text-xs mb-2">
                    <span>0</span><span>100</span><span>200</span><span>300</span><span>400+</span>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    value={co2Input}
                    onChange={(e) => setCo2Input(e.target.value)}
                    className="w-28 bg-[#141414] border border-[#2a2a2a] focus:border-[#c9a96e]/60 text-white text-lg pl-4 pr-2 py-3 outline-none"
                  />
                  <span className="text-[#666]">g/km</span>
                </div>
                <div className="mt-2 text-xs text-[#555]">
                  Typique : Ferrari 488 = 245 • Lambo Huracán = 287 • Porsche GT3 = 276 • Urus = 325
                </div>
              </div>

              <div>
                <label className="block text-[#c9a96e] text-xs font-medium tracking-widest uppercase mb-3">
                  Vehicle Weight (kg)
                  <span className="text-[#555] normal-case ml-2 font-normal">(malus poids &gt; 1 800 kg)</span>
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    className="w-28 bg-[#141414] border border-[#2a2a2a] focus:border-[#c9a96e]/60 text-white text-lg pl-4 pr-2 py-3 outline-none"
                  />
                  <span className="text-[#666]">kg</span>
                </div>
                <div className="mt-2 text-xs text-[#555]">
                  Ferrari 488 = 1 467 kg • McLaren 720S = 1 419 kg • Urus = 2 197 kg • Rolls Ghost = 2 490 kg
                </div>
              </div>
            </>
          )}

          {/* Quick presets */}
          <div>
            <p className="text-[#444] text-xs uppercase tracking-wider mb-3">Quick Presets</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Ferrari 488 GTB', jpy: 26000000, co2: 245, kg: 1467 },
                { label: 'Lambo Huracán', jpy: 28000000, co2: 287, kg: 1589 },
                { label: 'Porsche 911 GT3', jpy: 22000000, co2: 276, kg: 1435 },
                { label: 'McLaren 720S', jpy: 24000000, co2: 249, kg: 1419 },
                { label: 'Lamborghini Urus', jpy: 22000000, co2: 325, kg: 2197 },
                { label: 'Ferrari 296 GTB', jpy: 35000000, co2: 149, kg: 1470 },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setJpyInput(String(p.jpy))
                    setCo2Input(String(p.co2))
                    setWeightInput(String(p.kg))
                  }}
                  className="text-left px-4 py-3 bg-[#141414] border border-[#1e1e1e] hover:border-[#c9a96e]/30 text-[#888] hover:text-white text-sm transition-all duration-200"
                >
                  <span className="font-medium text-[#a0a0a0]">{p.label}</span>
                  <span className="ml-3 text-[#555] text-xs">
                    ¥{(p.jpy / 1000000).toFixed(0)}M
                    {destination === 'france' && ` • ${p.co2}g • ${p.kg}kg`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="lg:col-span-3">
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6">
            {/* Fee breakdown */}
            <div className="space-y-1 mb-6">
              {calc.fees.map((fee, i) => {
                if (fee.section) {
                  return (
                    <div key={i} className="pt-4 pb-1">
                      <p className="text-[#333] text-[10px] font-medium tracking-[0.3em] uppercase border-b border-[#1a1a1a] pb-1">
                        {fee.label}
                      </p>
                    </div>
                  )
                }
                return (
                  <div key={i} className={`flex justify-between items-start py-1.5 group ${fee.highlight ? 'border-b border-[#2a2a2a] pb-3 mb-1' : ''}`}>
                    <div className="flex items-center gap-2 min-w-0 mr-4">
                      <span className={`text-sm ${fee.highlight ? 'text-white font-medium' : 'text-[#888]'}`}>
                        {fee.label}
                      </span>
                      {fee.note && (
                        <div className="relative">
                          <button
                            onMouseEnter={() => setShowTooltip(`${i}`)}
                            onMouseLeave={() => setShowTooltip(null)}
                            className="text-[#333] hover:text-[#c9a96e] transition-colors flex-shrink-0"
                          >
                            <Info className="w-3 h-3" />
                          </button>
                          {showTooltip === `${i}` && (
                            <div className="absolute left-5 top-0 z-10 w-64 bg-[#1a1a1a] border border-[#2a2a2a] p-3 text-[#a0a0a0] text-xs leading-relaxed shadow-xl">
                              {fee.note}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <span className={`text-sm font-mono flex-shrink-0 ${fee.highlight ? 'text-white font-medium' : fee.amount === 0 ? 'text-[#3a3a3a]' : 'text-[#a0a0a0]'}`}>
                      {fee.amount === 0 && !fee.highlight ? (destination === 'france' && fee.label.includes('0%') ? fmtEUR(0) : '—') : fmt(fee.amount)}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Subtotals */}
            <div className="border-t border-[#2a2a2a] pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#666] text-sm">Import Costs</span>
                <span className="text-[#a0a0a0] font-mono">{fmt(calc.totalImportCosts)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[#666] text-sm">Tokyo Motors Commission</span>
                  <span className="text-[#444] text-xs ml-2">(10% of Japan price)</span>
                </div>
                <span className="text-[#c9a96e]/70 font-mono">{fmt(calc.commission)}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-[#1a1a1a] pt-3">
                <span className="text-[#888]">Subtotal (car + import costs)</span>
                <span className="text-white font-mono">{fmt(calc.totalBeforeCommission)}</span>
              </div>

              {/* Grand Total */}
              <div className="bg-[#141414] border border-[#c9a96e]/20 p-5 mt-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#c9a96e] text-xs tracking-widest uppercase mb-1">Total All-In</p>
                    <p className="text-[#555] text-xs">Car + import + Tokyo Motors commission</p>
                  </div>
                  <p className="text-3xl font-serif font-bold text-white">{fmt(calc.grandTotal)}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#1e1e1e]">
                  <p className="text-[#444] text-xs">
                    ≈ {fmtJPY(jpyPrice)} purchase price in Japan
                    {destination === 'usa'
                      ? ` • Delivered to US port (state taxes & transport to destination not included)`
                      : ` • Hors cotisation d'assurance, transport depuis Le Havre`}
                  </p>
                </div>
              </div>
            </div>

            {/* France: malus warning */}
            {destination === 'france' && franceCalc.malusCO2 >= 50000 && (
              <div className="mt-4 flex gap-3 bg-amber-950/30 border border-amber-800/30 p-4">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-amber-500/80 text-xs leading-relaxed">
                  <strong>Malus élevé :</strong> Pour les supercars thermiques, le malus CO₂ en France est souvent au plafond (60 000 €).
                  La Ferrari 296 GTB hybride (149 g/km) permet d&apos;économiser {fmtEUR(60000 - computeMalusCO2(149))} sur le malus par rapport à une Ferrari 488 (245 g/km).
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-4 flex gap-2 text-[#444] text-xs leading-relaxed">
              <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5 text-[#333]" />
              <p>
                Estimates based on 2024–2026 official rates. Shipping quotes vary by season. State/regional taxes not included.
                {destination === 'france' && ' Malus CO₂ : barème 2024 (Art. 1011 bis CGI). Subject to annual revision.'}
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/contact"
            className="mt-4 block w-full text-center bg-[#c9a96e] text-black py-4 font-medium text-sm tracking-widest uppercase hover:bg-[#d4b97e] transition-colors duration-200"
          >
            Get an Exact Quote →
          </a>
        </div>
      </div>
    </div>
  )
}
