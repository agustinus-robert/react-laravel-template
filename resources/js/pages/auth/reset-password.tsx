import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export default function ResetPassword({ token, email, passwordRules }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex flex-column gap-4'
                                : 'gap-6 grid'
                        }
                    >
                        <div
                            className={
                                IS_BOOTSTRAP
                                    ? 'd-flex flex-column gap-2'
                                    : 'gap-2 grid'
                            }
                        >
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className={
                                    IS_BOOTSTRAP
                                        ? 'mt-1 w-100'
                                        : 'mt-1 block w-full'
                                }
                                readOnly
                            />

                            <InputError
                                message={errors.email}
                                className={IS_BOOTSTRAP ? 'mt-1' : 'mt-2'}
                            />
                        </div>

                        <div
                            className={
                                IS_BOOTSTRAP
                                    ? 'd-flex flex-column gap-2'
                                    : 'gap-2 grid'
                            }
                        >
                            <Label htmlFor="password">Password</Label>

                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                className={
                                    IS_BOOTSTRAP
                                        ? 'mt-1 w-100'
                                        : 'mt-1 block w-full'
                                }
                                autoFocus
                                placeholder="Password"
                                passwordrules={passwordRules}
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div
                            className={
                                IS_BOOTSTRAP
                                    ? 'd-flex flex-column gap-2'
                                    : 'gap-2 grid'
                            }
                        >
                            <Label htmlFor="password_confirmation">
                                Confirm password
                            </Label>

                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                className={
                                    IS_BOOTSTRAP
                                        ? 'mt-1 w-100'
                                        : 'mt-1 block w-full'
                                }
                                placeholder="Confirm password"
                                passwordrules={passwordRules}
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className={IS_BOOTSTRAP ? 'mt-1' : 'mt-2'}
                            />
                        </div>

                        <Button
                            type="submit"
                            className={
                                IS_BOOTSTRAP ? 'mt-3 w-100' : 'mt-4 w-full'
                            }
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Spinner />}
                            Reset password
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
};
