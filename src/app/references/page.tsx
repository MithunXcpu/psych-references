"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Film, Tv, Music, BookOpen, User, Clock, ExternalLink } from "lucide-react";
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
  movie: "bg-blue-500/15 text-blue-400",
  tv: "bg-purple-500/15 text-purple-400",
  music: "bg-pink-500/15 text-pink-400",
  celebrity: "bg-amber-500/15 text-amber-400",
  history: "bg-orange-500/15 text-orange-400",
  other: "bg-gray-500/15 text-gray-400",
};

const borderClasses: Record<string, string> = {
  movie: "border-l-movie",
  tv: "border-l-tv",
  music: "border-l-music",
  celebrity: "border-l-celebrity",
  history: "border-l-history",
  other: "border-l-other",
};

export default function ReferencesPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [showCount, setShowCount] = useState(100);
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

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allRefs.length };
    allRefs.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [allRefs]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="group inline-block">
          <h1 className="text-3xl font-bold">
            All <span className="text-psych-yellow">References</span>
            <span className="pineapple-reveal ml-2 text-xl">🍍</span>
          </h1>
        </div>
        <p className="mt-2 text-muted">
          {allRefs.length.toLocaleString()} pop culture references across all episodes
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setFilter(cat.key);
              setShowCount(100);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              filter === cat.key
                ? "bg-psych-green text-black shadow-lg shadow-psych-green/20"
                : "border border-white/10 text-muted hover:border-psych-green/40 hover:text-white"
            }`}
          >
            {cat.icon} {cat.label}
            <span className={`ml-1 ${filter === cat.key ? "text-black/60" : "text-muted/50"}`}>
              {categoryCounts[cat.key] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mt-4">
        <div className="glass-card flex items-center gap-3 rounded-xl px-4 py-3">
          <Search size={18} className="text-muted" />
          <input
            type="text"
            placeholder="Search references..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowCount(100);
            }}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 text-sm text-muted">{filtered.length.toLocaleString()} results</div>

      <div className="mt-4 space-y-3">
        {filtered.slice(0, showCount).map((ref, i) => (
          <motion.div
            key={`${ref.episodeSlug}-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.min(i * 0.01, 0.3) }}
            className={`glass-card rounded-xl p-4 ${borderClasses[ref.category] || borderClasses.other}`}
          >
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`rounded-full px-2 py-0.5 ${
                  categoryColors[ref.category] || categoryColors.other
                }`}
              >
                {ref.category}
              </span>
              <Link
                href={`/episodes/${ref.episodeSlug}`}
                className="text-psych-green transition-colors hover:text-psych-green-light hover:underline"
              >
                S{ref.season}E{ref.episode} — {ref.episodeTitle}
              </Link>
            </div>
            <p className="mt-2 text-sm font-semibold text-psych-yellow">{ref.reference}</p>
            <p className="mt-1 text-sm italic text-white/80">&quot;{ref.quote}&quot;</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{ref.explanation}</p>
            {ref.link && (
              <a
                href={ref.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-psych-green transition-colors hover:text-psych-green-light"
              >
                Learn more <ExternalLink size={11} />
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {filtered.length > showCount && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowCount((c) => c + 100)}
            className="rounded-xl border border-psych-green/30 bg-psych-green/5 px-6 py-3 text-sm font-medium text-psych-green transition-all hover:border-psych-green/50 hover:bg-psych-green/10"
          >
            Show more ({filtered.length - showCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
