import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 👈 المكوّن الرسمي لـ Tailwind v4

export default defineConfig({
  plugins: [
    tailwindcss(), // 👈 يجب وضع مكوّن تيلوند أولاً ليقوم بمعالجة الأنماط
    react(),
  ],
});