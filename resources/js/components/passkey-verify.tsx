import type { UrlMethodPair } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import { usePasskeyVerify } from '@laravel/passkeys/react';
import { KeyRound } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    routes?: {
        options: UrlMethodPair;
        submit: UrlMethodPair;
    };
    label?: string;
    loadingLabel?: string;
    separator?: string;
};

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function PasskeyVerify({
    routes,
    label,
    loadingLabel,
    separator,
}: Props = {}) {
    const { verify, isLoading, error, isSupported } = usePasskeyVerify({
        ...(routes && {
            routes: {
                options: routes.options.url,
                submit: routes.submit.url,
            },
        }),
        onSuccess: (response) => {
            router.visit(response.redirect ?? '/dashboard');
        },
    });

    if (!isSupported) {
        return null;
    }

    if (IS_BOOTSTRAP) {
        return (
            <>
                <div className="d-grid gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-100"
                        onClick={verify}
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : <KeyRound size={16} />}

                        {isLoading
                            ? (loadingLabel ?? 'Authenticating...')
                            : (label ?? 'Sign in with a passkey')}
                    </Button>

                    {error && (
                        <InputError message={error} className="text-center" />
                    )}
                </div>

                <div className="position-relative my-4">
                    <div className="position-absolute top-50 start-0 w-100 translate-middle-y">
                        <Separator className="w-100" />
                    </div>

                    <div className="position-relative d-flex justify-content-center">
                        <span className="bg-body px-2 text-secondary small text-uppercase">
                            {separator ?? 'Or continue with email'}
                        </span>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="gap-2 grid">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={verify}
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : <KeyRound className="h-4 w-4" />}

                    {isLoading
                        ? (loadingLabel ?? 'Authenticating...')
                        : (label ?? 'Sign in with a passkey')}
                </Button>

                {error && (
                    <InputError message={error} className="text-center" />
                )}
            </div>

            <div className="my-6 relative">
                <div className="inset-0 absolute flex items-center">
                    <Separator className="w-full" />
                </div>

                <div className="text-xs relative flex justify-center uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        {separator ?? 'Or continue with email'}
                    </span>
                </div>
            </div>
        </>
    );
}
