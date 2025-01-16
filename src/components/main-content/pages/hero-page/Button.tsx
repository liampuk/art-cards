import { FC, useState } from "react"
import styled from "styled-components"

const BASE_URL = import.meta.env.BASE_URL

const glareBackgroundImage = (
  cursorPosXPercentage: number,
  cursorPosYPercentage: number
) => {
  return `radial-gradient(farthest-corner circle at ${
    100 - cursorPosXPercentage
  }% ${cursorPosYPercentage}%, rgba(255, 255, 255, 0.8) 0%, transparent 100%, transparent 130%)`
}

export const Button: FC<{ label: string; size?: string; width?: string }> = ({
  label,
  size,
  width,
}) => {
  const [_tempForceUpdate, setTempForceUpdate] = useState(0)

  const [hover, setHover] = useState(true)
  const [clicking, setClicking] = useState(false)

  const [cursorPosX, setCursorPosX] = useState(1)
  const [cursorPosY, setCursorPosY] = useState(1)

  const cursorPosXPercentage = cursorPosX * 100 - 3
  const cursorPosYPercentage = cursorPosY * 100 - 3

  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    setHover(true)
    const x = ev.clientX
    const y = ev.clientY
    const offsetLeft = ev.currentTarget.getBoundingClientRect().left
    const offsetTop = ev.currentTarget.getBoundingClientRect().top
    const width = ev.currentTarget.offsetWidth
    const height = ev.currentTarget.offsetHeight
    setCursorPosX((x - offsetLeft) / width)
    setCursorPosY((y - offsetTop) / height)
    setTempForceUpdate(Math.random())
  }

  return (
    <Container
      onMouseMove={handleMouseMove}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
    >
      <ButtonBox>
        <AccountButton src="button-test.png" $width={width} />
        <Glare
          style={{
            backgroundImage: glareBackgroundImage(
              100 - cursorPosXPercentage,
              cursorPosYPercentage
            ),
            opacity: clicking ? 0.8 : hover ? 0.4 : 0,
          }}
        />
        <LabelText $size={size}>{label}</LabelText>
      </ButtonBox>
    </Container>
  )
}

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LabelText = styled.p<{ $size?: string }>`
  font-size: ${({ $size }) => $size ?? "1.6vw"};
  margin-top: ${({ $size }) => $size ?? "1.6vw"};
  font-family: Mucha;
  font-weight: 400;
  color: #333;
  position: absolute;
`
const AccountButton = styled.img<{ $width?: string }>`
  width: ${({ $width }) => $width ?? "14vw"};
  object-fit: contain;
`
const Container = styled.div`
  cursor: pointer;
`

const Glare = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  mix-blend-mode: plus-lighter;
  -webkit-mask-image: url("${BASE_URL}button-test-mask2.jpg");
  mask-image: url("${BASE_URL}button-test-mask2.jpg");
  -webkit-mask-size: contain;
  mask-size: contain;
  mask-position: 0 0;
  mask-mode: luminance;
  mask-repeat: no-repeat;

  transition: opacity 0.3s ease;
  background-blend-mode: overlay;
`
