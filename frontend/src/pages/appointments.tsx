import { useState } from "react";
import { DataTable } from "@/components/organisms/data-table";
import type { Appointment } from "@/types/Appointment";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionsTable } from "@/components/molecules/table/actions-table";
import { AppointmentModal } from "@/components/molecules/appointments/appointment-modal";

const initialAppointments: Appointment[] = [
    {
        id: "1",
        tutor: "Carlos Silva",
        pet: "Rex",
        servico: "Banho",
        clinica: "Pet Vida",
        status: "pendente",
        data: "2025-07-15",
        horarioInicio: "14:00",
        horarioFim: "15:00",
    },
    {
        id: "2",
        tutor: "Ana Paula",
        pet: "Luna",
        servico: "Vacinação",
        clinica: "Clínica Animal",
        status: "concluído",
        data: "2025-07-14",
        horarioInicio: "09:00",
        horarioFim: "09:30",
    },
];

export default function Appointments() {
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const handleEditClick = (item: Appointment) => {
        setSelectedAppointment(item);
    };
    
    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Tem certeza que deseja excluir este agendamento?");
        if (confirmed) {
            setAppointments((prev) => prev.filter((item) => item.id !== id));
        }
    };

    const columns: ColumnDef<Appointment>[] = [
        { accessorKey: "pet", header: "Pet" },
        { accessorKey: "servico", header: "Serviço" },
        { accessorKey: "clinica", header: "Clínica" },
        {
            accessorKey: "data",
            header: "Data",
            cell: ({ row }) => new Date(row.original.data).toLocaleDateString(),
        },
        { accessorKey: "horarioInicio", header: "Início" },
        { accessorKey: "horarioFim", header: "Fim" },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                const color =
                    status === "concluído"
                        ? "text-green-600"
                        : status === "pendente"
                            ? "text-yellow-600"
                            : "text-red-600";
                return <span className={`font-medium ${color}`}>{status}</span>;
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

    return (
        <>
            <DataTable<Appointment> columns={columns} data={appointments} />

            <AppointmentModal
                appointment={selectedAppointment}
                onSave={(updated) =>
                    setAppointments((prev) =>
                        prev.map((a) => (a.id === updated.id ? updated : a))
                    )
                }
                onClose={() => setSelectedAppointment(null)}
            />
        </>
    );
}
