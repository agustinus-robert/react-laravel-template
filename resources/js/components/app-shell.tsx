import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { AppVariant } from '@/types';

type Props = {
    children: ReactNode;
    variant?: AppVariant;
};

type Theme = 'bootstrap' | 'tailwind';

const theme = (import.meta.env.VITE_THEME || 'tailwind') as Theme;

function BootstrapShell({ children, variant = 'sidebar' }: Props) {
    const isOpen = usePage().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div className="d-flex min-vh-100 w-100 flex-column">
                {children}
            </div>
        );
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}

function TailwindShell({ children, variant = 'sidebar' }: Props) {
    const isOpen = usePage().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}

export function AppShell(props: Props) {
    return theme === 'bootstrap' ? (
        <BootstrapShell {...props} />
    ) : (
        <TailwindShell {...props} />
    );
}
