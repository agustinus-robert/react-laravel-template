import { usePage } from '@inertiajs/react';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type Props = {
    variant?: 'default' | 'login';
};

export default function AppLogo({ variant = 'default' }: Props) {
    const { name } = usePage().props;
    const isLogin = variant === 'login';

    if (isLogin) {
        return (
            <div className="w-100 text-center" style={{ marginBottom: '2rem' }}>
                <div
                    className="fw-bold"
                    style={{
                        fontSize: '2.5rem',
                        letterSpacing: '-2px',
                        lineHeight: 1.2,
                        color: 'var(--bs-emphasis-color, #212529)',
                    }}
                >
                    Laravel
                    <span style={{ color: '#ef4444' }}>.</span>
                </div>
                <div
                    className="text-secondary"
                    style={{
                        fontSize: '0.8rem',
                        letterSpacing: '2px',
                        marginTop: '6px',
                        textTransform: 'uppercase',
                    }}
                >
                    Application Platform
                </div>
            </div>
        );
    }

    return (
        <div
            className={
                IS_BOOTSTRAP ? 'd-flex align-items-center' : 'flex items-center'
            }
        >
            <div
                className={IS_BOOTSTRAP ? 'fw-bold' : 'font-bold'}
                style={{
                    fontSize: '1.15rem',
                    letterSpacing: '-0.5px',
                }}
            >
                {name}
            </div>
        </div>
    );
}
