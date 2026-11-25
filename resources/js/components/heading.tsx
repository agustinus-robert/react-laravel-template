const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <header
            className={
                IS_BOOTSTRAP
                    ? variant === 'small'
                        ? ''
                        : 'mb-4'
                    : variant === 'small'
                      ? ''
                      : 'mb-8 space-y-0.5'
            }
        >
            <h2
                className={
                    IS_BOOTSTRAP
                        ? variant === 'small'
                            ? 'fs-6 fw-semibold mb-1'
                            : 'fs-4 fw-semibold mb-1'
                        : variant === 'small'
                          ? 'mb-0.5 text-base font-medium'
                          : 'text-xl font-semibold tracking-tight'
                }
            >
                {title}
            </h2>

            {description && (
                <p
                    className={
                        IS_BOOTSTRAP
                            ? 'small text-secondary mb-0'
                            : 'text-sm text-muted-foreground'
                    }
                >
                    {description}
                </p>
            )}
        </header>
    );
}
