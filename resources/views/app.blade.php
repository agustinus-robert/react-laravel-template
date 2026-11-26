<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('light');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: #f4f5f2 !important;
                color-scheme: light;
            }

            html.dark {
                background-color: #f4f5f2 !important;
                color-scheme: light;
            }

            body {
                background-color: #f4f5f2 !important;
            }
        </style>

        <link rel="icon" href="/laravel-ico.png" sizes="any">
        <link rel="apple-touch-icon" href="/laravel-ico.png">
        @routes
        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        <x-inertia::head>
            <title>Template Laravel React</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
