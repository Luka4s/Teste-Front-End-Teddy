import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

const WelcomeForm = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>();

  return (
    <div className="flex flex-col space-y-2.5">
      <h1 className="text-3xl text-center">Olá, seja bem-vindo! </h1>

      <Input
        placeholder="Digite seu nome:"
        className="border-input-color placeholder:text-input-color outline-0 focus:border-orange-color w-lg rounded-xs border"
        onChange={(e) => setUserName(e.target.value)}
      />

      <Button
        onClick={() => navigate("/clientes", { state: userName })}
        className="bg-orange-color rounded-xs hover:bg-orange-color hover:cursor-pointer active:scale-90"
      >
        Entrar
      </Button>
    </div>
  );
};

export default WelcomeForm;
