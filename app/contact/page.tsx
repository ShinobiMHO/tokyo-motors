import type { Metadata } from 'next'
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { whatsappLink, TM_CONTACT_EMAIL } from '@/lib/config'

// ============================================================
// Contact — Page de contact
// ============================================================

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Tokyo Motors. WhatsApp, email, or contact form. We reply within a few hours.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <div className="pt-32 pb-20 bg-[#0a0a0a]">
        <div className="container-main">

          {/* Header */}
          <div className="mb-16">
            <p className="text-[#c9a96e] text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Get In Touch
            </p>
            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white mb-4">
              Contact
            </h1>
            <p className="text-[#a0a0a0] text-lg max-w-xl">
              Have a question? Looking for a specific car? We&apos;re here to help.
              Reach out via WhatsApp, email, or the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Colonne gauche — Infos de contact (2/5) */}
            <div className="lg:col-span-2 space-y-8">

              {/* WhatsApp */}
              <div>
                <h2 className="text-white font-semibold text-base mb-4 uppercase tracking-wider">
                  Quick Contact
                </h2>
                <div className="space-y-4">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-[#141414] border border-[#1a1a1a] p-4 hover:border-[#c9a96e]/30 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] shrink-0 group-hover:bg-[#c9a96e]/20 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">WhatsApp</p>
                      <p className="text-[#a0a0a0] text-xs mt-0.5">Available 7 days/week</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${TM_CONTACT_EMAIL}`}
                    className="flex items-center gap-4 bg-[#141414] border border-[#1a1a1a] p-4 hover:border-[#c9a96e]/30 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] shrink-0 group-hover:bg-[#c9a96e]/20 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Email</p>
                      <p className="text-[#a0a0a0] text-xs mt-0.5">{TM_CONTACT_EMAIL}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Adresse + horaires */}
              <div className="space-y-4">
                <div className="flex gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#c9a96e] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium">Tokyo Office</p>
                    <p className="text-[#a0a0a0] mt-1">
                      Minato-ku, Tokyo<br />
                      Japan 〒107-0061
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <Clock className="w-4 h-4 text-[#c9a96e] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium">Response Time</p>
                    <p className="text-[#a0a0a0] mt-1">
                      Typically within 2–4 hours.<br />
                      Available 7 days a week (JST).
                    </p>
                  </div>
                </div>
              </div>

              {/* Note d'information */}
              <div className="bg-[#141414] border border-[#c9a96e]/20 p-5">
                <p className="text-[#c9a96e] text-xs font-semibold uppercase tracking-wider mb-2">
                  Free Consultation
                </p>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  Not sure what you want yet? Tell us your budget and we&apos;ll suggest
                  the best options currently available in Japan.
                  No obligation, no pressure.
                </p>
              </div>
            </div>

            {/* Colonne droite — Formulaire (3/5) */}
            <div className="lg:col-span-3">
              <h2 className="text-white font-semibold text-base mb-6 uppercase tracking-wider">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
