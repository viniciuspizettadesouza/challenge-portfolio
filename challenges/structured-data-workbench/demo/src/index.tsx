import { useState } from "react";
import BookSortingDemo from "./BookSortingDemo";
import DriverSelectionDemo from "./DriverSelectionDemo";
import ProductDataTableDemo from "./ProductDataTableDemo";
import "./styles.css";

type Workspace = "products" | "books" | "drivers";

export default function StructuredDataWorkbenchDemo() {
  const [workspace, setWorkspace] = useState<Workspace>("products");

  return (
    <section className="structured-data-workbench">
      <header className="structured-data-workbench__header">
        <div>
          <p>Four preserved rule-driven data projects</p>
          <h2>Structured Data Workbench</h2>
          <span>
            Filter product properties, compose ordered book comparisons, or
            select records from the original Formula 1 driver collection.
          </span>
        </div>
        <nav aria-label="Structured data workspaces">
          <button
            type="button"
            aria-pressed={workspace === "products"}
            onClick={() => setWorkspace("products")}
          >
            Product filtering
          </button>
          <button
            type="button"
            aria-pressed={workspace === "books"}
            onClick={() => setWorkspace("books")}
          >
            Book sorting
          </button>
          <button
            type="button"
            aria-pressed={workspace === "drivers"}
            onClick={() => setWorkspace("drivers")}
          >
            Driver selection
          </button>
        </nav>
      </header>

      {workspace === "products" && <ProductDataTableDemo />}
      {workspace === "books" && <BookSortingDemo />}
      {workspace === "drivers" && <DriverSelectionDemo />}
    </section>
  );
}
