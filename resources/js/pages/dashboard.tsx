import { Head } from '@inertiajs/react';
import { ShieldCheck, Settings } from 'lucide-react';
import { dashboard } from '@/routes';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            {IS_BOOTSTRAP ? (
                <div className="d-flex flex-column p-3 p-md-4 p-lg-5 flex-grow-1">
                    <div className="d-flex align-items-center justify-content-center flex-grow-1">
                        <div
                            className="card shadow-sm w-100 border-0 text-center"
                            style={{ maxWidth: '672px' }}
                        >
                            <div className="card-body p-4 p-md-5">
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-4 mb-4 mx-auto"
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        backgroundColor:
                                            'var(--bs-primary-bg-subtle)',
                                        color: 'var(--bs-primary)',
                                    }}
                                >
                                    <ShieldCheck size={32} />
                                </div>

                                <p
                                    className="small fw-semibold text-body-secondary text-uppercase mb-2"
                                    style={{ letterSpacing: '0.12em' }}
                                >
                                    Admin Panel
                                </p>

                                <h1 className="fs-3 fw-semibold mb-3">
                                    Selamat Datang!
                                </h1>

                                <p
                                    className="text-body-secondary mb-4 mx-auto"
                                    style={{
                                        maxWidth: '480px',
                                        lineHeight: '1.7',
                                    }}
                                >
                                    Selamat datang di panel pengelolaan admin.
                                    Kelola pengguna dan data sistem dengan mudah
                                    melalui menu navigasi yang tersedia.
                                </p>

                                <div className="d-inline-flex align-items-center gap-2 rounded-3 px-3 py-2 small text-body-secondary border">
                                    <Settings size={16} />
                                    <span>Sistem Pengelolaan Admin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 sm:p-6 lg:p-8 flex min-h-full flex-1 flex-col">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="max-w-2xl rounded-2xl border-sidebar-border bg-background p-8 shadow-sm sm:p-12 w-full border text-center">
                            <div className="mb-6 h-16 w-16 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                                <ShieldCheck className="h-8 w-8" />
                            </div>

                            <p className="mb-3 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Admin Panel
                            </p>

                            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                Selamat Datang!
                            </h1>

                            <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base mx-auto">
                                Selamat datang di panel pengelolaan admin.
                                Kelola pengguna dan data sistem dengan mudah
                                melalui menu navigasi yang tersedia.
                            </p>

                            <div className="mt-8 gap-2 rounded-lg border-sidebar-border px-4 py-2 text-sm text-muted-foreground inline-flex items-center border">
                                <Settings className="h-4 w-4" />
                                <span>Sistem Pengelolaan Admin</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
