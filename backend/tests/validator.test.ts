import { describe, it, expect } from 'vitest';
import { validateWord } from '../src/validator';

describe('validateWord()', () => {
  it('rejects words shorter than 5 letters', () => {
    expect(validateWord('app')).toBe(false);
    expect(validateWord('go')).toBe(false);
    expect(validateWord('a')).toBe(false);
  });

  it('rejects words longer than 5 letters', () => {
    expect(validateWord('apples')).toBe(false);
    expect(validateWord('grapes')).toBe(false);
    expect(validateWord('bananas')).toBe(false);
  });

  it('rejects words with non-alphabetic characters', () => {
    expect(validateWord('app3e')).toBe(false);
    expect(validateWord('gr@pe')).toBe(false);
    expect(validateWord('12345')).toBe(false);
    expect(validateWord('app!e')).toBe(false);
  });

  it('rejects valid-length but unknown words not in the dictionary', () => {
    expect(validateWord('zzzzz')).toBe(false);
    expect(validateWord('frank')).toBe(false); // assuming 'frank' is not in your dictionary
  });

  it('accepts valid dictionary words in lowercase', () => {
    expect(validateWord('apple')).toBe(true);
    expect(validateWord('grape')).toBe(true);
    expect(validateWord('melon')).toBe(true);
  });

  it('accepts valid dictionary words in uppercase', () => {
    expect(validateWord('APPLE')).toBe(true);
    expect(validateWord('GRAPE')).toBe(true);
  });

  it('accepts valid dictionary words in mixed case', () => {
    expect(validateWord('ApPlE')).toBe(true);
    expect(validateWord('GrApE')).toBe(true);
  });
});
