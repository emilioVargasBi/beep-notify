import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    environment: 'jsdom'
  },
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
  ]
});