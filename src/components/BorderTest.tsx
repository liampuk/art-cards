import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"

const STIFFNESS = 1000
const DAMPENING = 10

const glareBackgroundImage = (
  cursorPosXPercentage: number,
  cursorPosYPercentage: number,
  options: { reverse?: boolean } = { reverse: false }
) => {
  return `radial-gradient(farthest-corner circle at ${
    options.reverse ? 100 - cursorPosXPercentage : cursorPosXPercentage
  }% ${cursorPosYPercentage}%, rgba(255, 255, 255, 0.8) 0%, transparent 45%, transparent 130%)`
}

export const BorderTest: FC = () => {
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
  const backgroundPosY = useTransform(() => cursorPosY.get() * 20)

  const cursorPosXPercentage = useTransform(() => cursorPosX.get() * 100 - 3)
  const cursorPosYPercentage = useTransform(() => cursorPosY.get() * 100 - 3)

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

  return (
    <Container>
      <BorderImageContainer
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <BorderImage src="/border-gold.svg" />
        <Glare
          style={{
            backgroundImage: glareBackgroundImage(
              100 - cursorPosXPercentage.get(),
              cursorPosYPercentage.get(),
              { reverse: true }
            ),
            opacity: hover ? 0.2 : 0,
          }}
        />
      </BorderImageContainer>
    </Container>
  )
}

const Container = styled.div`
  padding: 64px;
  margin-left: 300px;
`

const BorderImageContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  isolation: isolate;
`

const BorderImage = styled.img`
  height: 500px;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff);
`

const Glare = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff);
  opacity: 0.2;
  mix-blend-mode: plus-lighter;

  -webkit-mask-image: url("/border-gold.svg");
  mask-image: url("/border-gold.svg");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;

  transition: opacity 0.3s ease;
  background-blend-mode: overlay;
`
