import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { FC, memo, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Effect } from "../../types"
import {
  artistBackground,
  diagonalShineBackground,
  galaxyShineBackground,
  glareBackgroundImage,
  linesShineBackground,
  linesShineBackgroundOverlay,
  linesShineBackgroundOverlayPos,
  linesShineBackgroundPos,
  linesShineGlareBackground,
  shineBackgroundOverlayPos,
  shineBackgroundPos,
} from "./HoloStyles"

// const STIFFNESS = 1000
// const DAMPENING = 10
const CARD_WIDTH = 25

type Props = {
  cardImage: string
  cardImageMask?: string
  externalCardWidth?: string
  defaultReversed?: boolean
  shineType?: Effect
  externalRotateX?: number | null
  externalRotateY?: number | null
  externalBgX?: number | null
  externalBgY?: number | null
  externalScale?: number | null
  shadowOpacity?: number
  disableClick?: boolean
  clickAction?: () => void
}

const BASE_URL = import.meta.env.BASE_URL

export const MotionCard: FC<Props> = memo(
  ({
    cardImage,
    cardImageMask,
    externalCardWidth,
    defaultReversed,
    shineType,
    externalRotateX,
    externalRotateY,
    externalBgX,
    externalBgY,
    externalScale,
    shadowOpacity,
    disableClick,
    clickAction,
  }) => {
    const [_tempForceUpdate, setTempForceUpdate] = useState(0)
    const [reverse, setReverse] = useState(defaultReversed ?? false)
    const [hover, setHover] = useState(false)
    const [cardWidth, setCardWidth] = useState(0)
    const [cardHeight, setCardHeight] = useState(0)
    // const [controlledCardWidth] = useState(
    //   externalCardWidth || `${CARD_WIDTH}vw`
    // )
    const externalControlActive = externalRotateX || externalRotateY

    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      externalRotateX && setRotateX(externalRotateX)
      externalRotateY && setRotateY(externalRotateY)
      externalBgX && setCursorPosX(externalBgX)
      externalBgY && setCursorPosY(externalBgY)
    }, [externalRotateX, externalRotateY])

    useEffect(() => {
      const resizeObserver = new ResizeObserver(([entry]) => {
        setCardWidth(entry.contentRect.width)
        setCardHeight(entry.contentRect.height)
      })

      if (cardRef.current) {
        resizeObserver.observe(cardRef.current)
      }

      return () => {
        resizeObserver.disconnect()
      }
    }, [])

    const [cursorPosX, setCursorPosX] = useState(0)
    const [cursorPosY, setCursorPosY] = useState(0)
    const [reverseMod, setReverseMod] = useState(defaultReversed ? 180 : 0)

    const backgroundPosX = cursorPosX * 20 + 40 + reverseMod
    const backgroundPosY = cursorPosY * 20

    const cursorPosXPercentage = cursorPosX * 100 - 3
    const cursorPosYPercentage = cursorPosY * 100 - 3

    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)

    //TODO spring
    const rotateXSpring = rotateX + reverseMod
    const rotateYSpring = rotateY

    useGSAP(() => {
      gsap.to(cardRef.current, {
        rotateX: reverseMod > 0 ? -rotateYSpring : rotateYSpring,
        rotateY: reverseMod > 0 ? rotateXSpring : rotateXSpring,
        scale: (externalScale ?? 1) + (hover ? 0.1 : 0),
        width: externalCardWidth ?? `${CARD_WIDTH}vw`,
        duration: 0.5,
        ease: "power2.out",
      })
    }, [rotateXSpring, rotateYSpring, hover, externalCardWidth])

    const handleClick = () => {
      if (!disableClick) {
        if (reverse) {
          setReverseMod(0)
          setReverse(false)
        } else {
          setReverseMod(180)
          setReverse(true)
        }
        clickAction && clickAction()
        setTempForceUpdate(Math.random())
      }
    }

    const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
      setHover(true)
      const { left, top, width, height } =
        ev.currentTarget.getBoundingClientRect()
      const relativeX = ev.clientX - left
      const relativeY = ev.clientY - top
      const offsetX = (relativeY / height - 0.5) * 2 * 30
      const offsetY = (relativeX / width - 0.5) * 2 * 30

      setRotateX(-offsetY)
      setRotateY(offsetX)
      setCursorPosX(relativeX / width)
      setCursorPosY(relativeY / height)

      setTempForceUpdate(Math.random())
    }

    const handleMouseLeave = (_ev: React.MouseEvent<HTMLDivElement>) => {
      setHover(false)
      setRotateX(externalRotateX ?? 0)
      setRotateY(externalRotateY ?? 0)
      // if (externalControlActive) {
      if (reverse && !defaultReversed) {
        setReverseMod(0)
        setReverse(false)
      }
      // }
      setTempForceUpdate(Math.random())
    }

    return (
      <Container $cardMaskImage={`${BASE_URL}${cardImageMask}.jpg`}>
        <CardContainer
          onClick={() => handleClick()}
          onMouseMove={(ev) => handleMouseMove(ev)}
          onMouseLeave={(ev) => handleMouseLeave(ev)}
          // whileHover={{ scale: 1.1 }}
          style={{
            // transform: `scale(${(externalScale ?? 1) + (hover ? 0.1 : 0)})`,
            // transform: `scale(${
            //   (externalScale ?? 1) + (hover ? 0.1 : 0)
            // }) rotateX(${rotateYSpring}deg) rotateY(${rotateXSpring}deg)`,
            // transition: externalScale ? "none" : "transform 0.3s ease",
            width: "100%",
          }}
          ref={cardRef}
        >
          <BackCardContainer
            style={{
              // transform: `rotateX(${rotateYSpring}deg) rotateY(${rotateXSpring}deg)`,
              width: "100%",
              opacity: shadowOpacity ?? 1,
            }}
          >
            <CardBackImage
              src={`${BASE_URL}back.jpg`}
              style={{
                width: "100%",
              }}
            />
            <Glare
              style={{
                backgroundImage: glareBackgroundImage(
                  cursorPosXPercentage,
                  cursorPosYPercentage,
                  { reverse: true }
                ),
                opacity: hover || externalControlActive ? 0.3 : 0,
                width: "100%",
              }}
            />
          </BackCardContainer>
          <FaceCardContainer
            style={{
              width: "100%",
              // transform: `rotateX(${rotateYSpring}deg) rotateY(${rotateXSpring}deg) translateZ(1px)`,
            }}
          >
            <ArtistShine
              style={{
                background: artistBackground(rotateX, rotateY),
                width: cardWidth / 9.8,
                height: cardWidth / 9.8,
                top: cardHeight / 21.8,
                right: cardWidth / 15.7,
                opacity: hover || externalControlActive ? 0.65 : 0.2,
              }}
            />
            <img
              src={`${BASE_URL}${cardImage}.jpg`}
              style={{
                width: "100%",
                // transition: "width 0.3s ease",
              }}
            />
            {cardImageMask && shineType === "lines" && (
              <LinesShine
                style={{
                  backgroundImage: linesShineBackground,
                  backgroundPosition: linesShineBackgroundPos(
                    backgroundPosX,
                    backgroundPosY
                  ),
                  opacity: hover || externalControlActive ? 0.8 : 0,
                  width: "100%",
                }}
              >
                <LinesShineOverlay
                  style={{
                    backgroundImage: linesShineBackgroundOverlay,
                    backgroundPosition: linesShineBackgroundOverlayPos(
                      backgroundPosX,
                      backgroundPosY
                    ),
                  }}
                />
                <ShineGlare
                  style={{
                    backgroundImage: linesShineGlareBackground(
                      cursorPosXPercentage,
                      cursorPosYPercentage
                    ),
                  }}
                />
              </LinesShine>
            )}
            {shineType === "diagonal" && (
              <DiagonalShine
                style={{
                  backgroundImage: diagonalShineBackground(
                    cursorPosXPercentage,
                    cursorPosYPercentage
                  ),
                  backgroundPosition: shineBackgroundPos(
                    backgroundPosX,
                    backgroundPosY
                  ),
                  opacity: hover || externalControlActive ? 1 : 0,
                  width: "100%",
                }}
              >
                <DiagonalShineOverlay
                  style={{
                    backgroundImage: diagonalShineBackground(
                      cursorPosXPercentage,
                      cursorPosYPercentage
                    ),
                    backgroundPosition: shineBackgroundOverlayPos(
                      backgroundPosX,
                      backgroundPosY
                    ),
                  }}
                />
              </DiagonalShine>
            )}
            {shineType === "galaxy" && (
              <GalaxyShine
                style={{
                  backgroundImage: galaxyShineBackground(
                    cursorPosXPercentage,
                    cursorPosYPercentage
                  ),
                  backgroundPosition: shineBackgroundPos(
                    backgroundPosX,
                    backgroundPosY
                  ),
                  opacity: hover || externalControlActive ? 1 : 0,
                  width: "100%",
                }}
              >
                <GalaxyShineOverlay
                  style={{
                    backgroundImage: galaxyShineBackground(
                      cursorPosXPercentage,
                      cursorPosYPercentage
                    ),
                    backgroundPosition: shineBackgroundPos(
                      backgroundPosX,
                      backgroundPosY
                    ),
                  }}
                />
              </GalaxyShine>
            )}
            <ArtistBrightBackground
              style={{
                opacity: hover || externalControlActive ? 0.1 : 0.05,
                width: cardWidth / 10,
                height: cardWidth / 10,
                top: cardHeight / 21.2,
                right: cardHeight / 21.9,
              }}
            />

            <BrightBackground
              style={{
                opacity: hover || externalControlActive ? 0.2 : 0.05,
                width: "100%",
              }}
            />

            <Glare
              style={{
                backgroundImage: glareBackgroundImage(
                  cursorPosXPercentage,
                  cursorPosYPercentage
                ),
                opacity: hover ? 0.3 : 0,
                width: "100%",
              }}
            />
          </FaceCardContainer>
        </CardContainer>
      </Container>
    )
  }
)

