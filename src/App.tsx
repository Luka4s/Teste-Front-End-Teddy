import { RouterProvider } from "react-router-dom";
import router from "./routes";
import ClientContextProvivider from "./context/clientContext";

function App() {
  return (
    <ClientContextProvivider>
      <RouterProvider router={router} />
    </ClientContextProvivider>
  );
}

export default App;
