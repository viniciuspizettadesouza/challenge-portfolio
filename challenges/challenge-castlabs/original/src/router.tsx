import { createBrowserRouter } from "react-router-dom";
import Episode from "@pages/Episode";
import Home from "@pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/episode/:id",
    element: <Episode />,
  },
]);

export default router;
