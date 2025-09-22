import { useEffect, useState } from "react";
import { apiURL } from "@/utils/apiConfig";
import CardClient from "@/components/CardClient";
import type { ClientType, ClientDataForm } from "@/types/Client";
import { Pencil, Plus, Trash2 } from "lucide-react";
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

const ClientsPage = () => {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [dialogId, setDialogId] = useState<number>();
  const [limit, setLimit] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchClients = async () => {
    try {
      const response = await fetch(
        `${apiURL}/users?page=${currentPage}&limit=${limit}`
      );

      const data = await response.json();
      console.log(data);
      const responseClients = data.clients;
      const responseTotalPages = data.totalPages;
      setTotalPages(responseTotalPages);
      setClients(responseClients);
    } catch (error: unknown) {
      console.error(
        `Ocorreu um eror ao tentar consultar os clientes, ERROR ${error}`
      );
    }
  };

  useEffect(() => {
    fetchClients();
  }, [limit, currentPage]);

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
    } catch (error: unknown) {
      console.error(
        `Ocorreu um erro ao tentar criar um novo cliente, ERROR ${error}`
      );
    }
  };

  const handleEditClient = async (data: ClientDataForm) => {
    try {
      await fetch(`${apiURL}/users/${dialogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Cliente atualizado com sucesso !");
    } catch (error: unknown) {
      console.error(
        `Ocorreu um erro ao tentar ediar um cliente, ERROR ${error}`
      );
    } finally {
      await fetchClients();
      setDialogId(undefined);
    }
  };

  const handleDeleteClient = async () => {
    try {
      await fetch(`${apiURL}/users/${dialogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Cliente atualizado com sucesso !");
    } catch (error: unknown) {
      console.error(
        `Ocorreu um erro ao tentar ediar um cliente, ERROR ${error}`
      );
    } finally {
      await fetchClients();
      setDialogId(undefined);
    }
  };

  return (
    <div className="flex flex-col w-screen h-auto justify-center items-center p-2 space-y-1.5 lg:px-10">
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
            <option value={16}>
              <span>16</span>
            </option>
            <option value={50}>
              <strong>50</strong>
            </option>
            <option value={100}>
              <strong>100</strong>
            </option>
          </select>
        </div>
      </div>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-5 w-full bg-background">
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

              <Dialog
                open={dialogId === c.id}
                onOpenChange={(open) => setDialogId(open ? c.id : undefined)}
              >
                <DialogTrigger onClick={() => setDialogId(c.id)}>
                  <CardClient.Icon icon={<Pencil size={17} />} />
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>Editar cliente:</DialogTitle>
                    <DialogClose onClick={() => setDialogId(undefined)} />
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
                open={dialogId === c.id}
                onOpenChange={(open) => setDialogId(open ? c.id : undefined)}
              >
                <DialogTrigger onClick={() => setDialogId(c.id)}>
                  <CardClient.Icon icon={<Trash2 size={17} color="red" />} />
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>Excluir cliente:</DialogTitle>
                    <DialogClose onClick={() => setDialogId(undefined)} />
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
        ))}
      </main>
      <footer className="flex flex-col w-full space-y-2.5">
        <Dialog>
          <DialogTrigger asChild>
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
