
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useFormValidation } from "@/hooks/useFormValidation";
import { PetCreate, PortePet } from "@/types/pet";
import { petUpdateSchema } from "@petcare/shared";
import { type Dispatch, type SetStateAction } from "react"


interface props extends PetCreate {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setPets: React.Dispatch<React.SetStateAction<PetCreate[]>>,

}

export default function ModalEditPet({ open, setOpen, setPets, name: nm, breed: br, size: si, age: ag, features: fe, image: img }: props) {
  const {
    values: petEdit,
    errors,
    handleChange,
    validateForm
  } = useFormValidation({
    name: nm,
    breed: br,
    age: ag,
    size: si,
    features: fe,
    image: img
  }, petUpdateSchema);

  const handleEdit = () => {
    if (!validateForm()) return;

    setPets(prevPets => prevPets.map(pet => pet.name === nm ? petEdit : pet));
    setOpen(false);
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
              value={petEdit.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <Input
              placeholder="Raça"
              value={petEdit.breed}
              onChange={(e) => handleChange("breed", e.target.value)}
            />
            {errors.breed && <p className="text-red-500 text-xs mt-1">{errors.breed}</p>}
          </div>
          <div>
            <select
              value={petEdit.size}
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
              value={petEdit.age}
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
              value={petEdit.features}
              onChange={(e) => handleChange("features", e.target.value)}
            />
            {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features}</p>}
          </div>
          <div>
            <Input
              placeholder="Imagem URL"
              value={petEdit.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          </div>
          <Button onClick={handleEdit}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
