import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { FC, useState } from "react"
import styled from "styled-components"

const STIFFNESS = 1000
const DAMPENING = 10

export const MotionCard: FC = () => {
  const [_tempForceUpdate, setTempForceUpdate] = useState(0)

  const cursorPosX = useMotionValue(0)
  const cursorPosY = useMotionValue(0)

  const backgroundPosX = useTransform(() => cursorPosX.get() * 20 + 40)
  const backgroundPosY = useTransform(() => cursorPosY.get() * 20 + 40)

  const cursorPosXPercentage = useTransform(() => cursorPosX.get() * 100)
  const cursorPosYPercentage = useTransform(() => cursorPosY.get() * 100)
  const cursorPosXSpring = useSpring(cursorPosXPercentage, {
    stiffness: STIFFNESS,
    damping: DAMPENING,
  })
  const cursorPosYSpring = useSpring(cursorPosYPercentage, {
    stiffness: STIFFNESS,
    damping: DAMPENING,
  })

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const rotateXSpring = useSpring(rotateX, { stiffness: 100, damping: 10 })
  const rotateYSpring = useSpring(rotateY, { stiffness: 100, damping: 10 })

  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
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
    rotateX.set(0)
    rotateY.set(0)
    setTempForceUpdate(Math.random())
  }

  const glareBackgroundImage = `radial-gradient(farthest-corner circle at ${cursorPosXPercentage.get()}% ${cursorPosYPercentage.get()}%, hsl(0, 0%, 100%) 0%, hsla(210, 3%, 54%, 0.33) 45%, hsla(0, 0%, 20%, 0.9) 130%)`
  const shineBackgroundImage = `url("https://poke-holo.simey.me/img/grain.webp"),
    repeating-linear-gradient(
      0deg,
      hsl(2, 100%, 73%) calc(5% * 1),
      hsl(53, 100%, 69%) calc(5% * 2),
      hsl(93, 100%, 69%) calc(5% * 3),
      hsl(176, 100%, 76%) calc(5% * 4),
      hsl(228, 100%, 74%) calc(5% * 5),
      hsl(283, 100%, 73%) calc(5% * 6),
      hsl(2, 100%, 73%) calc(5% * 7)
    ),
    repeating-linear-gradient(
      133deg,
      #0e152e 0%,
      hsl(180, 10%, 60%) 3.8%,
      hsl(180, 29%, 66%) 4.5%,
      hsl(180, 10%, 60%) 5.2%,
      #0e152e 10%,
      #0e152e 12%
    ),
    radial-gradient(
      farthest-corner circle at ${cursorPosXSpring.get()}% ${cursorPosYSpring.get()}%,
      hsla(0, 0%, 0%, 0.1) 12%,
      hsla(0, 0%, 0%, 0.15) 20%,
      hsla(0, 0%, 0%, 0.25) 120%
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
        onMouseMove={(ev) => handleMouseMove(ev)}
        onMouseLeave={(ev) => handleMouseLeave(ev)}
        style={{
          rotateX: rotateYSpring,
          rotateY: rotateXSpring,
        }}
        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
      >
        <CardImage src="/card.png" />
        <Shine
          style={{
            backgroundImage: shineBackgroundImage,
            backgroundPosition: shineBackgroundPos,
          }}
        >
          <ShineOverlay
            style={{
              backgroundImage: shineBackgroundImage,
              backgroundPosition: shineBackgroundOverlayPos,
            }}
          />
        </Shine>
        <Glare
          style={{
            backgroundImage: glareBackgroundImage,
          }}
        />
      </CardContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  perspective: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardContainer = styled(motion.div)`
  height: 60vh;
  position: absolute;
  cursor: pointer;
  transform-style: preserve-3d;
  border-radius: 4px;
  overflow: hidden;
`

const CardImage = styled.img`
  height: 60vh;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`

const Glare = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0.3;
  mix-blend-mode: hard-light;
  filter: brightness(0.9) contrast(1.75);
`

const Shine = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;

  background: transparent;
  mix-blend-mode: color-dodge;

  filter: brightness(0.7) contrast(2) saturate(0.5);

  background-blend-mode: screen, hue, hard-light;
  background-size: 500px 100%, 200% 700%, 300% 100%, 200% 100%;

  background-blend-mode: screen, hue, hard-light;
  filter: brightness(0.8) contrast(2.95) saturate(0.65);
  -webkit-mask-image: url("/light.png");
  mask-image: url("/light.png");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
`

const ShineOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  mix-blend-mode: color-dodge;
  filter: brightness(0.7) contrast(2) saturate(0.5);
  background-blend-mode: screen, hue, hard-light;
  background-size: 500px 100%, 200% 400%, 195% 100%, 200% 100%;
  background-blend-mode: screen, hue, hard-light;
  filter: brightness(0.8) contrast(2.95) saturate(0.65);
  content: "";
  filter: brightness(1) contrast(2.5) saturate(1.75);
  mix-blend-mode: soft-light;
`
