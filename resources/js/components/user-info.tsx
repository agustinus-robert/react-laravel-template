import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <div
            className={
                IS_BOOTSTRAP
                    ? 'd-flex align-items-center gap-2 w-100 flex-nowrap'
                    : 'gap-2 flex items-center'
            }
            style={IS_BOOTSTRAP ? { minWidth: 0 } : undefined}
        >
            <Avatar
                className={
                    IS_BOOTSTRAP
                        ? 'rounded-circle flex-shrink-0 overflow-hidden'
                        : 'h-8 w-8 overflow-hidden rounded-full'
                }
                style={
                    IS_BOOTSTRAP
                        ? {
                              width: '2rem',
                              height: '2rem',
                              minWidth: '2rem',
                          }
                        : undefined
                }
            >
                <AvatarImage src={user.avatar} alt={user.name} />

                <AvatarFallback
                    className={
                        IS_BOOTSTRAP
                            ? 'rounded-2 bg-secondary text-body'
                            : 'rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'
                    }
                >
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>

            <div
                className={
                    IS_BOOTSTRAP
                        ? 'd-flex flex-column flex-grow-1 overflow-hidden text-start'
                        : 'text-sm leading-tight grid flex-1 text-left'
                }
                style={IS_BOOTSTRAP ? { minWidth: 0 } : undefined}
            >
                <span
                    className={
                        IS_BOOTSTRAP
                            ? 'text-truncate fw-medium'
                            : 'font-medium truncate'
                    }
                    style={
                        IS_BOOTSTRAP
                            ? {
                                  fontSize: '0.875rem',
                                  maxWidth: '100%',
                              }
                            : undefined
                    }
                >
                    {user.name}
                </span>

                {showEmail && (
                    <span
                        className={
                            IS_BOOTSTRAP
                                ? 'text-truncate text-secondary'
                                : 'text-xs text-muted-foreground truncate'
                        }
                        style={
                            IS_BOOTSTRAP
                                ? {
                                      fontSize: '0.75rem',
                                      maxWidth: '100%',
                                  }
                                : undefined
                        }
                    >
                        {user.email}
                    </span>
                )}
            </div>
        </div>
    );
}
