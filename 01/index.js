import { readFileSync } from 'node:fs'
import * as url from 'url'

const loadFile = () => {
    return readFileSync(`${url.fileURLToPath(new URL('.', import.meta.url))}/input.txt`, 'utf-8')
        .split("\n\n")
}

const caloriesPerElf = (elfPayload, index) => {
    const calories = elfPayload
        .split("\n")
        .map((a) => parseInt(a))
        .reduce((a,b) => a + b)
    
    return {
        index,
        calories
    }
}

const indexOfElfWithMostCalories = 
    loadFile()
    .map(caloriesPerElf)
    .sort((a, b) => b.calories - a.calories)
    .at(0)
    .index

console.log(indexOfElfWithMostCalories)