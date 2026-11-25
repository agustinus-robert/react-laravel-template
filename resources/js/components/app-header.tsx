import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn, toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const activeItemStyles = IS_BOOTSTRAP
    ? 'active fw-semibold'
    : 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();

    return (
        <>
            <div
                className={
                    IS_BOOTSTRAP
                        ? 'border-bottom'
                        : 'border-sidebar-border/80 border-b'
                }
            >
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'container-fluid d-flex align-items-center px-3 mx-auto'
                            : 'h-16 px-4 md:max-w-7xl mx-auto flex items-center'
                    }
                    style={IS_BOOTSTRAP ? { minHeight: '4rem' } : undefined}
                >
                    {/* Mobile Menu */}
                    <div className={IS_BOOTSTRAP ? 'd-lg-none' : 'lg:hidden'}>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'me-2'
                                            : 'mr-2 h-[34px] w-[34px]'
                                    }
                                    style={
                                        IS_BOOTSTRAP
                                            ? {
                                                  width: '34px',
                                                  height: '34px',
                                              }
                                            : undefined
                                    }
                                >
                                    <Menu
                                        className={
                                            IS_BOOTSTRAP ? '' : 'h-5 w-5'
                                        }
                                        size={IS_BOOTSTRAP ? 20 : undefined}
                                    />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="left"
                                className={
                                    IS_BOOTSTRAP
                                        ? 'd-flex flex-column justify-content-between align-items-stretch'
                                        : 'w-64 bg-sidebar flex h-full flex-col items-stretch justify-between'
                                }
                                style={
                                    IS_BOOTSTRAP
                                        ? {
                                              width: '16rem',
                                              height: '100%',
                                          }
                                        : undefined
                                }
                            >
                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>

                                <SheetHeader
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'd-flex justify-content-start text-start'
                                            : 'flex justify-start text-left'
                                    }
                                >
                                    <AppLogoIcon
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'text-body'
                                                : 'h-6 w-6 text-black dark:text-white fill-current'
                                        }
                                        style={
                                            IS_BOOTSTRAP
                                                ? {
                                                      width: '1.5rem',
                                                      height: '1.5rem',
                                                  }
                                                : undefined
                                        }
                                    />
                                </SheetHeader>

                                <div
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'd-flex flex-column gap-4 p-4 flex-grow-1'
                                            : 'space-y-4 p-4 flex h-full flex-1 flex-col'
                                    }
                                >
                                    <div
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'd-flex flex-column justify-content-between small flex-grow-1'
                                                : 'text-sm flex h-full flex-col justify-between'
                                        }
                                    >
                                        <div
                                            className={
                                                IS_BOOTSTRAP
                                                    ? 'd-flex flex-column gap-3'
                                                    : 'space-y-4 flex flex-col'
                                            }
                                        >
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'nav-link d-flex align-items-center gap-2 fw-medium'
                                                            : 'space-x-2 font-medium flex items-center'
                                                    }
                                                >
                                                    {item.icon && (
                                                        <item.icon
                                                            className={
                                                                IS_BOOTSTRAP
                                                                    ? ''
                                                                    : 'h-5 w-5'
                                                            }
                                                            size={
                                                                IS_BOOTSTRAP
                                                                    ? 20
                                                                    : undefined
                                                            }
                                                        />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <div
                                            className={
                                                IS_BOOTSTRAP
                                                    ? 'd-flex flex-column gap-3'
                                                    : 'space-y-4 flex flex-col'
                                            }
                                        >
                                            {rightNavItems.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={toUrl(item.href)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'nav-link d-flex align-items-center gap-2 fw-medium'
                                                            : 'space-x-2 font-medium flex items-center'
                                                    }
                                                >
                                                    {item.icon && (
                                                        <item.icon
                                                            className={
                                                                IS_BOOTSTRAP
                                                                    ? ''
                                                                    : 'h-5 w-5'
                                                            }
                                                            size={
                                                                IS_BOOTSTRAP
                                                                    ? 20
                                                                    : undefined
                                                            }
                                                        />
                                                    )}
                                                    <span>{item.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link
                        href={dashboard()}
                        prefetch
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex align-items-center text-decoration-none'
                                : 'space-x-2 flex items-center'
                        }
                    >
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div
                        className={
                            IS_BOOTSTRAP
                                ? 'ms-4 d-none d-lg-flex align-items-center h-100'
                                : 'ml-6 space-x-6 lg:flex hidden h-full items-center'
                        }
                    >
                        <NavigationMenu
                            className={
                                IS_BOOTSTRAP
                                    ? 'd-flex align-items-stretch h-100'
                                    : 'flex h-full items-stretch'
                            }
                        >
                            <NavigationMenuList
                                className={
                                    IS_BOOTSTRAP
                                        ? 'd-flex align-items-stretch h-100 gap-2'
                                        : 'space-x-2 flex h-full items-stretch'
                                }
                            >
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'position-relative d-flex align-items-center h-100'
                                                : 'relative flex h-full items-center'
                                        }
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                whenCurrentUrl(
                                                    item.href,
                                                    activeItemStyles,
                                                ),
                                                IS_BOOTSTRAP
                                                    ? 'btn btn-light d-inline-flex align-items-center gap-2 h-100 text-decoration-none'
                                                    : 'h-9 px-3 cursor-pointer',
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? ''
                                                            : 'mr-2 h-4 w-4'
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

                                        {isCurrentUrl(item.href) && (
                                            <div
                                                className={
                                                    IS_BOOTSTRAP
                                                        ? 'position-absolute bottom-0 start-0 w-100 border-bottom border-primary border-2'
                                                        : 'bottom-0 left-0 h-0.5 bg-black dark:bg-white absolute w-full translate-y-px'
                                                }
                                            />
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Right Navigation */}
                    <div
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex align-items-center gap-2 ms-auto'
                                : 'space-x-2 ml-auto flex items-center'
                        }
                    >
                        <div
                            className={
                                IS_BOOTSTRAP
                                    ? 'd-flex align-items-center gap-1'
                                    : 'space-x-1 relative flex items-center'
                            }
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className={
                                    IS_BOOTSTRAP
                                        ? 'btn btn-link text-body p-0'
                                        : 'group h-9 w-9 cursor-pointer'
                                }
                                style={
                                    IS_BOOTSTRAP
                                        ? {
                                              width: '36px',
                                              height: '36px',
                                          }
                                        : undefined
                                }
                            >
                                <Search
                                    className={
                                        IS_BOOTSTRAP
                                            ? ''
                                            : '!size-5 opacity-80 group-hover:opacity-100'
                                    }
                                    size={IS_BOOTSTRAP ? 20 : undefined}
                                />
                            </Button>

                            <div
                                className={
                                    IS_BOOTSTRAP
                                        ? 'ms-1 d-none d-lg-flex align-items-center gap-1'
                                        : 'ml-1 gap-1 lg:flex hidden'
                                }
                            >
                                {rightNavItems.map((item) => (
                                    <Tooltip key={item.title}>
                                        <TooltipTrigger>
                                            <a
                                                href={toUrl(item.href)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={
                                                    IS_BOOTSTRAP
                                                        ? 'btn btn-link text-body d-inline-flex align-items-center justify-content-center p-0'
                                                        : 'group h-9 w-9 rounded-md p-0 text-sm font-medium text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex items-center justify-center bg-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
                                                }
                                                style={
                                                    IS_BOOTSTRAP
                                                        ? {
                                                              width: '36px',
                                                              height: '36px',
                                                          }
                                                        : undefined
                                                }
                                            >
                                                <span className="sr-only">
                                                    {item.title}
                                                </span>

                                                {item.icon && (
                                                    <item.icon
                                                        className={
                                                            IS_BOOTSTRAP
                                                                ? ''
                                                                : 'size-5 opacity-80 group-hover:opacity-100'
                                                        }
                                                        size={
                                                            IS_BOOTSTRAP
                                                                ? 20
                                                                : undefined
                                                        }
                                                    />
                                                )}
                                            </a>
                                        </TooltipTrigger>

                                        <TooltipContent>
                                            <p>{item.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'btn btn-link text-body p-1 rounded-circle'
                                            : 'size-10 p-1 rounded-full'
                                    }
                                    style={
                                        IS_BOOTSTRAP
                                            ? {
                                                  width: '40px',
                                                  height: '40px',
                                              }
                                            : undefined
                                    }
                                >
                                    <Avatar
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'rounded-circle overflow-hidden'
                                                : 'size-8 overflow-hidden rounded-full'
                                        }
                                        style={
                                            IS_BOOTSTRAP
                                                ? {
                                                      width: '2rem',
                                                      height: '2rem',
                                                  }
                                                : undefined
                                        }
                                    >
                                        <AvatarImage
                                            src={auth.user?.avatar}
                                            alt={auth.user?.name}
                                        />

                                        <AvatarFallback
                                            className={
                                                IS_BOOTSTRAP
                                                    ? 'rounded-circle bg-secondary-subtle text-body'
                                                    : 'rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'
                                            }
                                        >
                                            {getInitials(auth.user?.name ?? '')}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className={IS_BOOTSTRAP ? 'w-56' : 'w-56'}
                                align="end"
                            >
                                {auth.user && (
                                    <UserMenuContent user={auth.user} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs */}
            {breadcrumbs.length > 1 && (
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'border-bottom w-100'
                            : 'border-sidebar-border/70 flex w-full border-b'
                    }
                >
                    <div
                        className={
                            IS_BOOTSTRAP
                                ? 'container-fluid d-flex align-items-center px-3 text-secondary mx-auto'
                                : 'h-12 px-4 text-neutral-500 md:max-w-7xl mx-auto flex w-full items-center justify-start'
                        }
                        style={IS_BOOTSTRAP ? { minHeight: '3rem' } : undefined}
                    >
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
