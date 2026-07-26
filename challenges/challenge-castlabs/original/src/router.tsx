import CreateEpisode from "@pages/CreateEpisode";
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
  {
    path: "/createEpisode",
    element: <CreateEpisode />,
  },
]);

export default router;
