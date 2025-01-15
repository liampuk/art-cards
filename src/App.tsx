import { FC } from "react"
import { GrainOverlay } from "./components/Grain"
import { BranchOverlay } from "./components/leaves/BranchOverlay"
import { MainContent } from "./components/main-content/MainContent"
import { Setup } from "./components/Setup"
import { Sidebar } from "./components/sidebar/Sidebar"

export const App: FC = () => {
  return (
    <>
      <Setup />
      <Sidebar />
      <MainContent />
      <GrainOverlay />
      <BranchOverlay />
    </>
  )
}
