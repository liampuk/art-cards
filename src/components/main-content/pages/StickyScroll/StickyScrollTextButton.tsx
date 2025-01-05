import { motion, useMotionValue, useTransform } from "framer-motion"
import { FC, PropsWithChildren, useState } from "react"
import styled from "styled-components"

const glareBackgroundImage = (
  cursorPosXPercentage: number,
  cursorPosYPercentage: number
) => {
  return `radial-gradient(farthest-corner circle at ${
    100 - cursorPosXPercentage
  }% ${cursorPosYPercentage}%, rgba(255, 255, 255, 0.8) 0%, transparent 100%, transparent 130%)`
}

export const StickyTextButton: FC<PropsWithChildren> = ({ children }) => {
  const [_tempForceUpdate, setTempForceUpdate] = useState(0)

  const [hover, setHover] = useState(true)
  const [clicking, setClicking] = useState(false)

  const cursorPosX = useMotionValue(1)
  const cursorPosY = useMotionValue(1)

  const cursorPosXPercentage = useTransform(() => cursorPosX.get() * 100 - 3)
  const cursorPosYPercentage = useTransform(() => cursorPosY.get() * 100 - 3)

  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    setHover(true)
    const x = ev.clientX
    const y = ev.clientY

    const offsetLeft = ev.currentTarget.getBoundingClientRect().left
    const offsetTop = ev.currentTarget.getBoundingClientRect().top
    const width = ev.currentTarget.offsetWidth
    const height = ev.currentTarget.offsetHeight

    cursorPosX.set((x - offsetLeft) / width)
    cursorPosY.set((y - offsetTop) / height)
    setTempForceUpdate(Math.random())
  }

  return (
    <StickyScrollTextButton
      onMouseMove={handleMouseMove}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
    >
      <Glare
        style={{
          backgroundImage: glareBackgroundImage(
            100 - cursorPosXPercentage.get(),
            cursorPosYPercentage.get()
          ),
          opacity: clicking ? 0.8 : hover ? 0.3 : 0,
        }}
      />
      {children}
    </StickyScrollTextButton>
  )
}

const StickyScrollTextButton = styled.span`
  background-color: #d5d5d5;
  padding: 4px 8px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  z-index: 3;
  box-shadow: rgba(0, 0, 0, 0.06) 0px -2px 4px 0px inset;
`

const Glare = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  mix-blend-mode: plus-lighter;
  border-radius: 10px;
  -webkit-mask-image: url("/foil-mask.jpg");
  mask-image: url("/foil-mask.jpg");
  -webkit-mask-size: 300px;
  mask-size: 300px;
  mask-position: center;
  mask-mode: luminance;
  mask-repeat: no-repeat;

  transition: opacity 0.3s ease;
  background-blend-mode: overlay;
`