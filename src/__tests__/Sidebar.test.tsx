import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "@/components/Sidebar";
import { BrowserRouter } from "react-router-dom";

// Mock do useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("@/assets/LogoTeddy.svg", () => "logo-mock.svg");

describe("Sidebar Component", () => {
  const onSetIsOpenMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSidebar = (isOpen: boolean, currentPath = "/") => {
    return render(
      <BrowserRouter>
        <Sidebar
          isOpen={isOpen}
          onSetIsOpen={onSetIsOpenMock}
          currentPath={currentPath}
        />
      </BrowserRouter>
    );
  };

  test("renderiza a sidebar quando isOpen é true", () => {
    renderSidebar(true);

    expect(
      screen.getByAltText("Logo Teddy - Open Finance")
    ).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Clietes")).toBeInTheDocument();
    expect(screen.getByText("Clientes selecionados")).toBeInTheDocument();
  });

  test("não renderiza a sidebar quando isOpen é false", () => {
    renderSidebar(false);

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Clietes")).not.toBeInTheDocument();
  });

  test("fecha a sidebar ao clicar no overlay", () => {
    renderSidebar(true);

    const overlay = screen.getByTestId("sidebar-overlay");
    fireEvent.click(overlay);
    expect(onSetIsOpenMock).toHaveBeenCalledWith(false);

    expect(onSetIsOpenMock).toHaveBeenCalledWith(false);
  });

  test("navega para a rota Home ao clicar no botão", () => {
    renderSidebar(true);

    fireEvent.click(screen.getByText("Home"));
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  test("navega para Clientes selecionados ao clicar no botão", () => {
    renderSidebar(true);

    fireEvent.click(screen.getByText("Clientes selecionados"));
    expect(mockedNavigate).toHaveBeenCalledWith("/clientes-selecionados");
  });

  test("aplica destaque corretamente no botão atual", () => {
    renderSidebar(true, "/clientes-selecionados");

    const btn = screen.getByText("Clientes selecionados").closest("button");
    expect(btn).toHaveClass("text-orange-color");
    expect(btn).toHaveClass("border-r-2");
  });
});
