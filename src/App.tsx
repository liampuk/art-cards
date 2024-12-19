import { FC } from "react"
import { GrainOverlay } from "./components/Grain"
import { BranchOverlay } from "./components/leaves/BranchOverlay"
import { MainContent } from "./components/main-content/MainContent"
import { ScrollProvider } from "./components/ScrollProvider"
import { Sidebar } from "./components/sidebar/Sidebar"

export const App: FC = () => {
  return (
    <>
      <ScrollProvider>
        <Sidebar />
        <MainContent />
        <GrainOverlay />
        <BranchOverlay />
      </ScrollProvider>
    </>
  )
}
