import { validWords } from './dictionary';

/**
 * Validates that the word is:
 *  - Exactly 5 letters
 *  - Alphabetic only (a–z or A–Z)
 *  - Present in the validWords dictionary
 */
export function validateWord(word: string): boolean {
  const isFiveLetters = /^[a-zA-Z]{5}$/.test(word);
  const inDictionary = validWords.includes(word.toLowerCase());

  return isFiveLetters && inDictionary;
}
