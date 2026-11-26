import { Link, Head, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import { Pencil, Trash, FolderOpen, ListTodo, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AppModal from '../../../../../../resources/js/components/app-modal';
import RoleForm from './form';

interface PageProps {
    [key: string]: unknown;
    can: Record<string, boolean>;
    theme?: string;
}

interface Role {
    id: number;
    name: string;
    slug: string;
    creator: {
        id: number;
        name: string;
    } | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    role: {
        data: Role[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
}

export default function Role({ role }: Props) {
    const { can } = usePage<PageProps>().props;

    const IS_BOOTSTRAP =
        (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | undefined>(
        undefined,
    );

    function handleCreate() {
        setSelectedRole(undefined);
        setModalOpen(true);
    }

    function handleEdit(item: Role) {
        setSelectedRole(item);
        setModalOpen(true);
    }

    function handleCloseModal() {
        setModalOpen(false);
        setSelectedRole(undefined);
    }

    function handleDelete(id: number) {
        if (!confirm('Apakah Anda yakin ingin menghapus role ini?')) {
            return;
        }

        router.delete(route('account.role.destroy', { role: id }), {
            onSuccess: () => {
                toast.success('Role berhasil dihapus.');
            },
            onError: () => {
                toast.error('Role gagal dihapus.');
            },
        });
    }

    return (
        <>
            <Head title="Role" />

            <div
                className={
                    IS_BOOTSTRAP
                        ? 'container-fluid py-4'
                        : 'px-4 py-8 sm:px-6 lg:px-8 w-full'
                }
            >
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'card w-100 overflow-hidden'
                            : 'rounded-xl border-slate-800 bg-background shadow-xl w-full overflow-hidden border'
                    }
                >
                    <div
                        className={
                            IS_BOOTSTRAP
                                ? 'card-header d-flex align-items-center justify-content-between py-3'
                                : 'border-slate-800 bg-background px-6 py-4 flex items-center justify-between border-b'
                        }
                    >
                        <h2
                            className={
                                IS_BOOTSTRAP
                                    ? 'mb-0 fs-5 fw-semibold'
                                    : 'text-lg font-semibold text-slate-100'
                            }
                        >
                            Daftar Role
                        </h2>

                        <button
                            type="button"
                            onClick={handleCreate}
                            className={
                                IS_BOOTSTRAP
                                    ? 'btn btn-primary btn-sm d-inline-flex align-items-center gap-2'
                                    : 'gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 inline-flex items-center transition-colors'
                            }
                        >
                            <Plus className="h-4 w-4" />
                            Tambah
                        </button>
                    </div>

                    <div className="w-100 overflow-x-auto">
                        <table
                            className={
                                IS_BOOTSTRAP
                                    ? 'table-hover mb-0 table align-middle'
                                    : 'text-sm text-slate-300 w-full text-left'
                            }
                        >
                            <thead
                                className={
                                    IS_BOOTSTRAP
                                        ? 'table-light'
                                        : 'border-slate-800 bg-background text-xs tracking-wider text-slate-400 border-b uppercase'
                                }
                            >
                                <tr>
                                    <th className="px-6 py-3.5 font-medium">
                                        Name
                                    </th>
                                    <th className="px-6 py-3.5 font-medium">
                                        Slug
                                    </th>
                                    <th className="px-6 py-3.5 font-medium">
                                        Dibuat Oleh
                                    </th>
                                    <th className="px-6 py-3.5 font-medium text-end">
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
                                {role.data.length > 0 ? (
                                    role.data.map((item) => (
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
                                                        ? 'px-6 py-3 fw-medium'
                                                        : 'px-6 py-4 font-medium text-slate-100 whitespace-nowrap'
                                                }
                                            >
                                                {item.name}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {IS_BOOTSTRAP ? (
                                                    <span className="badge text-bg-secondary">
                                                        {item.slug}
                                                    </span>
                                                ) : (
                                                    <span className="border-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-300 inline-flex items-center rounded-full border">
                                                        {item.slug}
                                                    </span>
                                                )}
                                            </td>

                                            <td
                                                className={
                                                    IS_BOOTSTRAP
                                                        ? 'px-6 py-3'
                                                        : 'px-6 py-4 text-slate-400 whitespace-nowrap'
                                                }
                                            >
                                                {item.creator?.name ?? '-'}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-end whitespace-nowrap">
                                                <div className="gap-3 flex items-center justify-end">
                                                    <Link
                                                        href={route(
                                                            'account.role-permission.show',
                                                            item.id,
                                                        )}
                                                        title="Pengaturan permission"
                                                        className={
                                                            IS_BOOTSTRAP
                                                                ? 'btn btn-sm btn-outline-secondary'
                                                                : 'gap-1.5 font-medium text-stone-400 hover:text-indigo-300 inline-flex items-center transition-colors'
                                                        }
                                                    >
                                                        <ListTodo className="h-4 w-4" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                        title="Edit role"
                                                        className={
                                                            IS_BOOTSTRAP
                                                                ? 'btn btn-sm btn-outline-primary'
                                                                : 'gap-1.5 font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center transition-colors'
                                                        }
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id,
                                                            )
                                                        }
                                                        title="Hapus role"
                                                        className={
                                                            IS_BOOTSTRAP
                                                                ? 'btn btn-sm btn-outline-danger'
                                                                : 'gap-1.5 font-medium text-rose-400 hover:text-rose-300 inline-flex items-center transition-colors'
                                                        }
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <div
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'mb-3 rounded-circle bg-body-secondary text-secondary d-flex align-items-center justify-content-center'
                                                            : 'mb-3 h-12 w-12 bg-slate-800 text-slate-500 flex items-center justify-center rounded-full'
                                                    }
                                                >
                                                    <FolderOpen className="h-6 w-6" />
                                                </div>

                                                <p
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'fw-medium mb-1'
                                                            : 'text-base font-medium text-slate-300'
                                                    }
                                                >
                                                    Belum Ada Data
                                                </p>

                                                <p
                                                    className={
                                                        IS_BOOTSTRAP
                                                            ? 'text-secondary small mb-0'
                                                            : 'mt-1 text-sm text-slate-500'
                                                    }
                                                >
                                                    Data role saat ini masih
                                                    kosong.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {role.data.length > 0 && (
                        <div
                            className={
                                IS_BOOTSTRAP
                                    ? 'card-footer d-flex align-items-center justify-content-between gap-3 flex-wrap'
                                    : 'border-slate-800 bg-slate-900/50 px-6 py-4 flex items-center justify-between border-t'
                            }
                        >
                            <p
                                className={
                                    IS_BOOTSTRAP
                                        ? 'small text-secondary mb-0'
                                        : 'text-xs text-slate-400'
                                }
                            >
                                Total {role.total} role
                            </p>

                            <div className="gap-1 flex flex-wrap">
                                {role.links.map((link, index) => (
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
                                                ? `btn btn-sm ${link.active ? 'btn-primary' : link.url ? 'btn-outline-secondary' : 'btn-outline-secondary disabled'}`
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

            <AppModal
                open={modalOpen}
                onClose={handleCloseModal}
                title={selectedRole ? 'Edit Role' : 'Tambah Role'}
            >
                <RoleForm
                    key={selectedRole?.id ?? 'create'}
                    role={selectedRole}
                    onClose={handleCloseModal}
                    isBootstrap={IS_BOOTSTRAP}
                />
            </AppModal>
        </>
    );
}
