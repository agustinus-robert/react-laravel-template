import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { toast } from 'sonner';
import { ListTree } from 'lucide-react';

interface Role {
    id: number;
    name: string;
}

interface Props {
    role?: Role;
    onClose: () => void;
    isBootstrap: boolean;
}

interface FormData {
    name: string;
}

const inputClass =
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

export default function RoleForm({ role, onClose, isBootstrap }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        name: role?.name ?? '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                toast.success(
                    role
                        ? 'Role berhasil diperbarui.'
                        : 'Role berhasil ditambahkan.',
                );

                onClose();
            },
            onError: () => {
                toast.error(
                    role
                        ? 'Gagal memperbarui role.'
                        : 'Gagal menambahkan role.',
                );
            },
        };

        if (role) {
            put(
                route('account.role.update', {
                    role: role.id,
                }),
                options,
            );
        } else {
            post(route('account.role.store'), options);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={processing}>
                <div
                    className={
                        isBootstrap
                            ? 'px-4 py-3 border-bottom'
                            : 'border-slate-800 px-6 py-4 border-b'
                    }
                >
                    <h2
                        className={
                            isBootstrap
                                ? 'd-flex align-items-center gap-2 fs-5 fw-semibold mb-1'
                                : 'gap-3 text-lg font-semibold text-slate-100 flex items-center'
                        }
                    >
                        <ListTree size={20} />
                        {role ? 'Edit Role' : 'Tambah Role'}
                    </h2>

                    <p
                        className={
                            isBootstrap
                                ? 'small text-body-secondary mb-0'
                                : 'mt-1 text-sm text-slate-400'
                        }
                    >
                        {role
                            ? 'Perbarui data role yang sudah ada.'
                            : 'Tambahkan role baru ke dalam sistem.'}
                    </p>
                </div>

                <div className={isBootstrap ? 'p-4' : 'space-y-4 p-6'}>
                    <div className={isBootstrap ? 'mb-3' : ''}>
                        <label
                            htmlFor="name"
                            className={
                                isBootstrap
                                    ? 'form-label'
                                    : 'mb-1 text-sm font-medium block'
                            }
                        >
                            Nama
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Masukkan nama role"
                            className={
                                isBootstrap
                                    ? `form-control ${errors.name ? 'is-invalid' : ''}`
                                    : inputClass
                            }
                        />

                        {errors.name && (
                            <p
                                className={
                                    isBootstrap
                                        ? 'invalid-feedback d-block'
                                        : 'mt-1 text-sm text-red-400'
                                }
                            >
                                {errors.name}
                            </p>
                        )}
                    </div>
                </div>
            </fieldset>

            <div
                className={
                    isBootstrap
                        ? 'd-flex justify-content-end gap-2 px-4 py-3 border-top'
                        : 'gap-2 border-slate-800 px-6 py-4 flex justify-end border-t'
                }
            >
                <button
                    type="button"
                    onClick={onClose}
                    disabled={processing}
                    className={
                        isBootstrap
                            ? 'btn btn-outline-secondary'
                            : 'rounded-md border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 border disabled:cursor-not-allowed disabled:opacity-50'
                    }
                >
                    Batal
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className={
                        isBootstrap
                            ? 'btn btn-primary'
                            : 'rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                    }
                >
                    {processing
                        ? role
                            ? 'Memperbarui...'
                            : 'Menyimpan...'
                        : role
                          ? 'Perbarui'
                          : 'Simpan'}
                </button>
            </div>
        </form>
    );
}
