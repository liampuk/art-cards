import Lenis from "lenis"
import { create } from "zustand"

type ScrollStore = {
  scrollPosition: number
  lenis: Lenis | null
  scrollRef: HTMLDivElement | null
  setScrollPosition: (value: number) => void
  setLenis: (value: Lenis) => void
  setScrollRef: (value: HTMLDivElement | null) => void
}

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollPosition: 0,
  lenis: null as Lenis | null,
  scrollRef: null as HTMLDivElement | null,
  setScrollPosition: (value: number) => set({ scrollPosition: value }),
  setLenis: (value: Lenis) => set({ lenis: value }),
  setScrollRef: (value: HTMLDivElement | null) => set({ scrollRef: value }),
}))
