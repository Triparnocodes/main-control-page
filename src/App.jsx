import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Manager from './assets/components/Manager'
import Navbar from './assets/components/Navbar'
import DashboardPage from './assets/components/DashboardPage'
import RealtimeMonitoring from './assets/components/RealtimeMonitoring'
import WeatherSafety from './assets/components/WeatherSafety'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      {/* <DashboardPage/> */}
      <Manager/>
      
      
      

    </>
  )
}

export default App
