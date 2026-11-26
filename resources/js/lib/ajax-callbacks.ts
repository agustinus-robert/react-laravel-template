import { toast } from 'sonner';

interface Flash {
    success?: string;
    error?: string;
}

export function ajaxCallbacks() {
    return {
        onSuccess: (page: any) => {
            const flash = page.props.flash as Flash;

            if (flash.success) {
                toast.success(flash.success);
            }

            if (flash.error) {
                toast.error(flash.error);
            }
        },

        onHttpException: (response: any) => {
            const messages: Record<number, string> = {
                400: 'Permintaan tidak valid',
                401: 'Sesi anda telah berakhir. Silahkan Login Kembali...',
                403: 'Anda tidak memiliki izin untuk melakukan ini...',
                404: 'Data Atau Halaman tidak ditemukan...',
                419: 'Sesi kadaluarsa. Silahkan muat ulang halaman',
                422: 'Data yang dikirim tidak dapat diproses',
                429: 'Terlalu banyak permintaan, coba nanti lagi',
                500: 'Terjadi kesalahan pada server.. Harap Hubungi administrator',
                502: 'Server sedang mengalami gangguan..',
                503: 'Layanan sementara tidak tersedia',
                504: 'Server terlalu lama merespon...',
            };

            toast.error(
                messages[response.status] ??
                    `Terjadi kesalahan HTTP ${response.status}`,
            );
        },

        onNetworkError: () => {
            toast.error(
                'Tidak dapat terhubung pada server. Periksa jaringan anda...',
            );
        },

        onCancel: () => {
            toast.error('Request dibatalkan');
        },
    };
}
