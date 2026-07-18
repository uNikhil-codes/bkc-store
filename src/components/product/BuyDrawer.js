"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, CreditCard, Landmark, ArrowRight, Loader2, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { sendOrderAlert } from '@/actions/telegram'

// Helper to load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

function FormField({ label, id, type = "text", value, onChange, placeholder, readOnly = false, optional = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-secondary">
        {label}{optional && <span className="font-normal normal-case tracking-normal text-secondary/40 ml-1">(Optional)</span>}
      </label>
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} className={`w-full rounded-xl border border-border px-4 py-3 text-sm font-medium outline-none transition-all ${readOnly ? 'bg-[#F3F4F6] text-secondary cursor-not-allowed' : 'bg-surface text-primary focus:border-primary focus:ring-2 focus:ring-primary/10'}`} />
    </div>
  )
}

export default function BuyDrawer({ isOpen, onClose, product }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [paymentMode, setPaymentMode] = useState('prepaid')

  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [house, setHouse] = useState('')
  const [area, setArea] = useState('')
  const [landmark, setLandmark] = useState('')

  const [isLoadingPin, setIsLoadingPin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pinError, setPinError] = useState('')
  const [formError, setFormError] = useState('')

  const slideSpring = { type: "spring", damping: 30, stiffness: 350 }

  useEffect(() => { setFormError('') }, [step])

  const handlePincodeChange = async (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setPincode(value)
    setPinError('')
    if (value.length === 6) {
      setIsLoadingPin(true)
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`)
        const data = await res.json()
        if (data && data[0]?.Status === "Success") {
          const po = data[0].PostOffice[0]
          setCity(po.District || po.Block || '')
          setState(po.State || '')
        } else {
          setPinError('Could not find pincode. Please enter City/State manually.')
        }
      } catch (err) {
        setPinError('Network error. Please enter City/State manually.')
      } finally {
        setIsLoadingPin(false)
      }
    }
  }

  const validateStep2 = () => {
    if (!phone || phone.length < 10) return "Valid 10-digit phone required."
    if (!name) return "Full name is required."
    if (!pincode || pincode.length < 6) return "Valid 6-digit Pincode required."
    if (!city || !state) return "City and State required."
    if (!house) return "House/Flat number required."
    if (!area) return "Street/Area required."
    return ""
  }

  const handleNextStep = () => {
    if (step === 1) setStep(2)
    else if (step === 2) {
      const error = validateStep2()
      if (error) setFormError(error)
      else setStep(3)
    }
  }

  // Finalizer function runs AFTER successful payment or immediately for COD
  const finalizeOrder = async (orderData) => {
    const { error } = await supabase.from('orders').insert([orderData])
    if (error) {
      setFormError("Database error. If money was deducted, please contact support.")
      setIsSubmitting(false)
      return
    }

    await sendOrderAlert(orderData)

    localStorage.setItem('bkc_recent_order', orderData.order_id)
    localStorage.setItem('bkc_recent_phone', orderData.customer_phone)

    onClose()
    setTimeout(() => {
      router.push('/success')
      setIsSubmitting(false)
      setStep(1)
      setPaymentMode('prepaid')
    }, 300)
  }

  const handleOrderSubmit = async () => {
    setIsSubmitting(true)
    setFormError('')

    const generatedOrderId = 'BKC-' + Math.floor(100000 + Math.random() * 900000)
    const finalPrice = paymentMode === 'prepaid' ? product.prepaidPrice : product.codPrice
    const fullAddress = `${house}, ${area}${landmark ? `, Near ${landmark}` : ''}`

    const orderData = {
      order_id: generatedOrderId,
      product_name: product.title,
      payment_mode: paymentMode,
      total_amount: finalPrice,
      customer_name: name,
      customer_phone: phone,
      delivery_address: fullAddress,
      city: city,
      state: state,
      pincode: pincode,
      status: 'Order Received'
    }

    if (paymentMode === 'cod') {
      // Direct to finalize for COD
      await finalizeOrder(orderData)
    } else {
      // RAZORPAY FLOW
      const res = await loadRazorpayScript()
      if (!res) {
        setFormError("Failed to load payment gateway. Check your connection.")
        setIsSubmitting(false)
        return
      }

      // SECURE: Send product slug instead of amount to prevent tampering
      const data = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: product.slug }),
      }).then((t) => t.json())

      if (!data.id) {
        setFormError("Server error. Please try again.")
        setIsSubmitting(false)
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "BigKidFinds",
        description: product.title,
        order_id: data.id,
        prefill: { name: name, contact: phone },
        theme: { color: "#111827" },
        handler: async function (response) {
          // Success! Mark as Paid and finalize
          orderData.status = `Paid - ${response.razorpay_payment_id}`
          await finalizeOrder(orderData)
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.on('payment.failed', function (response) {
        setFormError("Payment failed or cancelled.")
        setIsSubmitting(false)
      })

      // If user closes window without paying
      paymentObject.on('modal.closed', function() {
         setIsSubmitting(false)
      })

      paymentObject.open()
    }
  }

  const codFee = product.codPrice - product.prepaidPrice
  const finalPrice = paymentMode === 'prepaid' ? product.prepaidPrice : product.codPrice

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[60] bg-primary/40 backdrop-blur-sm" />
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={slideSpring} className="fixed bottom-0 left-0 right-0 z-[70] mx-auto w-full max-w-md overflow-hidden rounded-t-[2.5rem] bg-surface shadow-2xl flex flex-col max-h-[90vh] pb-safe">

            <div className="flex items-center justify-between border-b border-border p-5 shrink-0">
              <button onClick={step === 1 ? onClose : () => setStep(step - 1)} className="flex items-center gap-1 text-secondary hover:text-primary transition-colors">
                <ChevronLeft size={18} strokeWidth={2.5} />
                <span className="text-sm font-medium">{step === 1 ? 'Close' : 'Back'}</span>
              </button>
              <div className="text-center">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Step {step} of 3</span>
                <h3 className="font-bold tracking-tight text-base text-primary">{step === 1 ? 'Payment' : step === 2 ? 'Address' : 'Review'}</h3>
              </div>
              <button onClick={onClose} className="rounded-full bg-background p-2 text-primary hover:bg-border transition-colors">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 hide-scrollbar">
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <label className={`relative flex cursor-pointer flex-col gap-1 rounded-2xl border-2 p-4 transition-all ${paymentMode === 'prepaid' ? 'border-primary bg-primary/5' : 'border-border bg-surface'}`}>
                    <input type="radio" name="payment" value="prepaid" checked={paymentMode === 'prepaid'} onChange={() => setPaymentMode('prepaid')} className="sr-only" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary flex items-center gap-2"><CreditCard size={18} /> Pay Online</span>
                      <span className="text-lg font-black text-primary">₹{product.prepaidPrice}</span>
                    </div>
                    <p className="text-xs text-secondary mt-1">UPI, Cards, NetBanking. Dispatched instantly.</p>
                    <div className="absolute -top-3 right-4 bg-primary text-surface text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Save ₹{codFee}</div>
                  </label>

                  {product.isCodAvailable && (
                    <label className={`flex cursor-pointer flex-col gap-1 rounded-2xl border-2 p-4 transition-all ${paymentMode === 'cod' ? 'border-primary bg-primary/5' : 'border-border bg-surface opacity-80'}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMode === 'cod'} onChange={() => setPaymentMode('cod')} className="sr-only" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary flex items-center gap-2"><Landmark size={18} /> Cash on Delivery</span>
                        <span className="text-lg font-bold text-primary">₹{product.codPrice}</span>
                      </div>
                      <p className="text-xs text-secondary mt-1">Pay with cash when package arrives.</p>
                      <div className="mt-2 text-[10px] font-medium text-secondary bg-background border border-border p-2.5 rounded-xl flex gap-2">
                        <ShieldCheck size={14} className="shrink-0 text-primary" /> Includes ₹{codFee} extra COD convenience fee.
                      </div>
                    </label>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <FormField label="Phone Number" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number" />
                  <FormField label="Full Name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your first and last name" />
                  <div className="grid grid-cols-2 gap-3 relative">
                    <FormField label="Pincode" id="pincode" type="tel" value={pincode} onChange={handlePincodeChange} placeholder="6-digit Pincode" />
                    {isLoadingPin && <Loader2 size={16} className="animate-spin absolute left-1/2 -ml-6 top-10 text-secondary" />}
                    <FormField label="City / District" id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                  </div>
                  {pinError && <span className="text-xs font-bold text-red-500">{pinError}</span>}
                  <FormField label="State" id="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                  <FormField label="House / Flat No, Building" id="house" value={house} onChange={(e) => setHouse(e.target.value)} placeholder="e.g., Flat 402, Royal Enclave" />
                  <FormField label="Street / Area / Locality" id="area" value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g., MG Road" />
                  <FormField label="Landmark" id="landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="e.g., Opp. Metro" optional />
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl border border-border p-4 bg-background flex flex-col gap-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-secondary">Ship To</h5>
                    <p className="text-sm font-bold">{name}</p>
                    <p className="text-xs text-secondary leading-relaxed font-medium">{house}, {area}, {landmark && `${landmark},`} {city}, {state} - {pincode}</p>
                    <p className="text-xs font-semibold text-secondary mt-1">Contact: {phone}</p>
                  </div>
                  <div className="flex flex-col gap-2 p-1">
                    <div className="flex justify-between text-sm font-medium text-secondary"><span>Items</span><span>₹{product.prepaidPrice}</span></div>
                    <div className="flex justify-between text-sm font-medium text-secondary"><span>Shipping Fee</span><span className="text-emerald-600 font-bold">FREE</span></div>
                    {paymentMode === 'cod' && (
                      <div className="flex justify-between text-sm font-medium text-secondary"><span>COD Fee</span><span>₹{codFee}</span></div>
                    )}
                    <hr className="border-border my-1" />
                    <div className="flex justify-between text-base font-black text-primary"><span>Total Amount</span><span>₹{finalPrice}</span></div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-secondary/70 bg-[#F3F4F6] p-3 rounded-xl">
                    By clicking below you agree to our Terms and authorize BigKidFinds to fulfill this delivery via our verified partners.
                  </p>
                </div>
              )}

              {formError && <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-500">{formError}</div>}
            </div>

            <div className="shrink-0 border-t border-border p-5 bg-surface pb-safe">
              {step < 3 ? (
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleNextStep} className="w-full rounded-2xl bg-primary h-14 flex items-center justify-center text-sm font-bold text-surface transition-transform gap-2">
                  Continue <ArrowRight size={16} />
                </motion.button>
              ) : (
                <motion.button disabled={isSubmitting} whileTap={!isSubmitting ? { scale: 0.97 } : {}} onClick={handleOrderSubmit} className="w-full rounded-2xl bg-primary h-14 flex items-center justify-center text-sm font-bold text-surface transition-transform disabled:opacity-80 disabled:cursor-not-allowed">
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (paymentMode === 'prepaid' ? `Pay Online • ₹${finalPrice}` : `Place COD Order • ₹${finalPrice}`)}
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
