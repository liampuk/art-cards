import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Lenis from "lenis"
import { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { useScrollContext } from "../ScrollProvider"
import { HeroCard } from "./HeroCard"
import { HeroPage } from "./pages/hero-page/HeroPage"
import { StickyScrollSection } from "./pages/StickyScroll/StickyScrollSection"
gsap.registerPlugin(ScrollTrigger)

export const MainContent: FC = () => {
  const fixedDivRef = useRef<HTMLDivElement>(null)
  const scrollDivRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const triggerRef2 = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { updateScrollPosition } = useScrollContext()

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: fixedDivRef.current || undefined,
      content: scrollDivRef.current || undefined,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      ScrollTrigger.update()
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on("scroll", (e) => {
      updateScrollPosition(e.scroll)
    })

    gsap.to(cardRef.current, {
      scrollTrigger: {
        scroller: fixedDivRef.current,
        trigger: triggerRef.current,
        // markers: true,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      x: -600,
      ease: "power2",
    })

    console.log(triggerRef.current)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <Container ref={fixedDivRef}>
      <Content ref={scrollDivRef}>
        <HeroPage />
        <StickyScrollSection
          alignSelf="flex-end"
          imgSrc="sticky-text-packs2.jpg"
          ref={triggerRef}
        />
        <StickyScrollSection
          alignSelf="flex-start"
          imgSrc="sticky-text-tutorial2.jpg"
          ref={triggerRef2}
        />
        <HeroCard cardRef={cardRef} />
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: calc(100vw - 400px);
  height: 100vh;
  position: fixed;
  overflow: hidden;
  left: 400px;
  top: 0;

  &::before {
    content: "";
    position: fixed;
    pointer-events: none;
    margin-left: -24px;

    width: calc(100vw - 400px - 24px);
    height: calc(100vh - 48px);
    top: 0;
    border: 24px solid #e8e2d0;
    z-index: 4;
  }

  &::after {
    content: "";
    position: fixed;
    pointer-events: none;
    margin-top: 24px;

    width: calc(100vw - 400px - 24px);
    height: calc(100vh - 48px);
    top: 0;
    border-image-slice: 200;
    border-image-width: 180px;
    border-image-repeat: stretch stretch;
    border-image-source: url("main-border2.svg");
    border-style: solid;
    border-width: 0;
    z-index: 4;
  }
`

const Content = styled.div`
  width: 100%;
  height: 100%;
`
