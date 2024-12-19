import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Lenis from "lenis"
import { FC, useEffect, useRef } from "react"
import styled from "styled-components"
gsap.registerPlugin(ScrollTrigger)

export const App2: FC = () => {
  const imgRef = useRef<HTMLImageElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ wrapper: scrollerRef.current || undefined })

    const raf = (time: number) => {
      lenis.raf(time)
      ScrollTrigger.update()
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on("scroll", (e) => {
      // updateScrollPosition(e.scroll)
    })

    const el = imgRef.current
    gsap.fromTo(
      el,
      { x: 0 },
      {
        x: 200,
        duration: 3,
        scrollTrigger: {
          scroller: scrollerRef.current,
          trigger: el,
          markers: true,
          start: "top center",
          end: "bottom center",
        },
      }
    )
  }, [])

  return (
    <FixedContainer ref={scrollerRef}>
      <Container>
        <Block></Block>
        <Block2>
          <img
            src="hero11.jpg"
            height="300px"
            className="App-logo"
            alt="logo"
            ref={imgRef}
          />
        </Block2>
        <Block />
      </Container>
    </FixedContainer>
  )
}

const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Block = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
`

const Block2 = styled(Block)`
  background-color: #aaa;
`
