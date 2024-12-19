import { FC } from "react"
import { BranchOverlay } from "./components/BranchOverlay"
import { GrainOverlay } from "./components/Grain"
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
