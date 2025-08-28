import { LucideIcon } from "lucide-react";
import { AuthRole } from "./auth";

interface SidebarNavItem {
    title: string;
    url: string;
    icon: LucideIcon;
    roles: AuthRole[]; // usuários permitidos
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
}

interface Team {
    name: string;
    logo: LucideIcon;
    plan: string;
}

interface User {
    name: string;
    email: string;
    avatar: string;
}

export interface SideBarConfigType {
    user: User;
    teams: Team[];
    navMain: SidebarNavItem[];
    navSecondary: SidebarNavItem[];
}
