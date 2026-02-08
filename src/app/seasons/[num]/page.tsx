"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Hash } from "lucide-react";
import { getEpisodesBySeason } from "@/data/episodes";
import { SEASONS } from "@/data/types";

export default function SeasonPage() {
  const params = useParams();
  const num = Number(params.num);
  const episodes = getEpisodesBySeason(num);
  const seasonInfo = SEASONS.find((s) => s.number === num);

  if (!seasonInfo || episodes.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Season not found</h1>
          <Link href="/" className="mt-4 inline-block text-psych-green hover:underline">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  const totalRefs = episodes.reduce((sum, e) => sum + e.references.length, 0);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-white">
        <ArrowLeft size={16} /> Back to home
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold">
          <span className="text-psych-green">Season {num}</span>
        </h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted">
          <span>{seasonInfo.year}</span>
          <span>{episodes.length} episodes</span>
          <span>{totalRefs} references</span>
        </div>

        {/* Season navigation */}
        <div className="mt-6 flex gap-2">
          {SEASONS.map((s) => (
            <Link
              key={s.number}
              href={`/seasons/${s.number}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                s.number === num
                  ? "bg-psych-green text-black"
                  : "border border-border text-muted hover:border-psych-green hover:text-white"
              }`}
            >
              S{s.number}
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="mt-10 space-y-4">
        {episodes.map((ep, i) => (
          <motion.div
            key={ep.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Link
              href={`/episodes/${ep.slug}`}
              className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-psych-green hover:bg-card-hover"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-psych-green/20 px-2 py-0.5 text-xs font-medium text-psych-green">
                      E{ep.episode}
                    </span>
                    <h3 className="text-lg font-semibold">{ep.title}</h3>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {ep.airDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash size={12} /> {ep.references.length} references
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{ep.synopsis}</p>
                </div>
                <span className="ml-4 text-psych-yellow">→</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
