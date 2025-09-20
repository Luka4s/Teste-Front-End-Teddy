import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import ClientsPage from "./pages/Clients";
import Layout from "./layout/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/clientes",
    element: (
      <Layout>
        <ClientsPage />
      </Layout>
    ),
  },
]);

export default router;
