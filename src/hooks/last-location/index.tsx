import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// MOCKED!
const usePathname = () => {
  // detect if in test environment
  if (typeof window === 'undefined') {
    throw new Error('usePathname has not been implemented!')
  }
  return location.pathname
}

const lastLocationCtx = createContext('')

// eslint-disable-next-line react-refresh/only-export-components
export const useLastLocation = () => {
  return useContext(lastLocationCtx)
}

export const LastLocationProvider: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname()

  const [history, setHistory] = useState({
    previous: pathname,
    current: pathname,
  })

  useEffect(() => {
    setHistory((history) => ({
      previous: history.current,
      current: pathname,
    }))
  }, [pathname])

  return (
    <lastLocationCtx.Provider value={history.previous}>
      {children}
    </lastLocationCtx.Provider>
  )
}
