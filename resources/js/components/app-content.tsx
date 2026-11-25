import * as React from 'react';
import { SidebarInset } from '@/components/ui/sidebar';
import type { AppVariant } from '@/types';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type Props = React.ComponentProps<'main'> & {
    variant?: AppVariant;
};

export function AppContent({
    variant = 'sidebar',
    children,
    className,
    ...props
}: Props) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset className={className} {...props}>
                {children}
            </SidebarInset>
        );
    }

    return (
        <main
            className={
                IS_BOOTSTRAP
                    ? `container-fluid d-flex flex-column gap-4 mx-auto flex-grow-1 ${className ?? ''}`
                    : `max-w-7xl gap-4 rounded-xl mx-auto flex h-full w-full flex-1 flex-col ${className ?? ''}`
            }
            {...props}
        >
            {children}
        </main>
    );
}
