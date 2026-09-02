import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserManagementDemo from "./UserManagementDemo";

createRoot(document.getElementById("root")!).render(
  <StrictMode><UserManagementDemo /></StrictMode>,
);
