import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"

const STIFFNESS = 1000
const DAMPENING = 10
const CARD_HEIGHT = 70

type Props = {
  cardImage: string
  cardImageMask?: string
}

export const MotionCard2: FC<Props> = ({ cardImage, cardImageMask }) => {
  const [_tempForceUpdate, setTempForceUpdate] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [hover, setHover] = useState(false)
  const [cardWidth, setCardWidth] = useState(0)
  const [cardHeight, setCardHeight] = useState(0)

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
      setCardHeight(cardRef.current.offsetHeight)
    }
  }, [window.innerWidth, window.innerHeight])

  const cursorPosX = useMotionValue(0)
  const cursorPosY = useMotionValue(0)

  const reverseMod = useMotionValue(0)
  const reverseModSpring = useSpring(reverseMod, {
    stiffness: STIFFNESS,
    damping: DAMPENING,
  })

  const backgroundPosX = useTransform(
    () => cursorPosX.get() * 20 + 40 + reverseModSpring.get()
  )
  const backgroundPosY = useTransform(() => cursorPosY.get() * 20 + 40)

  const cursorPosXPercentage = useTransform(() => cursorPosX.get() * 100)
  const cursorPosYPercentage = useTransform(() => cursorPosY.get() * 100)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const rotateXMod = useTransform(() => rotateX.get() + reverseModSpring.get())

  const rotateXSpring = useSpring(rotateXMod, { stiffness: 100, damping: 20 })
  const rotateYSpring = useSpring(rotateY, { stiffness: 100, damping: 20 })

  const handleClick = () => {
    if (reverse) {
      reverseMod.set(0)
      setReverse(false)
    } else {
      reverseMod.set(180)
      setReverse(true)
    }
    setTempForceUpdate(Math.random())
  }

  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    setHover(true)
    const x = ev.clientX
    const y = ev.clientY
    const middleX = window.innerWidth / 2
    const middleY = window.innerHeight / 2
    const offsetX = ((x - middleX) / middleX) * 45
    const offsetY = ((y - middleY) / middleY) * 45
    const offsetLeft = ev.currentTarget.getBoundingClientRect().left
    const offsetTop = ev.currentTarget.getBoundingClientRect().top
    const width = ev.currentTarget.offsetWidth
    const height = ev.currentTarget.offsetHeight

    rotateX.set(-offsetX)
    rotateY.set(offsetY)
    cursorPosX.set((x - offsetLeft) / width)
    cursorPosY.set((y - offsetTop) / height)

    setTempForceUpdate(Math.random())
  }

  const handleMouseLeave = (_ev: React.MouseEvent<HTMLDivElement>) => {
    setHover(false)
    rotateX.set(0)
    rotateY.set(0)
    setTempForceUpdate(Math.random())
  }

  const glareBackgroundImage = `radial-gradient(farthest-corner circle at ${cursorPosXPercentage.get()}% ${cursorPosYPercentage.get()}%, hsl(0, 0%, 100%) 0%, hsla(210, 3%, 54%, 0.33) 45%, hsla(0, 0%, 20%, 0.9) 130%)`
  const glareBackgroundImageReverse = `radial-gradient(farthest-corner circle at ${
    100 - cursorPosXPercentage.get()
  }% ${cursorPosYPercentage.get()}%, hsl(0, 0%, 100%) 0%, hsla(210, 3%, 54%, 0.33) 45%, hsla(0, 0%, 20%, 0.9) 130%)`
  const shineBackgroundImage = `
  url("/galaxy-1.png"),
    repeating-linear-gradient(
      172deg, 
      hsl(53, 65%, 60%) calc(4% * 1), 
      hsl(93, 56%, 50%) calc(4% * 2), 
      hsl(176, 54%, 49%) calc(4% * 3), 
      hsl(228, 59%, 55%) calc(4% * 4), 
      hsl(283, 60%, 55%) calc(4% * 5), 
      hsl(326, 59%, 51%) calc(4% * 6), 
      hsl(326, 59%, 51%) calc(4% * 7), 
      hsl(283, 60%, 55%) calc(4% * 8), 
      hsl(228, 59%, 55%) calc(4% * 9), 
      hsl(176, 54%, 49%) calc(4% * 10), 
      hsl(93, 56%, 50%) calc(4% * 11), 
      hsl(53, 65%, 60%) calc(4% * 12) 
    ), 
    radial-gradient( 
      farthest-corner circle 
      at ${cursorPosXPercentage.get()}% ${cursorPosYPercentage.get()}%, 
      hsla(180, 100%, 89%, 0.5) 5%, 
      hsla(180, 14%, 57%, 0.3) 40%, 
      hsl(0, 0%, 0%) 130% 
  )`

  const artistBackground = `conic-gradient(
      from ${rotateX.get() * 2}deg at 50% 50%,
      rgba(0, 0, 0, 1) 0deg,
      rgba(255, 255, 255, 0.7) 17deg,
      rgba(0, 0, 0, 1) 88deg,
      rgba(255, 255, 255, 0.7) 152deg,
      rgba(0, 0, 0, 1) 225deg,
      rgba(255, 255, 255, 0.7) 289deg,
      rgba(0, 0, 0, 1) 360deg
    ),
    conic-gradient(
      from ${180 - rotateY.get() * 2}deg at 50% 50%,
      rgba(0, 0, 0, 1) 0deg,
      rgba(255, 255, 255, 1) 30deg,
      rgba(0, 0, 0, 1) 96deg,
      rgba(255, 255, 255, 1) 169deg,
      rgba(0, 0, 0, 1) 229deg,
      rgba(255, 255, 255, 1) 285deg,
      rgba(0, 0, 0, 1) 360deg
    ),
    radial-gradient(
      88% 127% at 13% 13%,
      rgba(248, 110, 251, 1) 8%,
      rgba(115, 66, 255, 1) 35%,
      rgba(66, 232, 255, 1) 63%,
      rgba(66, 255, 107, 1) 100%
    )`

  const shineBackgroundPos = `center, 0% ${backgroundPosY.get()}%,
    ${backgroundPosX.get()}% ${backgroundPosY.get()}%,
    ${backgroundPosX.get()}% ${backgroundPosY.get()}%`

  const shineBackgroundOverlayPos = `center, 0% ${backgroundPosY.get()}%,
    -${backgroundPosX.get()}% -${backgroundPosY.get()}%,
    ${backgroundPosX.get()}% ${backgroundPosY.get()}%`

  return (
    <Container>
      <CardContainer
        onClick={() => handleClick()}
        onMouseMove={(ev) => handleMouseMove(ev)}
        onMouseLeave={(ev) => handleMouseLeave(ev)}
        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
        ref={cardRef}
      >
        <BackCardContainer
          style={{
            rotateX: rotateYSpring,
            rotateY: rotateXSpring,
          }}
        >
          <CardBackImage src="/back.jpg" />
          <Glare
            style={{
              backgroundImage: glareBackgroundImageReverse,
            }}
          />
        </BackCardContainer>
        <FaceCardContainer
          style={{
            rotateX: rotateYSpring,
            rotateY: rotateXSpring,
            translateZ: 1,
          }}
        >
          <Artist
            style={{
              background: artistBackground,
              width: cardWidth / 10,
              height: cardWidth / 10,
              top: cardHeight / 21,
              right: cardWidth / 15.8,
              opacity: hover ? 0.65 : 0.2,
            }}
          />
          <CardImage src={`/${cardImage}.jpg`} />
          {cardImageMask && (
            <Variables $maskImage={`${cardImageMask}.png`}>
              <Shine
                style={{
                  backgroundImage: shineBackgroundImage,
                  backgroundPosition: shineBackgroundPos,
                  opacity: hover ? 1 : 0,
                }}
              >
                <ShineOverlay
                  style={{
                    backgroundImage: shineBackgroundImage,
                    backgroundPosition: shineBackgroundOverlayPos,
                  }}
                />
              </Shine>

              <BrightBackground />
            </Variables>
          )}

          <Glare
            style={{
              backgroundImage: glareBackgroundImage,
            }}
          />
        </FaceCardContainer>
      </CardContainer>
    </Container>
  )
}

