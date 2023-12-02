import { useState } from "react"

export const useStateMap = <Key extends string, Value>(
  initialState?: Partial<Record<Key, Value>>
) => {
  // Create a new Map instance
  const [map] = useState(() => {
    const initialMap = new Map<Key, Value>()

    if (initialState) {
      for (const [key, value] of Object.entries(initialState)) {
        initialMap.set(key as Key, value as Value)
      }
    }

    return initialMap
  })
  // Create a stateful value to force re-renders
  const [, render] = useState(Date.now())

  // Create a set of functions to manipulate the map

  /** Get contents of State Map */
  const get = (key: Key) => {
    return map.get(key)
  }

  /** Set contents of State Map */
  const set = (key: Key, value: Value) => {
    const old = map.get(key)
    // If the value hasn't changed, don't update
    if (old === value) return
    // Update the value
    map.set(key, value)
    // Force a re-render
    render(Date.now())
  }

  /** Remove contents of State Map */
  const remove = (key: Key) => {
    // If the key doesn't exist, don't do anything
    if (!map.has(key)) return
    // Remove the key
    map.delete(key)
    // Force a re-render
    render(Date.now())
  }

  /** Check if State Map has contents */
  const has = (key: Key) => {
    return map.has(key)
  }

  /** Clear contents of State Map */
  const clear = () => {
    map.clear()
    // Force a re-render
    render(Date.now())
  }

  // emulate map methods

  const values = () => map.values()

  const keys = () => map.keys()

  const entries = () => map.entries()

  return {
    get,
    set,
    delete: remove,
    has,
    clear,
    values,
    keys,
    entries,
    // Allow direct access to the size
    get size() {
      return map.size
    },
    // Allow direct access to the map
    get state() {
      return map
    }
  } as const
}