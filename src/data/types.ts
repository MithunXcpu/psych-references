export interface Reference {
  quote: string;
  reference: string;
  category: "movie" | "tv" | "music" | "celebrity" | "history" | "other";
  explanation: string;
}

export interface Episode {
  slug: string;
  title: string;
  season: number;
  episode: number;
  airDate: string;
  synopsis: string;
  references: Reference[];
}

export interface SeasonInfo {
  number: number;
  year: string;
  episodeCount: number;
}

export const SEASONS: SeasonInfo[] = [
  { number: 1, year: "2006", episodeCount: 15 },
  { number: 2, year: "2007-2008", episodeCount: 16 },
  { number: 3, year: "2008-2009", episodeCount: 16 },
  { number: 4, year: "2009-2010", episodeCount: 16 },
  { number: 5, year: "2010-2011", episodeCount: 16 },
  { number: 6, year: "2011-2012", episodeCount: 16 },
  { number: 7, year: "2013", episodeCount: 14 },
  { number: 8, year: "2014", episodeCount: 10 },
];
