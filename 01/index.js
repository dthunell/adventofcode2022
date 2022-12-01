import { readFileSync } from 'node:fs'
import * as url from 'url'

const loadFile = () => {
    return readFileSync(`${url.fileURLToPath(new URL('.', import.meta.url))}/input.txt`, 'utf-8')
        .split("\n\n")
}

const caloriesPerElf = (elfPayload) => {
    return elfPayload
        .split("\n")
        .map((a) => parseInt(a))
        .reduce((a,b) => a + b)
}

const mostCalories = 
    loadFile()
    .map(caloriesPerElf)
    .sort((a, b) => b - a)
    .at(0)

console.log(`The elf with the most calories carries ${mostCalories} calories`)