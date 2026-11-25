import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import {
    LayoutDashboard,
    Home,
    Users,
    Settings,
    FileText,
    BarChart3,
    Bell,
    X,
    Share2,
    Rss,
    Globe,
    LayoutTemplate,
    Building,
} from 'lucide-react';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const [open, setOpen] = useState(false);

    const menus = [
        {
            label: 'Home',
            icon: Home,
            href: '/dashboard',
        },
        {
            label: 'Users',
            icon: Users,
            href: '/',
        },
        {
            label: 'Hotel',
            icon: Building,
            href: '/hotel/dashboard',
        },
        {
            label: 'Forum',
            icon: Share2,
            href: '/',
        },
        {
            label: 'Page Builder',
            icon: LayoutTemplate,
            href: '/pagebuilder/init',
        },
        {
            label: 'CMS',
            icon: Rss,
            href: '/cms/dashboard',
        },
        {
            label: 'Posts',
            icon: FileText,
            href: '/',
        },
        {
            label: 'Reports',
            icon: BarChart3,
            href: '/',
        },
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: '/',
        },
    ];

    return (
        <header
            className={
                IS_BOOTSTRAP
                    ? 'd-flex align-items-center gap-2 px-3 border-bottom flex-shrink-0'
                    : 'h-16 gap-2 border-sidebar-border/50 px-6 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4 flex shrink-0 items-center border-b transition-[width,height] ease-linear'
            }
            style={IS_BOOTSTRAP ? { height: '4rem' } : undefined}
        >
            <div
                className={
                    IS_BOOTSTRAP
                        ? 'd-flex align-items-center gap-2 w-100'
                        : 'gap-2 flex w-full items-center'
                }
            >
                <SidebarTrigger className={IS_BOOTSTRAP ? 'me-1' : '-ml-1'} />

                <Link
                    href="/"
                    className={
                        IS_BOOTSTRAP
                            ? 'd-inline-flex align-items-center gap-2 rounded px-3 py-2 small fw-medium text-body text-decoration-none bg-body-secondary'
                            : 'gap-2 rounded-md bg-black/10 px-3 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm hover:bg-black/20 hover:text-foreground dark:bg-white/5 dark:hover:bg-white/10 flex items-center transition-colors'
                    }
                >
                    <Globe
                        size={20}
                        className={IS_BOOTSTRAP ? '' : 'h-5 w-5'}
                    />
                    <span>Ke Beranda</span>
                </Link>
            </div>
        </header>
    );
}
