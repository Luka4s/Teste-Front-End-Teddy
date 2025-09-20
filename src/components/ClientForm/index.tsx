import type { ClientType, ClientDataForm } from "@/types/Client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";

interface ClientFormProps {
  label: string;
  client?: ClientType;
  isDeleteForm?: boolean;
  onHandleDeleteClient?: () => void;
  onHandleSubmitForm?: (data: ClientDataForm) => void;
}

const ClientFormSchema = z.object({
  name: z.string().min(1, { message: "Por favor informe um nome válido." }),
  salary: z
    .string()
    .min(1, { message: "Por favor informe um salário válido." }),
  companyValuation: z
    .string()
    .min(1, { message: "Por favor informe um valor de empresa válido." }),
});

type ClientFormType = z.infer<typeof ClientFormSchema>;

const ClientForm = ({
  isDeleteForm,
  label,
  client,
  onHandleDeleteClient,
  onHandleSubmitForm,
}: ClientFormProps) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ClientFormType>({
    mode: "onChange",
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: client?.name || "",
      salary: client?.salary
        ? client.salary.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "",
      companyValuation: client?.companyValuation
        ? client.companyValuation.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "",
    },
  });

  const handleSubmitForm = (data: ClientFormType) => {
    const formattedData = {
      ...data,
      salary: Number(data.salary.replace(/\./g, "").replace(",", ".")),
      companyValuation: Number(
        data.companyValuation.replace(/\./g, "").replace(",", ".")
      ),
    };

    console.log("Dados enviados do formulário => ", formattedData);
    onHandleSubmitForm?.(formattedData);
    reset();
  };

  return (
    <div className="flex flex-col">
      {isDeleteForm ? (
        <div className="flex flex-col space-y-2.5">
          <p>
            {" "}
            Você está prestes a excluir o cliente:{" "}
            <strong>{client?.name}</strong>
          </p>
          <Button
            onClick={() => onHandleDeleteClient?.()}
            className="bg-orange-color  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-color/50  rounded-xs hover:bg-orange-color hover:cursor-pointer active:scale-90"
          >
            {label}
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col"
        >
          <div className="flex flex-col space-y-2.5">
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    placeholder="Digite o nome:"
                    className="border-input-color placeholder:text-input-text outline-0 focus-visible:ring-0 focus-visible:border-orange-color rounded-xs"
                  />
                );
              }}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}

            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask={Number}
                  radix=","
                  thousandsSeparator="."
                  scale={2}
                  padFractionalZeros={true}
                  placeholder="Digite o salário:"
                  className="border p-1 border-input-color placeholder:px-2 placeholder:text-sm placeholder:text-input-text outline-0 focus:border-orange-color rounded-xs shadow-xs"
                  onAccept={(value: string) => field.onChange(value)}
                  value={field.value}
                />
              )}
            />

            {errors.salary && (
              <p className="text-sm text-red-600">{errors.salary.message}</p>
            )}

            <Controller
              name="companyValuation"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask={Number}
                  radix=","
                  thousandsSeparator="."
                  scale={2}
                  padFractionalZeros={true}
                  placeholder="Digite o valor da empresa:"
                  className="border p-1 border-input-color placeholder:px-2 placeholder:text-sm placeholder:text-input-text outline-0 focus:border-orange-color rounded-xs shadow-xs"
                  onAccept={(value: string) => field.onChange(value)}
                  value={field.value}
                />
              )}
            />
            {errors.companyValuation && (
              <p className="text-sm text-red-600">
                {errors.companyValuation.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-orange-color"
            >
              {label}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ClientForm;
