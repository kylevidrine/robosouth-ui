import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom', 'lucide-react', 'sonner', 'clsx', 'tailwind-merge'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@robosouth/ui/frame': path.resolve(__dirname, '../src/frame/index.ts'),
      '@robosouth/ui': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  server: { fs: { allow: ['..'] } },
});
