import gsap from "gsap"
import { ScrollToPlugin } from "gsap/all"
import { FC } from "react"
import styled from "styled-components"
import { SidebarBorder } from "./SidebarBorder"
import { SidebarButton } from "./SidebarButton"
gsap.registerPlugin(ScrollToPlugin)

const BASE_URL = import.meta.env.BASE_URL

export const Sidebar: FC = () => {
  return (
    <Container>
      <Content>
        <MainContent>
          <Title>Gallery Quest</Title>
          <ButtonSection>
            <ButtonContainer>
              <SidebarButton label="Home" />
            </ButtonContainer>
            <Divider src={`${BASE_URL}sidebar-divider.png`} />
            <ButtonContainer>
              <SidebarButton label="Open Pack" />
            </ButtonContainer>
            <Divider src={`${BASE_URL}sidebar-divider.png`} />
            <ButtonContainer>
              <SidebarButton label="Collection" />
            </ButtonContainer>
            <Divider src={`${BASE_URL}sidebar-divider.png`} />
            <ButtonContainer>
              <SidebarButton label="Tutorial" />
            </ButtonContainer>
          </ButtonSection>
        </MainContent>
        <a href="https://liamp.uk" target="_blank">
          <ExLibris src="ex-libris2.png" />
        </a>
      </Content>
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

const Content = styled.div`
  width: 22vw;
  height: 100%;
  overflow: scroll;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12vh;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 2.4vw;
  font-family: Mucha;
  font-weight: 400;
  color: #333;
  margin-top: 32vh;
  margin-bottom: 0;
`

const ContentFalloff = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 22vw;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
`

const TopFalloff = styled.div`
  width: 100%;
  height: 32vh;
  display: flex;
  flex-direction: column;
`

const BottomFalloff = styled.div`
  width: 100%;
  height: 11vh;
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
  height: 8vh;
  width: auto;
  margin-left: 6vw;
  rotate: ${10 - Math.round(Math.random()) * 20 + Math.random() * 4 - 2}deg;
`

const ButtonSection = styled.div`
  margin-top: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Divider = styled.img`
  width: 14vw;
  margin-top: 12px;
`

const ButtonContainer = styled.div`
  position: relative;
  margin-top: 8px;
`

const Container = styled.div`
  height: 100vh;
  width: 22vw;
  top: 0;
  position: fixed;
`
