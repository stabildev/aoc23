import * as fs from 'fs'

const input = fs.readFileSync(`${__dirname}/input.txt`).toString().trim()

const cards = input
  .split('\n')
  .map((row) => row.split(/:\s+/)[1])
  .map((row) => row.split(/\s+\|\s+/))
  .map(([winning, yours]) => ({
    winning: winning.split(/\s+/),
    yours: yours.split(/\s+/),
  }))

const points = cards
  .map(({ winning, yours }) => yours.filter((x) => winning.includes(x)).length)
  .filter(Boolean) // remove zero points
  .map((matches) => 2 ** (matches - 1))
  .reduce((a, b) => a + b, 0) // sum

console.log(points)
