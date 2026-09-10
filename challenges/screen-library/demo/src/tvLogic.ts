export interface Show {
  id: string;
  name: string;
  genres: string[];
  status: string;
  premiered: string;
  rating: number;
  summary: string;
  colour: string;
}

export interface Episode {
  id: string;
  showId: string;
  title: string;
  description: string;
  seasonNumber: number;
  episodeNumber: number;
  releaseDate: string;
  runtime: number;
  imdbId: string;
  colour: string;
}

export type EpisodeDraft = Omit<Episode, "id" | "colour">;

export const shows: Show[] = [
  {
    id: "signal-lost",
    name: "Signal Lost",
    genres: ["Drama", "Mystery", "Science Fiction"],
    status: "Ended",
    premiered: "2023-04-14",
    rating: 8.4,
    summary: "A radio astronomer traces a repeating signal to an abandoned coastal town and uncovers the stories of the people who disappeared there.",
    colour: "#79a72e",
  },
  {
    id: "signal-division",
    name: "Signal Division",
    genres: ["Science Fiction", "Thriller"],
    status: "Returning",
    premiered: "2023-09-08",
    rating: 8.1,
    summary: "A specialist team investigates transmissions that arrive from impossible places and times.",
    colour: "#4757c8",
  },
  {
    id: "northbound",
    name: "Northbound",
    genres: ["Mystery", "Adventure"],
    status: "Returning",
    premiered: "2022-11-04",
    rating: 7.9,
    summary: "An Arctic research crew follows unexplained signals beyond the last mapped outpost.",
    colour: "#426998",
  },
  {
    id: "archive-88",
    name: "Archive 88",
    genres: ["Drama", "Fantasy"],
    status: "Ended",
    premiered: "2024-02-16",
    rating: 8.0,
    summary: "A film archivist discovers that restored footage can reveal events that have not happened yet.",
    colour: "#94504e",
  },
];

const signalLostNames = [
  "The Carrier Wave", "Dead Air", "Coordinates", "The Empty Station",
  "Night Frequency", "A Voice in Static", "The Listening Room", "Low Tide",
  "Interference", "The Last Broadcast", "Return Signal", "Clear Skies",
];

const signalLostEpisodes: Episode[] = signalLostNames.map((title, index) => ({
  id: `signal-lost-${index + 1}`,
  showId: "signal-lost",
  title,
  description: index === 0
    ? "Mara detects a signal that should not exist and follows it beyond the observatory."
    : `The investigation advances as episode ${index + 1} reveals another piece of the transmission.`,
  seasonNumber: index < 6 ? 1 : 2,
  episodeNumber: (index % 6) + 1,
  releaseDate: index < 6 ? `2023-04-${14 + index}` : `2024-06-${10 + index - 6}`,
  runtime: 44,
  imdbId: `tt2912${String(index + 1).padStart(4, "0")}`,
  colour: "#79a72e",
}));

export const episodes: Episode[] = [
  {
    id: "episode-01", showId: "signal-division", title: "The Quiet Frequency",
    description: "Mara follows an impossible radio signal into a sealed part of the station and uncovers a message sent years before her arrival.",
    seasonNumber: 1, episodeNumber: 1, releaseDate: "2023-09-08", runtime: 48,
    imdbId: "tt28110001", colour: "#4757c8",
  },
  {
    id: "episode-02", showId: "signal-division", title: "Dead Air",
    description: "A city-wide communications blackout forces the team to rely on an abandoned analogue network.",
    seasonNumber: 1, episodeNumber: 2, releaseDate: "2023-09-15", runtime: 47,
    imdbId: "tt28110002", colour: "#287f9d",
  },
  {
    id: "episode-03", showId: "northbound", title: "White Horizon",
    description: "The research crew reaches the last mapped outpost, but the station log records one visitor too many.",
    seasonNumber: 2, episodeNumber: 4, releaseDate: "2024-01-19", runtime: 52,
    imdbId: "tt28110003", colour: "#537b79",
  },
  {
    id: "episode-04", showId: "archive-88", title: "The Missing Reel",
    description: "A restored film reel appears to show tomorrow's news, leaving Lena only hours to change the final frame.",
    seasonNumber: 1, episodeNumber: 6, releaseDate: "2024-03-22", runtime: 45,
    imdbId: "tt28110004", colour: "#94504e",
  },
  {
    id: "episode-05", showId: "northbound", title: "Under the Ice",
    description: "Unexplained lights beneath the frozen lake draw the expedition away from the safety of camp.",
    seasonNumber: 2, episodeNumber: 5, releaseDate: "2024-01-26", runtime: 51,
    imdbId: "tt28110005", colour: "#426998",
  },
  ...signalLostEpisodes,
];

export function getShow(showId: string): Show | undefined {
  return shows.find(({ id }) => id === showId);
}

export function filterEpisodes(
  items: readonly Episode[],
  query: string,
  showId = "all",
): Episode[] {
  const needle = query.trim().toLocaleLowerCase();
  return items.filter((episode) => {
    const show = getShow(episode.showId);
    return (showId === "all" || episode.showId === showId) &&
      (!needle || `${episode.title} ${show?.name ?? ""}`.toLocaleLowerCase().includes(needle));
  });
}

export function searchEpisodes(items: readonly Episode[], query: string): Episode[] {
  return filterEpisodes(items, query);
}

export function getTotalPages(itemCount: number, pageSize: number): number {
  if (pageSize <= 0) throw new Error("Page size must be greater than zero.");
  return Math.max(1, Math.ceil(itemCount / pageSize));
}

export function clampPage(page: number, itemCount: number, pageSize: number): number {
  return Math.min(Math.max(1, page), getTotalPages(itemCount, pageSize));
}

export function paginate<T>(items: readonly T[], page: number, pageSize: number): T[] {
  const safePage = clampPage(page, items.length, pageSize);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function createEpisode(draft: EpisodeDraft, sequence: number): Episode {
  const requiredText = [
    ["Title", draft.title], ["Description", draft.description],
    ["Release date", draft.releaseDate], ["IMDb ID", draft.imdbId],
  ] as const;
  for (const [label, value] of requiredText) {
    if (!value.trim()) throw new Error(`${label} is required.`);
  }
  const show = getShow(draft.showId);
  if (!show) throw new Error("Select an available series.");
  if (draft.seasonNumber < 1 || draft.episodeNumber < 1 || draft.runtime < 1) {
    throw new Error("Season, episode, and runtime must be greater than zero.");
  }
  return {
    ...draft,
    id: `local-${sequence}`,
    title: draft.title.trim(),
    description: draft.description.trim(),
    imdbId: draft.imdbId.trim(),
    colour: show.colour,
  };
}

export function deleteEpisode(items: readonly Episode[], episodeId: string): Episode[] {
  return items.filter(({ id }) => id !== episodeId);
}
