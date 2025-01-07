import Lenis from "lenis"
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react"

const ScrollContext = createContext({
  scrollPosition: 0,
  lenis: null as Lenis | null,
  updateScrollPosition: (_position: number) => {},
  setLenisRef: (_ref: Lenis) => {},
})

export const ScrollProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(-1)
  const lenisRef = useRef<Lenis | null>(null)

  const updateScrollPosition = (position: number) => {
    setScrollPosition(position)
  }

  const setLenisRef = (ref: Lenis) => {
    lenisRef.current = ref
  }

  return (
    <ScrollContext.Provider
      value={{
        scrollPosition,
        lenis: lenisRef.current,
        updateScrollPosition,
        setLenisRef,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export const useScrollContext = () => {
  return useContext(ScrollContext)
}
