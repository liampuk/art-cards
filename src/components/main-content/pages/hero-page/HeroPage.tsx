import { FC, memo } from "react"
import styled from "styled-components"
import { useScrollStore } from "../../../../store"
import { scrollTo } from "../../../../utils"
import { Button } from "./Button"

export const HeroPage: FC = memo(() => {
  const lenis = useScrollStore((state) => state.lenis)

  return (
    <Container>
      <div>
        <HeroImage src="hero11.jpg" />
        <AccountButtonContainer onClick={() => scrollTo(lenis, 3)}>
          <Button label="Open Pack" />
        </AccountButtonContainer>
      </div>
    </Container>
  )
})

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`

const AccountButtonContainer = styled.div`
  position: absolute;
  top: 60vh;
  left: 21vw;
`

const HeroImage = styled.img`
  height: 36vw;
  margin-left: 6vw;
`
