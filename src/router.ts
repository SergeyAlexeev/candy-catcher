import { createBrowserRouter } from "react-router-dom";
import { routes as pageRoutes } from "./pages";
import { routes as gameRoutes } from "./games";

export const router = createBrowserRouter([...pageRoutes, ...gameRoutes]);
