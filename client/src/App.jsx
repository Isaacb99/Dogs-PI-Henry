import { Routes, Route, useLocation } from "react-router-dom"

import Home from "./components/Home/Home"
import LandingPage from "./components/LandingPage/LandigPage"
import Detail from "./components/Detail/Detail"
import NavBar from "./components/NavBar/NavBar"


function App() {
  
  const {pathname} = useLocation()

  return (
    <div>

      {pathname !== '/' && <NavBar/>}

      <Routes>
        
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>

    </div>
  )
}

export default App
