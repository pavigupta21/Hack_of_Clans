import Hackcarousel from "./components/hackcarousel"
import TeamsCarousel from "./components/teamscarousel"
import Usercarousel from "./components/usercarousel"
import Navbar from "./components/Navbar"
import Teams from "./components/Teams"

function App() {
  return (
    <>
      <div >
        <Navbar/>
        <Hackcarousel/>
        <TeamsCarousel/>
        <Usercarousel/>
        <Teams/>
      </div>
      
    </>
  )
}

export default App
