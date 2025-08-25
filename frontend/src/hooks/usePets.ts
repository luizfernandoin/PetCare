import { useState } from 'react';
import { Pet } from '@/types/pet';
import { getPetsByUser } from '@/services/pet';

export const usePets = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadPets = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const petsData = await getPetsByUser();
            if (Array.isArray(petsData)) {
                setPets(petsData);
            }
        } catch (err) {
            setError('Erro ao carregar pets');
            console.error('Erro ao carregar pets:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        pets,
        isLoading,
        error,
        loadPets,
        setPets
    };
};