const ArtistShine = styled.div`
  position: absolute;
  transform: translateZ(2px);
  background-blend-mode: screen, multiply, normal;
  mix-blend-mode: lighten;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,0 100,50 50,100 0,50' fill='black'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,0 100,50 50,100 0,50' fill='black'/></svg>");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  transition: opacity 0.3s ease-out;

  filter: brightness(1.8) contrast(0.8);
`

const FaceCardContainer = styled.div`
  overflow: hidden;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  border-radius: 4px;
  isolation: isolate;
`

const BackCardContainer = styled.div`
  overflow: hidden;
  border-radius: 4px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 40px 15px;
`

const BrightBackground = styled.div`
  top: 0;
  background-image: url("${BASE_URL}hdr_pixel.avif");
  height: 100%;
  position: absolute;
  mix-blend-mode: multiply;
  -webkit-mask-image: var(--card-mask-image);
  mask-image: var(--card-mask-image);
  mask-mode: luminance;
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  opacity: 0.2;
`

const ArtistBrightBackground = styled.div`
  top: 0;
  background-image: url("${BASE_URL}hdr_pixel.avif");
  position: absolute;
  mix-blend-mode: multiply;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,0 100,50 50,100 0,50' fill='black'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,0 100,50 50,100 0,50' fill='black'/></svg>");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  opacity: 0.1;
  transition: opacity 0.6s ease;
`

