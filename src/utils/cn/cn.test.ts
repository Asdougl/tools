import { cn } from '.'


describe('cn', () => {
  it('should merge classNames', () => {
    const result = cn('class1', 'class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('should resolve tailwind merge conflicts', () => {
    const result = cn('bg-red-500', 'bg-blue-500')
    expect(result).toBe('bg-blue-500')
  })

  it('should handle empty arguments', () => {
    const result = cn()
    expect(result).toBe('')
  })
})
