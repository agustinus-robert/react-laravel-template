import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: {
        value: Appearance;
        icon: LucideIcon;
        label: string;
    }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn(
                IS_BOOTSTRAP
                    ? 'd-inline-flex align-items-center gap-1 rounded p-1 bg-body-secondary'
                    : 'gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 inline-flex',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => {
                const isActive = appearance === value;

                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => updateAppearance(value)}
                        aria-pressed={isActive}
                        className={cn(
                            IS_BOOTSTRAP
                                ? cn(
                                      'btn d-inline-flex align-items-center gap-2 px-3 py-2 small border-0',
                                      isActive
                                          ? 'btn-light shadow-sm text-body'
                                          : 'btn-link text-secondary text-decoration-none',
                                  )
                                : cn(
                                      'rounded-md px-3.5 py-1.5 flex items-center transition-colors',
                                      isActive
                                          ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                          : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                                  ),
                        )}
                    >
                        <Icon
                            className={IS_BOOTSTRAP ? '' : '-ml-1 h-4 w-4'}
                            size={IS_BOOTSTRAP ? 16 : undefined}
                        />

                        <span className={IS_BOOTSTRAP ? '' : 'ml-1.5 text-sm'}>
                            {label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
