"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  CreditCard,
  Landmark,
  Loader2,
  MapPin,
  PackageCheck,
  ShieldCheck,
  X
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { sendOrderAlert } from "@/actions/telegram";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), { once: true });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function FormField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  readOnly = false,
  optional = false,
  autoComplete,
  inputMode,
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-xs font-semibold text-secondary">
        {label}
        {optional && <span className="ml-1 font-normal text-secondary/60">(Optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={`field h-11 w-full rounded-xl px-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          readOnly ? "cursor-not-allowed bg-[#f5f5f7] text-secondary" : "bg-surface"
        }`}
      />
    </div>
  );
}

function StepIndicator({ currentStep }) {
  const steps = ["Payment", "Address", "Verify"];
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-label={`Step ${currentStep} of 3`}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-200 ${
                isComplete || isCurrent
                  ? "bg-primary text-white"
                  : "bg-[#e8e8ed] text-secondary"
              }`}
            >
              {isComplete ? <Check size={10} strokeWidth={3} /> : stepNumber}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-px w-6 transition-colors duration-200 ${
                  stepNumber < currentStep ? "bg-primary" : "bg-[#e8e8ed]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BuyDrawer({ isOpen, onClose, product }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [paymentMode, setPaymentMode] = useState("prepaid");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [isLoadingPin, setIsLoadingPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pinError, setPinError] = useState("");
  const [formError, setFormError] = useState("");

  const slideSpring = { type: "spring", damping: 32, stiffness: 340 };
  const codFee = Math.max(0, (product.codPrice || 0) - (product.prepaidPrice || 0));
  const finalPrice = paymentMode === "prepaid" ? product.prepaidPrice : product.codPrice;

  useEffect(() => {
    setFormError("");
  }, [step]);

  useEffect(() => {
    if (!isOpen) {
      setFormError("");
      setPinError("");
      setStep(1);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const handlePincodeChange = async (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);
    setPincode(value);
    setPinError("");
    if (value.length !== 6) return;
    setIsLoadingPin(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
      const data = await response.json();
      if (data?.[0]?.Status === "Success" && data?.[0]?.PostOffice?.[0]) {
        const postOffice = data[0].PostOffice[0];
        setCity(postOffice.District || postOffice.Block || "");
        setState(postOffice.State || "");
      } else {
        setPinError("Invalid PIN code. Please check and enter city/state manually.");
      }
    } catch {
      setPinError("Postal lookup unavailable. Please fill city and state.");
    } finally {
      setIsLoadingPin(false);
    }
  };

  const validateAddress = () => {
    if (!phone || phone.length !== 10) return "Please enter a valid 10-digit phone number.";
    if (!name.trim()) return "Full name is required.";
    if (!pincode || pincode.length !== 6) return "6-digit PIN code is required.";
    if (!city.trim() || !state.trim()) return "City and State are required.";
    if (!house.trim()) return "Flat/building number is required.";
    if (!area.trim()) return "Street/area details are required.";
    return "";
  };

  const handleNextStep = () => {
    setFormError("");
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      const error = validateAddress();
      if (error) {
        setFormError(error);
        return;
      }
      setStep(3);
    }
  };

  const finalizeOrder = async (orderData) => {
    const { error } = await supabase.from("orders").insert([orderData]);
    if (error) {
      setFormError("Could not save your order. If debited, contact our support team.");
      setIsSubmitting(false);
      return;
    }
    await sendOrderAlert(orderData);
    localStorage.setItem("bkc_recent_order", orderData.order_id);
    localStorage.setItem("bkc_recent_phone", orderData.customer_phone);
    onClose();
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(1);
      setPaymentMode("prepaid");
      router.push("/success");
    }, 250);
  };

  const handleOrderSubmit = async () => {
    setIsSubmitting(true);
    setFormError("");
    const generatedOrderId = "BKC-" + Math.floor(100000 + Math.random() * 900000);
    const fullAddress = `${house}, ${area}${landmark ? `, Near ${landmark}` : ""}`;

    const orderData = {
      order_id: generatedOrderId,
      product_name: product.title,
      payment_mode: paymentMode,
      total_amount: finalPrice,
      customer_name: name,
      customer_phone: phone,
      delivery_address: fullAddress,
      city,
      state,
      pincode,
      status: "Order Received",
    };

    if (paymentMode === "cod") {
      await finalizeOrder(orderData);
      return;
    }

    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) {
      setFormError("The payment gateway could not load. Please check your connection.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug }),
      });
      const data = await response.json();

      if (!response.ok || !data.id) {
        setFormError("Could not initiate payment. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "BKC Store",
      description: product.title,
      order_id: data.id,
      prefill: { name, contact: phone },
      theme: { color: "#1d1d1f" },
      // OFFICIAL RAZORPAY DISMISSAL METHOD
      modal: {
        ondismiss: function () {
          setIsSubmitting(false);
        }
      },
      handler: async function (paymentResponse) {
        orderData.status = `Paid - Razorpay Ref: ${paymentResponse.razorpay_payment_id}`;
        await finalizeOrder(orderData);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", () => {
      setFormError(
        "Your payment was not completed. No order has been placed — please try again."
      );
      setIsSubmitting(false);
    });

    // Hallucinated modal event listener removed entirely to prevent runtime issues
    paymentObject.open();
  } catch {
    setFormError("Something went wrong while starting payment. Please try again.");
    setIsSubmitting(false);
  }
};

  const heading = step === 1 ? "Payment Method" : step === 2 ? "Delivery Address" : "Review Order";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="Close checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[1px]"
          />

          {/* Sheet */}
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={slideSpring}
            className="fixed bottom-0 left-0 right-0 z-[70] mx-auto flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-[28px] bg-background shadow-[0_-12px_48px_rgba(0,0,0,0.15)]"
          >
            {/* Header */}
            <div className="shrink-0 border-b border-border/60 bg-surface px-5 py-4">
              <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-[#c7c7cc]" />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={step === 1 ? handleClose : () => setStep(step - 1)}
                  disabled={isSubmitting}
                  className="flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary transition-colors disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  {step === 1 ? "Cancel" : "Back"}
                </button>
                <div className="text-center">
                  <span id="checkout-title" className="block text-sm font-semibold text-primary">{heading}</span>
                  <span className="text-[10px] text-secondary">Step {step} of 3</span>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f2f4] text-secondary hover:bg-[#e5e5ea] transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="mt-3">
                <StepIndicator currentStep={step} />
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="hide-scrollbar flex-1 overflow-y-auto px-5 py-6">
              <div className="mx-auto max-w-md">

                {/* Step 1: Payment Selection */}
                {step === 1 && (
                  <div className="space-y-4">
                    {/* Prepaid selection card */}
                    <label
                      className={`relative block cursor-pointer rounded-2xl border p-4 transition-all ${
                        paymentMode === "prepaid"
                          ? "border-primary bg-primary/[0.02] ring-1 ring-primary"
                          : "border-border bg-surface hover:border-secondary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="prepaid"
                        checked={paymentMode === "prepaid"}
                        onChange={() => setPaymentMode("prepaid")}
                        className="sr-only"
                      />
                      <div className="flex gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                          <CreditCard size={18} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-primary">Pay Online (Secure)</p>
                            <p className="text-sm font-semibold text-primary">{formatPrice(product.prepaidPrice)}</p>
                          </div>
                          <p className="mt-1 text-xs text-secondary">
                            UPI, Google Pay, Cards, Netbanking via Razorpay.
                          </p>
                          {codFee > 0 && (
                            <span className="mt-2 inline-flex items-center rounded bg-[#e8f5ed] px-2 py-0.5 text-[10px] font-semibold text-[#147a3d]">
                              Save {formatPrice(codFee)} vs COD
                            </span>
                          )}
                        </div>
                      </div>
                    </label>

                    {/* COD selection card */}
                    {product.isCodAvailable && (
                      <label
                        className={`relative block cursor-pointer rounded-2xl border p-4 transition-all ${
                          paymentMode === "cod"
                            ? "border-primary bg-primary/[0.02] ring-1 ring-primary"
                            : "border-border bg-surface hover:border-secondary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMode === "cod"}
                          onChange={() => setPaymentMode("cod")}
                          className="sr-only"
                        />
                        <div className="flex gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f2f4] text-primary">
                            <Landmark size={18} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-primary">Cash on Delivery (COD)</p>
                              <p className="text-sm font-semibold text-primary">{formatPrice(product.codPrice)}</p>
                            </div>
                            <p className="mt-1 text-xs text-secondary">Pay at doorstep with cash or UPI on delivery.</p>
                            {codFee > 0 && (
                              <p className="mt-1.5 text-[10px] text-secondary">
                                Includes a {formatPrice(codFee)} courier handling surcharge.
                              </p>
                            )}
                          </div>
                        </div>
                      </label>
                    )}

                    <div className="flex gap-2.5 rounded-xl bg-[#f5f5f7] p-4 text-xs text-secondary mt-6">
                      <ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary" />
                      <p>
                        Your payment is fully secured. We do not store financial details.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Address Details */}
                {step === 2 && (
                  <div className="space-y-4">
                    <FormField
                      label="Mobile number"
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile number"
                      autoComplete="tel"
                      inputMode="numeric"
                    />
                    <FormField
                      label="Full name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Recipient's first and last name"
                      autoComplete="name"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <FormField
                          label="PIN code"
                          id="pincode"
                          type="tel"
                          value={pincode}
                          onChange={handlePincodeChange}
                          placeholder="6-digit PIN"
                          autoComplete="postal-code"
                          inputMode="numeric"
                        />
                        {isLoadingPin && (
                          <Loader2 size={16} className="absolute right-3 top-8 animate-spin text-secondary" />
                        )}
                      </div>
                      <FormField
                        label="City"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        autoComplete="address-level2"
                      />
                    </div>
                    {pinError && (
                      <p className="rounded-xl bg-[#fff2f0] px-3 py-2 text-xs font-medium text-[#b42318]">
                        {pinError}
                      </p>
                    )}
                    <FormField
                      label="State"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      autoComplete="address-level1"
                    />
                    <FormField
                      label="Flat, House No., Building"
                      id="house"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      placeholder="House / flat / building name"
                      autoComplete="address-line1"
                    />
                    <FormField
                      label="Street, Area, Locality"
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Street / area / locality"
                      autoComplete="address-line2"
                    />
                    <FormField
                      label="Nearby landmark"
                      id="landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="E.g., Opposite Metro Station"
                      optional
                    />
                  </div>
                )}

                {/* Step 3: Review Order Summary */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-surface p-4">
                      <p className="text-xs font-semibold text-secondary uppercase">Deliver To</p>
                      <p className="mt-2 text-sm font-semibold text-primary">{name}</p>
                      <p className="mt-1 text-xs text-secondary leading-5">
                        {house}, {area}
                        {landmark ? `, Near ${landmark}` : ""}
                        <br />
                        {city}, {state} — {pincode}
                      </p>
                      <p className="mt-2 text-xs font-medium text-secondary">{phone}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-surface p-4">
                      <p className="text-xs font-semibold text-secondary uppercase">Item Details</p>
                      <div className="mt-3 flex justify-between gap-4 text-sm font-semibold text-primary">
                        <span>{product.title}</span>
                        <span>{formatPrice(finalPrice)}</span>
                      </div>
                      <p className="mt-1 text-xs text-secondary">
                        Payment: {paymentMode === "prepaid" ? "Online Prepayment" : "Cash on Delivery (COD)"}
                      </p>

                      <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-secondary">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>{formatPrice(product.prepaidPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery</span>
                          <span className="text-[#147a3d] font-medium">Free</span>
                        </div>
                        {paymentMode === "cod" && codFee > 0 && (
                          <div className="flex justify-between">
                            <span>COD handling fee</span>
                            <span>{formatPrice(codFee)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-border pt-3 text-sm font-semibold text-primary">
                          <span>Order Total</span>
                          <span>{formatPrice(finalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formError && (
                  <div className="mt-4 rounded-xl bg-[#fff2f0] px-3.5 py-3 text-xs font-medium leading-5 text-[#b42318]">
                    {formError}
                  </div>
                )}

              </div>
            </div>

            {/* Bottom Sticky Action Button */}
            <div className="shrink-0 border-t border-border bg-surface px-5 py-4 pb-safe">
              {step < 3 ? (
                <motion.button
                  whileTap={{ scale: 0.985 }}
                  onClick={handleNextStep}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.985 }}
                  disabled={isSubmitting}
                  onClick={handleOrderSubmit}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-sm disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin text-white" />
                  ) : paymentMode === "prepaid" ? (
                    <span>Pay Securely & Place Order</span>
                  ) : (
                    <span>Place Order (COD)</span>
                  )}
                </motion.button>
              )}
              <p className="mt-2 text-center text-[10px] text-secondary">
                Secure SSL Encrypted Checkout • Hassle-Free Curation
              </p>
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
