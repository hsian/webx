import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

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
  plugins: [
    dts({
      outDir: 'dist/types',
      insertTypesEntry: true,
      rollupTypes: true,
      include: ['lib/**/*.ts'], // 只生成 lib 文件夹的类型声明
    }),
  ],
});
