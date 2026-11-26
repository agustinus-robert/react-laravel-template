import { router } from '@inertiajs/react';

export interface UpsertData {
    routeName: string;
    method: 'post' | 'put';
    params?: Record<string, any>;
    data: Parameters<typeof router.post>[1];
    setSpinner: (value: boolean) => void;
    setProgress: (value: number) => void;
    setErrors: (errors: Record<string, string>) => void;
}

export interface GetData {
    routeName: string;
    data?: Record<string, any>;
    setSpinner: (value: boolean) => void;
    setErrors: (errors: Record<string, string>) => void;
}

export interface EditData {
    routeName: string;
    params: Record<string, any>;
    setSpinner: (value: boolean) => void;
    setErrors: (errors: Record<string, string>) => void;
}

export interface DeleteData {
    routeName: string;
    params: Record<string, any>;
    setSpinner: (value: boolean) => void;
}
