import { useState } from "react"

export const useStateSet = <T>(initialValue: T[] = []) => {
  const [stateSet] = useState(new Set<T>(initialValue))
  const [, render] = useState(Date.now())

  const triggerRender = () => {
    render(Date.now())
  }

  const add = (item: T) => {
    if(stateSet.has(item)) return
    stateSet.add(item)
    triggerRender()
  }

  const remove = (item: T) => {
    if(!stateSet.has(item)) return
    stateSet.delete(item)
    triggerRender()
  }

  const has = (item: T) => stateSet.has(item)

  const clear = () => {
    if(stateSet.size === 0) return
    stateSet.clear()
    triggerRender()
  }

  const values = () => stateSet.values()

  const keys = () => stateSet.keys()

  const entries = () => stateSet.entries()

  const toArray = (): T[] => Array.from(stateSet)

  const set = (items: T[]) => {
    stateSet.clear()
    items.forEach(stateSet.add)
    triggerRender()
  }

  return {
    add,
    set,
    delete: remove,
    has,
    clear,
    values,
    keys,
    entries,
    toArray,
    addStart: (item: T) => {
      const allItems = toArray()
      set([item, ...allItems])
    },
    addEnd: add,
    trimStart: (count: number) => {
      const allItems = toArray()
      set(allItems.slice(count))
    },
    trimEnd: (count: number) => {
      const allItems = toArray()
      set(allItems.slice(0, allItems.length - count))
    },
    get size() {
      return stateSet.size
    },
    get state() {
      return stateSet
    }
  } as const
}