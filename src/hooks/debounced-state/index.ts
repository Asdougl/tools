import { useEffect, useState } from "react"

/**
 * A hook that returns a debounced value.
 */
export const useDebouncedState = <T>(initialValue: T, delay: number) => {
  // Track the current value
  const [value, setValue] = useState(initialValue)
  // Track the debounced value
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    // set a timeout for the debouncedValue to get updated to match
    // the current value after the specified delay
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // clear the timeout on re-renders to avoid updating debouncedValue
    return () => clearTimeout(timeout)
  }, [value, delay])
  // return the current value, the setter, whether the current value, and the current value
  return [debouncedValue, setValue, value === debouncedValue, value] as const
}