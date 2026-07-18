"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Copy, ArrowRight, Package } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SuccessPage() {
  const [copied, setCopied] = useState(false)
  const [orderId, setOrderId] = useState('Loading...')

  // Fetch the saved order ID when the page loads
  useEffect(() => {
    const saved = localStorage.getItem('bkc_recent_order')
    if (saved) setOrderId(saved)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center pt-8">

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.1 }}
        className="text-emerald-500 mb-6"
      >
        <CheckCircle2 size={80} strokeWidth={1.5} />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-black tracking-tight text-primary mb-2"
      >
        Order Confirmed!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-base font-medium text-secondary mb-8 max-w-sm"
      >
        Your premium finds are being prepared. We've sent a confirmation to your phone.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm bg-[#F3F4F6] rounded-3xl p-6 flex flex-col gap-4 border border-border"
      >
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">Order Reference</p>
          <div
            onClick={copyToClipboard}
            className="flex items-center gap-2 bg-surface px-4 py-2 rounded-xl cursor-pointer shadow-sm active:scale-95 transition-transform"
          >
            <span className="text-lg font-black tracking-widest">{orderId}</span>
            <Copy size={16} className={copied ? "text-emerald-500" : "text-secondary"} />
          </div>
          {copied && <span className="text-[10px] font-bold text-emerald-600 mt-1">Copied!</span>}
        </div>

        <hr className="border-border" />

        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-secondary">Expected Delivery</span>
          <span className="font-bold text-primary">5-7 Business Days</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col gap-3 w-full max-w-sm"
      >
        <Link href="/track" className="w-full bg-primary text-surface rounded-2xl h-14 flex items-center justify-center font-bold text-sm gap-2 shadow-lg active:scale-[0.98] transition-transform">
          <Package size={18} />
          Track Order
        </Link>
        <Link href="/" className="w-full bg-surface text-primary border-2 border-border rounded-2xl h-14 flex items-center justify-center font-bold text-sm gap-2 active:scale-[0.98] transition-transform">
          Continue Shopping
          <ArrowRight size={18} />
        </Link>
      </motion.div>

    </div>
  )
}
