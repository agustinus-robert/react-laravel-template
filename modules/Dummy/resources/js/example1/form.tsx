import { useState } from 'react';
import { upsertData } from '@/lib/ajax';

export default function TestForm() {
    const [spinner, setSpinner] = useState(false);
    const [progress, setProgress] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        upsertData({
            routeName: 'users.store',
            method: 'post',
            data: form,
            setSpinner,
            setProgress,
            setErrors,
        });
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="py-5 container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h5 className="mb-1">Form Pengguna</h5>
                            <p className="text-muted small mb-4">
                                Lengkapi informasi pengguna berikut.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nama</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <div className="text-danger small mt-1">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <div className="text-danger small mt-1">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Nomor Telepon
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && (
                                        <div className="text-danger small mt-1">
                                            {errors.phone}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Alamat</label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        rows={3}
                                        value={form.address}
                                        onChange={handleChange}
                                    />
                                    {errors.address && (
                                        <div className="text-danger small mt-1">
                                            {errors.address}
                                        </div>
                                    )}
                                </div>

                                {progress > 0 && (
                                    <div
                                        className="progress mb-3"
                                        style={{ height: 5 }}
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}

                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={spinner}
                                    >
                                        {spinner ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
