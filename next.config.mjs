// Configuration Next.js pour Tokyo Motors
// Variables d'env : préfixe NEXT_PUBLIC_TM_ pour isoler des autres projets

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Domaines autorisés pour les images (Unsplash pour les démos)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // Supabase Storage
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

export default nextConfig
