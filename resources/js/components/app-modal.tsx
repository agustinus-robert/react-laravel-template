import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

interface AppModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    maxWidth?: string;
}

export default function AppModal({
    open,
    onClose,
    title,
    children,
    maxWidth = 'max-w-lg',
}: AppModalProps) {
    useEffect(() => {
        if (!open) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    const bootstrapMaxWidth: Record<string, string> = {
        'max-w-sm': '24rem',
        'max-w-md': '28rem',
        'max-w-lg': '32rem',
        'max-w-xl': '36rem',
        'max-w-2xl': '42rem',
        'max-w-3xl': '48rem',
        'max-w-4xl': '56rem',
        'max-w-5xl': '64rem',
        'max-w-6xl': '72rem',
        'max-w-7xl': '80rem',
    };

    const modalMaxWidth = bootstrapMaxWidth[maxWidth] ?? maxWidth;

    return (
        <div
            className={
                IS_BOOTSTRAP
                    ? 'position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 bg-dark bg-opacity-50'
                    : 'inset-0 bg-black/60 p-4 backdrop-blur-sm fixed z-50 flex items-center justify-center'
            }
            style={
                IS_BOOTSTRAP
                    ? {
                          zIndex: 1090,
                          backdropFilter: 'blur(4px)',
                      }
                    : undefined
            }
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title ?? 'Dialog'}
                className={
                    IS_BOOTSTRAP
                        ? 'w-100 rounded-3 bg-body text-body shadow-lg overflow-hidden border'
                        : `w-full ${maxWidth} rounded-xl border-slate-700 bg-background shadow-2xl overflow-hidden border`
                }
                style={IS_BOOTSTRAP ? { maxWidth: modalMaxWidth } : undefined}
            >
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'd-flex align-items-center justify-content-between border-bottom px-4 py-3'
                            : 'border-slate-800 px-6 py-4 flex items-center justify-between border-b'
                    }
                >
                    <h2
                        className={
                            IS_BOOTSTRAP
                                ? 'fs-5 fw-semibold mb-0'
                                : 'text-lg font-semibold text-slate-100'
                        }
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup modal"
                        className={
                            IS_BOOTSTRAP
                                ? 'btn btn-sm btn-light d-flex align-items-center justify-content-center border-0'
                                : 'rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors'
                        }
                    >
                        <X size={20} />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}
