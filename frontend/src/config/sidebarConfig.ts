import { SideBarConfigType } from "@/types/SideBarConfig";
import {
    Home,
    LayoutDashboard,
    PawPrint,
    Stethoscope,
    Users2,
    CalendarDays,
    CalendarCheck2,
    Settings,
    Building2,
    Waves,
    TerminalSquare,
} from "lucide-react";


export const sidebarConfig: SideBarConfigType = {
    user: {
        name: "example",
        email: "example@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },

    teams: [
        {
            name: "Acme Inc",
            logo: Building2,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: Waves,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: TerminalSquare,
            plan: "Free",
        },
    ],

    navMain: [
        {
            title: "Home",
            url: "/home",
            icon: Home,
            roles: ["CLIENTE", "PROFISSIONAL"],
        },
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            roles: ["PROFISSIONAL"],
        },
        {
            title: "Serviços",
            url: "/services",
            icon: Stethoscope,
            roles: ["PROFISSIONAL"],
        },
        {
            title: "Meus Pets",
            url: "/pets",
            icon: PawPrint,
            // items: [
            //     { title: "Cachorros", url: "/pets/cachorros" },
            //     { title: "Gatos", url: "/pets/gatos" },
            //     { title: "Outros", url: "/pets/outros" },
            // ],
            roles: ["CLIENTE"],
        },
        {
            title: "Profissionais",
            url: "/profissionais",
            icon: Users2,
            items: [
                { title: "Veterinários", url: "/profissionais/veterinarios" },
                { title: "Banho & Tosa", url: "/profissionais/banho-tosa" },
                { title: "Atendentes", url: "/profissionais/atendentes" },
            ],
            roles: ["PROFISSIONAL"],
        },
        {
            title: "Calendario",
            url: "/calendar",
            icon: CalendarDays,
            isActive: true,
            roles: ["PROFISSIONAL"],
        },
        {
            title: "Agendamentos",
            url: "/appointments",
            icon: CalendarCheck2,
            isActive: true,
            roles: ["PROFISSIONAL", "CLIENTE"],
        },
    ],

    navSecondary: [
        {
            title: "Settings",
            url: "/configuracoes",
            icon: Settings,
            roles: [],
        },
    ],
};
