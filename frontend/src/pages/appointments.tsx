import { useEffect, useState } from "react";
import { DataTable } from "@/components/organisms/data-table";
import type { Appointment, AppointmentDisplay, AppointmentFull } from "@/types/Appointment";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionsTable } from "@/components/molecules/table/actions-table";
import { PageHeader } from "@/components/molecules/page-header";
import { getAppointmentsByUserId } from "@/services/appointments";
import { getPetsByUser } from "@/services/pet";
import { Pet } from "@/types/pet";
import { Service } from "@/types/service";
import { Clinic } from "@/types/clinic";
import { getAllServices } from "@/services/service";
import { filterClinics } from "@/services/clinic";
import ModalAddAppointment from "@/components/molecules/modal-add-appointment";
import { RefreshCw } from "lucide-react";
// import ModalAddAppointment from "@/components/molecules/modal-add-appointment";


export default function Appointments() {
    const [appointments, setAppointments] = useState<AppointmentDisplay[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setIsLoading(true);
            await Promise.all([
                loadAppointments(),
                loadPets(),
                loadServices()
            ]);
        } catch (error) {
            setError("Erro ao carregar dados.");
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    const loadAppointments = async () => {
        try {
            const response = await getAppointmentsByUserId();
            if (Array.isArray(response?.data)) {
                const formattedAppointments: AppointmentDisplay[] = response.data.map((item: AppointmentFull) => ({
                    id: item.id,
                    pet: item.pet.name,
                    service: item.service.type,
                    clinic: item.clinic.name,
                    date: item.appointmentDate,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    status: item.status.toLowerCase(),
                }));
                setAppointments(formattedAppointments);
            }
        } catch (error) {
            console.error("Erro ao carregar agendamentos:", error);
            throw error;
        }
    };

    const loadPets = async () => {
        try {
            const pets = await getPetsByUser();

            if (Array.isArray(pets)) {
                setPets(pets);
            }
        } catch (error) {
            console.error("Erro ao carregar pets:", error);
            throw error;
        }
    };

    const loadServices = async () => {
        try {
            const services = await getAllServices();

            if (Array.isArray(services)) {
                setServices(services);
            }
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
            throw error;
        }
    };

    const loadClinicsByService = async (serviceId: string) => {
        try {
            const clinics = await filterClinics({ services: [serviceId] });
            
            console.log("CLinicas: ", clinics);
            if (Array.isArray(clinics)) {
                setClinics(clinics);
                return clinics;
            }
            return [];
        } catch (error) {
            console.error("Erro ao carregar clínicas:", error);
            return [];
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        loadData();
    };

    const handleEditClick = (item: AppointmentDisplay) => {
        console.log("Editar agendamento:", item);
    };

    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Tem certeza que deseja excluir este agendamento?");
        if (confirmed) {
            try {
                // Aqui você deve chamar a API para deletar o agendamento
                // await deleteAppointment(id);
                setAppointments((prev) => prev.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Erro ao deletar agendamento:", error);
                alert("Erro ao deletar agendamento.");
            }
        }
    };

    const handleAppointmentCreated = (newAppointment: AppointmentFull) => {
        console.log("New Appointment: ", newAppointment);
        const formattedAppointment: AppointmentDisplay = {
            id: newAppointment.id,
            pet: newAppointment.pet.name,
            service: newAppointment.service.type,
            clinic: newAppointment.clinic.name,
            date: newAppointment.appointmentDate,
            startTime: newAppointment.startTime,
            endTime: newAppointment.endTime,
            status: newAppointment.status.toLowerCase(),
        };

        setAppointments(prev => [...prev, formattedAppointment]);
        setOpenModal(false);
    };

    const columns: ColumnDef<AppointmentDisplay>[] = [
        { accessorKey: "pet", header: "Pet" },
        { accessorKey: "service", header: "Serviço" },
        { accessorKey: "clinic", header: "Clínica" },
        {
            accessorKey: "date",
            header: "Data",
            cell: ({ row }) => new Date(row.original.date).toLocaleDateString("pt-BR"),
        },
        { accessorKey: "startTime", header: "Início" },
        { accessorKey: "endTime", header: "Fim" },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                const colorMap = {
                    "confirmado": "text-green-600 bg-green-100",
                    "pendente": "text-yellow-600 bg-yellow-100",
                    "cancelado": "text-red-600 bg-red-100",
                    "concluído": "text-blue-600 bg-blue-100"
                };

                const statusClass = colorMap[status as keyof typeof colorMap] || "text-gray-600 bg-gray-100";

                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                        {status}
                    </span>
                );

            },
        },
        {
            id: "actions",
            header: "Ações",
            cell: ({ row }) => (
                <ActionsTable
                    item={row.original}
                    getId={(item) => item.id}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Carregando agendamentos...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageHeader
                title="Meus Agendamentos"
                description="Todos os seus agendamentos registrados"
                buttonLabel="Agendar Serviço"
                onButtonClick={() => {
                    setOpenModal(true)
                }}
            />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <DataTable<AppointmentDisplay> 
                columns={columns} 
                data={appointments}
            />

            <ModalAddAppointment
                open={openModal}
                onOpenChange={setOpenModal}
                pets={pets}
                services={services}
                clinics={clinics}
                onClinicsRequest={loadClinicsByService}
                onAppointmentCreated={handleAppointmentCreated}
            />
        </>
    );
}
