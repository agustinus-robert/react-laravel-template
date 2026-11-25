import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'mb-3 small fw-medium text-success text-center'
                            : 'mb-4 text-sm font-medium text-green-600 text-center'
                    }
                >
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <Form
                {...send.form()}
                className={
                    IS_BOOTSTRAP
                        ? 'd-flex flex-column align-items-center gap-4 text-center'
                        : 'space-y-6 text-center'
                }
            >
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            Resend verification email
                        </Button>

                        <TextLink
                            href={logout()}
                            className={
                                IS_BOOTSTRAP
                                    ? 'd-block small mx-auto'
                                    : 'text-sm mx-auto block'
                            }
                        >
                            Log out
                        </TextLink>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Email verification',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
};
