import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      // نقوم بتمرير الـ React Compiler مباشرة داخل إعدادات Babel الخاصة بملحق ريآكت
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", {}],
        ],
      },
    }),
  ],
})