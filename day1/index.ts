import * as fs from 'fs'

const digitMap: Record<string, number> = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  // Comment out the following lines for the part 1 solution
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const keys = Object.keys(digitMap)

// Not the most efficient algorithm but gets the job done
const findDigits = (input: string) => {
  let first: number, last: number
  outer: for (let i = 0; i <= input.length; i++) {
    for (const k of keys) {
      if (input.substring(0, i).includes(k)) {
        first = digitMap[k]
        break outer
      }
    }
  }
  outer: for (let i = input.length - 1; i >= 0; i--) {
    for (const k of keys) {
      if (input.substring(i).includes(k)) {
        last = digitMap[k]
        break outer
      }
    }
  }
  //   console.log(input, first!, last!)
  return [first!, last!] as const
}

const input = fs.readFileSync(`${__dirname}/input.txt`).toString().trim()

const rows = input.split('\n')

const numbers = rows.map((row) => findDigits(row)) // e.g. [[5, 4], ...]

// Concatenate both digits as strings and parse the result as number
// E.g. [5, 4] => 54
const result = numbers.reduce((a, b) => a + Number(`${b[0]}${b[1]}`), 0)

console.log(result)
