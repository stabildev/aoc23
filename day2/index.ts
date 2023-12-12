import * as fs from 'fs'

const input = fs.readFileSync(`${__dirname}/input.txt`).toString().trim()

// constellation
const maxRed = 12
const maxGreen = 13
const maxBlue = 14

type Color = 'red' | 'green' | 'blue'

type Game = {
  id: number
  subsets: Record<Color, number>[]
}

const parseGame = (input: string) => {
  // e.g "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
  console.log(input)
  const [meta, rounds] = input.split(': ')
  const id = Number(meta.substring(5))

  const subsets = rounds.split('; ').map((subset) => {
    const res = {
      red: 0,
      green: 0,
      blue: 0,
    }
    for (const pair of subset.split(', ')) {
      const [qty, color] = pair.split(' ')
      res[color as Color] = Number(qty)
    }
    return res
  })

  return {
    id,
    subsets,
  } satisfies Game
}

const isPossible = (game: Game) =>
  !game.subsets.some(
    (s) => s.red > maxRed || s.green > maxGreen || s.blue > maxBlue
  )

const games = input.split('\n').map(parseGame)

const possibleGames = games.filter(isPossible)

const sumOfIds = possibleGames.reduce((a, b) => a + b.id, 0)

console.log(sumOfIds)

// Part 2

const minSets = games.map(
  (g) =>
    ({
      red: g.subsets.reduce((a, b) => Math.max(a, b.red), 0),
      green: g.subsets.reduce((a, b) => Math.max(a, b.green), 0),
      blue: g.subsets.reduce((a, b) => Math.max(a, b.blue), 0),
    } satisfies Game['subsets'][number])
)

const power = minSets.reduce((a, b) => a + b.red * b.green * b.blue, 0)

console.log(power)
