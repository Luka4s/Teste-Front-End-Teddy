import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClientContext } from "@/context/clientContext";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Por favor informe um nome valido." }),
});

type FormType = z.infer<typeof FormSchema>;

const WelcomeForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormType>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
  });
  const { setUserName } = useClientContext();

  const handleSubmitForm = (data: FormType) => {
    const userName = data.name;

    setUserName(userName);
    navigate("/clientes");
  };

  return (
    <div className="flex flex-col space-y-2.5">
      <h1 className="text-3xl text-center">Olá, seja bem-vindo! </h1>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col space-y-2.5"
      >
        <Input
          placeholder="Digite seu nome:"
          className="border-input-color placeholder:text-input-text outline-0 focus:border-orange-color w-92 lg:w-lg rounded-xs border"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}

        <Button
          type="submit"
          disabled={!isValid}
          className="bg-orange-color  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-color/50  rounded-xs hover:bg-orange-color hover:cursor-pointer active:scale-90"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default WelcomeForm;
