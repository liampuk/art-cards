import { FC } from "react"
import styled from "styled-components"
import { SidebarButton } from "./SidebarButton"

const BASE_URL = import.meta.env.BASE_URL

export const Sidebar: FC = () => {
  return (
    <>
      <ContentContainer>
        <div>
          <TitleImage src="sidebar-title2.png" />
          <ButtonSection>
            <ButtonContainer>
              <SidebarButton label="home" />
            </ButtonContainer>
            <Divider src="sidebar-divider.png" />
            <ButtonContainer>
              <SidebarButton label="open-pack" />
            </ButtonContainer>
            <Divider src="sidebar-divider.png" />
            <ButtonContainer>
              <SidebarButton label="collection" />
            </ButtonContainer>
            <Divider src="sidebar-divider.png" />
            <ButtonContainer>
              <SidebarButton label="tutorial" />
            </ButtonContainer>
          </ButtonSection>
        </div>
        <a href="https://liamp.uk" target="_blank">
          <ExLibris src="ex-libris2.png" />
        </a>
      </ContentContainer>
      <BorderContainer>
        <SidebarTopImage src={`${BASE_URL}sidebar-top.svg`} />
        <SidebarMiddleImage src={`${BASE_URL}sidebar-middle.svg`} />
        <SidebarBottomImage src={`${BASE_URL}sidebar-bottom.svg`} />
      </BorderContainer>
    </>
  )
}

const ContentContainer = styled.div`
  width: 400px;
  position: absolute;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90%;
  min-height: 800px;
`

const ExLibris = styled.img`
  height: 90px;
  width: auto;
  margin-left: 100px;
  rotate: ${Math.random() * 20 - 10}deg;
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

const SidebarTopImage = styled.img`
  width: 100%;
`

const SidebarMiddleImage = styled.img`
  width: 100%;
  flex: 1;
`

const SidebarBottomImage = styled.img`
  width: 100%;
`

const BorderContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column; /* Or row, depending on stacking */
  align-items: center; /* Aligns items horizontally */
  justify-content: center; /* Aligns items vertically */
  top: 0;
  position: fixed;
  height: 100%;
  width: 400px;
  pointer-events: none;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    font-family: "Amarante", serif;
    font-weight: 400;
    font-style: normal;
    margin: 0;
  }
`
