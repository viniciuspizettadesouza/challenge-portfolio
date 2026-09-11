import { useState } from "react";
import EmissionsDashboardDemo from "./EmissionsDashboardDemo";
import WeatherForecastDemo from "./WeatherForecastDemo";
import "./workspace-styles.css";

type View = "forecasts" | "emissions";

export default function ClimateWorkspaceDemo() {
  const [view, setView] = useState<View>("forecasts");

  return (
    <section className="climate-workspace">
      <header className="workspace-header">
        <div className="workspace-brand">
          <span aria-hidden="true">CW</span>
          <div>
            <p>Weather &amp; Climate</p>
            <h2>Climate &amp; Weather Workspace</h2>
          </div>
        </div>
        <nav aria-label="Climate workspace views">
          <button
            type="button"
            className={view === "forecasts" ? "active" : undefined}
            aria-pressed={view === "forecasts"}
            onClick={() => setView("forecasts")}
          >
            Forecasts
          </button>
          <button
            type="button"
            className={view === "emissions" ? "active" : undefined}
            aria-pressed={view === "emissions"}
            onClick={() => setView("emissions")}
          >
            Emissions
          </button>
        </nav>
      </header>

      <p className="workspace-intro">
        Explore private local forecasts and compare organisational emissions in
        two deterministic, browser-only views.
      </p>

      {view === "forecasts" ? (
        <WeatherForecastDemo />
      ) : (
        <EmissionsDashboardDemo />
      )}
    </section>
  );
}
