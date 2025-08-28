export type NavItem = {
    title: string;
    url: string;
    icon?: React.ElementType;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
    roles?: string[];
};