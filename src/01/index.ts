import { readFileSync } from 'node:fs'
import * as url from 'url'

const loadFile = (): string[] => {
  return readFileSync(`${url.fileURLToPath(new URL('.', import.meta.url))}/input.txt`, 'utf-8')
    .split("\n\n")
}

const descending = (a:number, b: number): number => b - a

const INPUT: string[] = loadFile()

const caloriesPerElf = (elfPayload: string) => {
  return elfPayload
    .split("\n")
    .map((a) => parseInt(a))
    .reduce((a, b) => a + b)
}

const mostCalories =
  INPUT
    .map(caloriesPerElf)
    .sort(descending)
    .at(0) as number

const topThreeCalories =
  INPUT
    .map(caloriesPerElf)
    .sort(descending)
    .slice(0, 3)
    .reduce((acc, current) => acc + current)

console.log(`The elf with the most calories carries ${mostCalories} calories`)
console.log(`The top three elves carries ${topThreeCalories} calories`)
