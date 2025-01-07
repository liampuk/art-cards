import Lenis from "lenis"

export const scrollTo = (lenis: Lenis | null, page: number) => {
  if (lenis) {
    lenis.scrollTo(window.innerHeight * page, { duration: 1 })
  }
}
