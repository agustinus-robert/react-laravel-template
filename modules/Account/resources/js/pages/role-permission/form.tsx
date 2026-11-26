import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { toast } from 'sonner';
import { ListTree } from 'lucide-react';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

interface Permission {
    id: number;
    name: string;
}

interface RolePermission {
    id: number;
    permission_id: number;
    role_id: number;
    can_create: boolean;
    can_read: boolean;
    can_update: boolean;
    can_delete: boolean;
}

interface Props {
    role: {
        id: number;
        name: string;
    };
    permission: Permission[];
    role_permission: RolePermission[];
}

interface FormPermission {
    permission_id: number;
    can_create: boolean;
    can_read: boolean;
    can_update: boolean;
    can_delete: boolean;
}

interface FormData {
    role_id: number;
    permissions: FormPermission[];
}

export default function RolePermissionForm({
    role,
    permission,
    role_permission,
}: Props) {
    const isBootstrap = IS_BOOTSTRAP;

    const initialPermissions: FormPermission[] = permission.map((item) => {
        const rolePermission = role_permission.find(
            (rolePermission) => rolePermission.permission_id === item.id,
        );

        return {
            permission_id: item.id,
            can_create: rolePermission?.can_create ?? false,
            can_read: rolePermission?.can_read ?? false,
            can_update: rolePermission?.can_update ?? false,
            can_delete: rolePermission?.can_delete ?? false,
        };
    });

    const { data, setData, post, processing, errors } = useForm<FormData>({
        role_id: role.id,
        permissions: initialPermissions,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route('account.role-permission.store'), {
            onSuccess: () => {
                toast.success('Permission berhasil disimpan.');
            },
            onError: () => {
                toast.error('Gagal menyimpan permission.');
            },
        });
    }

    function handlePermissionChange(
        permissionId: number,
        field: keyof Omit<FormPermission, 'permission_id'>,
        value: boolean,
    ) {
        setData(
            'permissions',
            data.permissions.map((item) =>
                item.permission_id === permissionId
                    ? { ...item, [field]: value }
                    : item,
            ),
        );
    }

    const checkboxClass = isBootstrap
        ? 'form-check-input m-0'
        : 'h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500';

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={processing}>
                {/* Header */}
                <div
                    className={
                        isBootstrap
                            ? 'px-3 py-3 border-bottom text-center'
                            : 'border-slate-800 px-6 py-4 border-b'
                    }
                >
                    <h2
                        className={
                            isBootstrap
                                ? 'd-flex align-items-center justify-content-center gap-2 fs-6 fw-semibold mb-1'
                                : 'gap-3 text-lg font-semibold text-slate-100 flex'
                        }
                    >
                        <ListTree size={isBootstrap ? 17 : 20} />
                        Permission Role
                    </h2>

                    <p
                        className={
                            isBootstrap
                                ? 'small text-body-secondary mb-2'
                                : 'mt-1 text-sm text-slate-400'
                        }
                    >
                        Atur hak akses role terhadap setiap permission.
                    </p>

                    {isBootstrap && (
                        <span className="badge text-bg-primary fw-normal">
                            Role: {role.name}
                        </span>
                    )}
                </div>

                {/* Table */}

                {/* Table */}
                <div className={isBootstrap ? 'p-3' : 'p-6'}>
                    <div
                        className={
                            isBootstrap
                                ? 'rounded-3 overflow-hidden border-0'
                                : 'rounded-md border-slate-800 overflow-hidden border'
                        }
                        style={
                            isBootstrap
                                ? {
                                      backgroundColor: 'var(--bs-tertiary-bg)',
                                  }
                                : undefined
                        }
                    >
                        <table
                            className={
                                isBootstrap
                                    ? 'table-hover mb-0 table text-center align-middle'
                                    : 'text-sm w-full'
                            }
                            style={
                                isBootstrap ? { minWidth: '480px' } : undefined
                            }
                        >
                            <thead>
                                <tr
                                    className={
                                        isBootstrap
                                            ? 'border-bottom'
                                            : 'bg-slate-900'
                                    }
                                >
                                    <th
                                        className={
                                            isBootstrap
                                                ? 'px-3 py-3 fw-semibold small text-body-secondary text-start'
                                                : 'px-4 py-3 font-medium text-slate-300 text-left'
                                        }
                                    >
                                        Permission
                                    </th>

                                    {['Create', 'Read', 'Update', 'Delete'].map(
                                        (action) => (
                                            <th
                                                key={action}
                                                className={
                                                    isBootstrap
                                                        ? 'px-2 py-3 fw-semibold small text-body-secondary text-center'
                                                        : 'px-4 py-3 font-medium text-slate-300 text-center'
                                                }
                                            >
                                                {action}
                                            </th>
                                        ),
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {permission.map((item) => {
                                    const formPermission =
                                        data.permissions.find(
                                            (formPermission) =>
                                                formPermission.permission_id ===
                                                item.id,
                                        );

                                    return (
                                        <tr
                                            key={item.id}
                                            className={
                                                isBootstrap
                                                    ? 'border-bottom'
                                                    : 'border-slate-800 border-t'
                                            }
                                        >
                                            <td
                                                className={
                                                    isBootstrap
                                                        ? 'px-3 py-3 fw-medium text-start'
                                                        : 'px-4 py-3 text-slate-200'
                                                }
                                            >
                                                {item.name}
                                            </td>

                                            {(
                                                [
                                                    'can_create',
                                                    'can_read',
                                                    'can_update',
                                                    'can_delete',
                                                ] as const
                                            ).map((field) => (
                                                <td
                                                    key={field}
                                                    className={
                                                        isBootstrap
                                                            ? 'px-2 py-3 text-center'
                                                            : 'px-4 py-3 text-center'
                                                    }
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className={
                                                            checkboxClass
                                                        }
                                                        checked={
                                                            formPermission?.[
                                                                field
                                                            ] ?? false
                                                        }
                                                        onChange={(e) =>
                                                            handlePermissionChange(
                                                                item.id,
                                                                field,
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}

                                {permission.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className={
                                                isBootstrap
                                                    ? 'text-body-secondary py-4 text-center'
                                                    : 'px-4 py-8 text-slate-500 text-center'
                                            }
                                        >
                                            Belum ada permission.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {errors.permissions && (
                        <p
                            className={
                                isBootstrap
                                    ? 'text-danger small mt-2 mb-0'
                                    : 'mt-2 text-sm text-red-400'
                            }
                        >
                            {errors.permissions}
                        </p>
                    )}
                </div>
            </fieldset>

            {/* Footer */}
            <div
                className={
                    isBootstrap
                        ? 'd-flex justify-content-center gap-2 px-3 py-3 border-top'
                        : 'gap-2 border-slate-800 px-6 py-4 flex justify-end border-t'
                }
            >
                <button
                    type="button"
                    disabled={processing}
                    onClick={() => window.history.back()}
                    className={
                        isBootstrap
                            ? 'btn btn-sm btn-outline-secondary px-3'
                            : 'rounded-md border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 border disabled:cursor-not-allowed disabled:opacity-50'
                    }
                >
                    Kembali
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className={
                        isBootstrap
                            ? 'btn btn-sm btn-primary px-3'
                            : 'rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                    }
                >
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
}
