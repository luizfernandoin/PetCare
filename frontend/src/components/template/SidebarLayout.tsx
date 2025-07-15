import { AppSidebar } from "@/components/template/app-sidebar";
import { SiteHeader } from "@/components/organisms/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { usePageTitle } from "@/hooks/usePageTitle";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
    const pageTitle = usePageTitle();

    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader pageTitle={pageTitle} />
                <div className="flex-1 p-4 flex flex-col">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}