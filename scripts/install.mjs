import { resolve } from 'node:path'
import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const replaceFileSourcePath = resolve(__dirname, './vectorx/treelist.ts')
const replaceFileTargetPath = resolve(__dirname, '../node_modules/@vectorx/nuxt-kendo-ui/src/composables/treelist.ts')

copyFileSync(replaceFileSourcePath, replaceFileTargetPath)
