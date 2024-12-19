import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react"

const ScrollContext = createContext({
  scrollPosition: 0,
  updateScrollPosition: (_position: number) => {},
})

export const ScrollProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const updateScrollPosition = useCallback((position: number) => {
    setScrollPosition(position)
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollPosition, updateScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScrollContext = () => {
  return useContext(ScrollContext)
}
