import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

if (process.argv.length < 3) {
  console.warn('cannout found target module')
  process.exit(1)
}

register('@std/esm', pathToFileURL('./'))
// import('./install.mjs')
