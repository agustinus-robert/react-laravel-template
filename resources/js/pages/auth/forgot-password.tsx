import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'mb-3 small fw-medium text-success text-center'
                            : 'mb-4 text-sm font-medium text-green-600 text-center'
                    }
                >
                    {status}
                </div>
            )}

            <div
                className={
                    IS_BOOTSTRAP ? 'd-flex flex-column gap-4' : 'space-y-6'
                }
            >
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div
                                className={
                                    IS_BOOTSTRAP
                                        ? 'd-flex flex-column gap-2'
                                        : 'gap-2 grid'
                                }
                            >
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div
                                className={
                                    IS_BOOTSTRAP
                                        ? 'my-4 d-flex align-items-center justify-content-start'
                                        : 'my-6 flex items-center justify-start'
                                }
                            >
                                <Button
                                    className={
                                        IS_BOOTSTRAP ? 'w-100' : 'w-full'
                                    }
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle
                                            className={
                                                IS_BOOTSTRAP
                                                    ? 'me-2'
                                                    : 'h-4 w-4 animate-spin'
                                            }
                                            size={16}
                                        />
                                    )}
                                    Email password reset link
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'small text-secondary text-center'
                            : 'space-x-1 text-sm text-muted-foreground text-center'
                    }
                >
                    <span>Or, return to</span>{' '}
                    <TextLink href={login()}>log in</TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};
