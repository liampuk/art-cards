import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"

const STIFFNESS = 1000
const DAMPENING = 10
const CARD_HEIGHT = 70

export const MotionCard4: FC = () => {
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
          <CardBackImage src="/back.png" />
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
              opacity: hover ? 0.7 : 0.2,
            }}
          />
          <CardImage src="/gathering-almond-blossoms.jpg" />

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

  filter: brightness(1.5) contrast(0.8);
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
  top: 0;
  left: 0;
  border-radius: 4px;
  height: 70vh;
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
  border-radius: 4px;
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
