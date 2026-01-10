import { createBrowserRouter } from "react-router-dom"
import { App } from "./App"

export const router = createBrowserRouter([
  {
    path: "/gallery-quest",
    element: <App />,
  },
  {
    path: "/gallery-quest/",
    element: <App />,
  },
])
