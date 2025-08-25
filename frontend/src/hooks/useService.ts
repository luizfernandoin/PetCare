import { useState } from 'react';
import { Service } from '@/types/service';
import { getAllServices } from '@/services/service';

export const useServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadServices = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const servicesData = await getAllServices();
            if (Array.isArray(servicesData)) {
                setServices(servicesData);
            }
        } catch (err) {
            setError('Erro ao carregar serviços');
            console.error('Erro ao carregar serviços:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        services,
        isLoading,
        error,
        loadServices,
        setServices
    };
};