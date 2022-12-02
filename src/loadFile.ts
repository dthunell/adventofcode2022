import { readFileSync } from 'node:fs'
import * as url from 'url'

export const loadFile = (fileName: string): string => {
  return readFileSync(`${url.fileURLToPath(new URL('.', import.meta.url))}/../input/${fileName}`, 'utf-8')
}

