import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'mimojs',
      fileName: 'mimojs',
      formats: ['es', 'umd']
    }
  }
})
