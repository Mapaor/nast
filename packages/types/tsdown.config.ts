import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/nast.ts', 'src/nbt.ts', 'src/common.ts'],
  format: ['esm'],
  dts: {
    // Use stable filenames for declaration files
    resolve: true,
  },
  clean: true,
  // Use stable output filenames
  hash: false,
})
