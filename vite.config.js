import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    hmr: {
      overlay: false, // Показывать оверлей с ошибками HMR в браузере
    },
  },
})
