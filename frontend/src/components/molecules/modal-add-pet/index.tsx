
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import { useFormValidation } from "@/hooks/useFormValidation";
import { petCreateSchema } from "@petcare/shared";
import { PetCreate, PortePet } from "@/types/pet";

interface props {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setPets: Dispatch<SetStateAction<PetCreate[]>>
}

export default function ModalAddPet({ open, setOpen, setPets }: props) {
  const {
    values: pet,
    errors,
    setErrors,
    handleChange,
    validateForm,
    isFormValid,
    setValues
  } = useFormValidation<PetCreate>({
    name: "",
    breed: "",
    age: 0,
    size: "MÉDIO" as PortePet,
    features: "",
    image: ""
  }, petCreateSchema);


  const clearValues = () => {
    setValues({
      name: "",
      breed: "",
      age: 0,
      size: "MÉDIO" as PortePet,
      features: "",
      image: ""
    });

    setErrors({});
  }

  useEffect(() => {
    if (!open) {
      clearValues();
    }
  }, [open, setValues]);


  const handleSave = () => {
    if (!validateForm()) return;

    setPets(prevPets => [...prevPets, pet]);

    clearValues();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Novo Pet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Input
              placeholder="Nome"
              value={pet.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <Input
              placeholder="Raça"
              value={pet.breed}
              onChange={(e) => handleChange("breed", e.target.value)}
            />
            {errors.breed && <p className="text-red-500 text-xs mt-1">{errors.breed}</p>}
          </div>
          <div>
            <select
              value={pet.size}
              onChange={(e) => handleChange("size", e.target.value as PortePet)}
              className="w-full p-2 border rounded"
            >
              <option value="PEQUENO">Pequeno</option>
              <option value="MÉDIO">Médio</option>
              <option value="GRANDE">Grande</option>
            </select>
            {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
          </div>
          <div>
            <Input
              type="number"
              placeholder="Idade"
              value={pet.age}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : Number(e.target.value)
                handleChange("age", value)
              }
              }
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
          <div>
            <Input
              placeholder="Características"
              value={pet.features}
              onChange={(e) => handleChange("features", e.target.value)}
            />
            {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features}</p>}
          </div>
          <div>
            <Input
              placeholder="Imagem URL"
              value={pet.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          </div>
          <Button
            onClick={handleSave}
            disabled={!isFormValid()}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
