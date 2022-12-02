import { loadFile, sum } from "./helpers.js"
type HAND = 'A' | 'B' | 'C'
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

const HAND_SCORE = {
  'A': 1, // ROCK
  'B': 2, // PAPER
  'C': 3  // SCISSOR
}

const ROUND_SCORE = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0
}

const DEFEATS: {[s: string]: HAND} = {
  A: 'C',
  B: 'A',
  C: 'B'
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
  let points = 0
  const [they, me] = splitHand(round)
  points += HAND_SCORE[me]

  if (they === me) {
    points += ROUND_SCORE['DRAW']
  } 
  
  if (DEFEATS[me] === they) {
    points += ROUND_SCORE['WIN']
  }

  return points
}

const calculateScoreForRoundTwo = (round: string) => {
  let points = 0
  const { they, result} = splitRound(round)
  
  if (result === 'DRAW') {
    points += ROUND_SCORE['DRAW']
    points += HAND_SCORE[they]
  } 
  
  if (result === 'LOSS') {
    points += HAND_SCORE[DEFEATS[they]]
  }

  if (result === 'WIN') {
    points += ROUND_SCORE['WIN']
    points += HAND_SCORE[]
  }

  return points
}

const totalPointsOne = formatInputOne(FILE_CONTENT)
  .map(calculateScoreForRoundOne)
  .reduce(sum)

console.log(`Total score one: ${totalPointsOne}`) // Total score: 11666
