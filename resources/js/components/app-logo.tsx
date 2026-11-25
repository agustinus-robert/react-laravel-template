import { usePage } from '@inertiajs/react';

import AppLogoIcon from '@/components/app-logo-icon';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div
                className={
                    IS_BOOTSTRAP
                        ? 'd-flex align-items-center justify-content-center rounded'
                        : 'size-8 rounded-md bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square items-center justify-center'
                }
                style={
                    IS_BOOTSTRAP
                        ? {
                              width: '2rem',
                              height: '2rem',
                              backgroundColor: 'var(--bs-primary)',
                              color: 'var(--bs-white)',
                          }
                        : undefined
                }
            >
                <AppLogoIcon
                    className={
                        IS_BOOTSTRAP
                            ? 'text-white fill-current'
                            : 'size-5 text-white dark:text-black fill-current'
                    }
                    style={
                        IS_BOOTSTRAP
                            ? {
                                  width: '1.25rem',
                                  height: '1.25rem',
                              }
                            : undefined
                    }
                />
            </div>

            <div
                className={
                    IS_BOOTSTRAP
                        ? 'ms-2 d-grid small flex-grow-1 text-start'
                        : 'ml-1 text-sm grid flex-1 text-left'
                }
            >
                <span
                    className={
                        IS_BOOTSTRAP
                            ? 'fw-semibold text-truncate'
                            : 'mb-0.5 leading-tight font-semibold truncate'
                    }
                >
                    {name}
                </span>
            </div>
        </>
    );
}
