"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const timeline = [
  {
    key: "processing",
    label: "Order confirmed",
    description: "Your order has been received and is being prepared.",
    icon: Clock3,
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order has been handed to a delivery partner.",
    icon: Package,
  },
  {
    key: "out_for_delivery",
    label: "Out for delivery",
    description: "Your package is on its way to you.",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Your order has been marked as delivered.",
    icon: CheckCircle2,
  },
];

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [recentOrder, setRecentOrder] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailOrderId = urlParams.get("id");
    const savedOrder = localStorage.getItem("bkc_recent_order");
    const savedPhone = localStorage.getItem("bkc_recent_phone");
    if (emailOrderId) {
      setOrderId(emailOrderId.toUpperCase());
    } else if (savedOrder) {
      setOrderId(savedOrder);
    }
    if (savedPhone) {
      setPhone(savedPhone);
    }
    // The welcome-back card: this device has placed an order before
    if (savedOrder && savedPhone) {
      setRecentOrder({ id: savedOrder, phone: savedPhone });
    }
  }, []);

  const getStatusIndex = (status) =>
    timeline.findIndex((timelineItem) => timelineItem.key === status);

  const runLookup = async (idToFind, phoneToFind) => {
    setIsSearching(true);
    setTrackingResult(null);
    setErrorMessage("");
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", idToFind.trim().toUpperCase())
      .eq("customer_phone", phoneToFind)
      .single();
    setIsSearching(false);
    if (error || !data) {
      setErrorMessage(
        "We couldn’t find an order with these details. Please check your Order ID and phone number."
      );
      return;
    }
    const databaseStatus = (data.status || "").toLowerCase();
    let mappedStatus = "processing";
    if (databaseStatus.includes("shipped")) {
      mappedStatus = "shipped";
    }
    if (databaseStatus.includes("out")) {
      mappedStatus = "out_for_delivery";
    }
    if (databaseStatus.includes("delivered")) {
      mappedStatus = "delivered";
    }
    setTrackingResult({
      id: data.order_id,
      status: mappedStatus,
      expectedDate: "5–7 days from your order date",
      items: data.product_name,
      customerName: data.customer_name,
      city: data.city,
      state: data.state,
    });
  };

  const handleTrack = (event) => {
    event.preventDefault();
    if (!orderId.trim() || phone.length !== 10) {
      setErrorMessage(
        "Enter your order ID and the 10-digit phone number used at checkout."
      );
      return;
    }
    runLookup(orderId, phone);
  };

  const activeIndex = trackingResult
    ? getStatusIndex(trackingResult.status)
    : -1;

  return (
    <div className="mx-auto min-h-[75vh] max-w-xl px-4 py-9 sm:py-12">
      <section className="rise">
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-secondary">
          Delivery updates
        </p>
        <h1 className="mt-2 text-[34px] font-semibold leading-[1.08] tracking-[-0.055em] text-primary sm:text-4xl">
          Track your order.
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-secondary">
          Enter the Order ID and mobile number used during checkout to see the
          current delivery status.
        </p>
      </section>

      {/* WELCOME BACK — returning buyer sees their recent order instantly,
          one tap instead of retyping two fields */}
      {recentOrder && !trackingResult && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 300, damping: 26 }}
          onClick={() => runLookup(recentOrder.id, recentOrder.phone)}
          disabled={isSearching}
          className="rise rise-1 mt-7 flex w-full items-center gap-4 rounded-[20px] border border-border bg-surface p-4 text-left transition-colors hover:border-[#a1a1a6] disabled:opacity-60"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Package size={20} strokeWidth={1.9} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">
              Welcome back — your recent order
            </span>
            <span className="mt-1 block text-sm font-semibold text-primary">
              {recentOrder.id}
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand">
            {isSearching ? "Checking…" : "View live status"}
            <ArrowRight size={15} strokeWidth={2.2} />
          </span>
        </motion.button>
      )}

      <form
        onSubmit={handleTrack}
        className="rise rise-2 mt-7 rounded-[24px] border border-border bg-surface p-5 sm:p-6"
      >
        <div>
          <label
            htmlFor="order-id"
            className="mb-1.5 block text-xs font-medium text-secondary"
          >
            Order ID
          </label>
          <input
            id="order-id"
            type="text"
            required
            value={orderId}
            onChange={(event) =>
              setOrderId(event.target.value.toUpperCase())
            }
            placeholder="e.g. BKC-123456"
            autoComplete="off"
            className="field uppercase"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="order-phone"
            className="mb-1.5 block text-xs font-medium text-secondary"
          >
            Mobile number
          </label>
          <input
            id="order-phone"
            type="tel"
            required
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="10-digit number used at checkout"
            inputMode="numeric"
            autoComplete="tel"
            className="field"
          />
        </div>
        {errorMessage && (
          <p
            role="alert"
            className="mt-5 rounded-[14px] border border-[#fecdca] bg-error-soft px-3.5 py-3 text-xs font-medium leading-5 text-error"
          >
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={isSearching}
          className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-55"
        >
          {isSearching ? (
            <>
              <Clock3 size={18} className="animate-pulse" />
              Looking up your order…
            </>
          ) : (
            <>
              <Search size={18} strokeWidth={2.1} />
              Track order
            </>
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {trackingResult && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            className="mt-6 overflow-hidden rounded-[24px] border border-border bg-surface"
          >
            <div className="border-b border-border bg-[#f8f8fa] px-5 py-5 sm:px-6">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
                Order {trackingResult.id}
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.035em] text-primary">
                {timeline[activeIndex]?.label || "Order confirmed"}
              </p>
              <p className="mt-1 text-sm leading-5 text-secondary">
                {timeline[activeIndex]?.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-secondary">
                <Clock3 size={15} strokeWidth={1.8} className="text-primary" />
                Estimated delivery:{" "}
                <span className="font-medium text-primary">
                  {trackingResult.expectedDate}
                </span>
              </div>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <ol className="relative space-y-0">
                {timeline.map((item, index) => {
                  const isComplete = index <= activeIndex;
                  const isCurrent = index === activeIndex;
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.key}
                      className="relative flex gap-4 pb-7 last:pb-0"
                    >
                      {index < timeline.length - 1 && (
                        <span
                          className={`absolute left-[17px] top-9 h-[calc(100%-18px)] w-px ${
                            index < activeIndex ? "bg-brand" : "bg-border"
                          }`}
                        />
                      )}
                      <span
                        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                          isComplete
                            ? "border-brand bg-brand text-white"
                            : "border-border bg-surface text-secondary"
                        }`}
                      >
                        <Icon
                          size={17}
                          strokeWidth={isCurrent ? 2.3 : 1.8}
                        />
                      </span>
                      <div className="pt-1">
                        <p
                          className={`text-sm font-medium ${
                            isComplete ? "text-primary" : "text-secondary"
                          }`}
                        >
                          {item.label}
                        </p>
                        {isCurrent && (
                          <p className="mt-1 text-xs leading-5 text-secondary">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-7 border-t border-border pt-5">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
                  Your item
                </p>
                <p className="mt-2 text-sm font-semibold text-primary">
                  {trackingResult.items}
                </p>
                {trackingResult.city && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-secondary">
                    <MapPin size={14} strokeWidth={1.8} />
                    Delivering to {trackingResult.city}
                    {trackingResult.state ? `, ${trackingResult.state}` : ""}
                  </p>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-start gap-2.5 rounded-[16px] bg-[#f1f2f4] px-4 py-3.5">
        <ShieldCheck
          size={17}
          strokeWidth={1.8}
          className="mt-0.5 shrink-0 text-primary"
        />
        <p className="text-xs leading-5 text-secondary">
          We use your order ID and mobile number only to securely retrieve your
          delivery details.
        </p>
      </div>
    </div>
  );
}
