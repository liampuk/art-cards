import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Lenis from "lenis"
import { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useShallow } from "zustand/shallow"
import { useScrollStore } from "../../store/scrollStore"
import { HeroCard } from "./HeroCard"
import { Collection } from "./pages/collection/Collection"
import { HeroPage } from "./pages/hero-page/HeroPage"
import { OpenPack } from "./pages/open-pack/OpenPack"
import { BottomStickyScroll } from "./pages/sticky-scroll/BottomStickyScroll"
import { TopStickyScroll } from "./pages/sticky-scroll/TopStickyScroll"
import { Tutorial } from "./pages/tutorial/Tutorial"
import { inflateSync, strFromU8 } from "fflate"
import { CardsCount, useCardStore } from "../../store/cardStore"

const BASE_URL = import.meta.env.BASE_URL

gsap.registerPlugin(ScrollTrigger)

export const MainContent: FC = () => {
  const fixedDivRef = useRef<HTMLDivElement>(null)
  const scrollDivRef = useRef<HTMLDivElement>(null)
  const topTriggerRef = useRef<HTMLDivElement>(null)
  const middleTriggerRef = useRef<HTMLDivElement>(null)
  const bottomTriggerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { setScrollPosition, setLenis, setScrollRef } = useScrollStore(
    useShallow((state) => ({
      setScrollPosition: state.setScrollPosition,
      setLenis: state.setLenis,
      setScrollRef: state.setScrollRef,
    }))
  )
  const { lastOpenedDate, setCards, setLastOpenedDate, setPacksRemaining } =
    useCardStore()
  const storedDateLoaded = useRef(false)

  const [rotateX, setRotateX] = useState<null | number>(null)
  const [rotateY, setRotateY] = useState<null | number>(null)
  const [bgX, setBgX] = useState<null | number>(null)
  const [bgY, setBgY] = useState<null | number>(null)
  const [scale, setScale] = useState<null | number>(null)

  const updateRotateAnimationOne = (progress: number) => {
    if (progress === 0) {
      setRotateX(null)
      setRotateY(null)
      setBgX(null)
      setBgY(null)
      setScale(null)
    } else {
      setRotateX(25 * progress)
      setRotateY(10 * progress)
      setBgX(progress * 0.8)
      setBgY(progress * 0.8)
      setScale(1 + progress * 0.2)
    }
  }

  const updateRotateAnimationTwo = (progress: number) => {
    setRotateX(25 - 50 * progress)
    setRotateY(10 - 20 * progress)
    setBgX((1 - progress) * 0.8)
    setBgY((1 - progress) * 0.8)
  }

  const updateRotateAnimationThree = (progress: number) => {
    setRotateX(-25 + progress * 25)
    setRotateY(-10 + progress * 10)
    setScale(1.2 - progress * 0.2)
    setBgX(progress * 0.8)
    setBgY(progress * 0.8)
  }

  useEffect(() => {
    const newLenis = new Lenis({
      wrapper: fixedDivRef.current || undefined,
      content: scrollDivRef.current || undefined,
      lerp: 0.9,
    })

    setLenis(newLenis)
    setScrollRef(fixedDivRef.current)

    const raf = (time: number) => {
      newLenis.raf(time)
      ScrollTrigger.update()
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    newLenis.on("scroll", (e) => {
      setScrollPosition(e.scroll)
    })

    setScrollPosition(0)

    gsap.to(cardRef.current, {
      scrollTrigger: {
        scroller: fixedDivRef.current,
        trigger: topTriggerRef.current,
        // markers: true,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => updateRotateAnimationOne(self.progress),
      },
      x: "-32vw",
      ease: "sine.in",
    })

    gsap.fromTo(
      cardRef.current,
      {},
      {
        immediateRender: false,
        scrollTrigger: {
          scroller: fixedDivRef.current,
          trigger: middleTriggerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          // markers: true,
          onUpdate: (self) => updateRotateAnimationTwo(self.progress),
        },
        ease: "power2",
      }
    )

    gsap.fromTo(
      cardRef.current,
      {},
      {
        immediateRender: false,
        scrollTrigger: {
          scroller: fixedDivRef.current,
          trigger: bottomTriggerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          // markers: true,
          onUpdate: (self) => updateRotateAnimationThree(self.progress),
        },
        ease: "power2",
      }
    )

    const queryParams = new URLSearchParams(window.location.search)
    const term = queryParams.get("cards")

    if (term) {
      const base64 = term.replace(/-/g, "+").replace(/_/g, "/")
      const binary = atob(base64)
      const byteArray = Uint8Array.from(binary, (c) => c.charCodeAt(0))
      const decompressed = inflateSync(byteArray) // Decompress
      const storedStateString = strFromU8(decompressed)
      const storedState = JSON.parse(storedStateString) as {
        cards: CardsCount
        date: Date
        remaining: number
      }
      setCards(storedState.cards)
      setLastOpenedDate(new Date(storedState.date))
      setPacksRemaining(storedState.remaining)
      removeQueryParam()
      if (
        new Date(new Date(storedState.date).toDateString()) <
        new Date(new Date().toDateString())
      ) {
        setPacksRemaining(3)
        setLastOpenedDate(new Date())
      }
      storedDateLoaded.current = true
    } else {
      if (
        !storedDateLoaded.current &&
        new Date(new Date(lastOpenedDate).toDateString()) <
          new Date(new Date().toDateString())
      ) {
        setPacksRemaining(3)
        setLastOpenedDate(new Date())
      }
    }

    return () => {
      newLenis.destroy()
    }
  }, [])

  const removeQueryParam = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete("cards")
    window.history.replaceState({}, "", url.toString())
  }

  return (
    <Container ref={fixedDivRef}>
      <Content ref={scrollDivRef}>
        <HeroPage />
        <TopStickyScroll triggerRef={topTriggerRef} />
        <BottomStickyScroll triggerRef={middleTriggerRef} />
        <StickyContainer>
          <HeroCard
            cardRef={cardRef}
            rotateX={rotateX}
            rotateY={rotateY}
            bgX={bgX}
            bgY={bgY}
            scale={scale}
          />
        </StickyContainer>
        <BottomTrigger ref={bottomTriggerRef} />
        <OpenPack />
        <Collection />
        <Tutorial />
      </Content>
    </Container>
  )
}

const StickyContainer = styled.div`
  width: 32vw;
  height: calc(300vh + 144px);
  top: 0;
  right: 0;
  position: absolute;
  pointer-events: none;
`

const BottomTrigger = styled.div`
  position: absolute;
  /* background-color: rgba(0, 0, 0, 0.2); */
  height: 50vh;
  width: 100%;
  margin-top: -50vh;
  pointer-events: none;
`

const Container = styled.div`
  width: calc(100vw - 22vw);
  height: 100vh;
  position: fixed;
  overflow: hidden;
  left: 22vw;
  top: 0;

  &::before {
    content: "";
    position: fixed;
    pointer-events: none;
    margin-left: -24px;

    width: calc(100vw - 22vw - 24px);
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

    width: calc(100vw - 22vw - 24px);
    height: calc(100vh - 48px);
    top: 0;
    border-image-slice: 200;
    border-image-width: 10vw;
    border-image-repeat: stretch stretch;
    border-image-source: url("${BASE_URL}main-border2.svg");
    border-style: solid;
    border-width: 1px;
    z-index: 4;
  }
`

const Content = styled.div`
  width: 100%;
  height: 100%;
`
