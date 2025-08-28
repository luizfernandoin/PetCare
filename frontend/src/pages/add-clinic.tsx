import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/hooks/useFormValidation";
import { PetShop, PetShopCreate } from "@/types/Petshop";
import { clinicCreateSchema } from "@petcare/shared";
import { createClinica } from "@/services/petshop";
import { useAuthStore } from "@/stores/authStore";

const defaultClinic: PetShopCreate = {
  name: "PetShopAbc",
  phone: "123123123123",
  location: {
    country: "Brasil",
    state: "PB",
    city: "Cajazeiras",
    street: "rua",
    number: "1",
    postalcode: "58900-000"
  },
  image: "data:image/jpeg;base64,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"
};

export function AddClinicPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setClinic, clinic : myClinic, user } = useAuthStore();
  console.log(myClinic, user);

   useEffect(() => {
    if (myClinic) {
      navigate("/dashboard");
    }
  }, [myClinic])
  

  const {
    values: clinic,
    errors,
    handleChange,
    validateForm,
    isFormValid
  } = useFormValidation<PetShopCreate>(defaultClinic, clinicCreateSchema);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const newClinic: PetShop | undefined = await createClinica(clinic);
      console.log("newClinic", newClinic);
      

      if (newClinic) {
        //alert("Clínica criada com sucesso!");
        setClinic(newClinic);
      } else {
        alert("Erro ao criar clínica.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao criar clínica.");
    } finally {
      setIsLoading(false);
    }
  };

 

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      <div className="bg-white rounded-lg w-full max-w-md p-8 space-y-6 shadow">
        <h2 className="text-xl font-semibold text-center text-[#3C6D7F]">Adicionar Clínica</h2>

        <div className="space-y-4">
          <InputField
            placeholder="Nome da Clínica"
            value={clinic.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

          <InputField
            placeholder="Telefone"
            value={clinic.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

          <InputField
            placeholder="País"
            value={clinic.location.country}
            onChange={(e) =>
              handleChange("location", { ...clinic.location, country: e.target.value })
            }
          />

          <InputField
            placeholder="Estado"
            value={clinic.location.state}
            onChange={(e) =>
              handleChange("location", { ...clinic.location, state: e.target.value })
            }
          />

          <InputField
            placeholder="Cidade"
            value={clinic.location.city}
            onChange={(e) =>
              handleChange("location", { ...clinic.location, city: e.target.value })
            }
          />

          <InputField
            placeholder="Rua"
            value={clinic.location.street}
            onChange={(e) =>
              handleChange("location", { ...clinic.location, street: e.target.value })
            }
          />

          <InputField
            placeholder="Número"
            value={clinic.location.number}
            onChange={(e) =>
              handleChange("location", { ...clinic.location, number: e.target.value })
            }
          />

          <InputField
            placeholder="Código Postal"
            value={clinic.location.postalcode}
            onChange={(e) =>
              handleChange("location", { ...clinic.location, postalcode: e.target.value })
            }
          />

          <InputField
            placeholder="URL da Imagem (opcional)"
            value={clinic.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={() => navigate("/clinics")} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid() || isLoading}>
            {isLoading ? "Criando..." : "Adicionar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
