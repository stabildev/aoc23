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

const matches = cards.map(
  ({ winning, yours }) => yours.filter((x) => winning.includes(x)).length
)

const points = matches
  .filter(Boolean) // remove zero points
  .map((matches) => 2 ** (matches - 1))

const totalPoints = points.reduce((a, b) => a + b, 0) // sum

console.log(totalPoints)

// Part 2

// index in original cards array <-> quantity
// default 1 for every index at beginning
const numbersOfCards = new Map(cards.map((_, i) => [i, 1]))

// loop over all cards
for (let i = 0; i < cards.length; i++) {
  // how many copies do we already have of this card?
  // initially one plus all the already won ones
  const copies = numbersOfCards.get(i)!

  // for each copy we win one additional copy of the n following
  // cards, where n is the number of matches of the current card
  for (let j = i + 1; j <= i + matches[i]; j++) {
    // update the number of cards to increase by the number of copies
    // of the current card
    numbersOfCards.set(j, numbersOfCards.get(j)! + copies)
  }
}

// sum up all card counts
const totalNumberOfCards = Array.from(numbersOfCards.values()).reduce(
  (a, b) => a + b,
  0
)

console.log(totalNumberOfCards)
