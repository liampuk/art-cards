import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { forwardRef, ReactNode, useRef } from "react"
import styled from "styled-components"
import { useShallow } from "zustand/shallow"
import LeavesBorder from "../../../../assets/leaves-border.svg?react"
import { useScrollStore } from "../../../../store/scrollStore"

const START = "center 80%"
const END = "center 40%"
const EASE = "sine"

export const StickyScrollWrapper = forwardRef<
  HTMLDivElement,
  {
    headline: string
    headlineSize: string
    triggerMarginTop?: string
    triggerHeight?: string
    copy: ReactNode
  }
>(({ triggerMarginTop, triggerHeight, copy, headline, headlineSize }, ref) => {
  const containerScopeRef = useRef<HTMLDivElement>(null)
  const leavesBorderRef = useRef<SVGSVGElement>(null)
  const headlineTextRef = useRef<HTMLHeadingElement>(null)
  const copyTextRef = useRef<HTMLDivElement>(null)
  const { scrollRef } = useScrollStore(
    useShallow((state) => ({
      scrollRef: state.scrollRef,
    }))
  )

  useGSAP(() => {
    if (!scrollRef || !containerScopeRef.current) return

    const opacityAnimation = gsap.fromTo(
      containerScopeRef.current?.querySelector(".leaves-border-opacity"),
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          scroller: scrollRef,
          trigger: leavesBorderRef.current,
          start: START,
          end: END,
          scrub: 1,
        },
        ease: EASE,
        duration: 1,
      }
    )
    const offsetAnimation = gsap.fromTo(
      containerScopeRef.current?.querySelector(".leaves-border-stroke"),
      { strokeDashoffset: 300 },
      {
        strokeDashoffset: 0,
        scrollTrigger: {
          scroller: scrollRef,
          trigger: leavesBorderRef.current,
          start: START,
          end: END,
          scrub: 1,
        },
        ease: EASE,
        duration: 1,
      }
    )

    const headlineAnimation = gsap.fromTo(
      headlineTextRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          scroller: scrollRef,
          trigger: leavesBorderRef.current,
          start: START,
          end: END,
          scrub: 1,
        },
        ease: EASE,
        duration: 1,
      }
    )

    const copyAnimation = gsap.fromTo(
      copyTextRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          scroller: scrollRef,
          trigger: leavesBorderRef.current,
          start: "center 70%",
          end: "center 40%",
          scrub: 1,
          // markers: true,
        },
        ease: EASE,
        duration: 1,
      }
    )

    return () => {
      opacityAnimation.kill()
      offsetAnimation.kill()
      headlineAnimation.kill()
      copyAnimation.kill()
    }
  }, [scrollRef])

  return (
    <>
      <Trigger
        ref={ref}
        $height={triggerHeight}
        $marginTop={triggerMarginTop}
      />
      <Container ref={containerScopeRef}>
        <CopyColumn>
          <LeavesBorderImg ref={leavesBorderRef} />
          <Headline $headlineSize={headlineSize} ref={headlineTextRef}>
            {headline}
          </Headline>
          <div ref={copyTextRef}>{copy}</div>
        </CopyColumn>
      </Container>
    </>
  )
})

const Headline = styled.h2<{ $headlineSize: string }>`
  font-family: "Mucha";
  font-weight: 100;
  position: absolute;
  width: 15vw;
  top: 13vw;
  left: 17vw;
  width: 15vw;
  font-size: ${({ $headlineSize }) => $headlineSize};
`

const Trigger = styled.div<{ $marginTop?: string; $height?: string }>`
  position: absolute;
  margin-top: ${({ $marginTop }) => $marginTop || "-50vh"};
  width: 100%;
  height: ${({ $height }) => $height || "100vh"};
  /* background-color: rgba(0, 0, 0, 0.2); */
  pointer-events: none;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.2); */
`

const CopyColumn = styled.div`
  width: 42vw;
  padding: 8vw;
  position: relative;
`

const LeavesBorderImg = styled(LeavesBorder)`
  height: 19vw;
  margin-bottom: 24px;
  width: fit-content;

  .leaves-border-stroke {
    stroke-dasharray: 300;
  }
`
