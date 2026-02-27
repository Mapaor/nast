import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/nast.ts', 'src/nbt.ts', 'src/common.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
})
