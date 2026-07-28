export interface Show {
  name: string;
  genres: string[];
  status: string;
  premiered: string;
  rating: number;
  summary: string;
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  runtime: number;
  summary: string;
}

export const show: Show = {
  name: "Signal Lost",
  genres: ["Drama", "Mystery", "Science Fiction"],
  status: "Ended",
  premiered: "2023-04-14",
  rating: 8.4,
  summary:
    "A radio astronomer traces a repeating signal to an abandoned coastal town and uncovers the stories of the people who disappeared there.",
};

const episodeNames = [
  "The Carrier Wave",
  "Dead Air",
  "Coordinates",
  "The Empty Station",
  "Night Frequency",
  "A Voice in Static",
  "The Listening Room",
  "Low Tide",
  "Interference",
  "The Last Broadcast",
  "Return Signal",
  "Clear Skies",
];

export const episodes: Episode[] = episodeNames.map((name, index) => ({
  id: index + 1,
  name,
  season: index < 6 ? 1 : 2,
  number: (index % 6) + 1,
  airdate: index < 6 ? `2023-04-${14 + index}` : `2024-06-${10 + index - 6}`,
  runtime: 44,
  summary:
    index === 0
      ? "Mara detects a signal that should not exist and follows it beyond the observatory."
      : `The investigation advances as episode ${index + 1} reveals another piece of the transmission.`,
}));
