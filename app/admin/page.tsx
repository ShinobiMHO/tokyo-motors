'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'
import toast from 'react-hot-toast'

// ============================================================
// Admin Login — Page de connexion sécurisée
// Utilise Supabase Auth (email + password)
// ============================================================

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Connexion via Supabase Auth
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) throw error

      if (data.session) {
        toast.success('Welcome back!')
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Logo size="lg" />
        </div>

        {/* Card de login */}
        <div className="bg-[#141414] border border-[#1a1a1a] p-8">
          {/* Titre */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-[#c9a96e]" />
            </div>
            <h1 className="text-white font-serif text-2xl font-bold">Admin Access</h1>
            <p className="text-[#a0a0a0] text-xs mt-2">Restricted area — authorized personnel only</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tokyo-motors.com"
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="form-input pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#a0a0a0]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full justify-center mt-6 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Lien retour au site */}
        <p className="text-center mt-6">
          <a href="/" className="text-[#666666] hover:text-[#a0a0a0] text-xs transition-colors">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  )
}
