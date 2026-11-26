import { Link, Head } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import { Pencil, Trash, FolderOpen, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
    id: number;
    name: string;
    slug: string;
    creator: {
        id: number;
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    permission: {
        data: Permission[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
}

export default function Permission({ permission }: Props) {
    function handleDelete(id: number) {
        if (!confirm('Apakah Anda yakin ingin menghapus permission ini?')) {
            return;
        }

        router.delete(
            route('account.permission.destroy', {
                permission: id,
            }),
            {
                onSuccess: () => {
                    toast.success('Permission berhasil dihapus.');
                },
                onError: () => {
                    toast.error('Permission gagal dihapus.');
                },
            },
        );
    }
    return (
        <>
            <Head title="Kategori" />
            <div className="px-4 py-8 sm:px-6 lg:px-8 w-full">
                <div className="rounded-xl border-slate-800 bg-background shadow-xl w-full overflow-hidden border">
                    <div className="border-slate-800 bg-background px-6 py-4 flex items-center justify-between border-b">
                        <h2 className="text-lg font-semibold text-slate-100">
                            Daftar Permission
                        </h2>

                        <Link
                            href={route('account.permission.create')}
                            className="btn rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white"
                        >
                            Tambah
                        </Link>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="text-sm text-slate-300 w-full text-left">
                            <thead className="border-slate-800 bg-background text-xs tracking-wider text-slate-400 border-b uppercase">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3.5 font-medium"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3.5 font-medium"
                                    >
                                        Slug
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3.5 font-medium"
                                    >
                                        Dibuat Oleh
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3.5 font-medium text-right"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-slate-800 bg-background divide-y">
                                {permission.data.length > 0 ? (
                                    permission.data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-slate-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="bg-background-800 border-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-300 inline-flex items-center rounded-full border">
                                                    {item.slug}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                                                {item.creator?.name ?? '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                                <div className="gap-3 flex items-center justify-end">
                                                    <Link
                                                        href={route(
                                                            'account.permission.edit',
                                                            item.id,
                                                        )}
                                                        className="gap-1.5 font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center transition-colors"
                                                    >
                                                        <Pencil className="h-4 w-4" />{' '}
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id,
                                                            )
                                                        }
                                                        className="gap-1.5 font-medium text-rose-400 hover:text-rose-300 inline-flex items-center transition-colors"
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
                                                <div className="mb-3 h-12 w-12 bg-slate-800 text-slate-500 flex items-center justify-center rounded-full">
                                                    <FolderOpen className="h-6 w-6" />
                                                </div>
                                                <p className="text-base font-medium text-slate-300">
                                                    Belum Ada Data
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
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

                    {permission.data.length > 0 && (
                        <div className="border-slate-800 bg-slate-900/50 px-6 py-4 flex items-center justify-between border-t">
                            <div className="gap-1 flex flex-wrap">
                                {permission.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : link.url
                                                  ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 border'
                                                  : 'border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed border'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
