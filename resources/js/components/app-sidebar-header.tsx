import { Link, usePage } from '@inertiajs/react';
import { Globe } from 'lucide-react';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export function AppSidebarHeader() {
    const { url } = usePage();
    const isDashboard = url === '/' || url.split('?')[0] === '/';

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
                <Link
                    href="/"
                    className={
                        IS_BOOTSTRAP
                            ? `d-inline-flex align-items-center gap-2 rounded px-3 py-2 small fw-medium text-decoration-none ${
                                  isDashboard
                                      ? 'bg-primary text-white'
                                      : 'bg-body-secondary text-body'
                              }`
                            : `gap-2 rounded-md px-3 py-2 text-sm font-medium backdrop-blur-sm flex items-center transition-colors ${
                                  isDashboard
                                      ? 'bg-primary/15 text-primary'
                                      : 'bg-black/10 text-muted-foreground hover:bg-black/20 hover:text-foreground dark:bg-white/5 dark:hover:bg-white/10'
                              }`
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
