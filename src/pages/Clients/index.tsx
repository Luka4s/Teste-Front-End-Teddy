import { useEffect, useState } from "react";
import { apiURL } from "@/utils/apiConfig";
import CardClient from "@/components/CardClient";
import type { ClientType } from "@/schemas/Client";
import { Pencil, Plus, Trash2 } from "lucide-react";

const ClientsPage = () => {
  const [clients, setClients] = useState<ClientType[]>([]);

  const fetchClients = async () => {
    const response = await fetch(`${apiURL}/users`);

    const data = await response.json();

    const responseClients = data.clients;

    setClients(responseClients);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="flex flex-col w-screen h-auto justify-center items-center p-2 space-y-1.5 lg:px-20">
      <div className="flex  w-full gap-1">
        <strong>{clients.length}</strong>
        <p>Clientes encontrados: </p>
      </div>
      <div className="flex flex-col items-center  md:grid  md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 w-full gap-y-5 bg-background">
        {clients.map((c) => (
          <CardClient key={c.id}>
            <CardClient.Header>{c.name}</CardClient.Header>
            <CardClient.Content>
              <div className="flex gap-1">
                <span>Salário: </span>
                <span>
                  {c.salary.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="flex gap-1">
                <span>Empresa: </span>
                <span>
                  {c.companyValuation.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </CardClient.Content>
            <CardClient.Footer>
              <CardClient.Icon icon={<Plus size={20} />} />
              <CardClient.Icon icon={<Pencil size={17} />} />
              <CardClient.Icon icon={<Trash2 size={17} color="red" />} />
            </CardClient.Footer>
          </CardClient>
        ))}
      </div>
    </div>
  );
};

export default ClientsPage;
