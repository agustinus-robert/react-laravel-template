import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export function NavUser() {
    const { auth } = usePage().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    if (!auth.user) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className={
                                IS_BOOTSTRAP
                                    ? 'd-flex align-items-center gap-2 w-100 text-body'
                                    : 'group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent'
                            }
                            data-test="sidebar-menu-button"
                        >
                            <UserInfo user={auth.user} />

                            <ChevronsUpDown
                                className={
                                    IS_BOOTSTRAP
                                        ? 'ms-auto flex-shrink-0'
                                        : 'size-4 ml-auto'
                                }
                                size={IS_BOOTSTRAP ? 16 : undefined}
                            />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className={
                            IS_BOOTSTRAP
                                ? 'rounded-3'
                                : 'min-w-56 rounded-lg w-(--radix-dropdown-menu-trigger-width)'
                        }
                        style={
                            IS_BOOTSTRAP
                                ? {
                                      width: 'var(--radix-dropdown-menu-trigger-width)',
                                      minWidth: '14rem',
                                  }
                                : undefined
                        }
                        align="end"
                        side={
                            isMobile
                                ? 'bottom'
                                : state === 'collapsed'
                                  ? 'left'
                                  : 'bottom'
                        }
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
