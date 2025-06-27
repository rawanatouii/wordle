export type LetterFeedback = 'green' | 'yellow' | 'gray'

export function checkGuess(guess: string, target: string): LetterFeedback[] {
  const feedback: LetterFeedback[] = Array(5).fill('gray')
  const targetLetters = target.split('')
  const guessLetters = guess.split('')

  const usedTarget = Array(5).fill(false)
  const usedGuess = Array(5).fill(false)

  // Step 1: Green pass (exact matches)
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      feedback[i] = 'green'
      usedTarget[i] = true
      usedGuess[i] = true
    }
  }

  // Step 2: Yellow pass (wrong position, right letter)
  for (let i = 0; i < 5; i++) {
    if (usedGuess[i]) continue // already green

    for (let j = 0; j < 5; j++) {
      if (!usedTarget[j] && guessLetters[i] === targetLetters[j]) {
        feedback[i] = 'yellow'
        usedTarget[j] = true
        usedGuess[i] = true
        break
      }
    }
  }

  return feedback
}
