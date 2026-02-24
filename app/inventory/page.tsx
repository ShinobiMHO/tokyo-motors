'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarCard from '@/components/CarCard'
import { supabase, DEMO_CARS, type Car, type CarStatus } from '@/lib/supabase'

// ============================================================
// Inventory — Page liste de toutes les voitures
// Filtres : marque, gamme de prix, statut
// ============================================================

// Marques disponibles
const BRANDS = ['All', 'Ferrari', 'Lamborghini', 'McLaren', 'Porsche', 'Rolls-Royce', 'Bentley', 'Aston Martin']

// Gammes de prix (en JPY)
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ¥20M', min: 0, max: 20000000 },
  { label: '¥20M – ¥40M', min: 20000000, max: 40000000 },
  { label: '¥40M – ¥80M', min: 40000000, max: 80000000 },
  { label: 'Over ¥80M', min: 80000000, max: Infinity },
]

export default function InventoryPage() {
  const [cars, setCars] = useState<Car[]>(DEMO_CARS)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState(0) // Index dans PRICE_RANGES
  const [selectedStatus, setSelectedStatus] = useState<CarStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Charger les voitures depuis Supabase au montage
  useEffect(() => {
    async function loadCars() {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          setCars(data)
        } else {
          // Utiliser les données de démo si Supabase est vide
          setCars(DEMO_CARS)
        }
      } catch (err) {
        console.error('Erreur chargement voitures:', err)
        setCars(DEMO_CARS)
      } finally {
        setIsLoading(false)
      }
    }

    loadCars()
  }, [])

  // Filtrer les voitures selon les critères sélectionnés
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Filtre marque
      if (selectedBrand !== 'All' && car.brand !== selectedBrand) return false

      // Filtre prix
      const range = PRICE_RANGES[selectedPriceRange]
      if (car.price_jpy < range.min || car.price_jpy > range.max) return false

      // Filtre statut
      if (selectedStatus !== 'all' && car.status !== selectedStatus) return false

      // Filtre recherche textuelle
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (
          !car.brand.toLowerCase().includes(q) &&
          !car.model.toLowerCase().includes(q) &&
          !car.color.toLowerCase().includes(q)
        ) return false
      }

      return true
    })
  }, [cars, selectedBrand, selectedPriceRange, selectedStatus, searchQuery])

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setSelectedBrand('All')
    setSelectedPriceRange(0)
    setSelectedStatus('all')
    setSearchQuery('')
  }

  const hasActiveFilters = selectedBrand !== 'All' || selectedPriceRange !== 0 || selectedStatus !== 'all' || searchQuery !== ''

  return (
    <>
      <Navbar />

      {/* Header de page */}
      <div className="pt-32 pb-12 bg-[#0a0a0a]">
        <div className="container-main">
          <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
            Browse Our Selection
          </p>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white mb-4">
            Inventory
          </h1>
          <p className="text-[#a0a0a0] text-base max-w-xl">
            All vehicles are physically located in Japan, personally inspected by our team.
          </p>
        </div>
      </div>

      {/* Zone filtres + grille */}
      <div className="bg-[#0a0a0a] pb-20">
        <div className="container-main">

          {/* Barre de recherche + bouton filtres */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Recherche */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
              <input
                type="text"
                placeholder="Search brand, model, color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141414] border border-[#1a1a1a] text-white pl-10 pr-4 py-3 text-sm placeholder-[#666666] focus:outline-none focus:border-[#c9a96e]/40 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Toggle filtres (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'border-[#c9a96e]/60 text-[#c9a96e]'
                  : 'border-[#1a1a1a] text-[#a0a0a0] hover:border-[#c9a96e]/30'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#c9a96e]" />
              )}
            </button>
          </div>

          {/* Panneau filtres */}
          {showFilters && (
            <div className="bg-[#141414] border border-[#1a1a1a] p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                {/* Filtre marque */}
                <div>
                  <p className="text-xs font-medium text-[#a0a0a0] uppercase tracking-wider mb-3">Brand</p>
                  <div className="flex flex-wrap gap-2">
                    {BRANDS.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-3 py-1.5 text-xs border transition-colors ${
                          selectedBrand === brand
                            ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10'
                            : 'border-[#1a1a1a] text-[#a0a0a0] hover:border-[#c9a96e]/30'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtre prix */}
                <div>
                  <p className="text-xs font-medium text-[#a0a0a0] uppercase tracking-wider mb-3">Price Range</p>
                  <div className="flex flex-wrap gap-2">
                    {PRICE_RANGES.map((range, idx) => (
                      <button
                        key={range.label}
                        onClick={() => setSelectedPriceRange(idx)}
                        className={`px-3 py-1.5 text-xs border transition-colors ${
                          selectedPriceRange === idx
                            ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10'
                            : 'border-[#1a1a1a] text-[#a0a0a0] hover:border-[#c9a96e]/30'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtre statut */}
                <div>
                  <p className="text-xs font-medium text-[#a0a0a0] uppercase tracking-wider mb-3">Availability</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'available', label: 'Available' },
                      { value: 'reserved', label: 'Reserved' },
                      { value: 'sold', label: 'Sold' },
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => setSelectedStatus(status.value as CarStatus | 'all')}
                        className={`px-3 py-1.5 text-xs border transition-colors ${
                          selectedStatus === status.value
                            ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10'
                            : 'border-[#1a1a1a] text-[#a0a0a0] hover:border-[#c9a96e]/30'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Réinitialiser les filtres */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#c9a96e] hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Compteur de résultats */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[#a0a0a0] text-sm">
              {isLoading ? (
                'Loading...'
              ) : (
                <>
                  <span className="text-white font-medium">{filteredCars.length}</span>
                  {' '}car{filteredCars.length !== 1 ? 's' : ''} found
                </>
              )}
            </p>
          </div>

          {/* Grille des voitures */}
          {isLoading ? (
            // Skeleton loading
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="bg-[#141414] border border-[#1a1a1a]">
                  <div className="skeleton aspect-[16/10]" />
                  <div className="p-5 space-y-3">
                    <div className="skeleton h-3 w-20 rounded" />
                    <div className="skeleton h-6 w-40 rounded" />
                    <div className="skeleton h-3 w-32 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCars.length === 0 ? (
            // Aucun résultat
            <div className="text-center py-20">
              <p className="text-[#a0a0a0] text-base mb-2">No cars match your criteria.</p>
              <button
                onClick={resetFilters}
                className="text-[#c9a96e] text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car, idx) => (
                <CarCard key={car.id} car={car} priority={idx < 3} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
