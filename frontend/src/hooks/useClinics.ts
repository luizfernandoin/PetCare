import { useState, useCallback } from 'react';
import { Clinic } from '@/types/clinic';
import { filterClinics } from '@/services/clinic';

export const useClinics = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadClinicsByService = useCallback(async (serviceId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const clinicsData = await filterClinics({ services: [serviceId] });

            if (Array.isArray(clinicsData)) {
                setClinics(clinicsData);
                return clinicsData;
            }
            return [];
        } catch (err) {
            setError('Erro ao carregar clínicas');
            console.error('Erro ao carregar clínicas:', err);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        clinics,
        isLoading,
        error,
        loadClinicsByService,
        setClinics
    };
};