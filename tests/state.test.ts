import { describe, it, expect } from 'vitest'
import { GameState } from '../src/state'

describe('GameState', () => {
  it('should track attempts and detect win', () => {
    const game = new GameState('apple')

    const feedback = game.makeGuess('apple')
    expect(feedback).toEqual(['green', 'green', 'green', 'green', 'green'])
    expect(game.getStatus()).toBe('won')
    expect(game.getRemainingAttempts()).toBe(5)
  })

  it('should track failed guesses and detect loss', () => {
    const game = new GameState('apple')

    for (let i = 0; i < 6; i++) {
      game.makeGuess('grape')
    }

    expect(game.getStatus()).toBe('lost')
    expect(game.getRemainingAttempts()).toBe(0)
  })

  it('should not allow guesses after game over', () => {
    const game = new GameState('apple')

    for (let i = 0; i < 6; i++) {
      game.makeGuess('grape')
    }

    const extra = game.makeGuess('apple')
    expect(extra).toBe(null)
  })
})
