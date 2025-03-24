import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Navbar from "./components/Navbar"

// Lazy load components for better performance
const Explore = lazy(() => import("./components/pages/Explore"))
const Teams = lazy(() => import("./components/pages/Teams"))

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App