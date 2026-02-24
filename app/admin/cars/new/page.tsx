'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { supabase, type CarInsert, type CarStatus } from '@/lib/supabase'
import Logo from '@/components/Logo'
import toast from 'react-hot-toast'

// ============================================================
// Admin — Formulaire d'ajout d'une nouvelle voiture
// Upload d'images vers Supabase Storage
// ============================================================

// Valeur initiale du formulaire
const INITIAL_FORM: CarInsert = {
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  mileage_km: 0,
  color: '',
  transmission: 'Automatic',
  engine: '',
  price_jpy: 0,
  price_usd_estimate: 0,
  price_eur_estimate: 0,
  status: 'available',
  description: '',
  images: [],
  featured: false,
}

// Marques disponibles
const BRANDS = ['Ferrari', 'Lamborghini', 'McLaren', 'Porsche', 'Bentley', 'Rolls-Royce', 'Aston Martin', 'Bugatti', 'Maserati', 'Other']

export default function NewCarPage() {
  const router = useRouter()
  const [form, setForm] = useState<CarInsert>(INITIAL_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([]) // URLs d'images manuelles
  const [newImageUrl, setNewImageUrl] = useState('')
  const [uploadingFiles, setUploadingFiles] = useState(false)

  // Vérifier l'auth
  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.push('/admin')
    }
    checkAuth()
  }, [router])

  // Mettre à jour les champs texte/number/select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value,
    }))
  }

  // Toggle "featured"
  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, featured: e.target.checked }))
  }

  // Ajouter une URL d'image manuellement
  const addImageUrl = () => {
    if (!newImageUrl.trim()) return
    setImageUrls((prev) => [...prev, newImageUrl.trim()])
    setNewImageUrl('')
  }

  // Supprimer une image
  const removeImageUrl = (idx: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== idx))
  }

  // Upload d'images depuis l'ordinateur vers Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploadingFiles(true)
    const uploadedUrls: string[] = []

    for (const file of files) {
      try {
        // Nom de fichier unique
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
        const filePath = `cars/${fileName}`

        const { error } = await supabase.storage
          .from('car-images')
          .upload(filePath, file, { cacheControl: '3600' })

        if (error) throw error

        // Récupérer l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(filePath)

        uploadedUrls.push(publicUrl)
      } catch (err) {
        console.error('Erreur upload:', err)
        toast.error(`Failed to upload ${file.name}`)
      }
    }

    setImageUrls((prev) => [...prev, ...uploadedUrls])
    if (uploadedUrls.length > 0) {
      toast.success(`${uploadedUrls.length} image(s) uploaded`)
    }
    setUploadingFiles(false)
  }

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (imageUrls.length === 0) {
      toast.error('Please add at least one image')
      return
    }

    setIsSubmitting(true)

    try {
      const carData: CarInsert = {
        ...form,
        images: imageUrls,
      }

      const { error } = await supabase.from('cars').insert([carData])
      if (error) throw error

      toast.success('Car added successfully!')
      router.push('/admin/dashboard')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add car'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Header */}
      <header className="bg-[#141414] border-b border-[#1a1a1a] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="text-[#a0a0a0] text-xs font-medium uppercase tracking-widest">
              Add New Car
            </span>
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-[#a0a0a0] hover:text-white text-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ===== INFORMATIONS DE BASE ===== */}
          <div className="bg-[#141414] border border-[#1a1a1a] p-6">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Marque */}
              <div>
                <label className="form-label">Brand *</label>
                <select name="brand" required value={form.brand} onChange={handleChange} className="form-input">
                  <option value="" disabled>Select brand...</option>
                  {BRANDS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Modèle */}
              <div>
                <label className="form-label">Model *</label>
                <input
                  name="model" type="text" required
                  value={form.model} onChange={handleChange}
                  placeholder="e.g. 488 Pista"
                  className="form-input"
                />
              </div>

              {/* Année */}
              <div>
                <label className="form-label">Year *</label>
                <input
                  name="year" type="number" required
                  min={1990} max={new Date().getFullYear() + 1}
                  value={form.year} onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Kilométrage */}
              <div>
                <label className="form-label">Mileage (km) *</label>
                <input
                  name="mileage_km" type="number" required min={0}
                  value={form.mileage_km} onChange={handleChange}
                  placeholder="e.g. 8200"
                  className="form-input"
                />
              </div>

              {/* Couleur */}
              <div>
                <label className="form-label">Color *</label>
                <input
                  name="color" type="text" required
                  value={form.color} onChange={handleChange}
                  placeholder="e.g. Rosso Corsa"
                  className="form-input"
                />
              </div>

              {/* Transmission */}
              <div>
                <label className="form-label">Transmission *</label>
                <select name="transmission" value={form.transmission} onChange={handleChange} className="form-input">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic (PDK)">Automatic (PDK)</option>
                  <option value="Automatic (LDF)">Automatic (LDF)</option>
                  <option value="Automatic (SSG)">Automatic (SSG)</option>
                  <option value="PDK 7 rapports">PDK 7 rapports</option>
                  <option value="Automatique 8 rapports">Automatique 8 rapports</option>
                </select>
              </div>

              {/* Moteur */}
              <div className="sm:col-span-2">
                <label className="form-label">Engine *</label>
                <input
                  name="engine" type="text" required
                  value={form.engine} onChange={handleChange}
                  placeholder="e.g. V8 3.9L Twin-Turbo 720 ch"
                  className="form-input"
                />
              </div>

              {/* Statut */}
              <div>
                <label className="form-label">Status *</label>
                <select name="status" value={form.status} onChange={handleChange} className="form-input">
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3 pt-6">
                <input
                  id="featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={handleFeaturedChange}
                  className="w-4 h-4 accent-[#c9a96e]"
                />
                <label htmlFor="featured" className="text-[#a0a0a0] text-sm cursor-pointer">
                  Feature on homepage
                </label>
              </div>
            </div>
          </div>

          {/* ===== PRIX ===== */}
          <div className="bg-[#141414] border border-[#1a1a1a] p-6">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Pricing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Japan Price (¥) *</label>
                <input
                  name="price_jpy" type="number" required min={0}
                  value={form.price_jpy} onChange={handleChange}
                  placeholder="e.g. 74235000"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">USD Estimate ($)</label>
                <input
                  name="price_usd_estimate" type="number" min={0}
                  value={form.price_usd_estimate} onChange={handleChange}
                  placeholder="e.g. 574000"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">EUR Estimate (€)</label>
                <input
                  name="price_eur_estimate" type="number" min={0}
                  value={form.price_eur_estimate} onChange={handleChange}
                  placeholder="e.g. 532000"
                  className="form-input"
                />
              </div>
            </div>
            <p className="text-[#666666] text-xs mt-3">
              * Commission (10%) is automatically added on top. These prices should reflect the estimated total including commission.
            </p>
          </div>

          {/* ===== DESCRIPTION ===== */}
          <div className="bg-[#141414] border border-[#1a1a1a] p-6">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Description
            </h2>
            <textarea
              name="description"
              required
              rows={6}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the car in detail — condition, options, history, why it's special..."
              className="form-input resize-none"
            />
          </div>

          {/* ===== IMAGES ===== */}
          <div className="bg-[#141414] border border-[#1a1a1a] p-6">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Images
            </h2>

            {/* Upload fichiers */}
            <div className="mb-4">
              <label className="form-label">Upload from computer</label>
              <label className="flex items-center gap-3 bg-[#111111] border border-dashed border-[#333] p-4 cursor-pointer hover:border-[#c9a96e]/40 transition-colors">
                <ImageIcon className="w-5 h-5 text-[#c9a96e]" />
                <span className="text-[#a0a0a0] text-sm">
                  {uploadingFiles ? 'Uploading...' : 'Click to select photos (JPG, PNG, WebP)'}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploadingFiles}
                />
              </label>
            </div>

            {/* OU ajouter URL manuellement */}
            <div className="mb-4">
              <label className="form-label">Or add image URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="form-input flex-1"
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImageUrl() } }}
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="btn-outline-gold py-3 px-4"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Liste des images ajoutées */}
            {imageUrls.length > 0 && (
              <div className="space-y-2">
                <p className="text-[#a0a0a0] text-xs uppercase tracking-wider mb-2">
                  {imageUrls.length} image(s) added
                </p>
                {imageUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-[#111111] border border-[#1a1a1a] p-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Car image ${idx + 1}`}
                      className="w-16 h-10 object-cover shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/80x50/141414/c9a96e?text=Error'
                      }}
                    />
                    <span className="text-[#a0a0a0] text-xs flex-1 truncate">{url}</span>
                    <button
                      type="button"
                      onClick={() => removeImageUrl(idx)}
                      className="text-[#666666] hover:text-red-400 transition-colors p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bouton soumettre */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting || uploadingFiles}
              className="btn-gold flex-1 justify-center disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Car to Inventory
                </>
              )}
            </button>
            <Link href="/admin/dashboard" className="btn-outline-gold">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
