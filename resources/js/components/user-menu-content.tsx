import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel
                className={
                    IS_BOOTSTRAP
                        ? 'd-block w-100 px-3 py-2 fw-normal text-body'
                        : 'p-0 font-normal'
                }
            >
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'd-flex align-items-center w-100 overflow-hidden'
                            : 'gap-2 px-1 py-1.5 text-sm flex items-center'
                    }
                >
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex align-items-center gap-2 w-100 px-3 py-2 text-body text-decoration-none rounded-2 border-0'
                                : 'flex w-full cursor-pointer items-center'
                        }
                    >
                        <Settings
                            size={16}
                            className={IS_BOOTSTRAP ? 'flex-shrink-0' : ''}
                        />
                        <span className={IS_BOOTSTRAP ? 'flex-grow-1' : ''}>
                            Settings
                        </span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
                <Link
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                    className={
                        IS_BOOTSTRAP
                            ? 'd-flex align-items-center gap-2 w-100 px-3 py-2 text-body text-decoration-none rounded-2 border-0'
                            : 'flex w-full cursor-pointer items-center'
                    }
                >
                    <LogOut
                        size={16}
                        className={IS_BOOTSTRAP ? 'flex-shrink-0' : ''}
                    />
                    <span
                        className={IS_BOOTSTRAP ? 'flex-grow-1 text-start' : ''}
                    >
                        Log out
                    </span>
                </Link>
            </DropdownMenuItem>
        </>
    );
}
