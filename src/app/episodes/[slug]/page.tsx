"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Film,
  Tv,
  Music,
  BookOpen,
  User,
  Clock,
  ExternalLink,
  FileText,
} from "lucide-react";
import { getEpisodeBySlug, allEpisodes } from "@/data/episodes";

const categoryConfig: Record<
  string,
  { label: string; color: string; icon: React.ReactNode; borderClass: string }
> = {
  movie: { label: "Movie", color: "bg-blue-500/15 text-blue-400", icon: <Film size={12} />, borderClass: "border-l-movie" },
  tv: { label: "TV", color: "bg-purple-500/15 text-purple-400", icon: <Tv size={12} />, borderClass: "border-l-tv" },
  music: { label: "Music", color: "bg-pink-500/15 text-pink-400", icon: <Music size={12} />, borderClass: "border-l-music" },
  celebrity: { label: "Celebrity", color: "bg-amber-500/15 text-amber-400", icon: <User size={12} />, borderClass: "border-l-celebrity" },
  history: { label: "History", color: "bg-orange-500/15 text-orange-400", icon: <Clock size={12} />, borderClass: "border-l-history" },
  other: { label: "Other", color: "bg-gray-500/15 text-gray-400", icon: <BookOpen size={12} />, borderClass: "border-l-other" },
};

function getTranscriptUrl(slug: string) {
  const formatted = slug.replace(/-/g, "_");
  return `https://psychusa.fandom.com/wiki/${encodeURIComponent(slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("_"))}`;
}

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

  // Prev/Next navigation
  const currentIndex = allEpisodes.findIndex((e) => e.slug === slug);
  const prevEp = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null;
  const nextEp = currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href={`/seasons/${episode.season}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-psych-green"
      >
        <ArrowLeft size={16} /> Season {episode.season}
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-psych-green/15 px-3 py-1 text-sm font-semibold text-psych-green">
            S{episode.season}E{episode.episode}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted">
            <Calendar size={14} /> {episode.airDate}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">{episode.title}</h1>
        <p className="mt-4 leading-relaxed text-muted">{episode.synopsis}</p>

        {/* Transcript link */}
        <a
          href={getTranscriptUrl(episode.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-psych-green/20 bg-psych-green/5 px-4 py-2 text-sm text-psych-green transition-all hover:border-psych-green/40 hover:bg-psych-green/10"
        >
          <FileText size={14} />
          Read Full Transcript
          <ExternalLink size={12} />
        </a>
      </motion.div>

      {/* References */}
      <div className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="text-psych-yellow">{episode.references.length}</span> Pop Culture
          References
        </h2>

        <div className="mt-6 space-y-4">
          {episode.references.map((ref, i) => {
            const config = categoryConfig[ref.category] || categoryConfig.other;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`glass-card rounded-xl p-5 ${config.borderClass}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${config.color}`}
                      >
                        {config.icon} {config.label}
                      </span>
                    </div>
                    <p className="mt-2 italic text-white/90">&quot;{ref.quote}&quot;</p>
                    <p className="mt-2 text-sm font-semibold text-psych-yellow">{ref.reference}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{ref.explanation}</p>
                    {ref.link && (
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-psych-green transition-colors hover:text-psych-green-light"
                      >
                        Learn more <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Prev / Next */}
      <div className="mt-12 flex items-stretch gap-4">
        {prevEp ? (
          <Link
            href={`/episodes/${prevEp.slug}`}
            className="glass-card flex flex-1 items-center gap-3 rounded-xl p-4 transition-all hover:border-psych-green/30"
          >
            <ArrowLeft size={16} className="shrink-0 text-muted" />
            <div className="min-w-0">
              <div className="text-xs text-muted">Previous</div>
              <div className="truncate text-sm font-medium">{prevEp.title}</div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextEp ? (
          <Link
            href={`/episodes/${nextEp.slug}`}
            className="glass-card flex flex-1 items-center justify-end gap-3 rounded-xl p-4 text-right transition-all hover:border-psych-green/30"
          >
            <div className="min-w-0">
              <div className="text-xs text-muted">Next</div>
              <div className="truncate text-sm font-medium">{nextEp.title}</div>
            </div>
            <ArrowRight size={16} className="shrink-0 text-muted" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Hidden pineapple */}
      <div className="mt-16 text-center">
        <div className="group inline-block cursor-default">
          <span
            className="inline-block text-lg transition-transform group-hover:scale-150"
            title="You found the pineapple!"
          >
            🍍
          </span>
          <p className="mt-1 h-4 text-xs text-psych-green opacity-0 transition-opacity group-hover:opacity-100">
            You found the pineapple!
          </p>
        </div>
      </div>
    </div>
  );
}
