import type { ComponentPropsWithoutRef } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup
            {...props}
            className={
                IS_BOOTSTRAP
                    ? `p-0 ${className || ''}`
                    : `group-data-[collapsible=icon]:p-0 ${className || ''}`
            }
        >
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className={
                                    IS_BOOTSTRAP
                                        ? 'text-secondary'
                                        : 'text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100'
                                }
                            >
                                <a
                                    href={toUrl(item.href)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'd-flex align-items-center gap-2 text-decoration-none text-secondary'
                                            : undefined
                                    }
                                >
                                    {item.icon && (
                                        <item.icon
                                            className={
                                                IS_BOOTSTRAP ? '' : 'h-5 w-5'
                                            }
                                            size={IS_BOOTSTRAP ? 20 : undefined}
                                        />
                                    )}

                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
