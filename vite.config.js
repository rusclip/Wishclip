import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'public/index.html'  // 🔥 Обязательно!
    }
  },
  root: '.'  // Явно указываем корень проекта
});
