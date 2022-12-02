import { loadFile, sum, descending } from "./helpers.js"
const INPUT: string[] = loadFile('01.txt').split("\n\n")

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
    .reduce(sum)

console.log(`The elf with the most calories carries ${mostCalories} calories`)
console.log(`The top three elves carries ${topThreeCalories} calories`)
