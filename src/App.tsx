import styled from "styled-components"
import { BranchOverlay } from "./components/BranchOverlay"
import { GrainOverlay } from "./components/Grain"
import { MainContent } from "./components/MainContent"
import { Sidebar } from "./components/Sidebar"
import { ScrollProvider } from "./ScrollProvider"

function App() {
  return (
    <ScrollProvider>
      <Container>
        <Sidebar />
        <MainContent />
        {/* <Cards /> */}
        <GrainOverlay />
        <BranchOverlay />
      </Container>
    </ScrollProvider>
  )
}

const Container = styled.div`
  display: flex;
  background-color: #e8e2d0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
`

export default App
