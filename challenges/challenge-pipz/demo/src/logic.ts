export interface Film {
  episodeId: number;
  title: string;
  releaseDate: string;
}

export const films: Film[] = [
  { episodeId: 4, title: "A New Hope", releaseDate: "1977-05-25" },
  { episodeId: 5, title: "The Empire Strikes Back", releaseDate: "1980-05-17" },
  { episodeId: 6, title: "Return of the Jedi", releaseDate: "1983-05-25" },
  { episodeId: 1, title: "The Phantom Menace", releaseDate: "1999-05-19" },
  { episodeId: 2, title: "Attack of the Clones", releaseDate: "2002-05-16" },
  { episodeId: 3, title: "Revenge of the Sith", releaseDate: "2005-05-19" },
  { episodeId: 7, title: "The Force Awakens", releaseDate: "2015-12-11" },
];

const romanDigits = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

export function toRomanEpisode(episodeId: number) {
  if (!Number.isInteger(episodeId) || episodeId < 1 || episodeId > 9) {
    throw new Error("Episode must be an integer from 1 to 9.");
  }
  return romanDigits[episodeId];
}
