import Link from 'next/link'
import { MessageCircle, Mail, MapPin, Instagram, Twitter } from 'lucide-react'
import Logo from './Logo'
import { whatsappLink, TM_CONTACT_EMAIL } from '@/lib/config'

// ============================================================
// Footer — Pied de page du site
// ============================================================

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Colonne 1 — Logo + description */}
          <div className="lg:col-span-2">
            <Logo size="md" className="mb-6" />
            <p className="text-[#a0a0a0] text-sm leading-relaxed max-w-sm mb-6">
              Tokyo Motors connects discerning clients worldwide with Japan&apos;s finest supercars.
              We source, inspect, and export — so you can simply enjoy the drive.
            </p>

            {/* Adresse */}
            <div className="flex items-start gap-3 text-[#a0a0a0] text-sm mb-4">
              <MapPin className="w-4 h-4 text-[#c9a96e] mt-0.5 shrink-0" />
              <span>Minato-ku, Tokyo, Japan 〒107-0061</span>
            </div>

            {/* Contact rapide */}
            <div className="flex flex-col gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#a0a0a0] hover:text-[#c9a96e] transition-colors duration-200 text-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#c9a96e]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${TM_CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-[#a0a0a0] hover:text-[#c9a96e] transition-colors duration-200 text-sm"
              >
                <Mail className="w-4 h-4 text-[#c9a96e]" />
                <span>{TM_CONTACT_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/inventory', label: 'Inventory' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#a0a0a0] hover:text-[#c9a96e] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Marques */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6">
              Brands We Source
            </h3>
            <ul className="space-y-3">
              {[
                'Ferrari',
                'Lamborghini',
                'McLaren',
                'Porsche',
                'Bentley',
                'Rolls-Royce',
                'Aston Martin',
                'Bugatti',
              ].map((brand) => (
                <li key={brand}>
                  <Link
                    href={`/inventory?brand=${brand}`}
                    className="text-[#a0a0a0] hover:text-[#c9a96e] text-sm transition-colors duration-200"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barre de bas */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#666666] text-xs">
            © {currentYear} Tokyo Motors. All rights reserved.
          </p>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666666] hover:text-[#c9a96e] transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666666] hover:text-[#c9a96e] transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Mention légale */}
          <p className="text-[#666666] text-xs">
            10% commission · Japan import specialists
          </p>
        </div>
      </div>
    </footer>
  )
}
