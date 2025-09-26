import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardClient from "@/components/CardClient";
import { useClientContext } from "@/context/clientContext";
import type { ClientType } from "@/types/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SelectedClientsPage = () => {
  const { selectedClients, setSelectedClients } = useClientContext();
  const navigate = useNavigate();

  const handleRemoveClientThisList = (client: ClientType) => {
    setSelectedClients((prev) => {
      return prev.filter((c) => c.id !== client.id);
    });

    toast.success(`Cliente ${client.name} removido com sucesso !`);
  };

  const handleClearSelectedList = () => {
    setSelectedClients([]);
    toast.success(`A lista de clientes selecionados foi limpa com sucesso !`);

    setTimeout(() => {
      navigate("/clientes");
    }, 2000);
  };

  return (
    <div className="flex flex-col w-screen h-auto justify-center items-center p-2 space-y-1.5 lg:px-10">
      <div className="flex justify-between w-full px-20">
        <div className="flex gap-1">
          <h1 className="font-bold text-xl">Clientes selecionados:</h1>
        </div>
      </div>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-5 w-full bg-background">
        {selectedClients.length > 0 ? (
          <>
            {selectedClients.map((c) => (
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
                  <CardClient.Icon
                    icon={<Minus size={20} />}
                    onClick={() => handleRemoveClientThisList(c)}
                  />
                </CardClient.Footer>
              </CardClient>
            ))}
          </>
        ) : (
          <h1 className="font-bold text-xl"> Nenhum cliente selecionado</h1>
        )}
      </main>
      <footer className="flex flex-col w-full space-y-2.5">
        <Button
          disabled={selectedClients.length === 0}
          onClick={() => handleClearSelectedList()}
          className="border-orange-color hover:text-white border-2 bg-transparent text-orange-color"
        >
          Limpar clientes selecionados
        </Button>
      </footer>
    </div>
  );
};

export default SelectedClientsPage;
