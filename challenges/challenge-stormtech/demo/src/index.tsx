import { useState } from "react";
import logo from "../../original/frontend/src/assets/logo.png";
import {
  books,
  runScenario,
  sortBooks,
  type Book,
  type Scenario,
  type SortRule,
} from "./logic";
import "./styles.css";

const sortControls: Array<{ rule: SortRule; label: string }> = [
  { rule: "title-ascending", label: "Title Ascending" },
  { rule: "title-descending", label: "Title Descending" },
  { rule: "author-ascending", label: "Author Ascending" },
  { rule: "author-descending", label: "Author Descending" },
  { rule: "edition-descending", label: "Edition Year Descending" },
];

const scenarios: Array<{ value: Scenario; label: string; rule: string }> = [
  { value: "first", label: "First Scenario", rule: "Title ascending" },
  {
    value: "second",
    label: "Second Scenario",
    rule: "Author ascending · title descending",
  },
  {
    value: "third",
    label: "Third Scenario",
    rule: "Edition descending · author descending · title ascending",
  },
  { value: "fourth", label: "Fourth Scenario", rule: "Null collection" },
  { value: "fifth", label: "Fifth Scenario", rule: "Empty set" },
];

function BookTable({
  items,
  emptyMessage,
}: {
  items: Book[];
  emptyMessage?: string;
}) {
  return (
    <div className="storm-table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Edition year</th>
          </tr>
        </thead>
        <tbody>
          {items.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>
                <strong>{book.title}</strong>
              </td>
              <td>{book.author}</td>
              <td>{book.editionYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && (
        <p className="storm-empty">{emptyMessage ?? "The result is an empty set."}</p>
      )}
    </div>
  );
}

export default function StormtechDemo() {
  const [sortRule, setSortRule] = useState<SortRule>("original");
  const [scenario, setScenario] = useState<Scenario>("first");
  const [scenarioBooks, setScenarioBooks] = useState(() =>
    runScenario(books, "first"),
  );
  const [scenarioError, setScenarioError] = useState("");

  function selectScenario(nextScenario: Scenario) {
    setScenario(nextScenario);
    try {
      setScenarioBooks(runScenario(books, nextScenario));
      setScenarioError("");
    } catch (error) {
      setScenarioBooks([]);
      setScenarioError(
        error instanceof Error ? error.message : "SortingServiceException",
      );
    }
  }

  const activeScenario = scenarios.find(({ value }) => value === scenario);

  return (
    <section className="storm-demo">
      <header className="storm-header">
        <img src={logo.src} alt="Storm Tecnologia" />
        <div>
          <span>
            <i aria-hidden="true" /> Local MongoDB fixture
          </span>
          <small>4 documented books</small>
        </div>
      </header>

      <main>
        <section className="storm-section">
          <div className="storm-heading">
            <div>
              <p>Interactive sorting</p>
              <h2>Book catalog</h2>
            </div>
            <span>
              Current order:{" "}
              {sortControls.find(({ rule }) => rule === sortRule)?.label ?? "Original"}
            </span>
          </div>

          <div className="storm-controls" aria-label="Book sorting controls">
            {sortControls.map(({ rule, label }) => (
              <button
                key={rule}
                type="button"
                className={sortRule === rule ? "is-active" : ""}
                onClick={() => setSortRule(rule)}
              >
                {label}
              </button>
            ))}
          </div>

          <BookTable items={sortBooks(books, sortRule)} />
        </section>

        <section className="storm-section storm-section--scenarios">
          <div className="storm-heading">
            <div>
              <p>README test cases</p>
              <h2>Sorting scenarios</h2>
            </div>
            <span>{activeScenario?.rule}</span>
          </div>

          <div className="storm-controls" aria-label="Sorting scenarios">
            {scenarios.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={scenario === value ? "is-active" : ""}
                onClick={() => selectScenario(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {scenarioError ? (
            <div className="storm-error" role="alert">
              <strong>Expected exception</strong>
              <p>{scenarioError}</p>
            </div>
          ) : (
            <BookTable items={scenarioBooks} />
          )}
          <p className="storm-order" aria-live="polite">
            Output:{" "}
            {scenarioBooks.length
              ? scenarioBooks.map(({ id }) => `Book ${id}`).join(", ")
              : scenarioError
                ? "exception"
                : "(empty set)"}
          </p>
        </section>
      </main>
    </section>
  );
}
