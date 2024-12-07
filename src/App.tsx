import styled from "styled-components"
import { Cards } from "./components/Cards"
import { Sidebar } from "./components/Sidebar"

function App() {
  return (
    <Container>
      <Sidebar />
      <Cards />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

export default App
