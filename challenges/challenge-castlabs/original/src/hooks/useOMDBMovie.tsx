import { OMDBMovie } from "@/interfaces/omdbApi";
import { useEffect, useState } from "react";

const initialMovie: OMDBMovie = {
  Title: "",
  Year: "",
  Rated: "",
  Released: "",
  Runtime: "",
  Genre: "",
  Director: "",
  Writer: "",
  Actors: "",
  Plot: "",
  Language: "",
  Country: "",
  Awards: "",
  Poster: "",
  Ratings: [],
  Metascore: "",
  imdbRating: "",
  imdbVotes: "",
  imdbID: "",
  Type: "",
  DVD: "",
  BoxOffice: "",
  Production: "",
  Website: "",
  Response: "",
};

const useOMDBMovie = (imdbId: string | undefined) => {
  const [movie, setMovie] = useState<OMDBMovie>(initialMovie);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOMDBMovie = async () => {
      if (imdbId) {
        setLoading(true);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_OMDB_BASE_URL}?i=${imdbId}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch OMDB movie data");
          }
          const data = await response.json();
          setMovie(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching OMDB movie data:", error);
          setError("Failed to fetch OMDB movie data");
          setLoading(false);
        }
      }
    };

    fetchOMDBMovie();
  }, [imdbId]);

  return { movie, loading, error };
};

export default useOMDBMovie;
