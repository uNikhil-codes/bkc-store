"use client"
import { useState, useRef } from 'react'
import { Truck, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import BuyDrawer from '@/components/product/BuyDrawer'

// Import the new Zoom features
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function ProductClientUI({ product }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const scrollContainerRef = useRef(null)

  const handleScroll = (e) => {
    if (!scrollContainerRef.current) return
    const scrollPosition = e.target.scrollLeft
    const width = e.target.clientWidth
    const index = Math.round(scrollPosition / width)
    if (index !== activeImage) setActiveImage(index)
  }

  const hasImages = product.gallery && product.gallery.length > 0
  const activeImageUrl = hasImages ? product.gallery[activeImage] : ''

  return (
    <div className="relative bg-surface min-h-screen">
      <div className="max-w-5xl mx-auto md:flex md:items-start md:gap-10 md:px-8 pt-4 md:pt-10 pb-28 md:pb-16">

        {/* --- LEFT COLUMN: Images --- */}
        <div className="w-full md:w-[50%] flex flex-col gap-4">

          {/* Mobile Gallery */}
          <div className="md:hidden w-full aspect-square relative bg-[#F3F4F6] overflow-hidden">
            <div ref={scrollContainerRef} onScroll={handleScroll} className="flex h-full w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth">
              {hasImages && product.gallery.map((img, i) => (
                <div key={i} className="h-full w-full shrink-0 snap-center flex items-center justify-center p-4">
                  <Zoom>
                    {/* CHANGED: object-contain prevents cropping */}
                    <img src={img} alt={`View ${i + 1}`} className="max-h-full max-w-full object-contain drop-shadow-sm" />
                  </Zoom>
                </div>
              ))}
            </div>
            {hasImages && product.gallery.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 items-center z-10 pointer-events-none">
                {product.gallery.map((_, i) => (
                  <motion.div key={i} layout transition={{ type: "spring", stiffness: 300, damping: 20 }} className={`h-1.5 rounded-full bg-primary ${activeImage === i ? 'w-5' : 'w-1.5 opacity-30'}`} />
                ))}
              </div>
            )}
          </div>

                    {/* Desktop Gallery */}
          {hasImages && (
            <div className="hidden md:flex flex-col gap-3">

              {/* FIXED: Strictly locked height and width to prevent overflow */}
              <div className="w-full h-[450px] bg-[#F3F4F6] rounded-3xl border border-border flex items-center justify-center p-6 overflow-hidden">
                <Zoom>
                  <img
                    src={activeImageUrl}
                    style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
                    className="drop-shadow-md transition-opacity duration-300"
                    alt="Main"
                  />
                </Zoom>
              </div>

              {/* Clickable Thumbnails */}
              <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-20 shrink-0 rounded-2xl bg-[#F3F4F6] border-2 transition-all p-2 flex items-center justify-center ${activeImage === i ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} className="max-h-full max-w-full object-contain" alt={`Thumb ${i+1}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN: Info --- */}
        <div className="w-full md:w-[50%] px-4 md:px-0">
          <div className="flex flex-col gap-5 md:gap-6 mt-6 md:mt-0 h-full">
            <div>
              {product.discountBadge && (
                <span className="inline-block bg-primary text-surface text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                  {product.discountBadge}
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary leading-tight mb-2">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl md:text-3xl font-black tracking-tight">₹{product.prepaidPrice}</span>
                <span className="text-sm text-secondary line-through">₹{product.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Save ₹{product.originalPrice - product.prepaidPrice}
                </span>
              </div>
            </div>

            {product.tagline && (
              <>
                <p className="text-base font-medium text-secondary leading-relaxed italic">"{product.tagline}"</p>
                <hr className="border-border" />
              </>
            )}

            {product.highlights && product.highlights.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">Why you'll love it</h3>
                <ul className="flex flex-col gap-2.5">
                  {product.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-primary/90">
                      <span className="text-primary mt-0.5 leading-none select-none text-base">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-2.5 rounded-2xl bg-[#F3F4F6] border border-border p-4">
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-secondary">
                <Truck size={16} className="text-primary shrink-0" />
                <span>Estimated Delivery: <span className="font-bold text-primary">{product.deliveryEstimate}</span></span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-secondary">
                <ShieldCheck size={16} className="text-primary shrink-0" />
                <span>Fulfilled safely via verified partners.</span>
              </div>
            </div>

            <div className="hidden md:block mt-2">
              <motion.button whileTap={{ scale: 0.98 }} onClick={() => setIsDrawerOpen(true)} className="w-full rounded-2xl bg-primary h-14 flex items-center justify-center text-base font-bold text-surface shadow-lg hover:opacity-90 transition-all">
                Buy Now · ₹{product.prepaidPrice}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-t border-border p-4 pb-safe pointer-events-none">
        <div className="pointer-events-auto">
          <motion.button whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} onClick={() => setIsDrawerOpen(true)} className="w-full rounded-2xl bg-primary h-14 flex items-center justify-center text-base font-bold text-surface shadow-xl">
            Buy Now · ₹{product.prepaidPrice}
          </motion.button>
        </div>
      </div>

      <BuyDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} product={product} />
    </div>
  )
}
