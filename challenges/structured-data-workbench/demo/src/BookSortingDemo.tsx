import { useMemo, useState } from "react";
import {
  BookSortingError,
  books,
  presets,
  sortBooks,
  type Book,
  type BookField,
  type SortDirection,
  type SortRule,
} from "./bookLogic";
import "./book-styles.css";

const fields: Array<{ value: BookField; label: string }> = [
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "editionYear", label: "Edition year" },
];

const presetButtons = [
  { label: "Title ascending", rules: presets.title },
  { label: "Author ↑, title ↓", rules: presets.authorTitle },
  { label: "Edition ↓, author ↓, title ↑", rules: presets.editionAuthorTitle },
];

function BookTable({ items }: { items: Book[] }) {
  return items.length ? (
    <div
      className="book-table-scroll"
      tabIndex={0}
      aria-label="Scrollable sorted book table"
    >
      <table>
        <thead>
          <tr>
            <th>Output</th>
            <th>Title</th>
            <th>Author</th>
            <th>Edition</th>
          </tr>
        </thead>
        <tbody>
          {items.map((book, index) => (
            <tr key={book.id}>
              <td>
                <span>{index + 1}</span> Book {book.id}
              </td>
              <td>
                <strong>{book.title}</strong>
              </td>
              <td>{book.author}</td>
              <td>{book.editionYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="book-empty">The service returned the expected empty set.</p>
  );
}

export default function BookSortingDemo() {
  const [rules, setRules] = useState<SortRule[]>([...presets.title]);
  const [collectionMode, setCollectionMode] = useState<
    "books" | "empty" | "null"
  >("books");

  const result = useMemo(() => {
    try {
      const collection =
        collectionMode === "null"
          ? null
          : collectionMode === "empty"
            ? []
            : books;
      return { books: sortBooks(collection, rules), error: null };
    } catch (error) {
      return {
        books: [],
        error:
          error instanceof BookSortingError
            ? error
            : new BookSortingError(
                "INVALID_CONFIGURATION",
                "The configuration could not be applied.",
              ),
      };
    }
  }, [collectionMode, rules]);

  function updateRule(index: number, update: Partial<SortRule>) {
    setRules((current) =>
      current.map((rule, ruleIndex) =>
        ruleIndex === index ? { ...rule, ...update } : rule,
      ),
    );
    setCollectionMode("books");
  }

  function moveRule(index: number, offset: -1 | 1) {
    setRules((current) => {
      const next = [...current];
      [next[index], next[index + offset]] = [next[index + offset], next[index]];
      return next;
    });
  }

  function addRule() {
    const field = fields.find(
      ({ value }) => !rules.some((rule) => rule.field === value),
    )?.value;
    if (field)
      setRules((current) => [...current, { field, direction: "ascending" }]);
  }

  return (
    <section className="book-demo">
      <header className="book-hero">
        <div>
          <p>Algorithms & utilities</p>
          <h2>Configurable book sorting</h2>
          <span>
            Compose comparison rules in priority order. The service stays
            unchanged as its configuration evolves.
          </span>
        </div>
        <div className="book-code" aria-hidden="true">
          <i>01</i>
          <b>field → direction</b>
          <i>02</i>
          <b>compare → compose</b>
          <i>03</i>
          <b>stable result</b>
        </div>
      </header>
      <main>
        <section className="book-panel" aria-labelledby="presets-heading">
          <div className="book-heading">
            <div>
              <p>Documented cases</p>
              <h3 id="presets-heading">Configuration presets</h3>
            </div>
            <span>Expected output is shown by book ID</span>
          </div>
          <div className="preset-grid">
            {presetButtons.map((preset) => (
              <button
                type="button"
                key={preset.label}
                onClick={() => {
                  setRules([...preset.rules]);
                  setCollectionMode("books");
                }}
              >
                {preset.label}
              </button>
            ))}
            <button type="button" onClick={() => setCollectionMode("null")}>
              Null collection
            </button>
            <button type="button" onClick={() => setCollectionMode("empty")}>
              Empty set
            </button>
          </div>
        </section>

        <div className="book-workbench">
          <section className="book-panel" aria-labelledby="builder-heading">
            <div className="book-heading">
              <div>
                <p>Comparator pipeline</p>
                <h3 id="builder-heading">Rule builder</h3>
              </div>
            </div>
            <ol className="rule-list">
              {rules.map((rule, index) => (
                <li key={`${rule.field}-${index}`}>
                  <span className="priority">{index + 1}</span>
                  <label>
                    <span>Field</span>
                    <select
                      aria-label={`Rule ${index + 1} field`}
                      value={rule.field}
                      onChange={(event) =>
                        updateRule(index, {
                          field: event.target.value as BookField,
                        })
                      }
                    >
                      {fields.map((field) => (
                        <option
                          key={field.value}
                          value={field.value}
                          disabled={rules.some(
                            (candidate, candidateIndex) =>
                              candidateIndex !== index &&
                              candidate.field === field.value,
                          )}
                        >
                          {field.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Direction</span>
                    <select
                      aria-label={`Rule ${index + 1} direction`}
                      value={rule.direction}
                      onChange={(event) =>
                        updateRule(index, {
                          direction: event.target.value as SortDirection,
                        })
                      }
                    >
                      <option value="ascending">Ascending</option>
                      <option value="descending">Descending</option>
                    </select>
                  </label>
                  <div className="rule-actions">
                    <button
                      type="button"
                      aria-label={`Move rule ${index + 1} up`}
                      disabled={index === 0}
                      onClick={() => moveRule(index, -1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label={`Move rule ${index + 1} down`}
                      disabled={index === rules.length - 1}
                      onClick={() => moveRule(index, 1)}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove rule ${index + 1}`}
                      disabled={rules.length === 1}
                      onClick={() =>
                        setRules((current) =>
                          current.filter((_, ruleIndex) => ruleIndex !== index),
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ol>
            <button
              className="add-rule"
              type="button"
              disabled={rules.length === fields.length}
              onClick={addRule}
            >
              + Add comparison rule
            </button>
            <p className="builder-note">
              Rules are applied from top to bottom. Book ID provides a
              deterministic final tie-break.
            </p>
          </section>

          <section
            className="book-panel result-panel"
            aria-labelledby="result-heading"
          >
            <div className="book-heading">
              <div>
                <p>Service response</p>
                <h3 id="result-heading">Sorted collection</h3>
              </div>
              <output aria-live="polite">
                {result.error
                  ? "Expected error"
                  : result.books.length
                    ? result.books.map(({ id }) => id).join(" → ")
                    : "(empty set)"}
              </output>
            </div>
            {result.error ? (
              <div className="book-error" role="alert">
                <strong>{result.error.code}</strong>
                <p>{result.error.message}</p>
                <small>
                  The historical solutions called this SortingServiceException
                  and OrderingException.
                </small>
              </div>
            ) : (
              <BookTable items={result.books} />
            )}
          </section>
        </div>
      </main>
    </section>
  );
}
