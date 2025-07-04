export type LetterFeedback = 'green' | 'yellow' | 'gray'

export function checkGuess(guess: string, target: string): LetterFeedback[] {
  const feedback: LetterFeedback[] = Array(guess.length).fill('gray')
  const targetLetters = target.split('')
  const guessLetters = guess.split('')

  // Keep track of letters matched for green and yellow
  const targetLetterCount: Record<string, number> = {}

  // Count frequency of letters in target word
  for (const letter of targetLetters) {
    targetLetterCount[letter] = (targetLetterCount[letter] || 0) + 1
  }

  // Step 1: Green pass (exact matches)
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      feedback[i] = 'green'
      targetLetterCount[guessLetters[i]]!--
    }
  }

  // Step 2: Yellow pass (wrong position, letter exists and unused)
  for (let i = 0; i < guessLetters.length; i++) {
    if (feedback[i] === 'green') continue // skip greens
    const letter = guessLetters[i]
    if (targetLetterCount[letter] && targetLetterCount[letter] > 0) {
      feedback[i] = 'yellow'
      targetLetterCount[letter]!--
    }
  }

  return feedback
}
