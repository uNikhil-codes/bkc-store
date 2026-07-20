"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

export default function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const go = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  };

  return (
    <form
      onSubmit={go}
      role="search"
      className="rise rise-1 mt-7 flex h-14 w-full max-w-2xl items-center gap-3 rounded-full border border-black/[0.08] bg-surface pl-4 pr-2 transition-all focus-within:border-accent focus-within:shadow-[0_0_0_4px_rgba(0,113,227,0.12)]"
    >
      <Search size={18} strokeWidth={1.9} className="shrink-0 text-secondary" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search gadgets, decor, accessories..."
        aria-label="Search products"
        className="h-full min-w-0 flex-1 bg-transparent text-base font-medium text-primary outline-none placeholder:text-secondary/80"
      />
      <button
        type="submit"
        aria-label="Search"
        className="pressable flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-strong"
      >
        <ArrowRight size={18} strokeWidth={2.2} />
      </button>
    </form>
  );
}
