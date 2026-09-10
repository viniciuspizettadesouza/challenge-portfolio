import { useState } from "react";
import FilmLibraryDemo from "./FilmLibraryDemo";
import TVEpisodeLibraryDemo from "./TVEpisodeLibraryDemo";
import "./styles.css";

type Collection = "television" | "films";

export default function ScreenLibraryDemo() {
  const [collection, setCollection] = useState<Collection>("television");

  return (
    <section className="screen-library">
      <header className="screen-library__header">
        <div>
          <p>Four preserved screen-media projects</p>
          <h2>Screen Library</h2>
        </div>
        <nav aria-label="Screen library collections">
          <button
            type="button"
            aria-pressed={collection === "television"}
            onClick={() => setCollection("television")}
          >
            TV shows
          </button>
          <button
            type="button"
            aria-pressed={collection === "films"}
            onClick={() => setCollection("films")}
          >
            Films
          </button>
        </nav>
      </header>

      {collection === "television" ? (
        <TVEpisodeLibraryDemo />
      ) : (
        <FilmLibraryDemo />
      )}
    </section>
  );
}
