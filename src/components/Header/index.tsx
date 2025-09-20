import logo from "@/assets/Logo - Teddy.svg";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <div className="flex w-full max-h-24 p-4 px-5 items-center justify-between bg-white shadow">
      <div className="flex gap-10 items-center">
        <Menu />
        <img src={logo} alt="Logo Teddy - Open finance" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-10">
        <span>Cliente</span>
        <span>Clientes selecionados</span>
        <span>Sair</span>
      </div>
      <div>
        <span>Olá,</span>
        <strong>Lucas Seidel</strong>
      </div>
    </div>
  );
};

export default Header;
