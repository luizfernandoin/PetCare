
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState, type Dispatch, type SetStateAction } from "react"

type Pet = {
  name: string;
  breed: string;
  size: string;
  age: number;
  features: string;
  image: string;
};

interface props {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>,
  name: string,
  breed: string,
  size: string,
  age: string,
  features: string,
  imagem: string
}

export default function ModalEditPet({ open, setOpen, setPets, name: nm, breed : br, size: si, age: ag, features: fe, imagem : img }: props) {
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
      <DialogContent>
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
            value={age}
            onChange={(e) => setAge(e.target.value)}
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