const Container = styled.div<{
  $cardMaskImage: string
}>`
  ${({ $cardMaskImage }) => `--card-mask-image: url("${$cardMaskImage}")`};
  perspective: 1200px;
  width: fit-content;
  height: fit-content;
  user-select: none;
`

const CardContainer = styled.div`
  cursor: pointer;
  transform-style: preserve-3d;
  transition: "width 0.3s ease";
`

const CardBackImage = styled.img`
  z-index: 2;
  transform: translateZ(1px) scaleX(-1);
`

const Glare = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 4px;
  opacity: 0.3;
  mix-blend-mode: hard-light;
  filter: brightness(0.9) contrast(1.75);
  transition: opacity 0.3s ease;
`

const Shine = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 4px;
  -webkit-mask-image: var(--card-mask-image);
  mask-image: var(--card-mask-image);
  mask-mode: luminance;
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  transition: opacity 0.3s ease;
`

const DiagonalShine = styled(Shine)`
  mix-blend-mode: color-dodge;
  background-size: 500px 100%, 200% 700%, 300% 100%, 200% 100%;
  background-blend-mode: screen, hue, hard-light;
  filter: brightness(0.8) contrast(2.95) saturate(0.65);
`

const GalaxyShine = styled(Shine)`
  mix-blend-mode: screen;
  background-size: cover, 100% 900%, cover;
  background-blend-mode: color-burn, multiply;
  filter: brightness(1) contrast(1) saturate(0.8);
`

const LinesShine = styled(Shine)`
  background-size: 400% 400%, 102%;
  background-blend-mode: overlay;
  mix-blend-mode: color-dodge;
`

const ShineOverlay = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`

const DiagonalShineOverlay = styled(ShineOverlay)`
  background-blend-mode: screen, hue, hard-light;
  background-size: 500px 100%, 200% 400%, 195% 100%, 200% 100%;
  filter: brightness(1) contrast(2.5) saturate(1.75);
  mix-blend-mode: soft-light;
`

const GalaxyShineOverlay = styled(ShineOverlay)`
  background-blend-mode: overlay, multiply;
  background-size: cover, 400% 900%, cover;
  filter: brightness(1.1) contrast(1.4) saturate(0.8);
  mix-blend-mode: hard-light;
`

const LinesShineOverlay = styled(ShineOverlay)`
  background-size: 150% 150%, 150% 150%;
  background-blend-mode: screen;
  mix-blend-mode: hard-light;
`

const ShineGlare = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-position: center center;
  background-size: cover;
  mix-blend-mode: luminosity;
  mix-blend-mode: hard-light;
  filter: brightness(0.8) contrast(1.75);
`

// rotate3d(6, -3, 3, 90deg)
// rotate3d(9, -4, 4, 80deg)
