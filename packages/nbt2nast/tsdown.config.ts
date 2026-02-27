import { defineConfig } from 'tsdown'

export default defineConfig({
  exports: true,
  
  // Config options
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
})
