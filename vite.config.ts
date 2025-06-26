import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vitePluginVue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createHash } from 'node:crypto';

console.log(createHash('sha256').update('abc').digest('hex'));

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, './lib/index.ts'),
        vue: resolve(__dirname, './lib/vue/index.ts'),
      },
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'lodash-es', 'axios', 'js-cookie'],
      output: {
        // Removed inlineDynamicImports as it is incompatible with multiple entry points
      },
    },
    minify: false,
  },
  esbuild: {
    target: 'es2021'
  },
  plugins: [
    vitePluginVue(),
    dts({
      outDir: 'dist/types',
      insertTypesEntry: true,
      rollupTypes: true,
      include: ['lib/**/*.ts'],
    })
  ],
});
