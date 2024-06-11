import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Episode from "@pages/Episode";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/episode/:id",
    element: <Episode />,
  },
];

const router = createBrowserRouter(routes);

export default router;
