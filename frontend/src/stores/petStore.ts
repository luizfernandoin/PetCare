import { Pet } from "@/types/pet";
import { create } from "zustand";

type PetStore = {
  pets: Pet[];
  add: (pet: Pet) => void;
  remove: (id: string) => void;
  clear: () => void;
  addListPet: (pets: Pet[]) => void;
  edit: (pet: Pet) => void;
};

export const usePetStore = create<PetStore>((set) => ({
  pets: [],

  add: (pet) =>
    set((state) => ({
      pets: [...state.pets, pet],
    })),

  remove: (id) =>
    set((state) => ({
      pets: state.pets.filter((p) => p.id !== id),
    })),

  clear: () =>
    set(() => ({
      pets: [],
    })),

  addListPet: (pets) =>
    set((state) => ({
      pets: [...state.pets, ...pets],
    })),

  edit: (pet) =>
    set((state) => ({
      pets: state.pets.map((p) => (p.id === pet.id ? pet : p)),
    })),
}));