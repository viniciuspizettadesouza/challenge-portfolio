import { useMemo, useState, type FormEvent } from "react";
import {
  createEpisode,
  deleteEpisode,
  episodes as initialEpisodes,
  searchEpisodes,
  type Episode,
  type EpisodeDraft,
} from "./logic";
import "./styles.css";

const emptyDraft: EpisodeDraft = {
  series: "",
  title: "",
  description: "",
  seasonNumber: 1,
  episodeNumber: 1,
  releaseDate: "",
  imdbId: "",
};

function EpisodeArtwork({ episode }: { episode: Episode }) {
  return (
    <figure className="castlabs-artwork" style={{ "--episode-colour": episode.colour }}>
      <span className="castlabs-artwork__signal" aria-hidden="true" />
      <div>
        <small>{episode.series}</small>
        <strong>{episode.title}</strong>
        <span>
          S{String(episode.seasonNumber).padStart(2, "0")} · E
          {String(episode.episodeNumber).padStart(2, "0")}
        </span>
      </div>
    </figure>
  );
}

export default function CastlabsDemo() {
  const [episodeItems, setEpisodeItems] = useState(initialEpisodes);
  const [selectedId, setSelectedId] = useState(initialEpisodes[0].id);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"library" | "create">("library");
  const [draft, setDraft] = useState(emptyDraft);
  const [activity, setActivity] = useState("Connected — waiting for local changes");
  const [formError, setFormError] = useState("");

  const visibleEpisodes = useMemo(
    () => searchEpisodes(episodeItems, search),
    [episodeItems, search],
  );
  const selectedEpisode =
    episodeItems.find(({ id }) => id === selectedId) ?? visibleEpisodes[0];

  function selectEpisode(id: string) {
    setSelectedId(id);
    setView("library");
  }

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const episode = createEpisode(draft, episodeItems.length + 1);
      setEpisodeItems((current) => [episode, ...current]);
      setSelectedId(episode.id);
      setDraft(emptyDraft);
      setFormError("");
      setActivity(`CREATE received · “${episode.title}”`);
      setView("library");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not create episode.");
    }
  }

  function handleDelete() {
    if (!selectedEpisode) return;

    const remaining = deleteEpisode(episodeItems, selectedEpisode.id);
    setEpisodeItems(remaining);
    setSelectedId(remaining[0]?.id ?? "");
    setActivity(`DELETE received · “${selectedEpisode.title}”`);
  }

  function handleSimulatedUpdate() {
    if (!selectedEpisode) return;
    setActivity(
      `UPDATE received · “${selectedEpisode.title}” in ${selectedEpisode.series}`,
    );
  }

  return (
    <section className="castlabs-demo">
      <header className="castlabs-header">
        <button
          type="button"
          className="castlabs-brand"
          onClick={() => setView("library")}
        >
          <span aria-hidden="true">▶</span>
          TV Series Episodes
        </button>
        <label className="castlabs-search">
          <span className="sr-only">Search episodes</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            type="search"
            placeholder="Search episodes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </header>

      <div className="castlabs-status">
        <span>
          <i aria-hidden="true" /> Local subscription simulation
        </span>
        <strong aria-live="polite">{activity}</strong>
      </div>

      {view === "create" ? (
        <main className="castlabs-form-page">
          <div className="castlabs-section-heading">
            <div>
              <p>Local GraphQL mutation</p>
              <h2>Create new episode</h2>
            </div>
            <button type="button" className="castlabs-button castlabs-button--quiet" onClick={() => setView("library")}>
              Back to library
            </button>
          </div>

          <form className="castlabs-form" onSubmit={handleCreate}>
            <label>
              Series
              <input required value={draft.series} onChange={(event) => setDraft({ ...draft, series: event.target.value })} />
            </label>
            <label>
              Episode title
              <input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            </label>
            <label className="castlabs-form__wide">
              Description
              <textarea required rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
            </label>
            <label>
              Season number
              <input required min="1" type="number" value={draft.seasonNumber} onChange={(event) => setDraft({ ...draft, seasonNumber: Number(event.target.value) })} />
            </label>
            <label>
              Episode number
              <input required min="1" type="number" value={draft.episodeNumber} onChange={(event) => setDraft({ ...draft, episodeNumber: Number(event.target.value) })} />
            </label>
            <label>
              Release date
              <input required type="date" value={draft.releaseDate} onChange={(event) => setDraft({ ...draft, releaseDate: event.target.value })} />
            </label>
            <label>
              IMDb ID
              <input required placeholder="tt1234567" value={draft.imdbId} onChange={(event) => setDraft({ ...draft, imdbId: event.target.value })} />
            </label>
            {formError && <p className="castlabs-form__error">{formError}</p>}
            <div className="castlabs-form__actions">
              <button type="button" className="castlabs-button castlabs-button--quiet" onClick={() => setView("library")}>Cancel</button>
              <button type="submit" className="castlabs-button">Create episode</button>
            </div>
          </form>
        </main>
      ) : (
        <main className="castlabs-library">
          <aside className="castlabs-list">
            <div className="castlabs-section-heading">
              <div>
                <p>Episode library</p>
                <h2>{visibleEpisodes.length} episodes</h2>
              </div>
              <button type="button" className="castlabs-add" aria-label="Create an episode" onClick={() => setView("create")}>+</button>
            </div>

            {visibleEpisodes.length ? (
              <ul>
                {visibleEpisodes.map((episode) => (
                  <li key={episode.id}>
                    <button
                      type="button"
                      className={episode.id === selectedEpisode?.id ? "is-selected" : ""}
                      onClick={() => selectEpisode(episode.id)}
                    >
                      <span style={{ background: episode.colour }} aria-hidden="true">
                        S{episode.seasonNumber}
                      </span>
                      <div>
                        <strong>{episode.title}</strong>
                        <small>{episode.series} · Episode {episode.episodeNumber}</small>
                      </div>
                      <b aria-hidden="true">›</b>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="castlabs-empty">No episodes match “{search}”.</p>
            )}
          </aside>

          <article className="castlabs-details">
            {selectedEpisode ? (
              <>
                <EpisodeArtwork episode={selectedEpisode} />
                <div className="castlabs-details__copy">
                  <p className="castlabs-eyebrow">{selectedEpisode.series}</p>
                  <h2>{selectedEpisode.title}</h2>
                  <p>{selectedEpisode.description}</p>
                  <dl>
                    <div><dt>Season</dt><dd>{selectedEpisode.seasonNumber}</dd></div>
                    <div><dt>Episode</dt><dd>{selectedEpisode.episodeNumber}</dd></div>
                    <div><dt>Release date</dt><dd>{selectedEpisode.releaseDate}</dd></div>
                    <div><dt>IMDb ID</dt><dd>{selectedEpisode.imdbId}</dd></div>
                  </dl>
                  <div className="castlabs-details__actions">
                    <button type="button" className="castlabs-button" onClick={() => setView("create")}>Create episode</button>
                    <button type="button" className="castlabs-button castlabs-button--quiet" onClick={handleSimulatedUpdate}>Simulate update event</button>
                    <button type="button" className="castlabs-button castlabs-button--danger" onClick={handleDelete}>Delete episode</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="castlabs-empty castlabs-empty--details">
                <strong>No episodes available</strong>
                <span>Create one to continue the demo.</span>
              </div>
            )}
          </article>
        </main>
      )}
    </section>
  );
}
