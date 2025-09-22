import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import ClientsPage from "./pages/Clients";
import Layout from "./layout/layout";
import SelectedClientsPage from "./pages/SelectedClients";

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
  {
    path: "/clientes-selecionados",
    element: (
      <Layout>
        <SelectedClientsPage />
      </Layout>
    ),
  },
]);

export default router;
