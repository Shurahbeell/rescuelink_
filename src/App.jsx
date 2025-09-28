import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import CitizenDashboard from './components/citizenDashboard'
import WorkerDashboard from './components/workerDashboard'
import Home from './components/Home'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/worker" element={<WorkerDashboard />} />
      </Routes>
    </>
  )
}

export default App
