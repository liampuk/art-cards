import { FC } from "react"
import styled from "styled-components"

const BASE_URL = import.meta.env.BASE_URL

export const SidebarBorder: FC = () => {
  return (
    <BorderContainer>
      <BorderImage src={`${BASE_URL}sidebar-top.svg`} />
      <BorderImageMiddle src={`${BASE_URL}sidebar-middle.svg`} />
      <BorderImage src={`${BASE_URL}sidebar-bottom.svg`} />
    </BorderContainer>
  )
}

const BorderImage = styled.img`
  width: 100%;
`

const BorderImageMiddle = styled(BorderImage)`
  flex: 1;
`

const BorderContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  position: fixed;
  height: 100%;
  width: 22vw;
  pointer-events: none;
  z-index: 2;
`
