import { motion } from "framer-motion"
import gsap from "gsap"
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import styled from "styled-components"
import { PackState } from "../../../../types"
import { artistBackground } from "../../../card/HoloStyles"
import { MotionCard } from "../../../card/MotionCard"
import { randomCommon, randomRare } from "./randomCard"

const BASE_URL = import.meta.env.BASE_URL

export const Packaging: FC<{
  packState: PackState
  setPackState: Dispatch<SetStateAction<PackState>>
  clickAction: () => void
}> = ({ packState, setPackState, clickAction }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const flapContainerRef = useRef<HTMLDivElement>(null)
  const flapDownRef = useRef<HTMLDivElement>(null)
  const flapUpRef = useRef<HTMLImageElement>(null)
  const packagingTopRef = useRef<HTMLImageElement>(null)
  const [cardWidth, setCardWidth] = useState(0.5)
  const [cardHeight, setCardHeight] = useState(0.5)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const floatAnimationXRef = useRef<gsap.core.Tween>()
  const floatAnimationYRef = useRef<gsap.core.Tween>()
  const cardARef = useRef<HTMLDivElement>(null)
  const cardBRef = useRef<HTMLDivElement>(null)
  const cardCRef = useRef<HTMLDivElement>(null)
  const [cardTilt, setCardTilt] = useState(0)
  const [shadowOpacity, setShadowOpacity] = useState(0)
  const triggeredRef = useRef(false)
  const [rare, setRare] = useState(randomRare())
  const [commons, setCommons] = useState([
    randomCommon(),
    randomCommon(),
    randomCommon(),
  ])

  const [hoverCard, setHoverCard] = useState<null | number>(null)

  const resetHoverCard = () => {
    setHoverCard(null)
  }

  if (packState === "resetting") {
    if (!triggeredRef.current) {
      triggeredRef.current = true

      const timeline = gsap.timeline({
        onComplete: () => {
          setPackState("closed")
          if (floatAnimationXRef.current && floatAnimationYRef.current) {
            floatAnimationXRef.current.play()
            floatAnimationYRef.current.play()
          }
          setRare(randomRare())
          setCommons([randomCommon(), randomCommon(), randomCommon()])
          triggeredRef.current = false
          setShadowOpacity(0)
          setCardTilt(0)
        },
      })

      timeline.to(
        cardARef.current,
        { y: "200", opacity: 0, duration: 1, ease: "power1.inOut" },
        0
      )
      timeline.to(
        cardBRef.current,
        { y: "200", opacity: 0, duration: 1, ease: "power1.inOut" },
        0
      )
      timeline.to(
        cardCRef.current,
        { y: "200", opacity: 0, duration: 1, ease: "power1.inOut" },
        0
      )
      timeline.fromTo(
        flapContainerRef.current,
        { y: 300, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power1.in" },
        0
      )
      timeline.fromTo(
        packagingTopRef.current,
        { y: 300, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power1.in" },
        0
      )
      timeline.fromTo(
        flapContainerRef.current,
        { scaleY: -1 },
        {
          id: "flapAnimation",
          scaleY: 1,
          duration: 1,
          ease: "power1.inOut",
          onUpdate: () => {
            const progress = timeline.getById("flapAnimation").progress()
            const easedProgress = gsap.parseEase("power1.inOut")(progress)
            if (easedProgress > 0.5) {
              gsap.to(flapDownRef.current, {
                display: "block",
                duration: 0,
              })
              gsap.to(flapContainerRef.current, {
                zIndex: 2,
                duration: 0,
              })
              gsap.to(flapUpRef.current, { display: "none", duration: 0 })
            }
          },
        },
        1.2
      )
    }
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      setCardWidth(entry.contentRect.width)
      setCardHeight(entry.contentRect.height)
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)

      floatAnimationXRef.current = gsap.fromTo(
        containerRef.current,
        { rotateY: -15 },
        {
          rotateY: 15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          onUpdate: function () {
            const progress = this.progress()
            setRotateX(progress * 20)
          },
        }
      )

      floatAnimationYRef.current = gsap.to(containerRef.current, {
        y: 8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        onUpdate: function () {
          const progress = this.progress()
          setRotateY(progress * 10)
        },
      })
    }

    return () => {
      resizeObserver.disconnect()
      if (floatAnimationXRef.current) {
        floatAnimationXRef.current.kill()
      }
      if (floatAnimationYRef.current) {
        floatAnimationYRef.current.kill()
      }
    }
  }, [])

  const openPack = () => {
    if (floatAnimationXRef.current && floatAnimationYRef.current) {
      setPackState("opening")
      floatAnimationXRef.current.pause()
      floatAnimationYRef.current.pause()
      gsap.to(floatAnimationXRef.current, {
        progress: 0.5,
      })
      gsap.to(floatAnimationYRef.current, {
        progress: 0.5,
      })
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        setPackState("open")
      },
    })
    timeline.to(flapContainerRef.current, {
      id: "flapAnimation",
      scaleY: -1,
      duration: 1,
      ease: "power1.inOut",
      onUpdate: () => {
        const progress = timeline.getById("flapAnimation").progress()
        const easedProgress = gsap.parseEase("power1.inOut")(progress)
        if (easedProgress > 0.5) {
          gsap.to(flapDownRef.current, {
            display: "none",
            duration: 0,
          })
          gsap.to(flapContainerRef.current, {
            zIndex: 0,
            duration: 0,
          })
          gsap.to(flapUpRef.current, { display: "block", duration: 0 })
        }
      },
    })
    timeline.to(
      flapContainerRef.current,
      { y: 300, opacity: 0, duration: 1, ease: "power1.in" },
      1.2
    )
    timeline.to(
      packagingTopRef.current,
      { y: 300, opacity: 0, duration: 1, ease: "power1.in" },
      1.2
    )
    timeline.to(cardARef.current, { opacity: 1, duration: 0 }, 2.5)
    timeline.fromTo(
      cardARef.current,
      { x: 0, y: 0 },
      {
        id: "cardFanAnimation",
        x: "-42vw",
        duration: 1.5,
        ease: "power1.inOut",
        onUpdate: () => {
          const progress = timeline.getById("cardFanAnimation").progress()
          setCardTilt(progress * 15)
          setShadowOpacity(progress)
        },
      },
      2.5
    )
    timeline.to(cardBRef.current, { opacity: 1, duration: 0 }, 2.6)
    timeline.fromTo(
      cardBRef.current,
      { x: 0, y: 0 },
      { x: "-34vw", duration: 1.5, ease: "power1.inOut" },
      2.6
    )
    timeline.to(cardCRef.current, { opacity: 1, duration: 0 }, 2.7)
    timeline.fromTo(
      cardCRef.current,
      { x: 0, y: 0 },
      { x: "-26vw", duration: 1.5, ease: "power1.inOut" },
      2.7
    )
  }

  return (
    <PerspectiveWrapper>
      <Container ref={containerRef}>
        <MotionCardContainer
          ref={cardARef}
          onMouseMove={() => setHoverCard(0)}
          onMouseLeave={resetHoverCard}
          style={{ zIndex: hoverCard === 0 ? 2 : 1 }}
        >
          <MotionCard
            cardImage={`${commons[0].artist}/${commons[0].image}`}
            externalCardWidth="19vw"
            externalScale={0.95}
            externalRotateX={cardTilt}
            shadowOpacity={shadowOpacity}
          />
        </MotionCardContainer>
        <MotionCardContainer
          ref={cardBRef}
          onMouseMove={() => setHoverCard(1)}
          onMouseLeave={resetHoverCard}
          style={{ zIndex: hoverCard === 1 ? 2 : 1 }}
        >
          <MotionCard
            cardImage={`${commons[1].artist}/${commons[1].image}`}
            externalCardWidth="19vw"
            externalScale={0.95}
            externalRotateX={cardTilt}
            shadowOpacity={shadowOpacity}
          />
        </MotionCardContainer>
        <MotionCardContainer
          ref={cardCRef}
          onMouseMove={() => setHoverCard(2)}
          onMouseLeave={resetHoverCard}
          style={{ zIndex: hoverCard === 2 ? 2 : 1 }}
        >
          <MotionCard
            cardImage={`${commons[2].artist}/${commons[2].image}`}
            externalCardWidth="19vw"
            externalScale={0.95}
            externalRotateX={cardTilt}
            shadowOpacity={shadowOpacity}
          />
        </MotionCardContainer>
        <MotionCardContainer>
          <MotionCard
            cardImage={`${rare.artist}/${rare.image}`}
            cardImageMask={`${rare.artist}/${rare.mask}`}
            externalCardWidth="19vw"
            shineType={rare.effect}
            defaultReversed
            externalScale={0.95}
            clickAction={clickAction}
          />
        </MotionCardContainer>
        <Barrier style={{ display: packState === "open" ? "none" : "block" }} />
        <PackagingImageTop src="packaging.png" ref={packagingTopRef} />
        <FlapContainer ref={flapContainerRef}>
          <div ref={flapDownRef}>
            <PackagingFlap src="packaging-flap-down-3-small.png" />
            <ArtistShine
              style={{
                background: artistBackground(rotateX, rotateY),
                width: cardWidth / 7.5,
                height: cardWidth / 7.6,
                top: cardHeight / 4,
                right: cardWidth / 3.12,
              }}
            />
            <ArtistBrightBackground
              style={{
                width: cardWidth / 7.5,
                height: cardWidth / 7.6,
                top: cardHeight / 4,
                right: cardWidth / 3.12,
              }}
            />
            <StickerButton
              onClick={openPack}
              style={{
                width: cardWidth / 2.2,
                height: cardHeight / 2.8,
                top: cardHeight / 4.6,
                right: cardWidth / 3.7,
              }}
            />
          </div>

          <PackagingFlapUp
            src="packaging-flap-up-3-small.png"
            ref={flapUpRef}
          />
        </FlapContainer>
      </Container>
    </PerspectiveWrapper>
  )
}

