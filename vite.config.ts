import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Biel do Corte - Barbearia Profissional',
          short_name: 'Biel do Corte',
          description: 'Agende seu corte na Barbearia Biel do Corte. Estilo e profissionalismo.',
          theme_color: '#000000',
          icons: [
            {
              src: 'logo.jpg',
              sizes: '192x192',
              type: 'image/jpeg'
            },
            {
              src: 'logo.jpg',
              sizes: '512x512',
              type: 'image/jpeg'
            }
          ]
        }
      })
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
