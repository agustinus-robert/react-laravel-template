import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useEffect, useState } from 'react';
import AppModal from '../../../../../../resources/js/components/app-modal';
import UserForm from './form';
import {
    Pencil,
    Trash,
    FolderOpen,
    Plus,
    Users,
    Lock,
    LockOpen,
} from 'lucide-react';
import { toast } from 'sonner';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    lock: boolean | number;
    roles: {
        id: number;
        name: string;
    }[];
    creator: {
        id: number;
        name: string;
    } | null;
}

interface RoleOption {
    id: number;
    name: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    user: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
    roles: RoleOption[];
    filters: {
        role_id?: string | number | null;
    };
}

export default function Role({ user, roles, filters }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(
        undefined,
    );
    const [roleId, setRoleId] = useState(String(filters.role_id ?? ''));

    useEffect(() => {
        const currentRoleId = String(filters.role_id ?? '');

        if (roleId === currentRoleId) {
            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                route('account.user.index'),
                {
                    role_id: roleId || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 200);

        return () => clearTimeout(timeout);
    }, [roleId, filters.role_id]);

    function isLocked(item: User): boolean {
        return Boolean(item.lock);
    }

    function isAdmin(item: User): boolean {
        return (
            item.roles?.some((role) => role.name.toLowerCase() === 'admin') ??
            false
        );
    }

    function handleCreate() {
        setSelectedUser(undefined);
        setModalOpen(true);
    }

    function handleEdit(item: User) {
        setSelectedUser(item);
        setModalOpen(true);
    }

    function handleCloseModal() {
        setModalOpen(false);
        setSelectedUser(undefined);
    }

    function handleToggleLock(item: User) {
        if (isAdmin(item)) {
            return;
        }

        const locked = isLocked(item);
        const action = locked ? 'membuka kunci' : 'mengunci';

        if (
            !confirm(`Apakah Anda yakin ingin ${action} pengguna ${item.name}?`)
        ) {
            return;
        }

        router.patch(
            route('account.user.locked', { user: item.id }),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        locked
                            ? 'Pengguna berhasil dibuka.'
                            : 'Pengguna berhasil dikunci.',
                    );
                },
                onError: () => {
                    toast.error('Gagal mengubah status pengguna.');
                },
            },
        );
    }

    function handleDelete(id: number) {
        if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            return;
        }

        router.delete(route('account.user.destroy', { role: id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Pengguna berhasil dihapus.');
            },
            onError: () => {
                toast.error('Pengguna gagal dihapus.');
            },
        });
    }

    const containerClass = IS_BOOTSTRAP
        ? 'container-fluid px-3 px-lg-4 py-4'
        : 'w-full px-4 py-8 sm:px-6 lg:px-8';

    const cardClass = IS_BOOTSTRAP
        ? 'card border shadow-sm overflow-hidden'
        : 'w-full overflow-hidden rounded-xl border border-slate-800 bg-background shadow-xl';

    const headerClass = IS_BOOTSTRAP
        ? 'card-header bg-body d-flex align-items-center justify-content-between gap-3 px-3 px-md-4 py-3'
        : 'flex items-center justify-between border-b border-slate-800 bg-background px-6 py-4';

    const titleClass = IS_BOOTSTRAP
        ? 'mb-0 fs-6 fw-semibold text-body'
        : 'text-lg font-semibold text-slate-100';

    const filterClass = IS_BOOTSTRAP
        ? 'border-bottom px-3 px-md-4 py-3'
        : 'border-b border-slate-800 px-6 py-4';

    const tableClass = IS_BOOTSTRAP
        ? 'table table-hover align-middle mb-0'
        : 'w-full text-left text-sm text-slate-300';

    const actionButtonClass = IS_BOOTSTRAP
        ? 'btn btn-sm btn-link p-2 text-decoration-none'
        : 'rounded-md p-1.5 transition-colors';

    return (
        <>
            <Head title="Pengguna" />

            <div className={containerClass}>
                <div className={cardClass}>
                    {/* Header */}
                    <div className={headerClass}>
                        <h2 className={titleClass}>Daftar Pengguna</h2>

                        <button
                            type="button"
                            onClick={handleCreate}
                            className={
                                IS_BOOTSTRAP
                                    ? 'btn btn-primary btn-sm d-inline-flex align-items-center gap-2 flex-shrink-0'
                                    : 'gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 inline-flex items-center transition-colors'
                            }
                        >
                            <Plus size={16} />
                            Tambah
                        </button>
                    </div>

                    {/* Filter */}
                    <div className={filterClass}>
                        <div
                            className={
                                IS_BOOTSTRAP ? 'w-100' : 'sm:max-w-xs w-full'
                            }
                        >
                            <label
                                htmlFor="role-filter"
                                className={
                                    IS_BOOTSTRAP
                                        ? 'form-label d-flex align-items-center gap-2 small fw-semibold mb-2'
                                        : 'mb-2 gap-2 text-sm font-medium text-slate-300 flex items-center'
                                }
                            >
                                <Users size={16} />
                                Filter Role
                            </label>

                            <select
                                id="role-filter"
                                value={roleId}
                                onChange={(event) =>
                                    setRoleId(event.target.value)
                                }
                                className={
                                    IS_BOOTSTRAP
                                        ? 'form-select form-select-sm'
                                        : 'rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:ring-indigo-500 w-full border focus:ring-1 focus:outline-none'
                                }
                            >
                                <option value="">Semua Role</option>

                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div
                        className={
                            IS_BOOTSTRAP
                                ? 'table-responsive'
                                : 'w-full overflow-x-auto'
                        }
                    >
                        <table className={tableClass}>
                            <thead
                                className={
                                    IS_BOOTSTRAP
                                        ? 'table-light'
                                        : 'border-slate-800 bg-background text-xs tracking-wider text-slate-400 border-b uppercase'
                                }
                            >
                                <tr>
                                    <th
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'px-3 px-md-4 py-3 small fw-semibold'
                                                : 'px-6 py-3.5 font-medium'
                                        }
                                    >
                                        Nama
                                    </th>

                                    <th
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'px-3 px-md-4 py-3 small fw-semibold'
                                                : 'px-6 py-3.5 font-medium'
                                        }
                                    >
                                        Dibuat Oleh
                                    </th>

                                    <th
                                        className={
                                            IS_BOOTSTRAP
                                                ? 'px-3 px-md-4 py-3 small fw-semibold text-end'
                                                : 'px-6 py-3.5 font-medium text-right'
                                        }
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody
                                className={
                                    IS_BOOTSTRAP
                                        ? ''
                                        : 'divide-slate-800 bg-background divide-y'
                                }
                            >
                                {user.data.length > 0 ? (
                                    user.data.map((item) => {
                                        const admin = isAdmin(item);
                                        const locked = isLocked(item);

                                        return (
                                            <tr
                                                key={item.id}
                                                className={
                                                    IS_BOOTSTRAP
                                                        ? ''
                                                        : 'hover:bg-slate-800/50 transition-colors'
                                                }
                                            >
                                                <td
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'px-3 px-md-4 py-3'
                                                            : 'px-6 py-4 font-medium text-slate-100 whitespace-nowrap'
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            IS_BOOTSTRAP
                                                                ? 'd-flex align-items-center gap-2 flex-wrap'
                                                                : 'gap-2 flex items-center'
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                IS_BOOTSTRAP
                                                                    ? 'fw-medium text-body'
                                                                    : ''
                                                            }
                                                        >
                                                            {item.name}
                                                        </span>

                                                        {!admin && locked && (
                                                            <span
                                                                title="Akun terkunci"
                                                                className={
                                                                    IS_BOOTSTRAP
                                                                        ? 'badge text-bg-danger d-inline-flex align-items-center gap-1 fw-normal'
                                                                        : 'gap-1 rounded-md border-red-700 bg-red-900/30 px-1.5 py-0.5 text-xs text-red-400 inline-flex items-center border'
                                                                }
                                                            >
                                                                <Lock
                                                                    size={12}
                                                                />
                                                                Terkunci
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'px-3 px-md-4 py-3 text-body-secondary'
                                                            : 'px-6 py-4 text-slate-400 whitespace-nowrap'
                                                    }
                                                >
                                                    {item.creator?.name ?? '-'}
                                                </td>

                                                <td
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'px-3 px-md-4 py-3 text-end'
                                                            : 'px-6 py-4 text-right whitespace-nowrap'
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            IS_BOOTSTRAP
                                                                ? 'd-inline-flex align-items-center justify-content-end gap-1'
                                                                : 'gap-3 flex items-center justify-end'
                                                        }
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                            title="Edit pengguna"
                                                            className={
                                                                IS_BOOTSTRAP
                                                                    ? `${actionButtonClass} text-primary`
                                                                    : `${actionButtonClass} text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300`
                                                            }
                                                        >
                                                            <Pencil size={16} />
                                                        </button>

                                                        {!admin && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleToggleLock(
                                                                        item,
                                                                    )
                                                                }
                                                                title={
                                                                    locked
                                                                        ? 'Buka kunci pengguna'
                                                                        : 'Kunci pengguna'
                                                                }
                                                                className={
                                                                    IS_BOOTSTRAP
                                                                        ? `${actionButtonClass} ${locked ? 'text-danger' : 'text-secondary'}`
                                                                        : `${actionButtonClass} ${
                                                                              locked
                                                                                  ? 'text-red-500 hover:bg-red-500/10 hover:text-red-400'
                                                                                  : 'text-slate-400 hover:bg-slate-500/10 hover:text-slate-200'
                                                                          }`
                                                                }
                                                            >
                                                                {locked ? (
                                                                    <Lock
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <LockOpen
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                )}
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id,
                                                                )
                                                            }
                                                            title="Hapus pengguna"
                                                            className={
                                                                IS_BOOTSTRAP
                                                                    ? `${actionButtonClass} text-danger`
                                                                    : `${actionButtonClass} text-rose-400 hover:bg-rose-500/10 hover:text-rose-300`
                                                            }
                                                        >
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className={
                                                IS_BOOTSTRAP
                                                    ? 'py-5 px-3 text-center'
                                                    : 'px-6 py-12 text-center'
                                            }
                                        >
                                            <div
                                                className={
                                                    IS_BOOTSTRAP
                                                        ? 'd-flex flex-column align-items-center justify-content-center py-3'
                                                        : 'flex flex-col items-center justify-center'
                                                }
                                            >
                                                <div
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'd-flex align-items-center justify-content-center rounded-circle bg-body-secondary text-secondary mb-3'
                                                            : 'mb-3 h-12 w-12 bg-slate-800 text-slate-500 flex items-center justify-center rounded-full'
                                                    }
                                                    style={
                                                        IS_BOOTSTRAP
                                                            ? {
                                                                  width: '3rem',
                                                                  height: '3rem',
                                                              }
                                                            : undefined
                                                    }
                                                >
                                                    <FolderOpen size={24} />
                                                </div>

                                                <p
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'mb-1 fw-semibold text-body'
                                                            : 'text-base font-medium text-slate-300'
                                                    }
                                                >
                                                    Tidak Ada Pengguna
                                                </p>

                                                <p
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'mb-0 small text-body-secondary'
                                                            : 'mt-1 text-sm text-slate-500'
                                                    }
                                                >
                                                    {roleId
                                                        ? 'Tidak ada pengguna dengan role yang dipilih.'
                                                        : 'Data pengguna saat ini masih kosong.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {user.data.length > 0 && (
                        <div
                            className={
                                IS_BOOTSTRAP
                                    ? 'border-top px-3 px-md-4 py-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3'
                                    : 'gap-3 border-slate-800 bg-slate-900/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between flex flex-col border-t'
                            }
                        >
                            <p
                                className={
                                    IS_BOOTSTRAP
                                        ? 'mb-0 small text-body-secondary'
                                        : 'text-xs text-slate-400'
                                }
                            >
                                Menampilkan {user.data.length} dari {user.total}{' '}
                                pengguna
                            </p>

                            <div
                                className={
                                    IS_BOOTSTRAP
                                        ? 'd-flex gap-1 flex-wrap'
                                        : 'gap-1 flex flex-wrap'
                                }
                            >
                                {user.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        preserveScroll
                                        onClick={(event) => {
                                            if (!link.url) {
                                                event.preventDefault();
                                            }
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={
                                            IS_BOOTSTRAP
                                                ? `btn btn-sm ${
                                                      link.active
                                                          ? 'btn-primary'
                                                          : link.url
                                                            ? 'btn-outline-secondary'
                                                            : 'btn-outline-secondary disabled'
                                                  }`
                                                : `rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                                                      link.active
                                                          ? 'bg-indigo-600 text-white'
                                                          : link.url
                                                            ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 border'
                                                            : 'border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed border'
                                                  }`
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AppModal
                open={modalOpen}
                onClose={handleCloseModal}
                title={selectedUser ? 'Edit Pengguna' : 'Tambah Pengguna'}
            >
                <UserForm
                    key={selectedUser?.id ?? 'create'}
                    roles={roles}
                    user={selectedUser}
                    onClose={handleCloseModal}
                    isBootstrap={IS_BOOTSTRAP}
                />
            </AppModal>
        </>
    );
}
