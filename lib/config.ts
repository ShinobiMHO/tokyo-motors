// ============================================================
// lib/config.ts — Configuration centralisée Tokyo Motors
//
// Toutes les constantes du projet lisent les variables
// préfixées NEXT_PUBLIC_TM_ ou TM_ pour éviter tout conflit
// avec les autres projets du workspace (antigravity-hub,
// shinobi, coco, rally-game).
//
// JAMAIS importer depuis process.env directement dans les
// composants — toujours utiliser ce fichier.
// ============================================================

/** URL du projet Supabase Tokyo Motors */
export const TM_SUPABASE_URL =
  process.env.NEXT_PUBLIC_TM_SUPABASE_URL ?? ''

/** Clé publique anon Supabase (safe côté client) */
export const TM_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_TM_SUPABASE_ANON_KEY ?? ''

/** Numéro WhatsApp — format international sans "+" (ex: 33612345678) */
export const TM_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_TM_WHATSAPP_NUMBER ?? '1234567890'

/** Construit le lien WhatsApp avec message optionnel */
export function whatsappLink(message = ''): string {
  const encoded = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${TM_WHATSAPP_NUMBER}${encoded}`
}

/** Email de contact public */
export const TM_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_TM_CONTACT_EMAIL ?? 'contact@tokyo-motors.com'

/** Construit un lien mailto: avec sujet optionnel */
export function mailtoLink(subject = ''): string {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return `mailto:${TM_CONTACT_EMAIL}${q}`
}

/** URL publique du site (sans slash final) */
export const TM_SITE_URL =
  process.env.NEXT_PUBLIC_TM_SITE_URL ?? 'https://tokyo-motors.com'
