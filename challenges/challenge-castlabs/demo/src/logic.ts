export interface Episode {
  id: string;
  series: string;
  title: string;
  description: string;
  seasonNumber: number;
  episodeNumber: number;
  releaseDate: string;
  imdbId: string;
  colour: string;
}

export type EpisodeDraft = Omit<Episode, "id" | "colour">;

export const episodes: Episode[] = [
  {
    id: "episode-01",
    series: "Signal Division",
    title: "The Quiet Frequency",
    description:
      "Mara follows an impossible radio signal into a sealed part of the station and uncovers a message sent years before her arrival.",
    seasonNumber: 1,
    episodeNumber: 1,
    releaseDate: "2023-09-08",
    imdbId: "tt28110001",
    colour: "#4757c8",
  },
  {
    id: "episode-02",
    series: "Signal Division",
    title: "Dead Air",
    description:
      "A city-wide communications blackout forces the team to rely on an abandoned analogue network.",
    seasonNumber: 1,
    episodeNumber: 2,
    releaseDate: "2023-09-15",
    imdbId: "tt28110002",
    colour: "#287f9d",
  },
  {
    id: "episode-03",
    series: "Northbound",
    title: "White Horizon",
    description:
      "The research crew reaches the last mapped outpost, but the station log records one visitor too many.",
    seasonNumber: 2,
    episodeNumber: 4,
    releaseDate: "2024-01-19",
    imdbId: "tt28110003",
    colour: "#537b79",
  },
  {
    id: "episode-04",
    series: "Archive 88",
    title: "The Missing Reel",
    description:
      "A restored film reel appears to show tomorrow's news, leaving Lena only hours to change the final frame.",
    seasonNumber: 1,
    episodeNumber: 6,
    releaseDate: "2024-03-22",
    imdbId: "tt28110004",
    colour: "#94504e",
  },
  {
    id: "episode-05",
    series: "Northbound",
    title: "Under the Ice",
    description:
      "Unexplained lights beneath the frozen lake draw the expedition away from the safety of camp.",
    seasonNumber: 2,
    episodeNumber: 5,
    releaseDate: "2024-01-26",
    imdbId: "tt28110005",
    colour: "#426998",
  },
];

export function searchEpisodes(items: Episode[], query: string) {
  const normalisedQuery = query.trim().toLocaleLowerCase();

  if (!normalisedQuery) {
    return items;
  }

  return items.filter((episode) =>
    `${episode.title} ${episode.series}`.toLocaleLowerCase().includes(normalisedQuery),
  );
}

export function createEpisode(draft: EpisodeDraft, sequence: number): Episode {
  const requiredText = [
    ["Series", draft.series],
    ["Title", draft.title],
    ["Description", draft.description],
    ["Release date", draft.releaseDate],
    ["IMDb ID", draft.imdbId],
  ] as const;

  for (const [label, value] of requiredText) {
    if (!value.trim()) {
      throw new Error(`${label} is required.`);
    }
  }

  if (draft.seasonNumber < 1 || draft.episodeNumber < 1) {
    throw new Error("Season and episode numbers must be greater than zero.");
  }

  return {
    ...draft,
    id: `local-${sequence}`,
    series: draft.series.trim(),
    title: draft.title.trim(),
    description: draft.description.trim(),
    imdbId: draft.imdbId.trim(),
    colour: "#4458a8",
  };
}

export function deleteEpisode(items: Episode[], episodeId: string) {
  return items.filter(({ id }) => id !== episodeId);
}
