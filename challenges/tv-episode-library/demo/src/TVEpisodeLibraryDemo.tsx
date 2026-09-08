import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  clampPage,
  createEpisode,
  deleteEpisode,
  episodes as initialEpisodes,
  filterEpisodes,
  getShow,
  getTotalPages,
  paginate,
  shows,
  type Episode,
  type EpisodeDraft,
} from "./logic";
import "./styles.css";

const PAGE_SIZE = 5;
const emptyDraft = (): EpisodeDraft => ({
  showId: shows[0].id,
  title: "",
  description: "",
  seasonNumber: 1,
  episodeNumber: 1,
  releaseDate: "",
  runtime: 44,
  imdbId: "",
});

function EpisodeArtwork({ episode }: { episode: Episode }) {
  const show = getShow(episode.showId);
  return (
    <figure className="castlabs-artwork" style={{ "--episode-colour": episode.colour }}>
      <span className="castlabs-artwork__signal" aria-hidden="true" />
      <div>
        <small>{show?.name}</small>
        <strong>{episode.title}</strong>
        <span>S{String(episode.seasonNumber).padStart(2, "0")} · E{String(episode.episodeNumber).padStart(2, "0")}</span>
      </div>
    </figure>
  );
}

export default function TVEpisodeLibraryDemo() {
  const [items, setItems] = useState(initialEpisodes);
  const [selectedId, setSelectedId] = useState(initialEpisodes[0].id);
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"library" | "create">("library");
  const [draft, setDraft] = useState(emptyDraft);
  const [activity, setActivity] = useState("Connected — waiting for local changes");
  const [formError, setFormError] = useState("");

  const filtered = useMemo(
    () => filterEpisodes(items, query, showFilter),
    [items, query, showFilter],
  );
  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);
  const visibleEpisodes = useMemo(
    () => paginate(filtered, page, PAGE_SIZE),
    [filtered, page],
  );
  const selectedEpisode = items.find(({ id }) => id === selectedId) ?? visibleEpisodes[0];
  const selectedShow = selectedEpisode ? getShow(selectedEpisode.showId) : undefined;

  useEffect(() => {
    setPage((current) => clampPage(current, filtered.length, PAGE_SIZE));
  }, [filtered.length]);

  function updateFilters(nextQuery: string, nextShow: string) {
    setQuery(nextQuery);
    setShowFilter(nextShow);
    setPage(1);
    const first = filterEpisodes(items, nextQuery, nextShow)[0];
    if (first) setSelectedId(first.id);
  }

  function changePage(nextPage: number) {
    const safePage = clampPage(nextPage, filtered.length, PAGE_SIZE);
    setPage(safePage);
    const first = paginate(filtered, safePage, PAGE_SIZE)[0];
    if (first) setSelectedId(first.id);
  }

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const episode = createEpisode(draft, items.length + 1);
      setItems((current) => [episode, ...current]);
      setSelectedId(episode.id);
      setQuery("");
      setShowFilter("all");
      setPage(1);
      setDraft(emptyDraft());
      setFormError("");
      setActivity(`CREATE received · “${episode.title}”`);
      setView("library");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not create episode.");
    }
  }

  function handleDelete() {
    if (!selectedEpisode) return;
    const remaining = deleteEpisode(items, selectedEpisode.id);
    setItems(remaining);
    const first = filterEpisodes(remaining, query, showFilter)[0] ?? remaining[0];
    setSelectedId(first?.id ?? "");
    setActivity(`DELETE received · “${selectedEpisode.title}”`);
  }

  return (
    <section className="castlabs-demo">
      <header className="castlabs-header">
        <button type="button" className="castlabs-brand" onClick={() => setView("library")}>
          <span aria-hidden="true">▶</span> TV Episode Library
        </button>
        <div className="castlabs-filters">
          <label className="castlabs-search">
            <span className="sr-only">Search episodes</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
            <input type="search" placeholder="Search episodes or series..." value={query} onChange={(event) => updateFilters(event.target.value, showFilter)} />
          </label>
          <label><span className="sr-only">Series</span><select className="castlabs-series-filter" value={showFilter} onChange={(event) => updateFilters(query, event.target.value)}><option value="all">All series</option>{shows.map((show) => <option key={show.id} value={show.id}>{show.name}</option>)}</select></label>
        </div>
      </header>

      <div className="castlabs-status">
        <span><i aria-hidden="true" /> Local subscription simulation</span>
        <strong aria-live="polite">{activity}</strong>
      </div>

      {view === "create" ? (
        <main className="castlabs-form-page">
          <div className="castlabs-section-heading"><div><p>Local GraphQL mutation</p><h2>Create new episode</h2></div><button type="button" className="castlabs-button castlabs-button--quiet" onClick={() => setView("library")}>Back to library</button></div>
          <form className="castlabs-form" onSubmit={handleCreate}>
            <label>Series<select required value={draft.showId} onChange={(event) => setDraft({ ...draft, showId: event.target.value })}>{shows.map((show) => <option key={show.id} value={show.id}>{show.name}</option>)}</select></label>
            <label>Episode title<input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
            <label className="castlabs-form__wide">Description<textarea required rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label>
            <label>Season number<input required min="1" type="number" value={draft.seasonNumber} onChange={(event) => setDraft({ ...draft, seasonNumber: Number(event.target.value) })} /></label>
            <label>Episode number<input required min="1" type="number" value={draft.episodeNumber} onChange={(event) => setDraft({ ...draft, episodeNumber: Number(event.target.value) })} /></label>
            <label>Release date<input required type="date" value={draft.releaseDate} onChange={(event) => setDraft({ ...draft, releaseDate: event.target.value })} /></label>
            <label>Runtime in minutes<input required min="1" type="number" value={draft.runtime} onChange={(event) => setDraft({ ...draft, runtime: Number(event.target.value) })} /></label>
            <label>IMDb ID<input required placeholder="tt1234567" value={draft.imdbId} onChange={(event) => setDraft({ ...draft, imdbId: event.target.value })} /></label>
            {formError && <p className="castlabs-form__error" role="alert">{formError}</p>}
            <div className="castlabs-form__actions"><button type="button" className="castlabs-button castlabs-button--quiet" onClick={() => setView("library")}>Cancel</button><button type="submit" className="castlabs-button">Create episode</button></div>
          </form>
        </main>
      ) : (
        <main className="castlabs-library">
          <aside className="castlabs-list">
            <div className="castlabs-section-heading"><div><p>Episode library</p><h2>{filtered.length} matching {filtered.length === 1 ? "episode" : "episodes"}</h2></div><button type="button" className="castlabs-add" aria-label="Create an episode" onClick={() => setView("create")}>+</button></div>
            {visibleEpisodes.length ? <ul>{visibleEpisodes.map((episode) => <li key={episode.id}><button type="button" className={episode.id === selectedEpisode?.id ? "is-selected" : ""} onClick={() => setSelectedId(episode.id)}><span style={{ background: episode.colour }} aria-hidden="true">S{episode.seasonNumber}</span><div><strong>{episode.title}</strong><small>{getShow(episode.showId)?.name} · Episode {episode.episodeNumber}</small></div><b aria-hidden="true">›</b></button></li>)}</ul> : <p className="castlabs-empty">No episodes match “{query}”.</p>}
            <nav className="castlabs-pagination" aria-label="Episode pagination"><button type="button" disabled={page === 1} onClick={() => changePage(page - 1)}>Previous</button><span>Page {page} of {totalPages}</span><button type="button" disabled={page === totalPages} onClick={() => changePage(page + 1)}>Next</button></nav>
          </aside>

          <article className="castlabs-details">
            {selectedEpisode && selectedShow ? <><EpisodeArtwork episode={selectedEpisode} /><div className="castlabs-details__copy"><section className="castlabs-show-card" aria-label="Series details"><p>Series profile</p><strong>{selectedShow.name}</strong><p>{selectedShow.summary}</p><ul><li>{selectedShow.status}</li><li>{selectedShow.premiered}</li><li>★ {selectedShow.rating}</li>{selectedShow.genres.map((genre) => <li key={genre}>{genre}</li>)}</ul></section><p className="castlabs-eyebrow">{selectedShow.name}</p><h2>{selectedEpisode.title}</h2><p>{selectedEpisode.description}</p><dl><div><dt>Season</dt><dd>{selectedEpisode.seasonNumber}</dd></div><div><dt>Episode</dt><dd>{selectedEpisode.episodeNumber}</dd></div><div><dt>Air date</dt><dd>{selectedEpisode.releaseDate}</dd></div><div><dt>Runtime</dt><dd>{selectedEpisode.runtime} min</dd></div><div><dt>IMDb ID</dt><dd>{selectedEpisode.imdbId}</dd></div></dl><div className="castlabs-details__actions"><button type="button" className="castlabs-button" onClick={() => setView("create")}>Create episode</button><button type="button" className="castlabs-button castlabs-button--quiet" onClick={() => setActivity(`UPDATE received · “${selectedEpisode.title}” in ${selectedShow.name}`)}>Simulate update event</button><button type="button" className="castlabs-button castlabs-button--danger" onClick={handleDelete}>Delete episode</button></div></div></> : <div className="castlabs-empty castlabs-empty--details"><strong>No episodes available</strong><span>Create one to continue the demo.</span></div>}
          </article>
        </main>
      )}
    </section>
  );
}
