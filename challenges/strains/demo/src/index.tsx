import { useMemo, useState, type CSSProperties } from "react";
import {
  filterStrains,
  paginateStrains,
  strains,
  type Strain,
  type StrainType,
} from "./logic";
import "./styles.css";

const initials = [...new Set(strains.map(({ name }) => name[0]))].sort();
const types: Array<StrainType | "All"> = ["All", "Hybrid", "Indica", "Sativa"];

function StrainArtwork({ strain }: { strain: Strain }) {
  return (
    <div className="strain-art" style={{ "--strain-accent": strain.accent } as CSSProperties}>
      <i />
      <i />
      <i />
      <span>{strain.name.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}

export default function StrainsDemo() {
  const [query, setQuery] = useState("");
  const [initial, setInitial] = useState("");
  const [type, setType] = useState<StrainType | "All">("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Strain | null>(null);

  const filtered = useMemo(
    () => filterStrains(strains, { query, initial, type }),
    [query, initial, type],
  );
  const paginated = paginateStrains(filtered, page);

  function updateFilters(next: { query?: string; initial?: string; type?: StrainType | "All" }) {
    if (next.query !== undefined) setQuery(next.query);
    if (next.initial !== undefined) setInitial(next.initial);
    if (next.type !== undefined) setType(next.type);
    setPage(1);
  }

  if (selected) {
    return (
      <section className="strains-demo strains-detail">
        <header className="strains-nav">
          <button type="button" className="strains-brand" onClick={() => setSelected(null)}>
            <span aria-hidden="true">L</span>
            <strong>Leafwell</strong>
          </button>
          <small>Local portfolio fixture</small>
        </header>

        <main>
          <button type="button" className="strains-back" onClick={() => setSelected(null)}>
            ← Strain directory
          </button>
          <section className="strain-profile">
            <StrainArtwork strain={selected} />
            <div>
              <span className="strain-type">{selected.type}</span>
              <h2>{selected.name}</h2>
              <p>{selected.summary}</p>
              <small>
                Representative local content · not medical advice and not a live API response
              </small>
            </div>
          </section>

          <section className="strain-metrics">
            <article>
              <small>Tetrahydrocannabinol</small>
              <strong>THC</strong>
              <b>{selected.thc[0]}%–{selected.thc[1]}%</b>
            </article>
            <article>
              <small>Cannabigerol</small>
              <strong>CBG</strong>
              <b>{selected.cbg[0]}%–{selected.cbg[1]}%</b>
            </article>
            <article className="composition">
              <small>Strain composition</small>
              <div><span>Indica</span><b>{selected.indica}%</b></div>
              <progress max="100" value={selected.indica}>{selected.indica}%</progress>
              <div><span>Sativa</span><b>{selected.sativa}%</b></div>
              <progress max="100" value={selected.sativa}>{selected.sativa}%</progress>
            </article>
          </section>

          <section className="strain-notes">
            <div>
              <small>Aromas</small>
              <p>{selected.aromas.join(" / ")}</p>
            </div>
            <div>
              <small>Flavours</small>
              <p>{selected.flavours.join(" / ")}</p>
            </div>
          </section>
        </main>
      </section>
    );
  }

  return (
    <section className="strains-demo">
      <header className="strains-nav">
        <div className="strains-brand">
          <span aria-hidden="true">L</span>
          <strong>Leafwell</strong>
        </div>
        <small>Strain directory · local edition</small>
      </header>

      <section className="strains-hero">
        <div>
          <p>Cannabis education directory</p>
          <h2>Find a strain</h2>
          <span>
            Explore a deterministic selection by name, initial, and type. No external
            GraphQL request is made.
          </span>
        </div>
        <div className="strains-hero-art" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
      </section>

      <main>
        <section className="strain-filters" aria-label="Strain filters">
          <label>
            <span>Search directory</span>
            <input
              value={query}
              onChange={(event) => updateFilters({ query: event.target.value })}
              placeholder="Search by strain name"
            />
          </label>
          <div>
            <span>Type</span>
            <div className="filter-buttons">
              {types.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={type === option ? "selected" : ""}
                  aria-pressed={type === option}
                  onClick={() => updateFilters({ type: option })}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="initial-filter">
            <span>Starts with</span>
            <div className="filter-buttons">
              <button
                type="button"
                className={initial === "" ? "selected" : ""}
                aria-pressed={initial === ""}
                onClick={() => updateFilters({ initial: "" })}
              >
                All
              </button>
              {initials.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  className={initial === letter ? "selected" : ""}
                  aria-pressed={initial === letter}
                  onClick={() => updateFilters({ initial: letter })}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <header className="directory-heading">
          <div>
            <p>Browse strains</p>
            <h3>{filtered.length} directory {filtered.length === 1 ? "record" : "records"}</h3>
          </div>
          <span>Page {paginated.currentPage} of {paginated.totalPages}</span>
        </header>

        {paginated.items.length ? (
          <div className="strain-grid">
            {paginated.items.map((strain) => (
              <article key={strain.slug}>
                <StrainArtwork strain={strain} />
                <div>
                  <span>{strain.type}</span>
                  <h4>{strain.name}</h4>
                  <p>THC {strain.thc[0]}%–{strain.thc[1]}%</p>
                  <button type="button" onClick={() => setSelected(strain)}>
                    View strain →
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="strains-empty">No strains match these filters.</p>
        )}

        <nav className="strain-pagination" aria-label="Strain pages">
          <button
            type="button"
            disabled={paginated.currentPage === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            ← Previous
          </button>
          <button
            type="button"
            disabled={paginated.currentPage === paginated.totalPages}
            onClick={() => setPage((current) => Math.min(paginated.totalPages, current + 1))}
          >
            Next →
          </button>
        </nav>
      </main>
    </section>
  );
}
