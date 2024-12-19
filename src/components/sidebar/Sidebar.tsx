import { FC } from "react"
import styled from "styled-components"
import { SidebarBorder } from "./SidebarBorder"
import { SidebarButton } from "./SidebarButton"

const BASE_URL = import.meta.env.BASE_URL

export const Sidebar: FC = () => {
  return (
    <Container>
      <ContentContainer>
        <div>
          <TitleImage src={`${BASE_URL}sidebar-title2.png`} />
          <ButtonSection>
            <ButtonContainer>
              <SidebarButton label="home" />
            </ButtonContainer>
            <Divider src={`${BASE_URL}sidebar-divider.png`} />
            <ButtonContainer>
              <SidebarButton label="open-pack" />
            </ButtonContainer>
            <Divider src={`${BASE_URL}sidebar-divider.png`} />
            <ButtonContainer>
              <SidebarButton label="collection" />
            </ButtonContainer>
            <Divider src={`${BASE_URL}sidebar-divider.png`} />
            <ButtonContainer>
              <SidebarButton label="tutorial" />
            </ButtonContainer>
          </ButtonSection>
        </div>
        <a href="https://liamp.uk" target="_blank">
          <ExLibris src="ex-libris2.png" />
        </a>
      </ContentContainer>
      <ContentFalloff>
        <TopFalloff>
          <FalloffBlock />
          <FalloffGradient />
        </TopFalloff>
        <BottomFalloff>
          <FalloffBlock />
          <FalloffGradient />
        </BottomFalloff>
      </ContentFalloff>
      <SidebarBorder />
    </Container>
  )
}

const ContentContainer = styled.div`
  width: 400px;
  height: 100%;
  overflow: scroll;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 100px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ContentFalloff = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
`

const TopFalloff = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
`

const BottomFalloff = styled.div`
  width: 100%;
  height: 108px;
  display: flex;
  flex-direction: column;
  rotate: 180deg;
`

const FalloffGradient = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(180deg, #e8e2d0 0%, rgba(0, 0, 0, 0) 100%);
`

const FalloffBlock = styled.div`
  background-color: #e8e2d0;
  flex: 1;
  width: 100%;
`

const ExLibris = styled.img`
  height: 90px;
  width: auto;
  margin-left: 100px;
  margin-top: 24px;
  rotate: ${10 - Math.round(Math.random()) * 20 + Math.random() * 4 - 2}deg;
`

const ButtonSection = styled.div`
  margin-top: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleImage = styled.img`
  width: 250px;
  margin-top: 300px;
`

const Divider = styled.img`
  width: 250px;
  margin-top: 12px;
`

const ButtonContainer = styled.div`
  position: relative;
  margin-top: 8px;
`

const Container = styled.div`
  height: 100vh;
  width: 400px;
  top: 0;
  position: fixed;
`
