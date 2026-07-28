import { useState } from "react";
import logo from "../../original/src/assets/sw-logo.png";
import { films, toRomanEpisode } from "./logic";
import "./styles.css";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function PipzDemo() {
  const [paused, setPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  function restartCrawl() {
    setAnimationKey((current) => current + 1);
    setPaused(false);
  }

  return (
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
            <button type="button" onClick={restartCrawl}>
              Restart
            </button>
          </div>
        </div>

        <div
          key={animationKey}
          className={`pipz-crawl ${paused ? "pipz-crawl--paused" : ""}`}
        >
          {films.map((film) => (
            <article key={film.episodeId}>
              <p>Episode {toRomanEpisode(film.episodeId)}</p>
              <h2>{film.title}</h2>
              <h3>Release Date: {formatDate(film.releaseDate)}</h3>
              <span aria-hidden="true">·</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
