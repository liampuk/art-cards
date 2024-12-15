import styled from "styled-components"
import { BranchOverlay } from "./components/BranchOverlay"
import { Cards } from "./components/Cards"
import { GrainOverlay } from "./components/Grain"
import { Sidebar } from "./components/Sidebar"
import { ScrollProvider } from "./ScrollProvider"

function App() {
  return (
    <ScrollProvider>
      <Container>
        <Sidebar />
        <Cards />
        <GrainOverlay />
        {/* <LeavesOverlay /> */}
        <BranchOverlay />
      </Container>
    </ScrollProvider>
  )
}

const Container = styled.div`
  display: flex;
`

export default App
