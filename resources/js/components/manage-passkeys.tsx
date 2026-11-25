import { router } from '@inertiajs/react';
import { KeyRound } from 'lucide-react';
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController';
import Heading from '@/components/heading';
import PasskeyItem from '@/components/passkey-item';
import PasskeyRegistration from '@/components/passkey-register';
import type { Passkey } from '@/types/auth';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export type Props = {
    canManagePasskeys?: boolean;
    passkeys?: Passkey[];
};

const EmptyState = () => {
    return (
        <div
            className={
                IS_BOOTSTRAP ? 'p-4 p-md-5 text-center' : 'p-8 text-center'
            }
        >
            <div
                className={
                    IS_BOOTSTRAP
                        ? 'mb-3 d-flex align-items-center justify-content-center rounded-4 bg-body-secondary mx-auto'
                        : 'mb-4 h-14 w-14 rounded-2xl bg-muted mx-auto flex items-center justify-center'
                }
                style={
                    IS_BOOTSTRAP
                        ? {
                              width: '3.5rem',
                              height: '3.5rem',
                          }
                        : undefined
                }
            >
                <KeyRound
                    className={
                        IS_BOOTSTRAP
                            ? 'text-secondary'
                            : 'h-7 w-7 text-muted-foreground'
                    }
                    size={IS_BOOTSTRAP ? 28 : undefined}
                />
            </div>

            <p className={IS_BOOTSTRAP ? 'fw-semibold mb-1' : 'font-medium'}>
                No passkeys yet
            </p>

            <p
                className={
                    IS_BOOTSTRAP
                        ? 'small text-secondary mb-0'
                        : 'mt-1 text-sm text-muted-foreground'
                }
            >
                Add a passkey to sign in without a password
            </p>
        </div>
    );
};

export default function ManagePasskeys(props: Props) {
    const passkeys = props.passkeys ?? [];

    const handleDelete = (id: number, onError: () => void) => {
        router.delete(destroy.url(id), {
            preserveScroll: true,
            onError,
        });
    };

    const handleRegisterSuccess = () => {
        router.reload();
    };

    if (!(props.canManagePasskeys ?? false)) {
        return null;
    }

    return (
        <div
            className={IS_BOOTSTRAP ? 'd-flex flex-column gap-4' : 'space-y-6'}
        >
            <Heading
                variant="small"
                title="Passkeys"
                description="Manage your passkeys for passwordless sign-in"
            />

            <div
                className={
                    IS_BOOTSTRAP
                        ? 'rounded-3 overflow-hidden border'
                        : 'rounded-lg border-border overflow-hidden border'
                }
            >
                {passkeys.length > 0 ? (
                    passkeys.map((passkey) => (
                        <PasskeyItem
                            key={passkey.id}
                            passkey={passkey}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>

            <PasskeyRegistration onSuccess={handleRegisterSuccess} />
        </div>
    );
}
