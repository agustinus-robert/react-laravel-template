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
                className={IS_BOOTSTRAP ? 'p-0 fw-normal' : 'p-0 font-normal'}
            >
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'd-flex align-items-center gap-2 px-1 py-2 text-start'
                            : 'gap-2 px-1 py-1.5 text-sm flex items-center text-left'
                    }
                >
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex align-items-center w-100 text-decoration-none'
                                : 'block w-full cursor-pointer'
                        }
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings
                            className={IS_BOOTSTRAP ? 'me-2' : 'mr-2'}
                            size={16}
                        />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
                <Link
                    className={
                        IS_BOOTSTRAP
                            ? 'd-flex align-items-center w-100 text-decoration-none'
                            : 'block w-full cursor-pointer'
                    }
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut
                        className={IS_BOOTSTRAP ? 'me-2' : 'mr-2'}
                        size={16}
                    />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
