import { useMemo, useState } from "react";
import {
  drivers,
  filterDrivers,
  toggleDriver,
  type DriverFilter,
} from "./driverLogic";
import "./driver-styles.css";

const filters: DriverFilter[] = ["All", "Selected", "Unselected"];

export default function DriverSelectionDemo() {
  const [filter, setFilter] = useState<DriverFilter>("All");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set());
  const visibleDrivers = useMemo(
    () => filterDrivers(drivers, selectedIds, filter),
    [filter, selectedIds],
  );
  const allSelected = selectedIds.size === drivers.length;

  return (
    <section className="driver-demo">
      <header className="driver-demo__intro">
        <div>
          <p>Vue selection exercise · React adaptation</p>
          <h2>Formula 1 driver selection</h2>
        </div>
        <span>
          Filter the original five-driver collection by selection state and emit
          a predictable set of selected record IDs.
        </span>
      </header>

      <div className="driver-demo__toolbar">
        <fieldset>
          <legend>Filter drivers</legend>
          <div className="driver-demo__filters">
            {filters.map((option) => (
              <button
                type="button"
                key={option}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="driver-demo__status" aria-live="polite">
          <p>
            <strong>{selectedIds.size}</strong> of {drivers.length} selected
          </p>
          <output aria-label="Emitted selected driver IDs">
            IDs:{" "}
            {[...selectedIds].sort((left, right) => left - right).join(", ") ||
              "none"}
          </output>
        </div>
      </div>

      <div className="driver-demo__collection">
        <label className="driver-demo__select-all">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() =>
              setSelectedIds(
                allSelected ? new Set() : new Set(drivers.map(({ id }) => id)),
              )
            }
          />
          <span>
            <strong>Select all drivers</strong>
            <small>Update the complete preserved collection</small>
          </span>
        </label>

        {visibleDrivers.length > 0 ? (
          <ul aria-label={`${filter} drivers`}>
            {visibleDrivers.map((driver) => (
              <li key={driver.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(driver.id)}
                    onChange={() =>
                      setSelectedIds((current) =>
                        toggleDriver(current, driver.id),
                      )
                    }
                  />
                  <span aria-hidden="true">
                    {driver.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <strong>{driver.name}</strong>
                  <small>Record {driver.id.toString().padStart(2, "0")}</small>
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="driver-demo__empty">
            No {filter.toLowerCase()} drivers.
          </p>
        )}
      </div>
    </section>
  );
}
