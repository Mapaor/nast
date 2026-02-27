import { defineConfig } from 'tsdown'

export default defineConfig({
  exports: true,
  
  // Config options
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: {
    resolve: true,
  },
  clean: true,
  hash: false,
})
