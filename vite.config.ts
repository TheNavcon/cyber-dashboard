import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'ui-vendor': ['@headlessui/react', 'lucide-react'],
          'auth-vendor': ['@azure/msal-browser', '@azure/msal-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@azure/msal-browser',
      '@azure/msal-react',
      'recharts',
      '@headlessui/react',
      'lucide-react'
    ]
  }
});