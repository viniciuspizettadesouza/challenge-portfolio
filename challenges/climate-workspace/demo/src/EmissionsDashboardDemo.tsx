import { useMemo, useState, type FormEvent } from "react";
import {
  aggregateByOrganisation,
  categories,
  createEmissionResult,
  initialResults,
  organisations,
  type EmissionResult,
} from "./emissionsLogic";
import "./emissions-styles.css";

const colors = ["#22c55e", "#38bdf8", "#f97316"];
const maxEmployees = Math.max(
  ...organisations.map(({ numberOfEmployees }) => numberOfEmployees),
);
const selectableCategories = categories.filter(
  ({ categoryId }) => categoryId !== null,
);

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  }).format(value);
}

export default function EmissionsDashboardDemo() {
  const [results, setResults] = useState<EmissionResult[]>(() =>
    initialResults.map((result) => ({ ...result })),
  );
  const [chartType, setChartType] = useState<"donut" | "bar">("donut");
  const [entityId, setEntityId] = useState(organisations[0].id);
  const [categoryId, setCategoryId] = useState(2);
  const [kco2e, setKco2e] = useState("");
  const [feedback, setFeedback] = useState("");

  const emissions = useMemo(
    () => aggregateByOrganisation(results, organisations),
    [results],
  );
  const totalEmissions = emissions.reduce(
    (sum, organisation) => sum + organisation.value,
    0,
  );
  let position = 0;
  const donutBackground = `conic-gradient(${emissions
    .map(({ percentage }, index) => {
      const start = position;
      position += percentage;
      return `${colors[index]} ${start}% ${position}%`;
    })
    .join(", ")})`;

  function addResult(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const result = createEmissionResult(entityId, categoryId, Number(kco2e));
      setResults((current) => [...current, result]);
      const organisation = organisations.find(
        ({ id }) => id === result.entityId,
      );
      setFeedback(
        `${formatNumber(result.kco2e)} kgCO₂e added to ${organisation?.name}.`,
      );
      setKco2e("");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to add this result.",
      );
    }
  }

  return (
    <section className="climate-demo">
      <header className="intro">
        <div>
          <p className="eyebrow">ClimateSeed · Carbon dashboard</p>
          <h2>Organisation emissions overview</h2>
          <p>
            Explore the original local dataset and add a result to see every
            chart update immediately.
          </p>
        </div>
        <div className="total">
          <span>Total recorded</span>
          <strong>{formatNumber(totalEmissions)}</strong>
          <small>kgCO₂e</small>
        </div>
      </header>

      <div className="dashboard">
        <article className="card employees">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Team size</p>
              <h3>Employees by organisation</h3>
            </div>
            <span className="badge">Local data</span>
          </div>
          <div className="employee-bars">
            {organisations.map((organisation) => (
              <div key={organisation.id} className="employee-row">
                <div className="bar-label">
                  <span>{organisation.name}</span>
                  <strong>{organisation.numberOfEmployees}</strong>
                </div>
                <div className="bar-track">
                  <span
                    style={{
                      width: `${(organisation.numberOfEmployees / maxEmployees) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card emissions-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Carbon footprint</p>
              <h3>Emissions by organisation</h3>
            </div>
            <div className="chart-toggle" aria-label="Chart type">
              <button
                type="button"
                className={chartType === "donut" ? "active" : undefined}
                aria-pressed={chartType === "donut"}
                onClick={() => setChartType("donut")}
              >
                Donut
              </button>
              <button
                type="button"
                className={chartType === "bar" ? "active" : undefined}
                aria-pressed={chartType === "bar"}
                onClick={() => setChartType("bar")}
              >
                Bar
              </button>
            </div>
          </div>

          <div className="chart-area">
            {chartType === "donut" ? (
              <div className="donut-wrap">
                <div className="donut" style={{ background: donutBackground }}>
                  <div>
                    <strong>{formatNumber(totalEmissions)}</strong>
                    <span>kgCO₂e</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="emission-bars">
                {emissions.map((organisation, index) => (
                  <div key={organisation.id}>
                    <span
                      style={{
                        height: `${Math.max(organisation.percentage, 3)}%`,
                        background: colors[index],
                      }}
                    />
                    <small>{organisation.name}</small>
                  </div>
                ))}
              </div>
            )}

            <ul className="legend">
              {emissions.map((organisation, index) => (
                <li key={organisation.id}>
                  <i style={{ background: colors[index] }} />
                  <span>{organisation.name}</span>
                  <strong>{formatNumber(organisation.value)}</strong>
                  <small>{organisation.percentage.toFixed(1)}%</small>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <article className="card form-card">
        <div>
          <p className="eyebrow">Try the data flow</p>
          <h3>Add an emissions result</h3>
          <p>
            The record stays in this browser session and updates the
            visualisation above.
          </p>
        </div>
        <form onSubmit={addResult}>
          <label>
            Organisation
            <select
              value={entityId}
              onChange={(event) => setEntityId(Number(event.target.value))}
            >
              {organisations.map((organisation) => (
                <option key={organisation.id} value={organisation.id}>
                  {organisation.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Category
            <select
              value={categoryId}
              onChange={(event) => setCategoryId(Number(event.target.value))}
            >
              {selectableCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} · {category.scope}
                </option>
              ))}
            </select>
          </label>
          <label>
            Emissions (kgCO₂e)
            <input
              value={kco2e}
              onChange={(event) => setKco2e(event.target.value)}
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 450"
            />
          </label>
          <button type="submit">Add result</button>
        </form>
        <p className="feedback" aria-live="polite">
          {feedback}
        </p>
      </article>
    </section>
  );
}
