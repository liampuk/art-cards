import Lenis from "lenis"
import { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { useScrollContext } from "../ScrollProvider"
import { HeroPage } from "./pages/hero-page/HeroPage"

export const MainContent: FC = () => {
  const fixedDivRef = useRef<HTMLDivElement>(null)
  const scrollDivRef = useRef<HTMLDivElement>(null)
  const { updateScrollPosition } = useScrollContext()

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: fixedDivRef.current || undefined,
      content: scrollDivRef.current || undefined,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on("scroll", (e) => {
      updateScrollPosition(e.scroll)
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <Container ref={fixedDivRef}>
      <Content ref={scrollDivRef}>
        <HeroPage />
        <BlankPage />
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

const BlankPage = styled.div`
  height: 200vh;
  width: 100vw;
`
