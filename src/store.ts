import Lenis from "lenis"
import { create } from "zustand"

type ScrollStore = {
  scrollPosition: number
  lenis: Lenis | null
  setScrollPosition: (value: number) => void
  setLenis: (value: Lenis) => void
}

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollPosition: 0,
  lenis: null as Lenis | null,
  setScrollPosition: (value: number) => set({ scrollPosition: value }),
  setLenis: (value: Lenis) => set({ lenis: value }),
}))
