import { pluralize } from '.';

describe('pluralize', () => {
  it('should return the singular form of a word when count is 1', () => {
    expect(pluralize(1, 'apple', 'apples')).toBe('apple');
    expect(pluralize(1, 'car', 'cars')).toBe('car');
    expect(pluralize(1, 'dog', 'dogs')).toBe('dog');
  });

  it('should return the plural form of a word when count is not 1', () => {
    expect(pluralize(0, 'apple', 'apples')).toBe('apples');
    expect(pluralize(2, 'car', 'cars')).toBe('cars');
    expect(pluralize(2, 'dog', 'dogs')).toBe('dogs');
  });

  it('should return the singular form of a word when given an array of length 1', () => {
    expect(pluralize([1], 'apple', 'apples')).toBe('apple');
    expect(pluralize([1], 'car', 'cars')).toBe('car');
    expect(pluralize([1], 'dog', 'dogs')).toBe('dog');
  })

  it('should return the plural form of a word when given an array of length not 1', () => {
    expect(pluralize([], 'apple', 'apples')).toBe('apples');
    expect(pluralize([1,2], 'car', 'cars')).toBe('cars');
    expect(pluralize(['dog 1', 'dog 2'], 'dog', 'dogs')).toBe('dogs');
  })
});
