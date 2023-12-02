import { shuffle } from '.'

describe('shuffle', () => {
  it('should shuffle the elements of an array', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffle(array)

    // Check if the shuffled array has the same elements as the original array
    expect(shuffledArray).toHaveLength(array.length)
    expect(shuffledArray).toEqual(expect.arrayContaining(array))

    // Check if the shuffled array is different from the original array
    expect(shuffledArray).not.toEqual(array)
  })

  it('should return an empty array if the input array is empty', () => {
    const array: number[] = []
    const shuffledArray = shuffle(array)

    expect(shuffledArray).toHaveLength(0)
    expect(shuffledArray).toEqual([])
  })

  it('should return a new array and not modify the original array', () => {
    const array = [1, 2, 3, 4, 5]
    const originalArray = [...array]
    const shuffledArray = shuffle(array)

    expect(shuffledArray).not.toBe(array)
    expect(array).toEqual(originalArray)
  })
})

