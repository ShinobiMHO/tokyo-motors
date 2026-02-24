'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

// ============================================================
// CarGallery — Carousel de photos pour la page détail voiture
// - Miniatures en bas pour naviguer
// - Modal plein écran au clic (lightbox)
// ============================================================

interface CarGalleryProps {
  images: string[]       // Tableau d'URLs d'images
  carName: string        // Nom de la voiture (pour l'accessibilité)
}

export default function CarGallery({ images, carName }: CarGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Si pas d'images, afficher un placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-[#141414] border border-[#1a1a1a] flex items-center justify-center">
        <p className="text-[#a0a0a0] text-sm">No images available</p>
      </div>
    )
  }

  // Aller à l'image précédente
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Aller à l'image suivante
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      {/* Carousel principal */}
      <div className="space-y-3">

        {/* Image principale */}
        <div className="relative aspect-[16/9] bg-[#111111] overflow-hidden group">
          <Image
            src={images[currentIndex]}
            alt={`${carName} — Photo ${currentIndex + 1}`}
            fill
            className="object-cover transition-all duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />

          {/* Bouton zoom (ouvre le lightbox) */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#c9a96e]/80"
            aria-label="Voir en plein écran"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Bouton précédent (seulement si plusieurs images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#c9a96e]/80"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Bouton suivant */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#c9a96e]/80"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicateur position */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-3 py-1">
                <span className="text-white text-xs">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Miniatures (seulement si plusieurs images) */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative shrink-0 w-24 h-16 overflow-hidden transition-all duration-200 ${
                  currentIndex === idx
                    ? 'ring-2 ring-[#c9a96e] opacity-100'
                    : 'opacity-50 hover:opacity-75'
                }`}
                aria-label={`Voir photo ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${carName} miniature ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox — Modal plein écran */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Bouton fermer */}
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-[#c9a96e]/30 transition-colors z-10"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image en grand */}
          <div
            className="relative w-full max-w-5xl mx-4 aspect-[16/9]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${carName} — Photo ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Navigation lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-[#c9a96e]/30 transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-[#c9a96e]/30 transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
