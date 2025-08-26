import { useEffect, useState } from "react";
import { DataTable } from "@/components/organisms/data-table";
import type { AppointmentDisplay, AppointmentFull } from "@/types/Appointment";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionsTable } from "@/components/molecules/table/actions-table";
import { PageHeader } from "@/components/molecules/page-header";
import ModalAddAppointment from "@/components/molecules/modal-add-appointment";
import { RefreshCw } from "lucide-react";
import { useAppointment } from "@/hooks/useAppointment";
import { useClinics } from "@/hooks/useClinics";
import { useServices } from "@/hooks/useService";
import { usePets } from "@/hooks/usePets";
import { useAuthStore } from "@/stores/authStore";


export default function Appointments() {
    const {
        appointments,
        isLoading: isLoadingAppointments,
        error: appointmentError,
        loadAppointments,
        loadAllAppointments,
        deleteAppointment,
        clearError: clearAppointmentError
    } = useAppointment();

    const {
        pets,
        isLoading: isLoadingPets,
        error: petsError,
        loadPets,
        loadAllPets
    } = usePets();

    const {
        services,
        isLoading: isLoadingServices,
        error: servicesError,
        loadServices
    } = useServices();

    const {
        clinics,
        error: clinicsError,
        loadClinicsByService,
        loadAllClinics
    } = useClinics();

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const isLoading = isLoadingAppointments || isLoadingPets || isLoadingServices;
    const error = appointmentError || petsError || servicesError || clinicsError;


    useEffect(() => {
        loadData();
    }, []);

    const {role} = useAuthStore()

    const loadData = async () => {
        try {
            setIsRefreshing(true);
            role === "CLIENT" && await Promise.all([
                loadAppointments(),
                loadPets(),
                loadServices(),
                loadAllClinics()
            ]);

            role === "PROFESSIONAL" && await Promise.all([
                loadAllAppointments(),
                loadAllPets(),
                loadServices(),
                loadAllClinics()
            ]);

            console.log(appointments);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleRefresh = () => {
        loadData();
    };

    const handleEditClick = (item: AppointmentDisplay) => {
        console.log("Editar agendamento:", item);
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("Tem certeza que deseja excluir este agendamento?");
        if (confirmed) {
            try {
                await deleteAppointment(id);
            } catch (error) {
                console.error("Erro ao deletar agendamento:", error);
                alert("Erro ao deletar agendamento.");
            }
        }
    };

    const handleAppointmentCreated = async () => {
        try {
            setOpenModal(false);
            await loadAppointments();
        } catch (error) {
            console.error("Erro após criar agendamento:", error);
        }
    };

    const clearAllErrors = () => {
        clearAppointmentError();
    };

    const formattedAppointments: AppointmentDisplay[] = appointments.map((item: AppointmentFull) => ({
        id: item.id,
        pet: item.pet.name,
        service: item.service.type,
        clinic: item.clinic.name,
        date: item.appointmentDate,
        startTime: item.startTime,
        endTime: item.endTime,
        status: item.status.toLowerCase(),
    }));

    const columns: ColumnDef<AppointmentDisplay>[] = [
        { accessorKey: "pet", header: "Pet" },
        { accessorKey: "service", header: "Serviço" },
        { accessorKey: "clinic", header: "Clínica" },
        {
            accessorKey: "date",
            header: "Data",
            cell: ({ row }) => {
                const date = new Date(row.original.date);
                return `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
            },

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
                onButtonClick={() => setOpenModal(true)}
            />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <button
                        onClick={clearAllErrors}
                        className="ml-4 text-red-800 hover:text-red-900"
                    >
                        ×
                    </button>
                </div>
            )}

            <DataTable<AppointmentDisplay>
                columns={columns}
                data={formattedAppointments}
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
