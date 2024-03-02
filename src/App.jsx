import { useState } from 'react'
import { Home } from './pages/home.jsx'
import './App.css'

const isAuthenticated = true
function App() {
  return (
    isAuthenticated && <Home/>
  )
}

export default App
