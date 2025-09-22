import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";
import { useClientContext } from "@/context/clientContext";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom";

jest.mock("@/context/clientContext", () => ({
  useClientContext: jest.fn(),
}));

jest.mock("@/assets/LogoTeddy.svg", () => "logo-mock.svg");

describe("Header Component", () => {
  beforeEach(() => {
    (useClientContext as jest.Mock).mockReturnValue({ userName: "Lucas" });
  });

  test("renderiza elementos principais", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logo = screen.getByAltText("Logo Teddy - Open finance");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "logo-mock.svg");

    expect(screen.getByText("Olá,")).toBeInTheDocument();
    expect(screen.getByText("Lucas!")).toBeInTheDocument();

    expect(screen.getByText("Clientes")).toBeInTheDocument();
    expect(screen.getByText("Clientes selecionados")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  test("abre o menu quando clica no Menu", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const menuButton = screen.getByLabelText("Menu");
    fireEvent.click(menuButton);
  });
});
