
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState, type Dispatch, type SetStateAction } from "react"

import { Pet } from "@/types/Pet";

interface props extends Pet {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>,

}

export default function ModalEditPet({ open, setOpen, setPets, name: nm, breed : br, size: si, age: ag, features: fe, image : img }: props) {
  const [name, setName] = useState(nm);
  const [breed, setBreed] = useState(br);
  const [size, setSize] = useState(si);
  const [age, setAge] = useState(ag);
  const [features, setFeatures] = useState(fe);
  const [image, setImage] = useState(img);

  const handleEdit = () => {
    const newPet: Pet = {
      name,
      breed,
      size,
      age: Number(age),
      features,
      image
    };

    setPets(prevPets => prevPets.map(pet => pet.name === nm ? newPet : pet));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Novo Pet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Raça"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />

          <Input
            placeholder="Porte"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />

          <Input
            placeholder="Idade"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />

          <Input
            placeholder="Características"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
          <Input
            placeholder="Imagem URL"
            value={features}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button onClick={handleEdit}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
