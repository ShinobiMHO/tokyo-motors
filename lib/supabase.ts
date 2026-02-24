import { createClient } from '@supabase/supabase-js'

// ============================================================
// Configuration Supabase — Tokyo Motors
// Variables préfixées NEXT_PUBLIC_TM_ pour isoler ce projet
// des autres projets du workspace (antigravity-hub, shinobi, etc.)
// ============================================================

const supabaseUrl = process.env.NEXT_PUBLIC_TM_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_TM_SUPABASE_ANON_KEY!

// Client Supabase principal (client & serveur)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================================
// TYPES TypeScript — correspond exactement aux tables Supabase
// ============================================================

/** Statuts possibles d'une voiture */
export type CarStatus = 'available' | 'reserved' | 'sold'

/** Voiture complète (telle que stockée en base) */
export interface Car {
  id: string
  brand: string               // Marque (Ferrari, Lamborghini, etc.)
  model: string               // Modèle (488 Pista, Huracán, etc.)
  year: number                // Année de fabrication
  mileage_km: number          // Kilométrage en km
  color: string               // Couleur officielle constructeur
  transmission: string        // Type de boîte de vitesses
  engine: string              // Description complète du moteur
  price_jpy: number           // Prix d'achat au Japon en Yen ¥
  price_usd_estimate: number  // Prix estimé en USD (commission incluse)
  price_eur_estimate: number  // Prix estimé en EUR (commission incluse)
  status: CarStatus           // Disponibilité
  description: string         // Description détaillée
  images: string[]            // Tableau d'URLs d'images
  featured: boolean           // Mise en avant sur la homepage
  created_at: string          // Date d'ajout (ISO 8601)
}

/** Pour insérer une voiture (sans id / created_at, générés par Supabase) */
export type CarInsert = Omit<Car, 'id' | 'created_at'>

/** Pour modifier une voiture (tous les champs optionnels) */
export type CarUpdate = Partial<CarInsert>

/** Message de contact reçu via le formulaire */
export interface Contact {
  id: string
  name: string            // Prénom + Nom
  email: string           // Adresse email
  phone: string           // Téléphone / WhatsApp
  country: string         // Pays du client
  car_interest: string    // Voiture qui l'intéresse
  message: string         // Corps du message
  created_at: string      // Date d'envoi
  read: boolean           // Lu par l'admin ou non
}

/** Pour insérer un contact (sans id, created_at, read) */
export type ContactInsert = Omit<Contact, 'id' | 'created_at' | 'read'>

// ============================================================
// FONCTIONS UTILITAIRES
// ============================================================

/** Calcule la commission Tokyo Motors (10% du prix Japon) */
export function calculateCommission(priceJpy: number): number {
  return priceJpy * 0.10
}

