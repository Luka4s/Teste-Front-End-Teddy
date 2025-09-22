import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WelcomeForm from "@/components/WelcomeForm";
import { useClientContext } from "@/context/clientContext";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

jest.mock("@/context/clientContext", () => ({
  useClientContext: jest.fn(),
}));

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("WelcomeForm Component", () => {
  const setUserNameMock = jest.fn();

  beforeEach(() => {
    (useClientContext as jest.Mock).mockReturnValue({
      setUserName: setUserNameMock,
    });
  });

  test("display error message when field is empty", async () => {
    render(
      <BrowserRouter>
        <WelcomeForm />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /entrar/i });

    await fireEvent.submit(button);

    await waitFor(() => {
      expect(
        screen.getByText("Por favor informe um nome valido.")
      ).toBeInTheDocument();
    });

    expect(button).toBeDisabled();
  });

  test("submit the form with a valid name", async () => {
    render(
      <BrowserRouter>
        <WelcomeForm />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText("Digite seu nome:");
    const button = screen.getByRole("button", { name: /entrar/i });

    await userEvent.type(input, "Lucas Seidel");

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    await userEvent.click(button);

    expect(setUserNameMock).toHaveBeenCalledWith("Lucas Seidel");
    expect(mockedNavigate).toHaveBeenCalledWith("/clientes");
  });
});
