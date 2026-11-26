import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { toast } from 'sonner';
import { ListTree } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
}

interface Role {
    id: number;
    name: string;
}

interface Props {
    roles: Role[];
    user?: User;
    onClose: () => void;
    isBootstrap: boolean;
}

interface FormData {
    role_id: number;
    name: string;
    email: string;
    password: string;
    retype_password: string;
}

export default function UserForm({
    roles,
    user,
    onClose,
    isBootstrap: IS_BOOTSTRAP,
}: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        role_id: user?.role_id ?? 0,
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        retype_password: '',
    });

    const inputClass = IS_BOOTSTRAP
        ? 'form-control'
        : 'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

    const selectClass = IS_BOOTSTRAP
        ? 'form-select'
        : 'w-full rounded-md border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none focus:border-primary';

    const labelClass = IS_BOOTSTRAP
        ? 'form-label fw-medium small mb-1'
        : 'mb-1 block text-sm font-medium';

    const errorClass = IS_BOOTSTRAP
        ? 'invalid-feedback d-block'
        : 'mt-1 text-sm text-red-400';

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (data.password !== data.retype_password) {
            toast.error('Kata sandi tidak sama.');
            return;
        }

        const options = {
            onSuccess: () => {
                toast.success(
                    user
                        ? 'Pengguna berhasil diperbarui.'
                        : 'Pengguna berhasil ditambahkan.',
                );

                onClose();
            },
            onError: () => {
                toast.error(
                    user
                        ? 'Gagal memperbarui pengguna.'
                        : 'Gagal menambahkan pengguna.',
                );
            },
        };

        if (user) {
            put(
                route('account.user.update', {
                    user: user.id,
                }),
                options,
            );
        } else {
            post(route('account.user.store'), options);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={processing}>
                {/* Header */}
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'border-bottom px-3 px-md-4 py-3'
                            : 'border-slate-800 px-6 py-4 border-b'
                    }
                >
                    <h2
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex align-items-center gap-2 fs-6 fw-semibold mb-1 text-body'
                                : 'gap-3 text-lg font-semibold text-slate-100 flex items-center'
                        }
                    >
                        <ListTree size={20} />
                        {user ? 'Edit Pengguna' : 'Tambah Pengguna'}
                    </h2>

                    <p
                        className={
                            IS_BOOTSTRAP
                                ? 'small text-body-secondary mb-0'
                                : 'mt-1 text-sm text-slate-400'
                        }
                    >
                        {user
                            ? 'Perbarui data pengguna yang sudah ada.'
                            : 'Tambahkan pengguna baru ke dalam sistem.'}
                    </p>
                </div>

                {/* Form Fields */}
                <div className={IS_BOOTSTRAP ? 'p-3 p-md-4' : 'space-y-4 p-6'}>
                    <div className={IS_BOOTSTRAP ? 'mb-3' : ''}>
                        <label htmlFor="role_id" className={labelClass}>
                            Role
                        </label>

                        <select
                            id="role_id"
                            name="role_id"
                            value={data.role_id || ''}
                            onChange={(e) =>
                                setData('role_id', Number(e.target.value))
                            }
                            className={`${selectClass} ${errors.role_id ? (IS_BOOTSTRAP ? 'is-invalid' : 'border-red-500') : ''}`}
                        >
                            <option value="">Pilih Role</option>

                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>

                        {errors.role_id && (
                            <p className={errorClass}>{errors.role_id}</p>
                        )}
                    </div>

                    <div className={IS_BOOTSTRAP ? 'mb-3' : ''}>
                        <label htmlFor="name" className={labelClass}>
                            Nama
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Masukkan nama pengguna"
                            className={`${inputClass} ${errors.name ? (IS_BOOTSTRAP ? 'is-invalid' : 'border-red-500') : ''}`}
                        />

                        {errors.name && (
                            <p className={errorClass}>{errors.name}</p>
                        )}
                    </div>

                    <div className={IS_BOOTSTRAP ? 'mb-3' : ''}>
                        <label htmlFor="email" className={labelClass}>
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Masukkan email pengguna"
                            className={`${inputClass} ${errors.email ? (IS_BOOTSTRAP ? 'is-invalid' : 'border-red-500') : ''}`}
                        />

                        {errors.email && (
                            <p className={errorClass}>{errors.email}</p>
                        )}
                    </div>

                    <div className={IS_BOOTSTRAP ? 'mb-3' : ''}>
                        <label htmlFor="password" className={labelClass}>
                            Kata Sandi
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder={
                                user
                                    ? 'Kosongkan jika tidak ingin mengubah'
                                    : 'Masukkan kata sandi'
                            }
                            autoComplete="new-password"
                            className={`${inputClass} ${errors.password ? (IS_BOOTSTRAP ? 'is-invalid' : 'border-red-500') : ''}`}
                        />

                        {errors.password && (
                            <p className={errorClass}>{errors.password}</p>
                        )}
                    </div>

                    <div className={IS_BOOTSTRAP ? 'mb-0' : ''}>
                        <label htmlFor="retype_password" className={labelClass}>
                            Ulangi Kata Sandi
                        </label>

                        <input
                            type="password"
                            id="retype_password"
                            name="retype_password"
                            value={data.retype_password}
                            onChange={(e) =>
                                setData('retype_password', e.target.value)
                            }
                            placeholder="Ulangi kata sandi"
                            autoComplete="new-password"
                            className={`${inputClass} ${
                                errors.retype_password
                                    ? IS_BOOTSTRAP
                                        ? 'is-invalid'
                                        : 'border-red-500'
                                    : data.retype_password &&
                                        data.password !== data.retype_password
                                      ? IS_BOOTSTRAP
                                          ? 'is-invalid'
                                          : 'border-red-500'
                                      : ''
                            }`}
                        />

                        {data.retype_password &&
                            data.password !== data.retype_password && (
                                <p className={errorClass}>
                                    Kata sandi tidak sama.
                                </p>
                            )}

                        {errors.retype_password && (
                            <p className={errorClass}>
                                {errors.retype_password}
                            </p>
                        )}
                    </div>
                </div>
            </fieldset>

            {/* Footer */}
            <div
                className={
                    IS_BOOTSTRAP
                        ? 'border-top px-3 px-md-4 py-3 d-flex justify-content-end gap-2'
                        : 'gap-2 border-slate-800 px-6 py-4 flex justify-end border-t'
                }
            >
                <button
                    type="button"
                    onClick={onClose}
                    disabled={processing}
                    className={
                        IS_BOOTSTRAP
                            ? 'btn btn-outline-secondary btn-sm'
                            : 'rounded-md border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 border disabled:cursor-not-allowed disabled:opacity-50'
                    }
                >
                    Batal
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className={
                        IS_BOOTSTRAP
                            ? 'btn btn-primary btn-sm'
                            : 'rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                    }
                >
                    {processing
                        ? user
                            ? 'Memperbarui...'
                            : 'Menyimpan...'
                        : user
                          ? 'Perbarui'
                          : 'Simpan'}
                </button>
            </div>
        </form>
    );
}
