"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Tv, BookOpen, Music, Film } from "lucide-react";
import { useState, useMemo } from "react";
import { allEpisodes } from "@/data/episodes";
import { SEASONS } from "@/data/types";

const totalRefs = allEpisodes.reduce((sum, ep) => sum + ep.references.length, 0);

const categoryIcons: Record<string, React.ReactNode> = {
  movie: <Film size={16} />,
  tv: <Tv size={16} />,
  music: <Music size={16} />,
  other: <BookOpen size={16} />,
};

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
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-psych-green/10 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl"
        >
          <h1 className="text-5xl font-bold md:text-7xl">
            <span className="text-psych-green">Psych</span>
            <span className="text-psych-yellow">Ref</span>
          </h1>
          <p className="mt-4 text-lg text-muted md:text-xl">
            Every Reference. Every Episode. Explained.
          </p>
          <p className="mt-2 text-sm text-muted">
            The complete guide to pop culture references in Psych (2006–2014)
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative mx-auto mt-10 max-w-lg"
        >
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
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
            <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-border bg-card shadow-xl">
              {filteredEpisodes.map((ep) => (
                <Link
                  key={ep.slug}
                  href={`/episodes/${ep.slug}`}
                  className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-card-hover"
                >
                  <span>
                    <span className="text-psych-green">S{ep.season}E{ep.episode}</span>{" "}
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
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-border py-6 text-center">
          <div>
            <div className="text-2xl font-bold text-psych-green">{allEpisodes.length}</div>
            <div className="text-xs text-muted">Episodes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-psych-yellow">{totalRefs}</div>
            <div className="text-xs text-muted">References</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-xs text-muted">Seasons</div>
          </div>
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
                  className="block rounded-xl border border-border bg-card p-6 transition-colors hover:border-psych-green hover:bg-card-hover"
                >
                  <div className="text-3xl font-bold text-psych-green">S{season.number}</div>
                  <div className="mt-1 text-sm text-muted">{season.year}</div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted">
                    <span>{episodes.length} episodes</span>
                    <span>{refs} references</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Episodes */}
      <section className="border-t border-border bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold">Fan Favorites</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allEpisodes
              .filter((e) => e.references.length >= 3)
              .slice(0, 6)
              .map((ep) => (
                <Link
                  key={ep.slug}
                  href={`/episodes/${ep.slug}`}
                  className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-psych-yellow hover:bg-card-hover"
                >
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="rounded bg-psych-green/20 px-2 py-0.5 text-psych-green">
                      S{ep.season}E{ep.episode}
                    </span>
                    <span>{ep.airDate}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{ep.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{ep.synopsis}</p>
                  <div className="mt-3 text-xs text-psych-yellow">
                    {ep.references.length} references →
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* I've heard it both ways */}
      <section className="px-6 py-16 text-center">
        <p className="text-lg italic text-muted">
          &quot;I&apos;ve heard it both ways.&quot;
        </p>
        <p className="mt-2 text-sm text-psych-green">— Shawn Spencer</p>
      </section>
    </div>
  );
}
