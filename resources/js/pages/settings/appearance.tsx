import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import { edit as editAppearance } from '@/routes/appearance';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />

            <h1 className="visually-hidden sr-only">Appearance settings</h1>

            <div
                className={
                    IS_BOOTSTRAP ? 'd-flex flex-column gap-4' : 'space-y-6'
                }
            >
                <Heading
                    variant="small"
                    title="Appearance settings"
                    description="Update the appearance settings for your account"
                />

                <AppearanceTabs />
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Appearance settings',
            href: editAppearance(),
        },
    ],
};
