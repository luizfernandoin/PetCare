import * as React from "react"

import { NavMain } from "@/components/organisms/nav-main"
import { NavUser } from "@/components/organisms/nav-user"
import { TeamSwitcher } from "@/components/organisms/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

import { sidebarConfig as data } from "@/config/sidebarConfig"
import { NavSecondary } from "../organisms/nav-secundary";
import type { NavItem } from "@/types/NavItem";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [navMain, setNavMain] = React.useState<NavItem[]>(data.navMain);
    const { role } = useAuthStore()
    useEffect(()=>{
      const permittedRoutes = data.navMain.filter(link=>link.roles.includes(role))  
      console.log("->", permittedRoutes);
      setNavMain(permittedRoutes)
    },[role])

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
