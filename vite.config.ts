import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import sassDts from 'vite-plugin-sass-dts';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassDts(), mkcert()],
  resolve: {
    alias: [{ find: '@', replacement: `${__dirname}/src` }],
  },
  server: {
    host: 'teamwink.com',
    proxy: {
      '/cafe24': {
        target: 'https://teamwink.cafe24api.com/api/v2',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/cafe24/, ''),
      },
      '/imgur': {
        target: 'https://api.imgur.com/3/image',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/imgur/, ''),
      },
      '/iamport': {
        target: 'https://api.iamport.kr',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/iamport/, ''),
      },
    },
  },
});
