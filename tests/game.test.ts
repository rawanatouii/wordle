import { describe, it, expect } from 'vitest'
import { checkGuess } from '../src/game'

describe('checkGuess()', () => {
  it('returns all green for exact match', () => {
    expect(checkGuess('apple', 'apple')).toEqual([
      'green', 'green', 'green', 'green', 'green'
    ])
  })

  it('returns all gray for no match', () => {
    expect(checkGuess('crane', 'blitz')).toEqual([
      'gray', 'gray', 'gray', 'gray', 'gray'
    ])
  })

  it('returns yellow for correct letters in wrong places', () => {
    expect(checkGuess('lemon', 'melon')).toEqual([
      'yellow', 'green', 'yellow', 'green', 'green'
    ])
  })

  it('handles duplicate letters correctly (1 in target)', () => {
    expect(checkGuess('allay', 'grape')).toEqual([
      'yellow', 'gray', 'gray', 'gray', 'gray'
    ])
  })

  it('handles duplicate letters correctly (2 in target)', () => {
    expect(checkGuess('eerie', 'rebel')).toEqual([
      'yellow', 'green', 'yellow', 'gray', 'gray'
    ])
  })
})
