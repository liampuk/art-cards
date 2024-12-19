import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Lenis from "lenis"
import { FC, useEffect, useRef, useState } from "react"
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

  const [rotateX, setRotateX] = useState<null | number>(null)
  const [rotateY, setRotateY] = useState<null | number>(null)
  const [bgX, setBgX] = useState<null | number>(null)
  const [bgY, setBgY] = useState<null | number>(null)

  // x 40 to 60 y 0 to 20

  const updateRotateAnimationOne = (progress: number) => {
    if (progress === 0) {
      setRotateX(null)
      setRotateY(null)
      setBgX(null)
      setBgY(null)
    } else {
      setRotateX(25 * progress)
      setRotateY(10 * progress)
      setBgX(progress * 0.8)
      setBgY(progress * 0.8)
    }
  }

  const updateRotateAnimationTwo = (progress: number) => {
    setRotateX(25 - 50 * progress)
    setRotateY(10 - 20 * progress)
    setBgX((1 - progress) * 0.8)
    setBgY((1 - progress) * 0.8)
  }

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
        onUpdate: (self) => updateRotateAnimationOne(self.progress),
      },
      x: -500,
      ease: "power2",
    })

    gsap.fromTo(
      cardRef.current,
      { x: -500 },
      {
        immediateRender: false,
        scrollTrigger: {
          scroller: fixedDivRef.current,
          trigger: triggerRef2.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          onUpdate: (self) => updateRotateAnimationTwo(self.progress),
        },
        x: 0,
        ease: "power2",
      }
    )

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
        <HeroCard
          cardRef={cardRef}
          rotateX={rotateX}
          rotateY={rotateY}
          bgX={bgX}
          bgY={bgY}
        />
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
