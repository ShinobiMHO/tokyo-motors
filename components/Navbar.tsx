'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo'
import { whatsappLink } from '@/lib/config'

// ============================================================
// Navbar — Navigation principale du site
// Transparente au départ, fond sombre au scroll
// Menu hamburger sur mobile
// ============================================================

// Liens de navigation
const NAV_LINKS = [
  { href: '/inventory', label: 'Inventory' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Détecter le scroll pour changer l'opacité du fond
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isAdminPage = pathname.startsWith('/admin')

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen || isAdminPage
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-[#c9a96e]'
                    : 'text-[#a0a0a0] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Téléphone (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* WhatsApp / Téléphone */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#a0a0a0] hover:text-[#c9a96e] transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs tracking-wider">WhatsApp</span>
            </a>

            {/* Bouton Browse Inventory */}
            <Link
              href="/inventory"
              className="btn-gold text-xs"
            >
              Browse Inventory
            </Link>
          </div>

          {/* Bouton menu hamburger (mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/5">
          <div className="px-4 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium tracking-widest uppercase py-2 transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-[#c9a96e]'
                    : 'text-[#a0a0a0] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Séparateur */}
            <div className="h-px bg-white/5 my-4" />

            {/* WhatsApp mobile */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#a0a0a0] hover:text-[#c9a96e] transition-colors duration-200 py-2"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm tracking-wider">WhatsApp</span>
            </a>

            {/* CTA mobile */}
            <Link
              href="/inventory"
              className="btn-gold w-full justify-center mt-4"
            >
              Browse Inventory
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
