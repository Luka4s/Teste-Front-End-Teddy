import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
]);

export default router;
