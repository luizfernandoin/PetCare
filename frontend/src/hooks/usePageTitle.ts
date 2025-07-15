import { useLocation } from "react-router";
import { useMemo } from "react";
import { sidebarConfig } from "@/config/sidebarConfig";

export function usePageTitle(): string {
    const { pathname } = useLocation();

    const title = useMemo(() => {
        const main = sidebarConfig.navMain.find((item) => pathname.startsWith(item.url));
        if (main) return main.title;

        for (const item of sidebarConfig.navMain) {
            if (item.items) {
                const sub = item.items.find((subItem) => pathname.startsWith(subItem.url));
                if (sub) return sub.title;
            }
        }

        return "Página";
    }, [pathname]);

    return title;
}