const MotionCardContainer = styled.div`
  top: 0;
  left: 0;
  width: 19vw;
  z-index: 1;
  position: absolute;
`

const StickerButton = styled(motion.div)`
  position: absolute;
  opacity: 0.6;
  cursor: pointer;
`

const FlapContainer = styled.div`
  position: absolute;
  top: 0;
  transform: scaleY(1);
  transform-origin: top;
  z-index: 2;
`

const ArtistShine = styled(motion.div)`
  position: absolute;
  transform: translateZ(2px);
  background-blend-mode: screen, multiply, normal;
  mix-blend-mode: lighten;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='black'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='black'/></svg>");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  opacity: 0.65;
  border-radius: 1px;

  filter: brightness(1.8) contrast(0.8);
`

const Barrier = styled.div`
  top: 0;
  left: 0;
  width: 19vw;
  height: 100%;
  position: absolute;
  z-index: 2;
  /* background: rgba(0, 0, 0, 0.7); */
`

const ArtistBrightBackground = styled(motion.div)`
  top: 0;
  background-image: url("${BASE_URL}hdr_pixel.avif");
  position: absolute;
  mix-blend-mode: multiply;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='black'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='black'/></svg>");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  border-radius: 1px;
  opacity: 0.08;
`

const PerspectiveWrapper = styled.div`
  perspective: 2000px;
  margin-right: 3vw;
`

const Container = styled(motion.div)`
  position: relative;
  width: fit-content;
  height: fit-content;
  will-change: transform;
`

const PackagingImage = styled.img`
  width: 19vw;
  border-radius: 8px;
  rotate: 180deg;
  pointer-events: none;
`

const PackagingImageTop = styled(PackagingImage)`
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  rotate: 0deg;
  /* box-shadow: rgba(100, 100, 111, 0.1) 0px 16px 40px 15px; */
`

const PackagingFlap = styled.img`
  top: 0;
  left: 0;
  width: 19vw;
  transform-origin: top;
  will-change: transform, display;
`

const PackagingFlapUp = styled(PackagingFlap)`
  position: absolute;
  transform-origin: top;
  display: none;
  will-change: transform, display;
`