const Variables = styled.div<{ $maskImage: string }>`
  ${({ $maskImage }) => `--mask-image: url("${$maskImage}")`};
`

const Artist = styled(motion.div)`
  position: absolute;
  transform: translateZ(2px);
  background-blend-mode: screen, multiply, normal;
  mix-blend-mode: lighten;
  -webkit-mask-image: url("/pngdiamondmask.png");
  mask-image: url("/pngdiamondmask.png");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  transition: opacity 0.3s ease-out;

  filter: brightness(1.8) contrast(0.8);
`

const FaceCardContainer = styled(motion.div)`
  overflow: hidden;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  border-radius: 4px;
  height: 70vh;
`

const BackCardContainer = styled(motion.div)`
  overflow: hidden;
  border-radius: 4px;
  height: 70vh;
`

const BrightBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-image: url("hdr_pixel.avif");
  height: 100%;
  width: 100%;
  position: absolute;
  mix-blend-mode: multiply;
  -webkit-mask-image: var(--mask-image);
  mask-image: var(--mask-image);
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  opacity: 0.05;
  height: ${CARD_HEIGHT}vh;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  perspective: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`

const CardContainer = styled(motion.div)`
  height: ${CARD_HEIGHT}vh;
  position: absolute;
  cursor: pointer;
  transform-style: preserve-3d;
`

const CardImage = styled.img`
  height: ${CARD_HEIGHT}vh;
`

const CardBackImage = styled.img`
  height: ${CARD_HEIGHT}vh;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  z-index: 2;
  transform: translateZ(1px) scaleX(-1);
`

const Glare = styled(motion.div)`
  height: ${CARD_HEIGHT}vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  height: ${CARD_HEIGHT}vh;
  width: 100%;
  border-radius: 4px;
  opacity: 0.3;
  mix-blend-mode: hard-light;
  filter: brightness(0.9) contrast(1.75);
`

const Shine = styled(motion.div)`
  height: ${CARD_HEIGHT}vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  height: ${CARD_HEIGHT}vh;
  width: 100%;
  border-radius: 4px;

  background-blend-mode: color-burn, multiply;
  background-size: cover, 100% 900%, cover;
  filter: brightness(1) contrast(1) saturate(0.8);
  mix-blend-mode: screen;

  -webkit-mask-image: var(--mask-image);
  mask-image: var(--mask-image);
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
  transition: opacity 0.3s ease;
`

const ShineOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  background-blend-mode: lighten, multiply;
  background-size: cover, 400% 900%, cover;
  filter: brightness(1.25) contrast(1.75) saturate(0.8);
  mix-blend-mode: overlay;
`
