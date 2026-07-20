"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { sendRequestAlert } from "@/actions/telegram";

export default function RequestPage() {
  const [itemQuery, setItemQuery] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const item = urlParams.get("item");
    if (item) {
      setItemQuery(item);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!itemQuery.trim() || !contact.trim()) {
      setErrorMsg("Please describe the product and add a way for us to contact you.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg("");
    const requestData = {
      item_query: itemQuery.trim(),
      contact_info: contact.trim(),
    };
    const { error } = await supabase
      .from("product_requests")
      .insert([requestData]);
    if (error) {
      setErrorMsg(
        "We could not send your request right now. Please check your connection and try again."
      );
      setIsSubmitting(false);
      return;
    }
    await sendRequestAlert(requestData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-[72vh] items-center justify-center px-4 py-10">
        <motion.section
          initial={{ opacity: 0, y: 14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="w-full max-w-md rounded-[28px] border border-border bg-surface px-6 py-10 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
            <Check size={30} strokeWidth={2.5} />
          </div>
          <p className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-primary">
            Request received.
          </p>
          <p className="mt-3 text-sm leading-6 text-secondary">
            We’ll review what you’re looking for. If we can source a
            high-quality option, we’ll contact you with the details.
          </p>
          <Link
            href="/"
            className="pressable mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
          >
            Return to store
            <ArrowRight size={16} strokeWidth={2.2} />
          </Link>
        </motion.section>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[75vh] max-w-xl px-4 py-9 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-lg text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to store
      </Link>

      <section className="rise mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
          Can’t find it?
        </p>
        <h1 className="mt-2 text-[34px] font-semibold leading-[1.08] tracking-[-0.055em] text-primary sm:text-4xl">
          Ask us to find it.
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-secondary">
          Found something interesting on Instagram, YouTube, or anywhere else?
          Paste a link or describe it. We’ll check whether we can source it.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="rise rise-1 mt-8 rounded-[24px] border border-border bg-surface p-5 sm:p-6"
      >
        <div>
          <label
            htmlFor="item-request"
            className="mb-1.5 block text-xs font-medium text-secondary"
          >
            What are you looking for?
          </label>
          <textarea
            id="item-request"
            required
            rows="4"
            value={itemQuery}
            onChange={(event) => setItemQuery(event.target.value)}
            placeholder="Paste an Instagram Reel link, product link, or describe what you want..."
            className="field min-h-[118px] resize-y"
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="request-contact"
            className="mb-1.5 block text-xs font-medium text-secondary"
          >
            Phone number or email
          </label>
          <input
            id="request-contact"
            type="text"
            required
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="So we can update you if we find it"
            className="field"
          />
          <p className="mt-2 text-[11px] leading-5 text-secondary">
            We’ll only use this to respond to this request.
          </p>
        </div>
        {errorMsg && (
          <p
            role="alert"
            className="mt-5 rounded-[14px] border border-[#fecdca] bg-error-soft px-3.5 py-3 text-xs font-medium leading-5 text-error"
          >
            {errorMsg}
          </p>
        )}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={!isSubmitting ? { scale: 0.985 } : {}}
          className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-55"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending request…
            </>
          ) : (
            <>
              Send request
              <ArrowRight size={17} strokeWidth={2.2} />
            </>
          )}
        </motion.button>
      </form>

      <div className="rise rise-2 mt-5 flex items-start gap-2.5 rounded-[16px] bg-[#f1f2f4] px-4 py-3.5">
        <Sparkles
          size={17}
          strokeWidth={1.8}
          className="mt-0.5 shrink-0 text-primary"
        />
        <p className="text-xs leading-5 text-secondary">
          Requests are reviewed individually. We’ll only share options we feel
          are worth considering.
        </p>
      </div>
      <div className="mt-4 flex items-start gap-2.5 px-1">
        <ShieldCheck
          size={16}
          strokeWidth={1.8}
          className="mt-0.5 shrink-0 text-primary"
        />
        <p className="text-[11px] leading-5 text-secondary">
          Your contact details are used only for this sourcing request.
        </p>
      </div>
    </div>
  );
}
