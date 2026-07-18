"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PackageSearch, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase' // <--- Added Supabase
import { sendRequestAlert } from '@/actions/telegram'

export default function RequestPage() {
  const [itemQuery, setItemQuery] = useState('')
  const [contact, setContact] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const item = urlParams.get('item')
    if (item) setItemQuery(item)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    const requestData = {
      item_query: itemQuery,
      contact_info: contact
    }

    // Save request to Supabase
    const { error } = await supabase.from('product_requests').insert([requestData])

    if (error) {
      setErrorMsg("Something went wrong. Please try again.")
      setIsSubmitting(false)
    } else {
      // SEND TELEGRAM ALERT
      await sendRequestAlert(requestData)

      setIsSubmitting(false)
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
        <h1 className="text-2xl font-black tracking-tight mb-2">Request Sent!</h1>
        <p className="text-sm font-medium text-secondary mb-8">
          Our sourcing team is on it. If we can find a high-quality version of this, we'll text you the secret link.
        </p>
        <button onClick={() => window.location.href = '/'} className="w-full max-w-xs bg-primary text-surface rounded-2xl h-14 font-bold text-sm">
          Return to Store
        </button>
      </div>
    )
  }

  return (
    <div className="px-5 py-8 max-w-md mx-auto min-h-[75vh]">
      <div className="mb-8">
        <div className="h-12 w-12 bg-[#F3F4F6] rounded-full flex items-center justify-center text-primary mb-4">
          <PackageSearch size={24} />
        </div>
        <h1 className="text-2xl font-black tracking-tight mb-2">Can't find it?</h1>
        <p className="text-sm font-medium text-secondary">
          Saw a cool gadget on Reels? Paste the link or describe it, and we will source it for you at the best price.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-secondary">What are you looking for?</label>
          <textarea required rows="3" placeholder="Paste an Instagram Reel link, or describe the product..." value={itemQuery} onChange={(e) => setItemQuery(e.target.value)} className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm font-medium bg-surface focus:outline-none focus:border-primary transition-colors resize-none" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-secondary">Your Phone or Email</label>
          <input type="text" required placeholder="So we can send you the link when we find it" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm font-medium bg-surface focus:outline-none focus:border-primary transition-colors" />
        </div>

        {errorMsg && <p className="text-xs text-red-500 font-bold">{errorMsg}</p>}

        <motion.button disabled={isSubmitting} whileTap={!isSubmitting ? { scale: 0.98 } : {}} type="submit" className="w-full mt-2 rounded-2xl bg-primary text-surface h-14 flex items-center justify-center font-bold text-sm gap-2 shadow-lg disabled:opacity-80">
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><ArrowRight size={18} /> Send Request</>}
        </motion.button>
      </form>
    </div>
  )
}
