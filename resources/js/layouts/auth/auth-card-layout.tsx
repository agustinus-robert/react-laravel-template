import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type AuthCardLayoutProps = PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>;

type Theme = 'bootstrap' | 'tailwind';

const theme = (import.meta.env.VITE_THEME || 'tailwind') as Theme;

function BootstrapLayout({
    children,
    title,
    description,
}: AuthCardLayoutProps) {
    return (
        <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light p-4">
            <div className="w-100" style={{ maxWidth: '448px' }}>
                <div className="card rounded-4 shadow-sm border-0">
                    <div className="card-header px-4 px-md-5 pt-4 border-0 bg-transparent text-center">
                        <h1 className="h4 mb-2">{title}</h1>
                        <p className="text-secondary small mb-0">
                            {description}
                        </p>
                    </div>

                    <div className="card-body px-4 px-md-5 py-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TailwindLayout({ children, title, description }: AuthCardLayoutProps) {
    return (
        <div className="gap-6 bg-muted p-6 md:p-10 flex min-h-svh flex-col items-center justify-center">
            <div className="max-w-md gap-6 flex w-full flex-col">
                <div className="gap-6 flex flex-col">
                    <Card className="rounded-xl">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>

                        <CardContent className="px-10 py-8">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function AuthCardLayout(props: AuthCardLayoutProps) {
    return theme === 'bootstrap' ? (
        <BootstrapLayout {...props} />
    ) : (
        <TailwindLayout {...props} />
    );
}
