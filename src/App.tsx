import styled from "styled-components"
import { BranchOverlay } from "./components/BranchOverlay"
import { GrainOverlay } from "./components/Grain"
import { MainContent } from "./components/MainContent"
import { Sidebar } from "./components/Sidebar"
import { ScrollProvider } from "./ScrollProvider"

function App() {
  return (
    <FixedContainer>
      <ScrollProvider>
        <Container>
          <Sidebar />
          <MainContent />
          {/* <Cards /> */}
          <GrainOverlay />
        </Container>
        <BranchOverlay />
      </ScrollProvider>
    </FixedContainer>
  )
}

const Container = styled.div`
  display: flex;
  background-color: #e8e2d0;
  overflow: hidden;
  height: 100vh;
`

const FixedContainer = styled.div`
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #e8e2d0;
`

export default App
