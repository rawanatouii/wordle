import { describe, it, expect, beforeEach } from 'vitest'
import { GameState } from '../src/state'

describe('GameState extended', () => {
  let game: GameState

  beforeEach(() => {
    game = new GameState('apple')
  })

  it('resets game and stats correctly', () => {
    game.makeGuess('apple')
    expect(game.getStatus()).toBe('won')

    game.reset('melon')
    expect(game.getStatus()).toBe('playing')
    expect(game.getRemainingAttempts()).toBe(6)
    expect(game.getHistory()).toHaveLength(0)
  })

  it('tracks stats for wins and losses', () => {
    // lose first game
    for (let i = 0; i < 6; i++) game.makeGuess('grape')
    expect(game.getStatus()).toBe('lost')

    // stats after loss
    expect(game.getStats().gamesPlayed).toBe(1)
    expect(game.getStats().wins).toBe(0)
    expect(game.getStats().currentStreak).toBe(0)

    game.reset('apple')

    // win second game
    game.makeGuess('apple')
    expect(game.getStatus()).toBe('won')

    expect(game.getStats().gamesPlayed).toBe(2)
    expect(game.getStats().wins).toBe(1)
    expect(game.getStats().currentStreak).toBe(1)
    expect(game.getStats().averageAttempts).toBeGreaterThan(0)
  })
})
