import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import positionsPlugin from './vite-plugin-positions';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), positionsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        ignored: [
          '**/positions.json',
          '**/dist/**',
          '**/src/positions.json',
          '**/src/siteContent.json',
          '**/inquiries.json',
          '**/src/inquiries.json'
        ],
      },
    },
  };
});
