"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Tv, BookOpen, Music, Film } from "lucide-react";
import { useState, useMemo } from "react";
import { allEpisodes } from "@/data/episodes";
import { SEASONS } from "@/data/types";

const totalRefs = allEpisodes.reduce((sum, ep) => sum + ep.references.length, 0);

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredEpisodes = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allEpisodes
      .filter(
        (ep) =>
          ep.title.toLowerCase().includes(q) ||
          ep.synopsis.toLowerCase().includes(q) ||
          ep.references.some(
            (r) =>
              r.reference.toLowerCase().includes(q) ||
              r.quote.toLowerCase().includes(q)
          )
      )
      .slice(0, 8);
  }, [query]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        {/* Background gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-1/4 h-72 w-72 rounded-full bg-psych-green/8 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-psych-yellow/6 blur-3xl" />
        </div>

        {/* SVG Silhouettes - Shawn & Gus */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-[0.04]">
          <svg
            viewBox="0 0 800 500"
            className="h-full w-full max-w-4xl"
            fill="currentColor"
          >
            {/* Gus - left figure, arms crossed */}
            <g transform="translate(200,60)">
              <ellipse cx="80" cy="50" rx="30" ry="35" />
              <rect x="50" y="80" width="60" height="100" rx="15" />
              <rect x="25" y="95" width="35" height="15" rx="7" />
              <rect x="100" y="95" width="35" height="15" rx="7" />
              <rect x="55" y="175" width="22" height="110" rx="8" />
              <rect x="83" y="175" width="22" height="110" rx="8" />
              <rect x="50" y="280" width="28" height="12" rx="4" />
              <rect x="82" y="280" width="28" height="12" rx="4" />
            </g>
            {/* Shawn - right figure, pointing */}
            <g transform="translate(440,40)">
              <ellipse cx="80" cy="50" rx="30" ry="35" />
              <rect x="50" y="80" width="60" height="105" rx="15" />
              <rect x="108" y="85" width="70" height="14" rx="7" transform="rotate(-30, 108, 92)" />
              <rect x="20" y="100" width="35" height="14" rx="7" transform="rotate(15, 20, 107)" />
              <rect x="55" y="180" width="22" height="115" rx="8" />
              <rect x="83" y="180" width="22" height="115" rx="8" />
              <rect x="50" y="290" width="28" height="12" rx="4" />
              <rect x="82" y="290" width="28" height="12" rx="4" />
              {/* Finger pointing up - "psychic" pose */}
              <circle cx="170" cy="58" r="5" />
            </g>
            {/* Magnifying glass */}
            <g transform="translate(550, 50)" opacity="0.6">
              <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="4" />
              <line x1="32" y1="32" x2="48" y2="48" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="group inline-block">
            <h1 className="text-5xl font-bold md:text-7xl">
              <span className="text-psych-green">Psych</span>
              <span className="pineapple-reveal mx-1 text-3xl md:text-5xl">🍍</span>
              <span className="text-psych-yellow">Ref</span>
            </h1>
          </div>
          <p className="mt-4 text-lg text-muted md:text-xl">
            Every Reference. Every Episode. Explained.
          </p>
          <p className="mt-2 text-sm text-muted/60">
            The complete guide to pop culture references in Psych (2006-2014)
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative mx-auto mt-10 max-w-lg"
        >
          <div className="glass-card flex items-center gap-3 rounded-xl px-4 py-3">
            <Search size={18} className="text-muted" />
            <input
              type="text"
              placeholder="Search episodes, references, quotes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
          {filteredEpisodes.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/5 bg-surface shadow-2xl shadow-black/50">
              {filteredEpisodes.map((ep) => (
                <Link
                  key={ep.slug}
                  href={`/episodes/${ep.slug}`}
                  className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-white/5"
                >
                  <span>
                    <span className="text-psych-green">
                      S{ep.season}E{ep.episode}
                    </span>{" "}
                    {ep.title}
                  </span>
                  <span className="text-xs text-muted">{ep.references.length} refs</span>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-psych-green/5 via-transparent to-psych-yellow/5" />
        <div className="relative mx-auto grid max-w-4xl grid-cols-3 divide-x divide-white/5 py-8 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="text-3xl font-bold text-psych-green">{allEpisodes.length}</div>
            <div className="mt-1 text-xs text-muted">Episodes</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="text-3xl font-bold text-psych-yellow">{totalRefs.toLocaleString()}</div>
            <div className="mt-1 text-xs text-muted">References</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <div className="text-3xl font-bold text-white">8</div>
            <div className="mt-1 text-xs text-muted">Seasons</div>
          </motion.div>
        </div>
      </section>

      {/* Seasons Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold">Browse by Season</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEASONS.map((season, i) => {
            const episodes = allEpisodes.filter((e) => e.season === season.number);
            const refs = episodes.reduce((sum, e) => sum + e.references.length, 0);
            return (
              <motion.div
                key={season.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/seasons/${season.number}`}
                  className="glass-card group block rounded-xl p-6 transition-all hover:glow-green"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-psych-green">S{season.number}</div>
                    <div className="rounded-full bg-psych-yellow/10 px-2.5 py-1 text-xs font-semibold text-psych-yellow">
                      {refs}
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-muted">{season.year}</div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span>{episodes.length} episodes</span>
                    <span className="text-psych-green opacity-0 transition-opacity group-hover:opacity-100">
                      Explore →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Fan Favorites */}
      <section className="relative border-t border-white/5 px-6 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold">Fan Favorites</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allEpisodes
              .filter((e) => e.references.length >= 3)
              .slice(0, 6)
              .map((ep, i) => (
                <motion.div
                  key={ep.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/episodes/${ep.slug}`}
                    className="glass-card group block rounded-xl p-5 transition-all"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="rounded bg-psych-green/15 px-2 py-0.5 text-psych-green">
                        S{ep.season}E{ep.episode}
                      </span>
                      <span>{ep.airDate}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-psych-yellow">
                      {ep.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{ep.synopsis}</p>
                    <div className="mt-3 text-xs font-medium text-psych-yellow">
                      {ep.references.length} references →
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-6xl text-psych-green/20">&ldquo;</div>
          <p className="mx-auto max-w-md -mt-6 text-xl italic text-muted">
            I&apos;ve heard it both ways.
          </p>
          <p className="mt-3 text-sm font-medium text-psych-green">— Shawn Spencer</p>
        </motion.div>
      </section>
    </div>
  );
}
