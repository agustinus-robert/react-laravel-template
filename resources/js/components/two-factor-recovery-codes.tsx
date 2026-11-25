import { Form } from '@inertiajs/react';
import { Eye, EyeOff, LockKeyhole, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import AlertError from '@/components/alert-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { regenerateRecoveryCodes } from '@/routes/two-factor';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type Props = {
    recoveryCodesList: string[];
    fetchRecoveryCodes: () => Promise<void>;
    errors: string[];
};

export default function TwoFactorRecoveryCodes({
    recoveryCodesList,
    fetchRecoveryCodes,
    errors,
}: Props) {
    const [codesAreVisible, setCodesAreVisible] = useState<boolean>(false);
    const codesSectionRef = useRef<HTMLDivElement | null>(null);
    const canRegenerateCodes = recoveryCodesList.length > 0 && codesAreVisible;

    const toggleCodesVisibility = useCallback(async () => {
        if (!codesAreVisible && !recoveryCodesList.length) {
            await fetchRecoveryCodes();
        }

        setCodesAreVisible(!codesAreVisible);

        if (!codesAreVisible) {
            setTimeout(() => {
                codesSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            });
        }
    }, [codesAreVisible, recoveryCodesList.length, fetchRecoveryCodes]);

    useEffect(() => {
        if (!recoveryCodesList.length) {
            fetchRecoveryCodes();
        }
    }, [recoveryCodesList.length, fetchRecoveryCodes]);

    const RecoveryCodeIconComponent = codesAreVisible ? EyeOff : Eye;

    return (
        <Card>
            <CardHeader>
                <CardTitle
                    className={
                        IS_BOOTSTRAP
                            ? 'd-flex align-items-center gap-3'
                            : 'gap-3 flex'
                    }
                >
                    <LockKeyhole
                        className={IS_BOOTSTRAP ? '' : 'size-4'}
                        size={IS_BOOTSTRAP ? 16 : undefined}
                        aria-hidden="true"
                    />
                    2FA recovery codes
                </CardTitle>

                <CardDescription>
                    Recovery codes let you regain access if you lose your 2FA
                    device. Store them in a secure password manager.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'd-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between gap-3'
                            : 'gap-3 sm:flex-row sm:items-center sm:justify-between flex flex-col select-none'
                    }
                >
                    <Button
                        onClick={toggleCodesVisibility}
                        className={
                            IS_BOOTSTRAP ? 'align-self-start w-auto' : 'w-fit'
                        }
                        aria-expanded={codesAreVisible}
                        aria-controls="recovery-codes-section"
                    >
                        <RecoveryCodeIconComponent
                            className={IS_BOOTSTRAP ? '' : 'size-4'}
                            size={IS_BOOTSTRAP ? 16 : undefined}
                            aria-hidden="true"
                        />
                        {codesAreVisible ? 'Hide' : 'View'} recovery codes
                    </Button>

                    {canRegenerateCodes && (
                        <Form
                            {...regenerateRecoveryCodes.form()}
                            options={{ preserveScroll: true }}
                            onSuccess={fetchRecoveryCodes}
                        >
                            {({ processing }) => (
                                <Button
                                    variant="secondary"
                                    type="submit"
                                    disabled={processing}
                                    aria-describedby="regenerate-warning"
                                >
                                    <RefreshCw
                                        size={IS_BOOTSTRAP ? 16 : undefined}
                                    />
                                    Regenerate codes
                                </Button>
                            )}
                        </Form>
                    )}
                </div>

                <div
                    id="recovery-codes-section"
                    className={
                        IS_BOOTSTRAP
                            ? `position-relative overflow-hidden ${codesAreVisible ? 'mt-3 opacity-100' : 'mt-0 opacity-0'}`
                            : `relative overflow-hidden transition-all duration-300 ${codesAreVisible ? 'h-auto opacity-100' : 'h-0 opacity-0'}`
                    }
                    style={
                        IS_BOOTSTRAP
                            ? {
                                  maxHeight: codesAreVisible ? '1000px' : '0',
                                  transition: 'all 300ms ease',
                              }
                            : undefined
                    }
                    aria-hidden={!codesAreVisible}
                >
                    <div
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex flex-column gap-3'
                                : 'mt-3 space-y-3'
                        }
                    >
                        {errors?.length ? (
                            <AlertError errors={errors} />
                        ) : (
                            <>
                                <div
                                    ref={codesSectionRef}
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'd-grid gap-1 rounded-3 bg-body-secondary p-3 font-monospace small'
                                            : 'gap-1 rounded-lg bg-muted p-4 font-mono text-sm grid'
                                    }
                                    role="list"
                                    aria-label="Recovery codes"
                                >
                                    {recoveryCodesList.length ? (
                                        recoveryCodesList.map((code, index) => (
                                            <div
                                                key={index}
                                                role="listitem"
                                                className={
                                                    IS_BOOTSTRAP
                                                        ? 'user-select-text'
                                                        : 'select-text'
                                                }
                                            >
                                                {code}
                                            </div>
                                        ))
                                    ) : (
                                        <div
                                            className={
                                                IS_BOOTSTRAP
                                                    ? 'd-flex flex-column gap-2'
                                                    : 'space-y-2'
                                            }
                                            aria-label="Loading recovery codes"
                                        >
                                            {Array.from(
                                                { length: 8 },
                                                (_, index) => (
                                                    <div
                                                        key={index}
                                                        className={
                                                            IS_BOOTSTRAP
                                                                ? 'placeholder-glow'
                                                                : 'h-4 animate-pulse rounded bg-muted-foreground/20'
                                                        }
                                                        aria-hidden="true"
                                                    >
                                                        {IS_BOOTSTRAP && (
                                                            <span
                                                                className="placeholder rounded col-12"
                                                                style={{
                                                                    height: '1rem',
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'small text-secondary user-select-none'
                                            : 'text-xs text-muted-foreground select-none'
                                    }
                                >
                                    <p
                                        id="regenerate-warning"
                                        className={
                                            IS_BOOTSTRAP ? 'mb-0' : undefined
                                        }
                                    >
                                        Each recovery code can be used once to
                                        access your account and will be removed
                                        after use. If you need more, click{' '}
                                        <span
                                            className={
                                                IS_BOOTSTRAP
                                                    ? 'fw-bold'
                                                    : 'font-bold'
                                            }
                                        >
                                            Regenerate codes
                                        </span>{' '}
                                        above.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
