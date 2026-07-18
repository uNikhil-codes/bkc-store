"use client"
import { useState, useEffect } from 'react' // FIXED: Added useEffect here
import { Search, Package, CheckCircle2, Truck, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TrackPage() {
  const [orderId, setOrderId] = useState('')
  const [phone, setPhone] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [trackingResult, setTrackingResult] = useState(null)

  // Auto-fill Logic: Magic Links + Local Storage
  useEffect(() => {
    // 1. Check if they clicked a link from their email (e.g., site.com/track?id=BKC-123)
    const urlParams = new URLSearchParams(window.location.search)
    const emailOrderId = urlParams.get('id')

    // 2. Check if they just bought something right now
    const savedOrder = localStorage.getItem('bkc_recent_order')
    const savedPhone = localStorage.getItem('bkc_recent_phone')

    // Apply whichever one exists!
    if (emailOrderId) {
      setOrderId(emailOrderId.toUpperCase())
    } else if (savedOrder) {
      setOrderId(savedOrder)
    }

    if (savedPhone) setPhone(savedPhone)
  }, [])

  const handleTrack = (e) => {
    e.preventDefault()
    setIsSearching(true)

    setTimeout(() => {
      setIsSearching(false)
      setTrackingResult({
        id: orderId || 'BKC-984729',
        status: 'shipped',
        expectedDate: 'Oct 24 - Oct 26',
        items: 'Magnetic Spider-Man Desk Lamp'
      })
    }, 1200)
  }

  const timeline = [
    { key: 'processing', label: 'Processing', icon: Clock },
    { key: 'shipped', label: 'Shipped', icon: Package },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2 }
  ]

  const getStatusIndex = (status) => timeline.findIndex(t => t.key === status)

  return (
    <div className="px-5 py-8 max-w-md mx-auto min-h-[70vh]">

      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight mb-2">Track Your Order</h1>
        <p className="text-sm font-medium text-secondary">Enter your details below to get real-time delivery updates.</p>
      </div>

      <form onSubmit={handleTrack} className="flex flex-col gap-4 mb-10">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-secondary">Order ID</label>
          <input
            type="text"
            required
            placeholder="e.g. BKC-123456"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm font-bold bg-surface focus:outline-none focus:border-primary transition-colors uppercase"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-secondary">Phone Number</label>
          <input
            type="tel"
            required
            placeholder="10-digit number used during checkout"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm font-bold bg-surface focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isSearching}
          className="w-full mt-2 rounded-2xl bg-primary text-surface h-14 flex items-center justify-center font-bold text-sm gap-2 shadow-lg active:scale-[0.98] transition-all disabled:opacity-80"
        >
          {isSearching ? 'Searching...' : (
            <>
              <Search size={18} />
              Track Package
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {trackingResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-[#F3F4F6] p-6 flex flex-col gap-6"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">Status</p>
              <h2 className="text-xl font-black tracking-tight text-primary capitalize">
                {trackingResult.status.replace(/_/g, ' ')}
              </h2>
              <p className="text-sm font-medium text-secondary mt-1">Expected: {trackingResult.expectedDate}</p>
            </div>

            <div className="relative flex justify-between items-center mt-2">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 rounded-full" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-1000"
                style={{ width: `${(getStatusIndex(trackingResult.status) / 3) * 100}%` }}
              />

              {timeline.map((item, i) => {
                const isActive = getStatusIndex(trackingResult.status) >= i
                const Icon = item.icon
                return (
                  <div key={item.key} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center border-4 border-[#F3F4F6] transition-colors duration-500
                      ${isActive ? 'bg-primary text-surface' : 'bg-surface text-border'}`}>
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                  </div>
                )
              })}
            </div>

            <hr className="border-border my-2" />

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">Items</p>
              <p className="text-sm font-bold">{trackingResult.items}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
