'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase, type ContactInsert } from '@/lib/supabase'

// ============================================================
// ContactForm — Formulaire de contact réutilisable
// Utilisé sur /contact et sur les pages détail voiture
// ============================================================

interface ContactFormProps {
  prefilledCar?: string   // Pré-remplir le champ "voiture intéressée"
  compact?: boolean       // Version compacte pour la page voiture
}

// Valeur initiale du formulaire
const INITIAL_FORM: ContactInsert = {
  name: '',
  email: '',
  phone: '',
  country: '',
  car_interest: '',
  message: '',
}

export default function ContactForm({ prefilledCar = '', compact = false }: ContactFormProps) {
  const [form, setForm] = useState<ContactInsert>({
    ...INITIAL_FORM,
    car_interest: prefilledCar,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mise à jour d'un champ
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Envoi du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Sauvegarder dans Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([{ ...form, read: false }])

      if (error) throw error

      // Succès !
      setIsSubmitted(true)
      setForm({ ...INITIAL_FORM, car_interest: prefilledCar })
      toast.success('Message sent! We\'ll reply within 24 hours.')
    } catch (err) {
      console.error('Erreur envoi formulaire:', err)
      toast.error('Failed to send. Please try WhatsApp or email directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Message de succès
  if (isSubmitted) {
    return (
      <div className="bg-[#141414] border border-[#c9a96e]/30 p-8 text-center">
        <div className="w-12 h-12 bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center mx-auto mb-4">
          <Send className="w-5 h-5 text-[#c9a96e]" />
        </div>
        <h3 className="text-white font-serif text-xl mb-2">Message Sent!</h3>
        <p className="text-[#a0a0a0] text-sm mb-4">
          Thank you! We typically reply within a few hours via email or WhatsApp.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-[#c9a96e] text-xs uppercase tracking-wider hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Ligne : Prénom + Email */}
      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John Smith"
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="form-input"
          />
        </div>
      </div>

      {/* Ligne : Téléphone + Pays */}
      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="phone" className="form-label">Phone / WhatsApp</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 555 000 0000"
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="country" className="form-label">Country *</label>
          <select
            id="country"
            name="country"
            required
            value={form.country}
            onChange={handleChange}
            className="form-input"
          >
            <option value="" disabled>Select country...</option>
            <option value="USA">🇺🇸 United States</option>
            <option value="France">🇫🇷 France</option>
            <option value="Canada">🇨🇦 Canada</option>
            <option value="UK">🇬🇧 United Kingdom</option>
            <option value="Germany">🇩🇪 Germany</option>
            <option value="Other">🌍 Other</option>
          </select>
        </div>
      </div>

      {/* Voiture intéressée */}
      <div>
        <label htmlFor="car_interest" className="form-label">Car You&apos;re Interested In</label>
        <input
          id="car_interest"
          name="car_interest"
          type="text"
          value={form.car_interest}
          onChange={handleChange}
          placeholder="e.g. Ferrari 488 Pista, Lamborghini Huracán..."
          className="form-input"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="form-label">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 3 : 5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us your requirements, budget, timeline..."
          className="form-input resize-none"
        />
      </div>

      {/* Bouton envoyer */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>

      {/* Mention RGPD */}
      <p className="text-[#666666] text-xs text-center">
        Your data is used only to process your inquiry. We never spam.
      </p>
    </form>
  )
}
