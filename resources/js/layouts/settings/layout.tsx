import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';

import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';

import type { NavItem } from '@/types';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: null,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className={IS_BOOTSTRAP ? 'px-4 py-4' : 'px-4 py-6'}>
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div
                className={
                    IS_BOOTSTRAP
                        ? 'd-flex flex-column flex-lg-row'
                        : 'lg:flex-row lg:space-x-12 flex flex-col'
                }
                style={IS_BOOTSTRAP ? { columnGap: '3rem' } : undefined}
            >
                <aside
                    className={
                        IS_BOOTSTRAP
                            ? 'w-100 flex-shrink-0'
                            : 'max-w-xl lg:w-48 w-full'
                    }
                    style={IS_BOOTSTRAP ? { maxWidth: '12rem' } : undefined}
                >
                    <nav
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex flex-column gap-1'
                                : 'space-y-1 space-x-0 flex flex-col'
                        }
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => {
                            const isActive = isCurrentOrParentUrl(item.href);

                            return (
                                <Button
                                    key={`${toUrl(item.href)}-${index}`}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={
                                        IS_BOOTSTRAP
                                            ? cn(
                                                  'w-100 justify-content-start text-start',
                                                  isActive
                                                      ? 'bg-body-secondary text-body'
                                                      : 'text-body',
                                              )
                                            : cn('w-full justify-start', {
                                                  'bg-muted': isActive,
                                              })
                                    }
                                >
                                    <Link
                                        href={item.href}
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'text-decoration-none'
                                                : undefined
                                        }
                                    >
                                        {item.icon && (
                                            <item.icon
                                                className={
                                                    IS_BOOTSTRAP
                                                        ? 'me-2'
                                                        : 'h-4 w-4'
                                                }
                                                size={
                                                    IS_BOOTSTRAP
                                                        ? 16
                                                        : undefined
                                                }
                                            />
                                        )}

                                        {item.title}
                                    </Link>
                                </Button>
                            );
                        })}
                    </nav>
                </aside>

                {IS_BOOTSTRAP ? (
                    <div
                        className="d-lg-none border-top my-4"
                        role="separator"
                    />
                ) : (
                    <Separator className="my-6 lg:hidden" />
                )}

                <div
                    className={
                        IS_BOOTSTRAP ? 'flex-grow-1' : 'md:max-w-2xl flex-1'
                    }
                >
                    <section
                        className={
                            IS_BOOTSTRAP ? 'w-100' : 'max-w-xl space-y-12'
                        }
                        style={IS_BOOTSTRAP ? { maxWidth: '36rem' } : undefined}
                    >
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
