import { useState, useCallback } from 'react';
import { Clinic } from '@/types/clinic';
import { filterClinics } from '@/services/clinic';
import { getAllClinicas } from '@/services/petshop';

export const useClinics = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadAllClinics = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const clinicsData = await getAllClinicas();
            if (Array.isArray(clinicsData)) {
                setClinics(clinicsData.map((clinic) => ({ ...clinic, location: '' })));
            }
        } catch (err) {
            setError('Erro ao carregar clínicas');
            console.error('Erro ao carregar clínicas:', err);
        } finally {
            setIsLoading(false);
        }
    };

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
        loadAllClinics,
        setClinics
    };
};