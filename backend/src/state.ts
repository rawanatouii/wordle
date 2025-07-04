import { checkGuess } from './game'

type Feedback = 'green' | 'yellow' | 'gray'

interface GuessResult {
  word: string
  result: Feedback[]
}

export class GameState {
  private targetWord: string
  private attempts: number = 0
  private maxAttempts: number = 6
  private history: GuessResult[] = []
  private status: 'playing' | 'won' | 'lost' = 'playing'

  
  private wins: number = 0
  private gamesPlayed: number = 0
  private totalAttempts: number = 0
  private currentStreak: number = 0

  constructor(targetWord: string) {
    this.targetWord = targetWord
  }

  makeGuess(word: string): Feedback[] | null {
    if (this.status !== 'playing') return null

    const result = checkGuess(word, this.targetWord)
    this.history.push({ word, result })
    this.attempts++

    if (word === this.targetWord) {
      this.status = 'won'
      this.updateStats(true)
    } else if (this.attempts >= this.maxAttempts) {
      this.status = 'lost'
      this.updateStats(false)
    }

    return result
  }

  private updateStats(won: boolean) {
    this.gamesPlayed++
    if (won) {
      this.wins++
      this.currentStreak++
      this.totalAttempts += this.attempts
    } else {
      this.currentStreak = 0
      this.totalAttempts += this.maxAttempts
    }
  }

  getStatus() {
    return this.status
  }

  getHistory() {
    return this.history
  }

  getRemainingAttempts() {
    return this.maxAttempts - this.attempts
  }

  getStats() {
    return {
      wins: this.wins,
      gamesPlayed: this.gamesPlayed,
      currentStreak: this.currentStreak,
      averageAttempts: this.wins > 0 ? this.totalAttempts / this.wins : 0,
    }
  }

  reset(newTarget: string) {
    this.targetWord = newTarget
    this.attempts = 0
    this.history = []
    this.status = 'playing'
  }
}
