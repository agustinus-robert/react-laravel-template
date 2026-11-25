import { router, usePage } from '@inertiajs/react';
import '../../../css/home.css';

export default function Home() {
    return (
        <div className="home">
            <nav className="home-nav">
                <div className="home-brand">
                    <span className="home-brand-icon">L</span>
                    <span>Laravel React</span>
                </div>

                <div className="home-nav-links">
                    <a href="https://laravel.com/docs">Laravel</a>
                    <a href="https://react.dev">React</a>
                    <a href="https://inertiajs.com">Inertia</a>
                </div>
            </nav>

            <main className="home-main">
                <div className="home-content">
                    <div className="home-badge">
                        ✦ Laravel + React + Inertia
                    </div>

                    <h1>
                        Selamat Datang di
                        <span> Laravel React</span>
                    </h1>

                    <p>
                        Aplikasi ini dibangun menggunakan Laravel sebagai
                        backend, React sebagai frontend, dan Inertia.js sebagai
                        jembatan antara keduanya.
                    </p>

                    <div className="home-actions">
                        <button
                            className="home-btn-primary"
                            onClick={() => router.visit('/topik')}
                        >
                            Mulai Explore →
                        </button>

                        <a
                            href="https://laravel.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="home-btn-secondary"
                        >
                            Dokumentasi
                        </a>
                    </div>

                    <div className="home-footer">
                        Made with care. Built for developers.
                    </div>
                </div>

                <div className="home-decoration">
                    <div className="home-circle circle-one"></div>
                    <div className="home-circle circle-two"></div>

                    <div className="home-glass">
                        <span>✦</span>
                    </div>
                </div>
            </main>

            <section className="home-explore">
                <div className="home-section-heading">
                    <span>GET STARTED</span>
                    <h2>Silakan Explore Component</h2>
                    <p>
                        Mulai eksplorasi berbagai teknologi dan komponen yang
                        tersedia dalam aplikasi ini.
                    </p>
                </div>

                <div className="home-cards">
                    <a
                        href="https://laravel.com/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-card"
                    >
                        <div className="home-card-icon laravel-icon">L</div>
                        <h3>Laravel</h3>
                        <p>
                            Pelajari routing, controller, middleware, database,
                            dan berbagai fitur backend.
                        </p>
                        <span>Explore Laravel →</span>
                    </a>

                    <a
                        href="https://react.dev/learn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-card"
                    >
                        <div className="home-card-icon react-icon">⚛</div>
                        <h3>React</h3>
                        <p>
                            Eksplorasi component, props, hooks, state, dan
                            pengembangan antarmuka modern.
                        </p>
                        <span>Explore React →</span>
                    </a>

                    <a
                        href="https://inertiajs.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-card"
                    >
                        <div className="home-card-icon inertia-icon">I</div>
                        <h3>Inertia.js</h3>
                        <p>
                            Pelajari integrasi Laravel dan React melalui
                            navigasi serta komunikasi berbasis Inertia.
                        </p>
                        <span>Explore Inertia →</span>
                    </a>
                </div>
            </section>

            <footer className="home-bottom">
                <span>Laravel React Starter</span>
                <span>© {new Date().getFullYear()} All rights reserved.</span>
            </footer>
        </div>
    );
}
