'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus,
  LogOut,
  Car,
  MessageSquare,
  Edit,
  Trash2,
  Eye,
  Check,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { supabase, DEMO_CARS, formatYen, formatKm, getStatusColor, getStatusLabel, type Car as CarType, type Contact } from '@/lib/supabase'
import Logo from '@/components/Logo'
import toast from 'react-hot-toast'

// ============================================================
// Admin Dashboard — Gestion des voitures et messages
// Protégé par Supabase Auth
// ============================================================

type Tab = 'cars' | 'contacts'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('cars')
  const [cars, setCars] = useState<CarType[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin')
      return
    }
    loadData()
  }

  // Charger les données
  async function loadData() {
    setIsLoading(true)
    try {
      // Charger les voitures
      const { data: carsData, error: carsError } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false })

      if (!carsError && carsData) {
        setCars(carsData)
      } else {
        setCars(DEMO_CARS)
      }

      // Charger les messages de contact
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (!contactsError && contactsData) {
        setContacts(contactsData)
      }
    } catch (err) {
      console.error('Erreur chargement données:', err)
      setCars(DEMO_CARS)
    } finally {
      setIsLoading(false)
    }
  }

  // Déconnexion
  async function handleLogout() {
    await supabase.auth.signOut()
    toast.success('Signed out')
    router.push('/admin')
  }

  // Supprimer une voiture
  async function handleDeleteCar(id: string, carName: string) {
    if (!confirm(`Delete ${carName}? This cannot be undone.`)) return

    setDeletingId(id)
    try {
      const { error } = await supabase.from('cars').delete().eq('id', id)
      if (error) throw error

      setCars((prev) => prev.filter((c) => c.id !== id))
      toast.success('Car deleted')
    } catch (err) {
      toast.error('Failed to delete car')
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }

  // Marquer un contact comme lu
  async function handleMarkRead(id: string) {
    try {
      await supabase.from('contacts').update({ read: true }).eq('id', id)
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, read: true } : c))
      )
    } catch (err) {
      console.error(err)
    }
  }

  // Nombre de messages non lus
  const unreadCount = contacts.filter((c) => !c.read).length

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Header admin */}
      <header className="bg-[#141414] border-b border-[#1a1a1a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo size="sm" />
            <div className="h-8 w-px bg-[#1a1a1a]" />
            <span className="text-[#a0a0a0] text-xs font-medium uppercase tracking-widest">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-[#a0a0a0] hover:text-white text-xs flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#a0a0a0] hover:text-white text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats rapides */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Cars', value: cars.length, icon: <Car className="w-4 h-4" /> },
            { label: 'Available', value: cars.filter(c => c.status === 'available').length, icon: <Check className="w-4 h-4" /> },
            { label: 'Messages', value: contacts.length, icon: <MessageSquare className="w-4 h-4" /> },
            { label: 'Unread', value: unreadCount, icon: <MessageSquare className="w-4 h-4" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#141414] border border-[#1a1a1a] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#a0a0a0] text-xs uppercase tracking-wider">{stat.label}</span>
                <span className="text-[#c9a96e]">{stat.icon}</span>
              </div>
              <p className="text-white font-serif text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-[#1a1a1a] pb-4">
          <button
            onClick={() => setActiveTab('cars')}
            className={`text-sm font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'cars' ? 'text-[#c9a96e]' : 'text-[#a0a0a0] hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            Cars ({cars.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`text-sm font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'contacts' ? 'text-[#c9a96e]' : 'text-[#a0a0a0] hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Messages ({contacts.length})
            {unreadCount > 0 && (
              <span className="w-5 h-5 bg-[#c9a96e] text-black text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Actions droite */}
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={loadData}
              className="text-[#a0a0a0] hover:text-white transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {activeTab === 'cars' && (
              <Link href="/admin/cars/new" className="btn-gold text-xs py-2 px-4">
                <Plus className="w-3.5 h-3.5" />
                Add Car
              </Link>
            )}
          </div>
        </div>

        {/* Contenu tab */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#c9a96e] animate-spin" />
          </div>
        ) : activeTab === 'cars' ? (

          /* ===== TAB VOITURES ===== */
          <div className="space-y-3">
            {cars.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#a0a0a0] mb-4">No cars in the inventory yet.</p>
                <Link href="/admin/cars/new" className="btn-gold">
                  <Plus className="w-4 h-4" />
                  Add First Car
                </Link>
              </div>
            ) : (
              cars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-4 bg-[#141414] border border-[#1a1a1a] p-4 hover:border-[#c9a96e]/20 transition-colors"
                >
                  {/* Miniature */}
                  <div className="relative w-20 h-14 shrink-0 bg-[#111111] overflow-hidden">
                    {car.images?.[0] ? (
                      <Image
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-6 h-6 text-[#444]" />
                      </div>
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                      {car.year} {car.brand} {car.model}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`status-badge text-xs ${getStatusColor(car.status)}`}>
                        {getStatusLabel(car.status)}
                      </span>
                      <span className="text-[#a0a0a0] text-xs">{formatKm(car.mileage_km)}</span>
                      <span className="text-[#c9a96e] text-xs">{formatYen(car.price_jpy)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/cars/${car.id}`}
                      target="_blank"
                      className="w-8 h-8 border border-[#1a1a1a] flex items-center justify-center text-[#a0a0a0] hover:text-white hover:border-[#c9a96e]/40 transition-colors"
                      title="View on site"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/cars/${car.id}/edit`}
                      className="w-8 h-8 border border-[#1a1a1a] flex items-center justify-center text-[#a0a0a0] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteCar(car.id, `${car.brand} ${car.model}`)}
                      disabled={deletingId === car.id}
                      className="w-8 h-8 border border-[#1a1a1a] flex items-center justify-center text-[#a0a0a0] hover:text-red-400 hover:border-red-400/40 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === car.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        ) : (

          /* ===== TAB MESSAGES ===== */
          <div className="space-y-3">
            {contacts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#a0a0a0]">No messages yet.</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`bg-[#141414] border p-5 transition-colors ${
                    contact.read ? 'border-[#1a1a1a]' : 'border-[#c9a96e]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-white font-medium text-sm">{contact.name}</p>
                        {!contact.read && (
                          <span className="text-xs bg-[#c9a96e]/20 text-[#c9a96e] border border-[#c9a96e]/30 px-2 py-0.5">
                            New
                          </span>
                        )}
                        <span className="text-[#666666] text-xs">{contact.country}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#a0a0a0] text-xs mb-3">
                        <a href={`mailto:${contact.email}`} className="hover:text-[#c9a96e] transition-colors">
                          {contact.email}
                        </a>
                        {contact.phone && <span>· {contact.phone}</span>}
                        {contact.car_interest && (
                          <span className="text-[#c9a96e]">· {contact.car_interest}</span>
                        )}
                      </div>
                      <p className="text-[#a0a0a0] text-sm leading-relaxed">{contact.message}</p>
                    </div>

                    <div className="flex items-start gap-2 shrink-0">
                      <span className="text-[#666666] text-xs whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {!contact.read && (
                        <button
                          onClick={() => handleMarkRead(contact.id)}
                          className="w-7 h-7 border border-[#1a1a1a] flex items-center justify-center text-[#a0a0a0] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <a
                        href={`mailto:${contact.email}?subject=Re: Your inquiry — Tokyo Motors`}
                        className="w-7 h-7 border border-[#1a1a1a] flex items-center justify-center text-[#a0a0a0] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-colors"
                        title="Reply by email"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
