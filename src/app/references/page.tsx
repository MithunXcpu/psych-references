"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Film, Tv, Music, BookOpen, User, Clock } from "lucide-react";
import { getAllReferences } from "@/data/episodes";

const categories = [
  { key: "all", label: "All", icon: <BookOpen size={14} /> },
  { key: "movie", label: "Movies", icon: <Film size={14} /> },
  { key: "tv", label: "TV Shows", icon: <Tv size={14} /> },
  { key: "music", label: "Music", icon: <Music size={14} /> },
  { key: "celebrity", label: "Celebrities", icon: <User size={14} /> },
  { key: "history", label: "History", icon: <Clock size={14} /> },
  { key: "other", label: "Other", icon: <BookOpen size={14} /> },
] as const;

const categoryColors: Record<string, string> = {
  movie: "bg-blue-500/20 text-blue-400",
  tv: "bg-purple-500/20 text-purple-400",
  music: "bg-pink-500/20 text-pink-400",
  celebrity: "bg-amber-500/20 text-amber-400",
  history: "bg-orange-500/20 text-orange-400",
  other: "bg-gray-500/20 text-gray-400",
};

export default function ReferencesPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const allRefs = useMemo(() => getAllReferences(), []);

  const filtered = useMemo(() => {
    let refs = allRefs;
    if (filter !== "all") {
      refs = refs.filter((r) => r.category === filter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      refs = refs.filter(
        (r) =>
          r.reference.toLowerCase().includes(q) ||
          r.quote.toLowerCase().includes(q) ||
          r.explanation.toLowerCase().includes(q)
      );
    }
    return refs;
  }, [allRefs, filter, query]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          All <span className="text-psych-yellow">References</span>
        </h1>
        <p className="mt-2 text-muted">
          {allRefs.length} pop culture references across all episodes
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === cat.key
                ? "bg-psych-green text-black"
                : "border border-border text-muted hover:border-psych-green hover:text-white"
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <Search size={18} className="text-muted" />
        <input
          type="text"
          placeholder="Search references..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      {/* Results */}
      <div className="mt-6 text-sm text-muted">{filtered.length} results</div>

      <div className="mt-4 space-y-3">
        {filtered.slice(0, 50).map((ref, i) => (
          <motion.div
            key={`${ref.episodeSlug}-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.min(i * 0.02, 0.5) }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className={`rounded-full px-2 py-0.5 ${categoryColors[ref.category] || categoryColors.other}`}>
                {ref.category}
              </span>
              <Link
                href={`/episodes/${ref.episodeSlug}`}
                className="text-psych-green hover:underline"
              >
                S{ref.season}E{ref.episode} — {ref.episodeTitle}
              </Link>
            </div>
            <p className="mt-2 text-sm font-semibold text-psych-yellow">{ref.reference}</p>
            <p className="mt-1 text-sm italic text-white/80">&quot;{ref.quote}&quot;</p>
            <p className="mt-1 text-sm text-muted">{ref.explanation}</p>
          </motion.div>
        ))}
      </div>

      {filtered.length > 50 && (
        <p className="mt-6 text-center text-sm text-muted">
          Showing first 50 of {filtered.length} results. Refine your search to see more.
        </p>
      )}
    </div>
  );
}
