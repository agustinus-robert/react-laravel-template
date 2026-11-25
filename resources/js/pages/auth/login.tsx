import { Form, Head } from '@inertiajs/react';

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

// ========================================
// CONFIGURATION
// ========================================

type Theme = 'bootstrap' | 'tailwind';

const theme = (import.meta.env.VITE_THEME || 'tailwind') as Theme;
// ========================================
// TYPES
// ========================================

type Props = {
    status?: string;
    canResetPassword: boolean;
};

type LoginFormProps = {
    canResetPassword: boolean;
};

// ========================================
// BOOTSTRAP LOGIN
// ========================================

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
                        {/* Email */}
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

                        {/* Password */}
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

                        {/* Remember Me */}
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

                        {/* Submit */}
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

                    {/* Register */}
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

// ========================================
// TAILWIND LOGIN
// ========================================

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
                        <TextLink href={register()} tabIndex={5}>
                            Sign up
                        </TextLink>
                    </div>
                </>
            )}
        </Form>
    );
}

// ========================================
// MAIN LOGIN
// ========================================

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <PasskeyVerify />

            {theme === 'bootstrap' ? (
                <BootstrapLogin canResetPassword={canResetPassword} />
            ) : (
                <TailwindLogin canResetPassword={canResetPassword} />
            )}

            {status && (
                <div
                    className={
                        theme === 'bootstrap'
                            ? 'small fw-medium text-success mb-3 text-center'
                            : 'mb-4 text-sm font-medium text-green-600 text-center'
                    }
                >
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
