import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Register" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className={
                    IS_BOOTSTRAP
                        ? 'd-flex flex-column gap-4'
                        : 'gap-6 flex flex-col'
                }
            >
                {({ processing, errors }) => (
                    <>
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
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />

                                <InputError
                                    message={errors.name}
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
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />

                                <InputError message={errors.email} />
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
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
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
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className={
                                    IS_BOOTSTRAP ? 'w-100 mt-2' : 'mt-2 w-full'
                                }
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </div>

                        <div
                            className={
                                IS_BOOTSTRAP
                                    ? 'small text-secondary text-center'
                                    : 'text-sm text-muted-foreground text-center'
                            }
                        >
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
