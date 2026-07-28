export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  rating: number;
  overview: string;
}

export const movies: Movie[] = [
  {
    id: 299536,
    title: "Avengers: Infinity War",
    releaseDate: "2018-04-25",
    rating: 8.3,
    overview:
      "The Avengers and their allies face Thanos, whose plan to collect all six Infinity Stones puts the fate of Earth and existence itself at risk.",
  },
  {
    id: 299534,
    title: "Avengers: Endgame",
    releaseDate: "2019-04-24",
    rating: 8.3,
    overview:
      "After the universe is left in ruins, the remaining Avengers assemble once more to undo Thanos' actions and restore order.",
  },
  {
    id: 24428,
    title: "The Avengers",
    releaseDate: "2012-04-25",
    rating: 7.7,
    overview:
      "Nick Fury brings together a remarkable team to pull the world back from the brink when an unexpected enemy threatens global security.",
  },
  {
    id: 99861,
    title: "Avengers: Age of Ultron",
    releaseDate: "2015-04-22",
    rating: 7.3,
    overview:
      "Tony Stark's attempt to start a peacekeeping program goes awry, forcing Earth's mightiest heroes to confront Ultron.",
  },
  {
    id: 323660,
    title: "Avengers Grimm",
    releaseDate: "2015-03-17",
    rating: 4,
    overview:
      "Four legendary princesses follow Rumpelstiltskin into the modern world and fight to stop his plan to enslave humanity.",
  },
  {
    id: 521720,
    title: "Avengers Grimm: Time Wars",
    releaseDate: "2018-05-01",
    rating: 4.9,
    overview:
      "The Avengers Grimm pursue Rumpelstiltskin through time in a final attempt to prevent him from taking over Earth.",
  },
  {
    id: 14613,
    title: "Next Avengers: Heroes of Tomorrow",
    releaseDate: "2008-09-02",
    rating: 6.9,
    overview:
      "The children of the Avengers learn to use their powers and face the enemy responsible for their parents' defeat.",
  },
  {
    id: 14609,
    title: "Ultimate Avengers: The Movie",
    releaseDate: "2006-02-21",
    rating: 6.8,
    overview:
      "Captain America returns after decades beneath the North Atlantic as the world faces a familiar threat.",
  },
];

export function searchMovies(items: Movie[], query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (normalizedQuery.length < 3) return [];
  return items.filter(({ title }) => title.toLocaleLowerCase().includes(normalizedQuery));
}
