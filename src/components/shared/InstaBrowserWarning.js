"use client";
import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";

export default function InstaBrowserWarning() {
  const [isInstagramBrowser, setIsInstagramBrowser] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isInstagram = navigator.userAgent.includes("Instagram");
    const wasDismissed = sessionStorage.getItem("bkc_insta_notice_dismissed");
    setIsInstagramBrowser(isInstagram);
    setDismissed(Boolean(wasDismissed));
  }, []);

  const dismissNotice = () => {
    sessionStorage.setItem("bkc_insta_notice_dismissed", "true");
    setDismissed(true);
  };

  if (!isInstagramBrowser || dismissed) {
    return null;
  }

  return (
    <div className="relative z-[60] border-b border-white/10 bg-primary px-4 py-2.5 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 pr-7 text-center text-[11px] leading-4 sm:text-xs">
        <ExternalLink size={14} className="shrink-0 text-white/80" />
        <p>
          For the smoothest checkout, use Instagram’s menu and choose{" "}
          <span className="font-semibold text-white">Open in browser</span>.
        </p>
      </div>
      <button
        type="button"
        onClick={dismissNotice}
        aria-label="Dismiss browser notice"
        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={15} strokeWidth={2.2} />
      </button>
    </div>
  );
}
