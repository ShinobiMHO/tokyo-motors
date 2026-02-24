import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

// ============================================================
// Layout racine — s'applique à toutes les pages
// Les métadonnées SEO sont définies ici
// ============================================================

export const metadata: Metadata = {
  title: {
    default: 'Tokyo Motors — Luxury Supercars from Japan',
    template: '%s | Tokyo Motors',
  },
  description:
    'Tokyo Motors exports the finest Japanese supercars to the USA and France. Ferrari, Lamborghini, McLaren, Porsche, Rolls-Royce — sourced directly from Japan with 10% commission only.',
  keywords: [
    'japanese supercars',
    'import car japan',
    'ferrari japan',
    'lamborghini japan',
    'luxury car export',
    'japanese car auction',
    'tokyo motors',
    'supercar dealer japan',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tokyo-motors.com',
    siteName: 'Tokyo Motors',
    title: 'Tokyo Motors — Luxury Supercars from Japan',
    description:
      'Export your dream supercar from Japan. Ferrari, Lamborghini, McLaren, Porsche and more. 10% commission. Full logistics.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Tokyo Motors — Luxury Supercars from Japan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tokyo Motors — Luxury Supercars from Japan',
    description: 'Export your dream supercar from Japan. 10% commission only.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0a0a0a] text-white font-sans antialiased">
        {/* Notifications toast (succès/erreur pour les formulaires) */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#141414',
              color: '#ffffff',
              border: '1px solid rgba(201, 169, 110, 0.3)',
              borderRadius: '0',
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#c9a96e',
                secondary: '#141414',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
