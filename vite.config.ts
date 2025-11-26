
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: This base URL is required for GitHub Pages
  // If your repo is namojo.github.io, base should be '/'
  // If your repo is namojo/my-blog, base should be '/my-blog/'
  base: '/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
