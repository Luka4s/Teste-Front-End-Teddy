import { useEffect, useState } from "react";
import { apiURL } from "@/utils/apiConfig";
import CardClient from "@/components/CardClient";
import type { ClientType, ClientDataForm } from "@/types/clients";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ClientForm from "@/components/ClientForm";
import PaginationComponent from "@/components/Pagination";
import { useCallback } from "react";
import { useClientContext } from "@/context/clientContext";

const ClientsPage = () => {
  const { selectedClients, setSelectedClients } = useClientContext();
  const [clients, setClients] = useState<ClientType[]>([]);
  const [clientId, setClientId] = useState<number>();
  const [limit, setLimit] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  const fetchClients = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiURL}/users?page=${currentPage}&limit=${limit}`
      );

      const data = await response.json();

      const responseClients = data.clients;
      const responseTotalPages = data.totalPages;

      setTotalPages(responseTotalPages);
      setClients(responseClients);
    } catch (error: unknown) {
      console.error(
        `Ocorreu um eror ao tentar consultar os clientes, ERROR ${error}`
      );
    }
  }, [currentPage, limit]);

  const handleCreateNewClient = async (data: ClientDataForm) => {
    try {
      await fetch(`${apiURL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Cliente cadastrado com sucesso !");
      setOpen(false);
    } catch (error: unknown) {
      console.error(
        `Ocorreu um erro ao tentar criar um novo cliente, ERROR ${error}`
      );
    } finally {
      await fetchClients();
    }
  };

  const handleEditClient = async (data: ClientDataForm) => {
    try {
      await fetch(`${apiURL}/users/${clientId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Cliente atualizado com sucesso !");
    } catch (error: unknown) {
      console.error(
        `Ocorreu um erro ao tentar editar o cliente, ERROR ${error}`
      );
      toast.error(`Ocorreu um erro ao tentar editar o cliente.`);
    } finally {
      await fetchClients();
      setClientId(undefined);
    }
  };

  const handleDeleteClient = async () => {
    try {
      await fetch(`${apiURL}/users/${clientId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Cliente excluído com sucesso !");
    } catch (error: unknown) {
      console.error(
        `Ocorreu um erro ao tentar excluír o cliente , ERROR ${error}`
      );
      toast.error(`Ocorreu um erro ao tentar excluír o cliente.`);
    } finally {
      await fetchClients();
      setClientId(undefined);
    }
  };

  const handleAddClientInSelectedClientList = (client: ClientType) => {
    setSelectedClients((prev) => {
      const clienteInList = prev.some((c) => c.id === client.id);

      if (clienteInList) {
        toast.warning(`O cliente ${client.name} já está inlcuso na lista.`);
        return prev;
      }

      toast.success(`Cliente ${client.name} adicionado com sucesso !`);
      return [...prev, client];
    });
  };

  useEffect(() => {
    fetchClients();
  }, [limit, currentPage, fetchClients]);

  return (
    <div className="flex flex-col w-full h-auto justify-center items-center p-2 space-y-1.5 lg:px-10">
      <div className="flex justify-between w-full px-20">
        <div className="flex gap-1">
          <p>Clientes encontrados: </p>
          <strong>{clients.length}</strong>
        </div>
        <div className="flex gap-1">
          <p>Clientes por página: </p>
          <select
            name="limitPage"
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded-xs"
          >
            <option value={16}>16</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-5 w-full bg-background">
        {clients.map((c) => {
          const isSelected = selectedClients.some(
            (client) => client.id === c.id
          );
          return (
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
                  icon={isSelected ? <Check size={20} /> : <Plus size={20} />}
                  onClick={() => handleAddClientInSelectedClientList(c)}
                />

                <Dialog
                  open={clientId === c.id}
                  onOpenChange={(open) => setClientId(open ? c.id : undefined)}
                >
                  <DialogTrigger onClick={() => setClientId(c.id)}>
                    <CardClient.Icon icon={<Pencil size={17} />} />
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>Editar cliente:</DialogTitle>
                      <DialogClose onClick={() => setClientId(undefined)} />
                    </DialogHeader>
                    <ClientForm
                      label="Editar cliente"
                      client={c}
                      onHandleSubmitForm={handleEditClient}
                      isDeleteForm
                    />
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={clientId === c.id}
                  onOpenChange={(open) => setClientId(open ? c.id : undefined)}
                >
                  <DialogTrigger onClick={() => setClientId(c.id)}>
                    <CardClient.Icon icon={<Trash2 size={17} color="red" />} />
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>Excluir cliente:</DialogTitle>
                      <DialogClose onClick={() => setClientId(undefined)} />
                    </DialogHeader>
                    <ClientForm
                      label="Excluir cliente"
                      client={c}
                      isDeleteForm
                      onHandleDeleteClient={handleDeleteClient}
                    />
                  </DialogContent>
                </Dialog>
              </CardClient.Footer>
            </CardClient>
          );
        })}
      </main>
      <footer className="flex flex-col w-full space-y-2.5">
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <DialogTrigger asChild onClick={() => setOpen(true)}>
            <Button className="border-orange-color hover:text-white border-2 bg-transparent text-orange-color">
              Criar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent haria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Criar cliente:</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <ClientForm
              label="Criar cliente"
              client={undefined}
              onHandleSubmitForm={handleCreateNewClient}
            />
          </DialogContent>
        </Dialog>

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </footer>
    </div>
  );
};

export default ClientsPage;
