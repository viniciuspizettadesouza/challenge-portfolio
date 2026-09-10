import { useState } from "react";
import logo from "../../../challenge-pipz/original/src/assets/sw-logo.png";
import { films, movies, searchMovies, toRomanEpisode, type Movie } from "./filmLogic";
import "./film-styles.css";

type View = "discover" | "crawl";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function FilmLibraryDemo() {
  const [view, setView] = useState<View>("discover");
  const [query, setQuery] = useState("avengers");
  const [results, setResults] = useState<Movie[]>([]);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState("");
  const [paused, setPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim();
    if (normalized.length < 3) {
      setResults([]);
      setSearched(false);
      setMessage("Enter at least three characters.");
      return;
    }

    const matches = searchMovies(movies, normalized);
    setResults(matches);
    setSearched(true);
    setMessage(
      matches.length === 0
        ? `No movies found for “${normalized}”.`
        : `${matches.length} movies found.`,
    );
  }

  function restartCrawl() {
    setAnimationKey((current) => current + 1);
    setPaused(false);
  }

  return (
    <section className="film-library">
      <header className="film-library__header">
        <div>
          <p>Two preserved cinematic experiences</p>
          <h2>Film Library</h2>
        </div>
        <nav aria-label="Film library views">
          <button
            type="button"
            aria-pressed={view === "discover"}
            onClick={() => setView("discover")}
          >
            Discover movies
          </button>
          <button
            type="button"
            aria-pressed={view === "crawl"}
            onClick={() => setView("crawl")}
          >
            Star Wars crawl
          </button>
        </nav>
      </header>

      {view === "discover" ? (
        <section className="fyld-demo" aria-labelledby="movie-search-title">
          <header className="nuxt-heading">
            <div className="nuxt-brand" aria-label="NuxtJS">
              <span className="nuxt-mark" aria-hidden="true"><i /><b /></span>
              <strong>NuxtJS</strong>
            </div>
            <h3 id="movie-search-title">Search for any movie</h3>
          </header>

          <form className="movie-search" onSubmit={submitSearch}>
            <label>
              <span className="sr-only">Movie title</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search movie"
              />
            </label>
            <button type="submit">Search</button>
          </form>

          {message && <p className="search-message" aria-live="polite">{message}</p>}

          {searched ? (
            <div className="movie-results">
              {results.map((movie) => (
                <article key={movie.id}>
                  <h4>{movie.title} ({movie.releaseDate.slice(0, 4)})</h4>
                  <p className="rating">Rating: {movie.rating}</p>
                  <p><strong>Overview:</strong> {movie.overview}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="search-hint">
              <p>Type a movie title and select Search.</p>
              <small>The preserved “avengers” query is ready to run.</small>
            </div>
          )}
        </section>
      ) : (
        <section className="pipz-demo">
          <header className="pipz-opening">
            <div className="pipz-stars" aria-hidden="true" />
            <p>A long time ago in a galaxy far, far away…</p>
            <img src={logo.src} alt="Star Wars" />
          </header>

          <section className="pipz-crawl-stage" aria-label="Star Wars film crawl">
            <div className="pipz-stars" aria-hidden="true" />
            <div className="pipz-crawl-fade" aria-hidden="true" />
            <div className="pipz-crawl-controls">
              <span>Episodes from the preserved SWAPI response</span>
              <div>
                <button type="button" onClick={() => setPaused((current) => !current)}>
                  {paused ? "Resume crawl" : "Pause crawl"}
                </button>
                <button type="button" onClick={restartCrawl}>Restart</button>
              </div>
            </div>

            <div
              key={animationKey}
              className={`pipz-crawl ${paused ? "pipz-crawl--paused" : ""}`}
            >
              {films.map((film) => (
                <article key={film.episodeId}>
                  <p>Episode {toRomanEpisode(film.episodeId)}</p>
                  <h3>{film.title}</h3>
                  <h4>Release Date: {formatDate(film.releaseDate)}</h4>
                  <span aria-hidden="true">·</span>
                </article>
              ))}
            </div>
          </section>
        </section>
      )}
    </section>
  );
}
