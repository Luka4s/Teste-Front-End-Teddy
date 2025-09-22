import logo from "@/assets/LogoTeddy.svg";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useClientContext } from "@/context/clientContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { userName } = useClientContext();

  const navigate = useNavigate();

  const currentPath = location.pathname;

  return (
    <div className="flex w-full h-24 max-h-24 p-4 px-5 gap-2 items-center justify-around bg-white shadow">
      <div className="flex gap-10 items-center">
        <div className="min-w-14 flex justify-center">
          {!open && (
            <button>
              {" "}
              <Menu
                aria-label="Menu"
                onClick={() => setOpen(true)}
                className="hover:cursor-pointer"
              />
            </button>
          )}
          <Sidebar
            isOpen={open}
            onSetIsOpen={setOpen}
            currentPath={currentPath}
          />
        </div>
        <img
          src={logo}
          alt="Logo Teddy - Open finance"
          className="hidden md:flex"
        />
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 md:gap-10">
        <button
          onClick={() => navigate("/clientes")}
          className={`hover:underline hover:cursor-pointer  ${
            currentPath === "/clientes" && "text-orange-color underline"
          }`}
        >
          Clientes
        </button>
        <button
          onClick={() => navigate("/clientes-selecionados")}
          className={`hover:underline hover:cursor-pointer ${
            currentPath === "/clientes-selecionados" &&
            "text-orange-color underline"
          }`}
        >
          Clientes selecionados
        </button>
        <button
          onClick={() => navigate("/")}
          className="hover:underline hover:cursor-pointer"
        >
          Sair
        </button>
      </div>
      <div>
        <span>Olá, </span>
        <strong>{userName}!</strong>
      </div>
    </div>
  );
};

export default Header;
