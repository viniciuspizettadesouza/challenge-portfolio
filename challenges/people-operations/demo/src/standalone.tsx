import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PeopleOperationsDemo from "./PeopleOperationsDemo";

createRoot(document.getElementById("root")!).render(
  <StrictMode><PeopleOperationsDemo /></StrictMode>,
);
