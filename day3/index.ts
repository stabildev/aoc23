import * as fs from 'fs'

type Number = {
  id: number
  value: string
}

const isNumber = (char: string) => !isNaN(+char)

const input = fs.readFileSync(`${__dirname}/input.txt`).toString().trim()

const rows = input.split('\n')

const relevantPositions = new Set<string>() // set of "i; j" strings
const numbers = new Map<string, Number>() // map of position string<->Number

let currentNumberId = 0 // id to avoid duplicate numbers
let currentNumber = ''
const currentNumberPositions = new Set<string>() // set of "i; j" strings

const handleNumberEnd = () => {
  if (!currentNumber) {
    return
  }

  for (const position of currentNumberPositions) {
    numbers.set(position, {
      id: currentNumberId,
      value: currentNumber,
    })
  }

  // reset current number
  currentNumber = ''
  currentNumberId++
  currentNumberPositions.clear()
}

for (let i = 0; i < rows.length; i++) {
  const row = rows[i]

  for (let j = 0; j < row.length; j++) {
    const char = row[j]

    if (isNumber(char)) {
      currentNumber += char
      currentNumberPositions.add([i, j].join('; '))

      continue
    }
    // not a number
    handleNumberEnd()

    // handle symbols
    if (char !== '.') {
      // add a 3x3 grid around (i,j)
      for (const x of [i - 1, i, i + 1]) {
        for (const y of [j - 1, j, j + 1]) {
          relevantPositions.add([x, y].join('; '))
        }
      }
    }
  }
  handleNumberEnd()
}

// a map of id<->value
const relevantNumbers = new Map<number, string>()

// find all numbers that are in relevantPositions
for (const position of relevantPositions) {
  if (numbers.has(position)) {
    const currentNumber = numbers.get(position)
    relevantNumbers.set(currentNumber!.id, currentNumber!.value)
  }
}

const numberArray = Array.from(relevantNumbers.values())

const sum = numberArray.reduce((a, b) => a + +b, 0)

console.log(sum)

// Part 2

// find gears
let gearRatioSum = 0

for (let i = 0; i < rows.length; i++) {
  const row = rows[i]

  for (let j = 0; j < row.length; j++) {
    const char = row[j]

    if (char !== '*') {
      continue
    }

    // find numbers adjacent to gear
    const gearNumbers = new Map<number, string>() // map of numberId<->numberValue
    for (const x of [i - 1, i, i + 1]) {
      for (const y of [j - 1, j, j + 1]) {
        const curNumber = numbers.get([x, y].join('; '))
        if (curNumber) {
          gearNumbers.set(curNumber.id, curNumber.value)
        }
      }
    }
    // only gears with exactly two numbers count
    if (gearNumbers.size === 2) {
      const gearRatio = Array.from(gearNumbers.values()).reduce(
        (a, b) => a * +b,
        1
      )
      gearRatioSum += gearRatio
    }
  }
}

console.log(gearRatioSum)
