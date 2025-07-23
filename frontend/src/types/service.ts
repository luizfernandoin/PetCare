type ServiceRole = 'CONSULTA' | 'VACINAÇÃO' | 'EXAME' | 'OUTROS';

type Service = {
    id: string;
    tipo: ServiceRole;
    observacoes?: string;
    clinicaId: string;
}

type ServiceCreate = Omit<Service, 'id'>;

type ServiceUpdate = Partial<ServiceCreate>;


export {
    ServiceRole,
    Service,
    ServiceCreate,
    ServiceUpdate,
};