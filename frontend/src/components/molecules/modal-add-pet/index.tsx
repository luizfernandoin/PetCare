
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
  image: string
};

interface props {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setPets: Dispatch<SetStateAction<Pet[]>>
}

export default function ModalAddPet({ open, setOpen, setPets }: props) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [features, setFeatures] = useState("");
  const [image, setImage] = useState("");

  const handleSave = () => {
    const newPet: Pet = {
      name,
      breed,
      size,
      age: Number(age),
      features,
      image
    };
    setPets(prevPets => [...prevPets, newPet]);
    setName("");
    setBreed("");
    setSize("");
    setAge("");
    setFeatures("");
    setImage("")
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
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
