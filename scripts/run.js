import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

if (process.argv.length < 3) {
  console.warn('cannout found target module')
  process.exit(1)
}

const executionPath = process.argv[2]

register('@std/esm', pathToFileURL('./'))
import(executionPath)
