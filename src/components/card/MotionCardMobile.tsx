import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { FC, memo, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useSmoothedValue } from "../../hooks/general"
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
  externalScale?: number | null
  shadowOpacity?: number
  disableClick?: boolean
  clickAction?: () => void
}

const BASE_URL = import.meta.env.BASE_URL

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">
}

export const MotionCardMobile: FC<Props> = memo(
  ({
    cardImage,
    cardImageMask,
    externalCardWidth,
    defaultReversed,
    shineType,
    externalRotateX,
    externalRotateY,
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
    const [motionAccessGranted, setMotionAccessGranted] = useState(false)
    const [motionX, setMotionX] = useState(0)
    const [motionY, setMotionY] = useState(0)

    const logMotion = () => {
      window.addEventListener("devicemotion", (event) => {
        const acceleration = event.accelerationIncludingGravity
        setMotionX(acceleration?.x ?? 0)
        setMotionY(acceleration?.y ?? 0)
      })
    }

    const requestMotionAccess = async () => {
      const requestPermission = (
        DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
      ).requestPermission
      if (typeof requestPermission === "function") {
        try {
          const response = await requestPermission()
          if (response === "granted") {
            console.log("Permission granted!")
            setMotionAccessGranted(true)
            logMotion()
          } else {
            console.log("Permission denied.")
          }
        } catch (err) {
          console.error("Error requesting permission:", err)
        }
      } else {
        // For non-iOS devices
        setMotionAccessGranted(true)
        logMotion()
      }
    }

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

    const [reverseMod, setReverseMod] = useState(defaultReversed ? 180 : 0)

    const smoothMotionX = useSmoothedValue(motionX, 0.1)
    const smoothMotionY = useSmoothedValue(motionY, 0.1)

    const backgroundPosX = Math.sin(smoothMotionX / 4) * 20 + 50
    const backgroundPosY = 1

    const cursorPosXPercentage = (smoothMotionX / 5) * 100 + 50
    const cursorPosYPercentage = ((smoothMotionY + 8) / 5) * 100 + 30

    // const [rotateX, setRotateX] = useState(0)
    // const [rotateY, setRotateY] = useState(0)

    const rotateX = motionX * 10
    const rotateY = motionY * 10 + (motionAccessGranted ? 70 : 0)

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
      setHover(true)
      if (!motionAccessGranted) {
        requestMotionAccess()
      } else {
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
    }

    return (
      <Container $cardMaskImage={`proserpine-mask.png`}>
        <CardContainer
          onClick={() => handleClick()}
          style={{
            width: externalCardWidth ?? `${CARD_WIDTH}vw`,
            transition: "width 0.3s ease",
          }}
          ref={cardRef}
        >
          <FaceCardContainer>
            <DebugText>{cursorPosXPercentage}</DebugText>
            <FaceCardImage src={`${BASE_URL}${cardImage}.jpg`} />
            {showEffects && (
              <MotionCardEffects
                rotateX={smoothMotionX}
                rotateY={smoothMotionY}
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
  border-radius: 8px;
  isolation: isolate;
`

const BackCardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  border-radius: 8px;
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
  border-radius: 8px;
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
  border-radius: 8px;
`

const FaceCardImage = styled.img`
  width: 100%;
  border-radius: 8px;
`

const Glare = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 8px;
  opacity: 0.3;
  mix-blend-mode: hard-light;
  filter: brightness(0.9) contrast(1.75);
  transition: opacity 0.3s ease;
  border-radius: 8px;
`

const DebugText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  display: none;
`
