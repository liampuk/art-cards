import { FC } from "react"
import { GrainOverlay } from "./components/Grain"
import { BranchOverlay } from "./components/leaves/BranchOverlay"
import { MainContent } from "./components/main-content/MainContent"
import { Mobile } from "./components/main-content/pages/mobile/Mobile"
import { Setup } from "./components/Setup"
import { Sidebar } from "./components/sidebar/Sidebar"
import { usePortrait } from "./hooks/general"

export const App: FC = () => {
  const portrait = usePortrait()

  return (
    <>
      <Setup />
      {portrait ? (
        <Mobile />
      ) : (
        <>
          <Sidebar />
          <MainContent />
          <BranchOverlay />
        </>
      )}
      <GrainOverlay />
    </>
  )
}
