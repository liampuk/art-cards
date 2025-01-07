import { FC } from "react"
import styled from "styled-components"

type Props = {
  title: string
  children: React.ReactNode
}

export const TitleSection: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <AccentImage src="accent-top.svg" />
      <Title>{title}</Title>
      {children}
    </div>
  )
}

const AccentImage = styled.img`
  width: 22vw;
`

const Title = styled.h1`
  font-size: 2.6vw;
  font-family: Mucha;
  font-weight: 100;
  color: #222;
  margin-left: 4vw;
  margin-top: -2vh;
  margin-bottom: 0;
`
