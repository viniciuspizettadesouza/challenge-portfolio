import { useState } from "react";
import BookSortingDemo from "./BookSortingDemo";
import ProductDataTableDemo from "./ProductDataTableDemo";
import "./styles.css";

type Workspace = "products" | "books";

export default function StructuredDataWorkbenchDemo() {
  const [workspace, setWorkspace] = useState<Workspace>("products");

  return (
    <section className="structured-data-workbench">
      <header className="structured-data-workbench__header">
        <div>
          <p>Three preserved rule-driven data projects</p>
          <h2>Structured Data Workbench</h2>
          <span>
            Filter product properties or compose ordered comparison rules over
            a deterministic book collection.
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
        </nav>
      </header>

      {workspace === "products" ? (
        <ProductDataTableDemo />
      ) : (
        <BookSortingDemo />
      )}
    </section>
  );
}
