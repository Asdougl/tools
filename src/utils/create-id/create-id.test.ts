import { createId } from "."

describe('utils/create-id', () => {
  it('should create a probably-unique id', () => {
    const id = createId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    const id2 = createId()
    expect(id).not.toBe(id2)
  })
})