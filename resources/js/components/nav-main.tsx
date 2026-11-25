import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type NavItemWithChildren = NavItem & {
    items?: NavItemWithChildren[];
};

interface NavGroup {
    title: string;
    items: NavItemWithChildren[];
}

function addCmsToCategoryAndTags(url: NavItem['href']): NavItem['href'] {
    if (typeof url !== 'string') {
        return url;
    }

    if (url.includes('/cms/')) {
        return url;
    }

    if (url.includes('/category') && !url.includes('/master')) {
        return url.replace('/category', '/cms/category');
    }

    if (url.includes('/tags') && !url.includes('/master')) {
        return url.replace('/tags', '/cms/tags');
    }

    return url;
}

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <>
            {groups.map((group) => (
                <SidebarGroup
                    key={group.title}
                    className={IS_BOOTSTRAP ? 'px-2 py-0' : 'px-2 py-0'}
                >
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

                    <SidebarMenu>
                        {group.items.map((item) => {
                            const itemHref = addCmsToCategoryAndTags(item.href);

                            const hasChildren =
                                Array.isArray(item.items) &&
                                item.items.length > 0;

                            if (hasChildren) {
                                return (
                                    <Collapsible
                                        key={item.title}
                                        asChild
                                        defaultOpen={item.items?.some(
                                            (child) =>
                                                typeof addCmsToCategoryAndTags(
                                                    child.href,
                                                ) === 'string' &&
                                                isCurrentUrl(
                                                    addCmsToCategoryAndTags(
                                                        child.href,
                                                    ) as string,
                                                ),
                                        )}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={{
                                                        children: item.title,
                                                    }}
                                                >
                                                    {item.icon && <item.icon />}

                                                    <span>{item.title}</span>

                                                    <ChevronRight
                                                        className={
                                                            IS_BOOTSTRAP
                                                                ? 'ms-auto'
                                                                : 'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
                                                        }
                                                        size={
                                                            IS_BOOTSTRAP
                                                                ? 16
                                                                : undefined
                                                        }
                                                        style={
                                                            IS_BOOTSTRAP
                                                                ? {
                                                                      transition:
                                                                          'transform 200ms',
                                                                  }
                                                                : undefined
                                                        }
                                                    />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>

                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items?.map(
                                                        (child) => {
                                                            const childHref =
                                                                addCmsToCategoryAndTags(
                                                                    child.href,
                                                                );

                                                            const childHasChildren =
                                                                Array.isArray(
                                                                    child.items,
                                                                ) &&
                                                                child.items
                                                                    .length > 0;

                                                            if (
                                                                childHasChildren
                                                            ) {
                                                                return (
                                                                    <Collapsible
                                                                        key={
                                                                            child.title
                                                                        }
                                                                        asChild
                                                                        className="group/subcollapsible"
                                                                    >
                                                                        <SidebarMenuSubItem>
                                                                            <CollapsibleTrigger
                                                                                asChild
                                                                            >
                                                                                <SidebarMenuSubButton>
                                                                                    {child.icon && (
                                                                                        <child.icon />
                                                                                    )}

                                                                                    <span>
                                                                                        {
                                                                                            child.title
                                                                                        }
                                                                                    </span>

                                                                                    <ChevronRight
                                                                                        className={
                                                                                            IS_BOOTSTRAP
                                                                                                ? 'ms-auto'
                                                                                                : 'size-4 ml-auto transition-transform duration-200 group-data-[state=open]/subcollapsible:rotate-90'
                                                                                        }
                                                                                        size={
                                                                                            IS_BOOTSTRAP
                                                                                                ? 16
                                                                                                : undefined
                                                                                        }
                                                                                        style={
                                                                                            IS_BOOTSTRAP
                                                                                                ? {
                                                                                                      transition:
                                                                                                          'transform 200ms',
                                                                                                  }
                                                                                                : undefined
                                                                                        }
                                                                                    />
                                                                                </SidebarMenuSubButton>
                                                                            </CollapsibleTrigger>

                                                                            <CollapsibleContent>
                                                                                <SidebarMenuSub>
                                                                                    {child.items?.map(
                                                                                        (
                                                                                            subChild,
                                                                                        ) => {
                                                                                            const subChildHref =
                                                                                                addCmsToCategoryAndTags(
                                                                                                    subChild.href,
                                                                                                );

                                                                                            return (
                                                                                                <SidebarMenuSubItem
                                                                                                    key={
                                                                                                        subChild.title
                                                                                                    }
                                                                                                >
                                                                                                    <SidebarMenuSubButton
                                                                                                        asChild
                                                                                                        isActive={
                                                                                                            typeof subChildHref ===
                                                                                                                'string' &&
                                                                                                            isCurrentUrl(
                                                                                                                subChildHref,
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        <Link
                                                                                                            href={
                                                                                                                subChildHref
                                                                                                            }
                                                                                                            prefetch
                                                                                                        >
                                                                                                            {subChild.icon && (
                                                                                                                <subChild.icon />
                                                                                                            )}

                                                                                                            <span>
                                                                                                                {
                                                                                                                    subChild.title
                                                                                                                }
                                                                                                            </span>
                                                                                                        </Link>
                                                                                                    </SidebarMenuSubButton>
                                                                                                </SidebarMenuSubItem>
                                                                                            );
                                                                                        },
                                                                                    )}
                                                                                </SidebarMenuSub>
                                                                            </CollapsibleContent>
                                                                        </SidebarMenuSubItem>
                                                                    </Collapsible>
                                                                );
                                                            }

                                                            return (
                                                                <SidebarMenuSubItem
                                                                    key={
                                                                        child.title
                                                                    }
                                                                >
                                                                    <SidebarMenuSubButton
                                                                        asChild
                                                                        isActive={
                                                                            typeof childHref ===
                                                                                'string' &&
                                                                            isCurrentUrl(
                                                                                childHref,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                childHref
                                                                            }
                                                                            prefetch
                                                                        >
                                                                            {child.icon && (
                                                                                <child.icon />
                                                                            )}

                                                                            <span>
                                                                                {
                                                                                    child.title
                                                                                }
                                                                            </span>
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            );
                                                        },
                                                    )}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                );
                            }

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            typeof itemHref === 'string' &&
                                            isCurrentUrl(itemHref)
                                        }
                                        tooltip={{
                                            children: item.title,
                                        }}
                                    >
                                        <Link href={itemHref} prefetch>
                                            {item.icon && <item.icon />}

                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
