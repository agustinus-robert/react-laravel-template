import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type Props = ComponentProps<typeof Link>;

export default function TextLink({
    className = '',
    children,
    ...props
}: Props) {
    return (
        <Link
            className={cn(
                IS_BOOTSTRAP
                    ? 'text-body text-decoration-none'
                    : 'text-foreground decoration-neutral-300 ease-out dark:decoration-neutral-500 underline underline-offset-4 transition-colors duration-300 hover:decoration-current!',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
