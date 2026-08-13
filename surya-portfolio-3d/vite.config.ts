import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/surya-portfolio-3d/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('/three/')) return 'three'
            if (id.includes('@react-three')) return 'r3f'
            if (id.includes('/gsap/')) return 'gsap'
          }
        },
      },
    },
  },
})
