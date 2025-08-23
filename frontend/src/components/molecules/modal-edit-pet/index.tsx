
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useFormValidation } from "@/hooks/useFormValidation";
import { updatePet } from "@/services/pet";
import { usePetStore } from "@/stores/petStore";
import { Pet } from "@/types/pet";
import { petUpdateSchema } from "@petcare/shared";
import { PET_SIZE } from "@petcare/shared/enums";
import { type Dispatch, type SetStateAction } from "react"


interface props {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  pet: Pet
}

export default function ModalEditPet({ open, setOpen, pet}: props) {
  const { edit } = usePetStore();
  const {
    values: petEdit,
    errors,
    handleChange,
    validateForm
  } = useFormValidation({
    name: pet.name,
    breed: pet.breed,
    age: pet.age,
    size: pet.size,
    characteristics: pet.characteristics,
    image: pet.image
  }, petUpdateSchema);

  const handleEdit = async () => {
    if (!validateForm()) return;

    const petDto: Pet = {...pet, ...petEdit};

    const petUpdated = await updatePet(pet.id, petDto)

    edit(petUpdated);
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
              onChange={(e) => handleChange("size", e.target.value as PET_SIZE)}
              className="w-full p-2 border rounded"
            >
              <option value={PET_SIZE.SMALL}>Pequeno</option>
              <option value={PET_SIZE.MEDIUM}>Médio</option>
              <option value={PET_SIZE.LARGE}>Grande</option>
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
              value={petEdit.characteristics}
              onChange={(e) => handleChange("characteristics", e.target.value)}
            />
            {errors.characteristics && <p className="text-red-500 text-xs mt-1">{errors.characteristics}</p>}
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
