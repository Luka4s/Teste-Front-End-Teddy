/* eslint-disable react-refresh/only-export-components */
import type { ClientType } from "@/types/Client";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface ClientsContextProps {
  userName: string;
  selectedClients: ClientType[];
  setUserName: Dispatch<SetStateAction<string>>;
  setSelectedClients: Dispatch<SetStateAction<ClientType[]>>;
}

const Context = createContext<ClientsContextProps | undefined>(undefined);

export const useClientContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("selected clients context is missing !");
  }

  return context;
};

const ClientContextProvivider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userName, setUserName] = useState<string>("");
  const [selectedClients, setSelectedClients] = useState<ClientType[]>([]);
  return (
    <Context.Provider
      value={{ userName, selectedClients, setUserName, setSelectedClients }}
    >
      {children}
    </Context.Provider>
  );
};

export default ClientContextProvivider;
