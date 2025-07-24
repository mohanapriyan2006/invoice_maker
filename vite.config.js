import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
    ],
    define: {
      __API_URL__: JSON.stringify(env.VITE_GEMINI_API_KEY),
    },
  };
})
