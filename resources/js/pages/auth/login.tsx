import { Form, Head } from '@inertiajs/react';

import AppLogo from '@/components/app-logo';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Theme = 'bootstrap' | 'tailwind';

const theme = (import.meta.env.VITE_THEME || 'tailwind') as Theme;

type Props = {
    status?: string;
    canResetPassword: boolean;
};

type LoginFormProps = {
    canResetPassword: boolean;
};

function BootstrapLogin({ canResetPassword }: LoginFormProps) {
    return (
        <Form
            {...store.form()}
            resetOnSuccess={['password']}
            className="d-flex flex-column gap-4"
        >
            {({ processing, errors }) => (
                <>
                    <div className="d-flex flex-column gap-3">
                        <div>
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="email@example.com"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />

                            <InputError message={errors.email} />
                        </div>

                        <div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <label
                                    htmlFor="password"
                                    className="form-label mb-0"
                                >
                                    Password
                                </label>

                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className="small text-decoration-none"
                                        tabIndex={5}
                                    >
                                        Forgot your password?
                                    </TextLink>
                                )}
                            </div>

                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="Password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="form-check">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                value="1"
                                className="form-check-input"
                                tabIndex={3}
                            />

                            <label
                                htmlFor="remember"
                                className="form-check-label"
                            >
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 mt-2"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing && <Spinner />}
                            {processing ? 'Please wait...' : 'Log in'}
                        </button>
                    </div>

                    <div className="small text-secondary text-center">
                        Don't have an account?{' '}
                        <TextLink
                            href={register()}
                            className="text-decoration-none fw-semibold"
                            tabIndex={6}
                        >
                            Sign up
                        </TextLink>
                    </div>
                </>
            )}
        </Form>
    );
}

function TailwindLogin({ canResetPassword }: LoginFormProps) {
    return (
        <Form
            {...store.form()}
            resetOnSuccess={['password']}
            className="gap-6 flex flex-col"
        >
            {({ processing, errors }) => (
                <>
                    <div className="gap-6 grid">
                        <div className="gap-2 grid">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="email@example.com"
                            />

                            <InputError message={errors.email} />
                        </div>

                        <div className="gap-2 grid">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>

                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className="text-sm"
                                        tabIndex={5}
                                    >
                                        Forgot your password?
                                    </TextLink>
                                )}
                            </div>

                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="Password"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="gap-3 flex items-center">
                            <Checkbox
                                id="remember"
                                name="remember"
                                tabIndex={3}
                            />

                            <Label htmlFor="remember">Remember me</Label>
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing && <Spinner />}
                            Log in
                        </Button>
                    </div>

                    <div className="text-sm text-muted-foreground text-center">
                        Don't have an account?{' '}
                        <TextLink href={register()} tabIndex={6}>
                            Sign up
                        </TextLink>
                    </div>
                </>
            )}
        </Form>
    );
}

export default function Login({ status, canResetPassword }: Props) {
    const isBootstrap = theme === 'bootstrap';

    return (
        <>
            <Head title="Log in" />

            <div
                className={
                    isBootstrap
                        ? 'container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center py-4'
                        : 'bg-background px-6 py-8 flex min-h-screen w-full flex-col items-center justify-center'
                }
            >
                <div
                    className={
                        isBootstrap
                            ? 'w-100 mx-auto overflow-hidden'
                            : 'rounded-1xl border-neutral-300/70 shadow-sm dark:border-neutral-700/70 lg:grid-cols-[0.75fr_1.75fr] mx-auto grid w-full max-w-[1600px] grid-cols-1 overflow-hidden border bg-transparent'
                    }
                    style={
                        isBootstrap
                            ? {
                                  width: '100%',
                                  maxWidth: '1600px',
                                  border: '1px solid rgba(128,128,128,0.35)',
                                  borderRadius: '24px',
                                  display: 'grid',
                                  gridTemplateColumns: '0.75fr 1.75fr',
                                  backgroundColor: 'transparent',
                              }
                            : undefined
                    }
                >
                    {/* LEFT: LOGIN FORM */}
                    <div
                        className={
                            isBootstrap
                                ? 'p-4 p-xl-5 d-flex flex-column justify-content-center'
                                : 'p-6 sm:p-10 lg:p-12 flex min-h-[620px] flex-col justify-center bg-transparent'
                        }
                        style={
                            isBootstrap
                                ? {
                                      minHeight: '620px',
                                      backgroundColor: 'transparent',
                                  }
                                : undefined
                        }
                    >
                        <div className={isBootstrap ? 'mb-4' : 'mb-8'}>
                            <AppLogo />
                        </div>

                        <div className={isBootstrap ? 'mb-4' : 'mb-6'}>
                            <h1
                                className={
                                    isBootstrap
                                        ? 'h3 fw-bold mb-2'
                                        : 'text-3xl font-bold tracking-tight'
                                }
                            >
                                Welcome back
                            </h1>

                            <p
                                className={
                                    isBootstrap
                                        ? 'text-secondary mb-0'
                                        : 'mt-2 text-sm text-muted-foreground'
                                }
                            >
                                Enter your email and password below to log in to
                                your account.
                            </p>
                        </div>

                        <div className={isBootstrap ? 'mb-4' : 'mb-6'}>
                            <PasskeyVerify />
                        </div>

                        {isBootstrap ? (
                            <BootstrapLogin
                                canResetPassword={canResetPassword}
                            />
                        ) : (
                            <TailwindLogin
                                canResetPassword={canResetPassword}
                            />
                        )}

                        {status && (
                            <div
                                className={
                                    isBootstrap
                                        ? 'small fw-medium text-success mt-4 text-center'
                                        : 'mt-4 text-sm font-medium text-green-600 text-center'
                                }
                            >
                                {status}
                            </div>
                        )}
                    </div>

                    <div
                        className={
                            isBootstrap
                                ? 'position-relative overflow-hidden'
                                : 'border-neutral-300/70 dark:border-neutral-700/70 relative min-h-[620px] w-full overflow-hidden border-l'
                        }
                        style={
                            isBootstrap
                                ? {
                                      minHeight: '620px',
                                      borderLeft:
                                          '1px solid rgba(128,128,128,0.35)',
                                  }
                                : undefined
                        }
                    >
                        <img
                            src="/laravel.jpg"
                            alt="Laravel"
                            className={
                                isBootstrap
                                    ? 'position-absolute top-0 start-0 w-100 h-100'
                                    : 'inset-0 absolute h-full w-full object-cover'
                            }
                            style={
                                isBootstrap ? { objectFit: 'cover' } : undefined
                            }
                        />
                    </div>
                </div>

                <footer
                    className={
                        isBootstrap
                            ? 'mt-3 w-100 px-4 py-2 small text-secondary text-center'
                            : 'mt-3 rounded-xl border-neutral-300/70 px-5 py-2 text-xs tracking-wide text-muted-foreground dark:border-neutral-700/70 w-full max-w-[1600px] border bg-transparent text-center shadow-none'
                    }
                    style={
                        isBootstrap
                            ? {
                                  width: '100%',
                                  maxWidth: '1600px',
                                  border: '1px solid rgba(128,128,128,0.35)',
                                  borderRadius: '10px',
                                  backgroundColor: 'transparent',
                              }
                            : undefined
                    }
                >
                    Laravel React Template{' '}
                    <span className="font-semibold">v.1</span>
                </footer>
            </div>
        </>
    );
}
