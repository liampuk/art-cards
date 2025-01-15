import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { FC, memo, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Effect } from "../../types"
import { glareBackgroundImage } from "./HoloStyles"
import { MotionCardEffects } from "./MotionCardEffects"

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
    const externalControlActive = !!(externalRotateX || externalRotateY)
    const [showEffects, setShowEffects] = useState(false)
    const showEffectsTimeoutRef = useRef<number | undefined>()

    useEffect(() => {
      if (hover || externalControlActive) {
        setShowEffects(true)
        clearTimeout(showEffectsTimeoutRef.current)
        showEffectsTimeoutRef.current = undefined
      } else {
        if (!showEffectsTimeoutRef.current) {
          showEffectsTimeoutRef.current = setTimeout(() => {
            setShowEffects(false)
            showEffectsTimeoutRef.current = undefined
          }, 600)
        }
      }
    }, [hover, externalControlActive])

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
      const cardAnimation = gsap.to(cardRef.current, {
        rotateX: reverseMod > 0 ? -rotateYSpring : rotateYSpring,
        rotateY: reverseMod > 0 ? rotateXSpring : rotateXSpring,
        scale: (externalScale ?? 1) + (hover ? 0.1 : 0),
        duration: 0.8,
        ease: "power2.out",
      })

      return () => {
        cardAnimation.kill()
      }
    }, [
      rotateXSpring,
      rotateYSpring,
      hover,
      externalControlActive,
      externalCardWidth,
    ])

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
      <Container $cardMaskImage={`${cardImageMask}.jpg`}>
        <CardContainer
          onClick={() => handleClick()}
          onMouseMove={(ev) => handleMouseMove(ev)}
          onMouseLeave={(ev) => handleMouseLeave(ev)}
          style={{
            width: externalCardWidth ?? `${CARD_WIDTH}vw`,
            transition: "width 0.3s ease",
          }}
          ref={cardRef}
        >
          <FaceCardContainer>
            <FaceCardImage src={`${BASE_URL}${cardImage}.jpg`} />
            {showEffects && (
              <MotionCardEffects
                rotateX={rotateX}
                rotateY={rotateY}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                cardImageMask={cardImageMask}
                shineType={shineType}
                backgroundPosX={backgroundPosX}
                backgroundPosY={backgroundPosY}
                cursorPosXPercentage={cursorPosXPercentage}
                cursorPosYPercentage={cursorPosYPercentage}
                showEffects={hover || externalControlActive}
              />
            )}
          </FaceCardContainer>
          {!disableClick && (
            <BackCardContainer
              style={{
                width: "100%",
                opacity: shadowOpacity ?? 1,
              }}
            >
              <CardBackImage src={`${BASE_URL}back.jpg`} />
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
          )}
        </CardContainer>
      </Container>
    )
  }
)

const FaceCardContainer = styled.div`
  overflow: hidden;
  backface-visibility: hidden;
  z-index: 1000;
  border-radius: 4px;
  isolation: isolate;
`

const BackCardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 40px 15px;
  z-index: -1;
`

const Container = styled.div<{
  $cardMaskImage: string
}>`
  ${({ $cardMaskImage }) =>
    `--card-mask-image: url("${BASE_URL}${$cardMaskImage}")`};
  perspective: 1200px;
  width: fit-content;
  height: fit-content;
  user-select: none;
`

const CardContainer = styled.div`
  width: 25vw;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: "width 0.3s ease";
`

const CardBackImage = styled.img`
  width: 100%;
  z-index: 2;
  transform: translateZ(1px) scaleX(-1);
`

const FaceCardImage = styled.img`
  width: 100%;
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
