import { Outlet } from "react-router";
import { SidebarLayout as Layout } from "@/components/template/SidebarLayout";

export function SidebarLayoutWrapper() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}