import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Beep',
      fileName: 'beep-notify',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true, // genera un index.d.ts en dist automáticamente
    }),
  ],
  server: {
        allowedHosts: [
            '8261-2a0c-5a84-9507-e500-9a1-f792-6e4b-1d04.ngrok-free.app'
        ]
    }
});