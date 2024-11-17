import { FC, useState } from "react"
import styled from "styled-components"

export const Card2: FC = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

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

    setRotate({ x: offsetX, y: offsetY })
    setCursorPos({
      x: (x - offsetLeft) / width,
      y: (y - offsetTop) / height,
    })
  }

  return (
    <Container
      $posX={cursorPos.x}
      $posY={cursorPos.y}
      $rotateX={rotate.x}
      $rotateY={rotate.y}
    >
      <CardContainer onMouseMove={(ev) => handleMouseMove(ev)}>
        <CardImage src="/card.png" />
        <Shine>
          <ShineOverlay />
        </Shine>
        <Glare />
      </CardContainer>
    </Container>
  )
}

const Container = styled.div<{
  $rotateX: number
  $rotateY: number
  $posX: number
  $posY: number
}>`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  ${({ $rotateX }) => `--rotateX: ${-$rotateX}deg;`}
  ${({ $rotateY }) => `--rotateY: ${$rotateY}deg;`}
    ${({ $posX }) => `--posX: ${$posX * 100}%;`}
    ${({ $posY }) => `--posY: ${$posY * 100}%;`}
    --posX: ${({ $posX }) => `${$posX * 100}%;`}
  --posY: ${({ $posY }) => `${$posY * 100}%`};
  --background-x: ${({ $posX }) => `${$posX * 20 + 40}%`};
  --background-y: ${({ $posY }) => `${$posY * 20 + 40}%`};
`

const CardContainer = styled.div`
  height: 60vh;
  position: absolute;
  cursor: pointer;
  transform-style: preserve-3d;
  /* transition: transform ease 0.3s; */

  &:hover {
    /* transform: scale(1.1) rotateY(var(--rotateX)) rotateX(var(--rotateY)); */
    transform: scale(1.1) rotateY(var(--rotateX)) rotateX(var(--rotateY));
  }
`

const CardImage = styled.img`
  height: 60vh;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`

const Glare = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(
    farthest-corner circle at var(--posX) var(--posY),
    hsl(0, 0%, 100%) 0%,
    hsla(210, 3%, 54%, 0.33) 45%,
    hsla(0, 0%, 20%, 0.9) 130%
  );
  opacity: 0.3;
  mix-blend-mode: hard-light;
  filter: brightness(0.9) contrast(1.75);
`

const Shine = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;

  background: transparent;
  mix-blend-mode: color-dodge;

  background-image: url("grain.webp"),
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
      farthest-corner circle at var(--posX) var(--posY),
      hsla(0, 0%, 0%, 0.1) 12%,
      hsla(0, 0%, 0%, 0.15) 20%,
      hsla(0, 0%, 0%, 0.25) 120%
    );

  filter: brightness(0.7) contrast(2) saturate(0.5);

  background-blend-mode: screen, hue, hard-light;
  background-size: 500px 100%, 200% 700%, 300% 100%, 200% 100%;
  background-position: center, 0% var(--background-y),
    var(--background-x) var(--background-y),
    var(--background-x) var(--background-y);

  background-blend-mode: screen, hue, hard-light;
  filter: brightness(0.8) contrast(2.95) saturate(0.65);

  -webkit-mask-image: url("/light.png");
  mask-image: url("/light.png");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
`

const ShineOverlay = styled(Shine)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;

  background: transparent;
  mix-blend-mode: color-dodge;

  background-image: url("grain.webp"),
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
      farthest-corner circle at var(--posX) var(--posY),
      hsla(0, 0%, 0%, 0.1) 12%,
      hsla(0, 0%, 0%, 0.15) 20%,
      hsla(0, 0%, 0%, 0.25) 120%
    );

  filter: brightness(0.7) contrast(2) saturate(0.5);

  background-blend-mode: screen, hue, hard-light;
  background-size: 500px 100%, 200% 700%, 300% 100%, 200% 100%;
  background-position: center, 0% var(--background-y),
    var(--background-x) var(--background-y),
    var(--background-x) var(--background-y);

  background-blend-mode: screen, hue, hard-light;
  filter: brightness(0.8) contrast(2.95) saturate(0.65);
  content: "";
  background-position: center, 0% var(--background-y),
    calc(var(--background-x) * -1) calc(var(--background-y) * -1),
    var(--background-x) var(--background-y);
  background-size: 500px 100%, 200% 400%, 195% 100%, 200% 100%;
  filter: brightness(1) contrast(2.5) saturate(1.75);
  mix-blend-mode: soft-light;
`
