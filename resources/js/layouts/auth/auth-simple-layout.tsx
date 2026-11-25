import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';

type Theme = 'bootstrap' | 'tailwind';

const theme = (import.meta.env.VITE_THEME || 'tailwind') as Theme;

function BootstrapLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center p-4">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div className="d-flex flex-column gap-4">
                    <div className="d-flex flex-column align-items-center gap-3">
                        <div className="text-center">
                            <h1 className="h4 fw-medium">{title}</h1>
                            <p className="text-secondary small mb-0">
                                {description}
                            </p>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}

function TailwindLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="gap-6 bg-background p-6 md:p-10 flex min-h-svh flex-col items-center justify-center">
            <div className="max-w-sm w-full">
                <div className="gap-8 flex flex-col">
                    <div className="gap-4 flex flex-col items-center">
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-sm text-muted-foreground text-center">
                                {description}
                            </p>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}

export default function AuthSimpleLayout(props: AuthLayoutProps) {
    return theme === 'bootstrap' ? (
        <BootstrapLayout {...props} />
    ) : (
        <TailwindLayout {...props} />
    );
}
