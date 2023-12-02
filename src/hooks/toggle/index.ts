import { useState } from "react"

export const useToggle = (initialState?: boolean) => {
  const [state, setState] = useState(initialState || false)

  const toggle = (newState?: boolean) => {
    if (newState === undefined) {
      setState((value) => !value)
    } else {
      setState(newState)
    }
  }

  return [state, toggle] as const
}