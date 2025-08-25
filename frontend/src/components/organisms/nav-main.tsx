"use client";

import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types/NavItem";


export function NavMain({ items }: { items: NavItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = item.items && item.items.length > 0;

                    if (hasChildren) {
                        return (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon className="size-5" />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <NavLink
                                                            to={subItem.url}
                                                            className={({ isActive }) =>
                                                                `w-full ${isActive
                                                                    ? "bg-muted text-primary"
                                                                    : "text-muted-foreground hover:bg-muted"
                                                                } rounded px-3 py-2 transition flex items-center`
                                                            }
                                                        >
                                                            <span>{subItem.title}</span>
                                                        </NavLink>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 w-full ${isActive
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground hover:bg-muted"
                                        } rounded px-3 py-2 transition`
                                    }
                                >
                                    {item.icon && <item.icon className="size-5" />}
                                    <span>{item.title}</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}