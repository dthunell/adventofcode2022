import { loadFile, sum } from "./helpers.js"
type HAND = 'A' | 'B' | 'C'
type HANDOBJ = {
  [s in HAND]: {
    points: number
    defeats: HAND
    defeatedBy: HAND
  }
}
type RESULT = 'LOSS' | 'DRAW' | 'WIN'
type ROUND = { they: HAND, result: RESULT }
const FILE_CONTENT: string = loadFile('02.txt')

const formatInputOne = (s: string): string[] => {
  return s
    .replaceAll('X', 'A')
    .replaceAll('Y', 'B')
    .replaceAll('Z', 'C')
    .split("\n")
}

const formatInputTwo = (s: string): string[] => {
  return s
    .replaceAll('X', 'LOSS')
    .replaceAll('Y', 'DRAW')
    .replaceAll('Z', 'WIN')
    .split("\n")
}

const ROUND_SCORE = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0
}

const HANDS: HANDOBJ = {
  A: {
    points: 1,
    defeats: 'C',
    defeatedBy: 'B'
  },
  B: {
    points: 2,
    defeats: 'A',
    defeatedBy: 'C'
  },
  C: {
    points: 3,
    defeats: 'B',
    defeatedBy: 'A'
  }
}

const splitHand = (s: string): HAND[] => {
  return s.split(' ') as HAND[]
}

const splitRound = (s: string): ROUND => {
  const [they, result ] = s.split(' ')
  return { 
    they: they as HAND, 
    result: result as RESULT
  }
}

const calculateScoreForRoundOne = (round: string) => {
  const [they, me] = splitHand(round)
  let points = HANDS[me].points

  if (me === they) {
    points += ROUND_SCORE['DRAW']
  } 
  
  if (me === HANDS[they].defeatedBy) {
    points += ROUND_SCORE['WIN']
  }

  return points
}

const calculateScoreForRoundTwo = (round: string) => {
  let points = 0
  const { they, result} = splitRound(round)
  
  if (result === 'DRAW') {
    points += ROUND_SCORE['DRAW']
    points += HANDS[they].points
  } 
  
  if (result === 'LOSS') {
    points += HANDS[HANDS[they].defeats].points
  }

  if (result === 'WIN') {
    points += ROUND_SCORE['WIN']
    points += HANDS[HANDS[they].defeatedBy].points
  }

  return points
}

const totalPointsOne = formatInputOne(FILE_CONTENT)
  .map(calculateScoreForRoundOne)
  .reduce(sum)

const totalPointsTwo = formatInputTwo(FILE_CONTENT)
  .map(calculateScoreForRoundTwo)
  .reduce(sum)

console.log(`Total score one: ${totalPointsOne}`)
console.log(`Total score two: ${totalPointsTwo}`) 
