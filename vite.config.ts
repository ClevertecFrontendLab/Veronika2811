import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/Veronika2811/' : '/',
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
    },
    resolve: {
        alias: {
            '@public': path.resolve(__dirname, 'public'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@/types': path.resolve(__dirname, 'src/types'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                math: 'always',
                relativeUrls: true,
                javascriptEnabled: true,
            },
        },
    },
}));
