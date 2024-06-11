import Episode from "@pages/Episode";
import Home from "@pages/Home";
import { createBrowserRouter } from "react-router-dom";

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
