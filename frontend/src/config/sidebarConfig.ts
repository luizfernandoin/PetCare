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


export const sidebarConfig = {
    user: {
        name: "shadcn",
        email: "m@example.com",
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
            roles: [],
        },
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            roles: [],
        },
        {
            title: "Serviços",
            url: "/services",
            icon: Stethoscope,
            roles: [],
        },
        {
            title: "Meus Pets",
            url: "/pets",
            icon: PawPrint,
            items: [
                { title: "Cachorros", url: "/pets/cachorros" },
                { title: "Gatos", url: "/pets/gatos" },
                { title: "Outros", url: "/pets/outros" },
            ],
            roles: [],
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
            roles: [],
        },
        {
            title: "Calendario",
            url: "/calendario",
            icon: CalendarDays,
            isActive: true,
            roles: [],
        },
        {
            title: "Agendamentos",
            url: "/agendamentos",
            icon: CalendarCheck2,
            isActive: true,
            roles: [],
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
