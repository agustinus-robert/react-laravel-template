import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { ajaxCallbacks } from './ajax-callbacks';
import type { UpsertData, GetData, EditData, DeleteData } from './types/ajax';

export function upsertData({
    routeName,
    params,
    method,
    data,
    setSpinner,
    setProgress,
    setErrors,
}: UpsertData) {
    router.visit(route(routeName, params), {
        method,
        data,
        ...ajaxCallbacks(),
        onStart: () => {
            setSpinner(true);
        },

        onProgress: (progress) => {
            setProgress(progress?.percentage ?? 0);
        },

        onError: (errors) => {
            setErrors(errors);
        },
        onFinish: () => {
            setSpinner(false);
            setProgress(0);
        },
    });
}

export function getData({ routeName, data, setSpinner, setErrors }: GetData) {
    router.get(route(routeName), data, {
        ...ajaxCallbacks(),
        onStart: () => {
            setSpinner(true);
        },
        onError: (errors) => {
            setErrors(errors);
        },
        onFinish: () => {
            setSpinner(false);
        },
    });
}

export function editData({
    routeName,
    params,
    setSpinner,
    setErrors,
}: EditData) {
    router.get(route(routeName, params), undefined, {
        ...ajaxCallbacks(),
        onStart: () => {
            setSpinner(true);
        },
        onError: (errors) => {
            setErrors(errors);
        },
        onFinish: () => {
            setSpinner(false);
        },
    });
}

export function deleteData({ routeName, params, setSpinner }: DeleteData) {
    router.delete(route(routeName, params), {
        ...ajaxCallbacks(),

        onStart: () => {
            setSpinner(true);
        },

        onFinish: () => {
            setSpinner(false);
        },
    });
}
