import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ClientForm from "@/components/ClientForm";
import type { ClientType } from "@/types/clients";

describe("ClientForm Component", () => {
  const mockSubmit = jest.fn();
  const mockDelete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o formulário normalmente", () => {
    render(
      <ClientForm label="Criar cliente" onHandleSubmitForm={mockSubmit} />
    );

    expect(screen.getByPlaceholderText("Digite o nome:")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Digite o salário:")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Digite o valor da empresa:")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Criar cliente/i })
    ).toBeInTheDocument();
  });

  it("valida campos obrigatórios", async () => {
    render(
      <ClientForm label="Criar cliente" onHandleSubmitForm={mockSubmit} />
    );

    const form = screen
      .getByRole("button", { name: /Criar cliente/i })
      .closest("form");
    if (!form) throw new Error("Form not found");
    await fireEvent.submit(form);

    expect(
      await screen.findByText(/Por favor informe um nome válido/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Por favor informe um salário válido/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Por favor informe um valor de empresa válido/i)
    ).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("submete o formulário corretamente", async () => {
    render(
      <ClientForm label="Criar cliente" onHandleSubmitForm={mockSubmit} />
    );

    fireEvent.change(screen.getByPlaceholderText("Digite o nome:"), {
      target: { value: "Lucas" },
    });
    fireEvent.change(screen.getByPlaceholderText("Digite o salário:"), {
      target: { value: "1000,00" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Digite o valor da empresa:"),
      { target: { value: "5000,00" } }
    );

    const submitButton = screen.getByRole("button", { name: /Criar cliente/i });
    await userEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Lucas",
      salary: 1000,
      companyValuation: 5000,
    });
  });

  it("render form in the mode delete normally", () => {
    render(
      <ClientForm
        label="Excluir cliente"
        client={{ name: "Lucas" } as ClientType}
        isDeleteForm
        onHandleDeleteClient={mockDelete}
      />
    );

    expect(
      screen.getByText(/Você está prestes a excluir o cliente/i)
    ).toBeInTheDocument();
    const deleteButton = screen.getByRole("button", {
      name: /Excluir cliente/i,
    });
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalled();
  });
});
