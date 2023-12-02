import { type EffectCallback, useEffect, useRef } from "react"

/**
 * A hook that executes code only on component mount.
 */
export const useMountEffect = (callback: EffectCallback) => {
  // Track whether the component is mounted
  const mountedRef = useRef(false)

  useEffect(() => {
    // track a destructor function
    let destructor: ReturnType<EffectCallback> | undefined = undefined
    // if the component has yet to be mounted
    if(!mountedRef.current) {
      // run the callback and store the destructor
      destructor = callback()
      // mark the component as mounted
      mountedRef.current = true
    }
    // return the destructor, if any
    return destructor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}