/** Formate un nombre en Yen japonais — ex: ¥74,235,000 */
export function formatYen(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Formate un nombre en USD — ex: $574,000 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Formate un nombre en EUR — ex: 532 000 € */
export function formatEUR(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Formate les kilomètres — ex: 8 200 km */
export function formatKm(km: number): string {
  return new Intl.NumberFormat('fr-FR').format(km) + ' km'
}

/** Classes CSS Tailwind du badge statut selon la valeur */
export function getStatusColor(status: CarStatus): string {
  switch (status) {
    case 'available': return 'text-green-400 bg-green-400/10 border-green-400/30'
    case 'reserved':  return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
    case 'sold':      return 'text-red-400 bg-red-400/10 border-red-400/30'
  }
}

/** Traduction du statut pour l'affichage */
export function getStatusLabel(status: CarStatus): string {
  switch (status) {
    case 'available': return 'Available'
    case 'reserved':  return 'Reserved'
    case 'sold':      return 'Sold'
  }
}

// ============================================================
// CONSTANTES DE CONFIGURATION
// ============================================================

/** Numéro WhatsApp — depuis variable d'env ou fallback démo */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_TM_WHATSAPP_NUMBER ?? '1234567890'

/** Email de contact */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_TM_CONTACT_EMAIL ?? 'contact@tokyo-motors.com'

/** URL du site */
export const SITE_URL =
  process.env.NEXT_PUBLIC_TM_SITE_URL ?? 'https://tokyo-motors.com'

// ============================================================
// DONNÉES DE DÉMO
// Utilisées en fallback si Supabase n'est pas configuré
// ============================================================

export const DEMO_CARS: Car[] = [
  {
    id: '1',
    brand: 'Ferrari',
    model: '488 Pista',
    year: 2019,
    mileage_km: 8200,
    color: 'Rosso Corsa',
    transmission: 'Automatic (PDK)',
    engine: 'V8 3.9L Twin-Turbo 720 ch',
    price_jpy: 74235000,
    price_usd_estimate: 574000,
    price_eur_estimate: 532000,
    status: 'available',
    description:
      'La Ferrari 488 Pista représente le summum de la sportivité Ferrari. Dérivée directement des compétitions, elle développe 720 ch grâce à son V8 biturbo. En parfait état, kilométrage exceptionnel pour une voiture de ce calibre. Entretenu par un concessionnaire Ferrari officiel au Japon.',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    ],
    featured: true,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    brand: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2020,
    mileage_km: 11500,
    color: 'Arancio Borealis',
    transmission: 'Automatic (LDF)',
    engine: 'V10 5.2L Atmosphérique 640 ch',
    price_jpy: 30880000,
    price_usd_estimate: 238000,
    price_eur_estimate: 221000,
    status: 'available',
    description:
      "La Huracán EVO incarne l'essence même de Lamborghini — viscérale, spectaculaire, inoubliable. Son V10 atmosphérique de 4.0L hurlant à 9000 tr/min est l'un des derniers moteurs de ce type dans l'industrie. La couleur Arancio Borealis est absolument saisissante. Première main, carnet d'entretien complet.",
    images: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80',
    ],
    featured: true,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    brand: 'McLaren',
    model: '720S',
    year: 2019,
    mileage_km: 14200,
    color: 'Volcano Orange',
    transmission: 'Automatic (SSG)',
    engine: 'V8 4.0L Twin-Turbo 720 ch',
    price_jpy: 24830000,
    price_usd_estimate: 191000,
    price_eur_estimate: 177000,
    status: 'available',
    description:
      "La McLaren 720S redéfinit ce qu'est une supercar. Légère, rapide, avec une aérodynamique active révolutionnaire. 0-100 km/h en 2,9 secondes. Cette 720S Volcano Orange est en état showroom, révision complète effectuée par le concessionnaire McLaren Tokyo.",
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    ],
    featured: true,
    created_at: '2024-02-01T10:00:00Z',
  },
  {
    id: '4',
    brand: 'Porsche',
    model: '911 GT3 992',
    year: 2022,
    mileage_km: 5800,
    color: 'Guards Red',
    transmission: 'PDK 7 rapports',
    engine: 'Flat-6 4.0L Atmosphérique 510 ch',
    price_jpy: 31464000,
    price_usd_estimate: 243000,
    price_eur_estimate: 225000,
    status: 'available',
    description:
      "La 911 GT3 992 est la Porsche la plus désirable du moment. Son flat-six atmosphérique de 4.0L hurlant à 9000 tr/min est une véritable œuvre d'ingénierie. Kilométrage très bas, aucun défaut. Propriétaire japonais collectionneur. Option Clubsport, Pack Chrono.",
    images: [
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&q=80',
      'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
    ],
    featured: false,
    created_at: '2024-02-10T10:00:00Z',
  },
  {
    id: '5',
    brand: 'Rolls-Royce',
    model: 'Ghost',
    year: 2021,
    mileage_km: 9200,
    color: 'Arctic White',
    transmission: 'Automatique 8 rapports ZF',
    engine: 'V12 6.75L Twin-Turbo 571 ch',
    price_jpy: 38000000,
    price_usd_estimate: 294000,
    price_eur_estimate: 272000,
    status: 'reserved',
    description:
      "La Rolls-Royce Ghost nouvelle génération — le véhicule ultime du confort et du prestige. \"Post Opulence\" design, suspension sur coussins d'air auto-nivelante, Starlight Headliner avec 1344 étoiles en fibre optique. Propriétaire unique, garage couvert, utilisation occasionnelle.",
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80',
    ],
    featured: false,
    created_at: '2024-02-15T10:00:00Z',
  },
  {
    id: '6',
    brand: 'Lamborghini',
    model: 'Urus',
    year: 2022,
    mileage_km: 13100,
    color: 'Nero Noctis',
    transmission: 'Automatique 8 rapports',
    engine: 'V8 4.0L Twin-Turbo 650 ch',
    price_jpy: 28122000,
    price_usd_estimate: 217000,
    price_eur_estimate: 201000,
    status: 'available',
    description:
      "L'Urus est le SUV supercar par excellence. 650 chevaux, 0-100 en 3,5 secondes, intérieur luxueux en cuir pleine fleur noir. Pack ANIMA complet, Pack Pearl, jantes Taigete 23 pouces. En parfait état, entretien Lamborghini officiel. Le SUV le plus rapide de sa catégorie.",
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80',
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=80',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80',
    ],
    featured: false,
    created_at: '2024-02-20T10:00:00Z',
  },
]
