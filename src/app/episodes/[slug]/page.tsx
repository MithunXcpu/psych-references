"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Film, Tv, Music, BookOpen, User, Clock } from "lucide-react";
import { getEpisodeBySlug } from "@/data/episodes";

const categoryConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  movie: { label: "Movie", color: "bg-blue-500/20 text-blue-400", icon: <Film size={12} /> },
  tv: { label: "TV", color: "bg-purple-500/20 text-purple-400", icon: <Tv size={12} /> },
  music: { label: "Music", color: "bg-pink-500/20 text-pink-400", icon: <Music size={12} /> },
  celebrity: { label: "Celebrity", color: "bg-amber-500/20 text-amber-400", icon: <User size={12} /> },
  history: { label: "History", color: "bg-orange-500/20 text-orange-400", icon: <Clock size={12} /> },
  other: { label: "Other", color: "bg-gray-500/20 text-gray-400", icon: <BookOpen size={12} /> },
};

export default function EpisodePage() {
  const params = useParams();
  const slug = params.slug as string;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Episode not found</h1>
          <Link href="/" className="mt-4 inline-block text-psych-green hover:underline">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href={`/seasons/${episode.season}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-white"
      >
        <ArrowLeft size={16} /> Season {episode.season}
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <span className="rounded bg-psych-green/20 px-3 py-1 text-sm font-medium text-psych-green">
            S{episode.season}E{episode.episode}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted">
            <Calendar size={14} /> {episode.airDate}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">{episode.title}</h1>
        <p className="mt-4 text-muted">{episode.synopsis}</p>
      </motion.div>

      {/* References */}
      <div className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="text-psych-yellow">{episode.references.length}</span> Pop Culture References
        </h2>

        <div className="mt-6 space-y-4">
          {episode.references.map((ref, i) => {
            const config = categoryConfig[ref.category] || categoryConfig.other;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${config.color}`}>
                        {config.icon} {config.label}
                      </span>
                    </div>
                    <p className="mt-2 italic text-white/90">&quot;{ref.quote}&quot;</p>
                    <p className="mt-2 text-sm font-semibold text-psych-yellow">{ref.reference}</p>
                    <p className="mt-2 text-sm text-muted">{ref.explanation}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Hidden pineapple */}
      <div className="mt-16 text-center">
        <span className="cursor-default text-xs text-base select-none" title="You found the pineapple!">
          🍍
        </span>
      </div>
    </div>
  );
}
