
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
    } else if (this.attempts >= this.maxAttempts) {
      this.status = 'lost'
    }

    return result
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
}
