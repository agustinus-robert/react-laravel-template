import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';

import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery code',
                description:
                    'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'login using an authentication code',
            };
        }

        return {
            title: 'Authentication code',
            description:
                'Enter the authentication code provided by your authenticator application.',
            toggleText: 'login using a recovery code',
        };
    }, [showRecoveryInput]);

    setLayoutProps({
        title: authConfigContent.title,
        description: authConfigContent.description,
    });

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Two-factor authentication" />

            <div
                className={
                    IS_BOOTSTRAP ? 'd-flex flex-column gap-4' : 'space-y-6'
                }
            >
                <Form
                    {...store.form()}
                    className={
                        IS_BOOTSTRAP ? 'd-flex flex-column gap-3' : 'space-y-4'
                    }
                    resetOnError
                    resetOnSuccess={!showRecoveryInput}
                >
                    {({ errors, processing, clearErrors }) => (
                        <>
                            {showRecoveryInput ? (
                                <>
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Enter recovery code"
                                        autoFocus={showRecoveryInput}
                                        required
                                    />

                                    <InputError
                                        message={errors.recovery_code}
                                    />
                                </>
                            ) : (
                                <div
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'd-flex flex-column align-items-center justify-content-center gap-3 text-center'
                                            : 'space-y-3 flex flex-col items-center justify-center text-center'
                                    }
                                >
                                    <div
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'd-flex w-100 justify-content-center'
                                                : 'flex w-full items-center justify-center'
                                        }
                                    >
                                        <InputOTP
                                            name="code"
                                            maxLength={OTP_MAX_LENGTH}
                                            value={code}
                                            onChange={(value) => setCode(value)}
                                            disabled={processing}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            autoFocus
                                        >
                                            <InputOTPGroup>
                                                {Array.from(
                                                    { length: OTP_MAX_LENGTH },
                                                    (_, index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                        />
                                                    ),
                                                )}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>

                                    <InputError message={errors.code} />
                                </div>
                            )}

                            <Button
                                type="submit"
                                className={IS_BOOTSTRAP ? 'w-100' : 'w-full'}
                                disabled={processing}
                            >
                                Continue
                            </Button>

                            <div
                                className={
                                    IS_BOOTSTRAP
                                        ? 'small text-secondary text-center'
                                        : 'text-sm text-muted-foreground text-center'
                                }
                            >
                                <span>or you can </span>

                                <button
                                    type="button"
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'btn btn-link p-0 text-body text-decoration-underline align-baseline'
                                            : 'text-foreground decoration-neutral-300 ease-out dark:decoration-neutral-500 cursor-pointer underline underline-offset-4 transition-colors duration-300 hover:decoration-current!'
                                    }
                                    onClick={() =>
                                        toggleRecoveryMode(clearErrors)
                                    }
                                >
                                    {authConfigContent.toggleText}
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
