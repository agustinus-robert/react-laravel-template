import { Form, Head, usePage, Link } from '@inertiajs/react';

import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div
                className={
                    IS_BOOTSTRAP ? 'd-flex flex-column gap-4' : 'space-y-6'
                }
            >
                <Heading
                    variant="small"
                    title="Profile"
                    description="Update your name and email address"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className={
                        IS_BOOTSTRAP ? 'd-flex flex-column gap-4' : 'space-y-6'
                    }
                >
                    {({ processing, errors }) => (
                        <>
                            <div
                                className={
                                    IS_BOOTSTRAP
                                        ? 'd-flex flex-column gap-2'
                                        : 'gap-2 grid'
                                }
                            >
                                <Label
                                    htmlFor="name"
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'form-label mb-0 fw-medium'
                                            : ''
                                    }
                                >
                                    Name
                                </Label>

                                <Input
                                    id="name"
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'form-control w-100'
                                            : 'mt-1 block w-full'
                                    }
                                    defaultValue={auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />

                                <InputError
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'small text-danger mt-0'
                                            : 'mt-2'
                                    }
                                    message={errors.name}
                                />
                            </div>

                            <div
                                className={
                                    IS_BOOTSTRAP
                                        ? 'd-flex flex-column gap-2'
                                        : 'gap-2 grid'
                                }
                            >
                                <Label
                                    htmlFor="email"
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'form-label mb-0 fw-medium'
                                            : ''
                                    }
                                >
                                    Email address
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'form-control w-100'
                                            : 'mt-1 block w-full'
                                    }
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'small text-danger mt-0'
                                            : 'mt-2'
                                    }
                                    message={errors.email}
                                />
                            </div>

                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                    <div
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'rounded-3 p-3 bg-body-tertiary border'
                                                : ''
                                        }
                                    >
                                        <p
                                            className={
                                                IS_BOOTSTRAP
                                                    ? 'small text-secondary mb-0'
                                                    : '-mt-4 text-sm text-muted-foreground'
                                            }
                                        >
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className={
                                                    IS_BOOTSTRAP
                                                        ? 'btn btn-link p-0 text-body text-decoration-underline align-baseline'
                                                        : 'text-foreground decoration-neutral-300 ease-out dark:decoration-neutral-500 underline underline-offset-4 transition-colors duration-300 hover:decoration-current!'
                                                }
                                            >
                                                Click here to re-send the
                                                verification email.
                                            </Link>
                                        </p>

                                        {status ===
                                            'verification-link-sent' && (
                                            <div
                                                className={
                                                    IS_BOOTSTRAP
                                                        ? 'mt-2 small fw-medium text-success'
                                                        : 'mt-2 text-sm font-medium text-green-600'
                                                }
                                            >
                                                A new verification link has been
                                                sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                            <div
                                className={
                                    IS_BOOTSTRAP
                                        ? 'd-flex align-items-center gap-3 pt-2'
                                        : 'gap-4 flex items-center'
                                }
                            >
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    {IS_BOOTSTRAP ? (
                                        <>
                                            {processing && (
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            Save changes
                                        </>
                                    ) : (
                                        'Save'
                                    )}
                                </Button>

                                {IS_BOOTSTRAP && (
                                    <span className="small text-secondary">
                                        Update your profile information.
                                    </span>
                                )}
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <div className={IS_BOOTSTRAP ? 'mt-5 pt-4 border-top' : ''}>
                <DeleteUser />
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};
