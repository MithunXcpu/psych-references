import { Episode } from "./types";
import { season1 } from "./seasons/s1";
import { season2 } from "./seasons/s2";
import { season3 } from "./seasons/s3";
import { season4 } from "./seasons/s4";
import { season5 } from "./seasons/s5";
import { season6 } from "./seasons/s6";
import { season7 } from "./seasons/s7";
import { season8 } from "./seasons/s8";

export const allEpisodes: Episode[] = [
  ...season1,
  ...season2,
  ...season3,
  ...season4,
  ...season5,
  ...season6,
  ...season7,
  ...season8,
];

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return allEpisodes.find((e) => e.slug === slug);
}

export function getEpisodesBySeason(num: number): Episode[] {
  return allEpisodes.filter((e) => e.season === num);
}

export function getAllReferences() {
  return allEpisodes.flatMap((e) =>
    e.references.map((r) => ({ ...r, episodeSlug: e.slug, episodeTitle: e.title, season: e.season, episode: e.episode }))
  );
}
