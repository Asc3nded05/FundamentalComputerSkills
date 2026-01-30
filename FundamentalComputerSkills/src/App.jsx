import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Desktop from './Pages/Desktop'
import Login from './Pages/Login'
import SideBar from './Components/SideBar'

function App() {
  return (
    <BrowserRouter>
      <nav class="topnav">
        <div class="link">
        <Link to="/">Desktop</Link>
        </div>
        <div class="link">
        <Link to="/lessons">Lessons</Link>
        </div>
        <div class="link">
        <Link to="/login">Login</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/lessons" element={<h1>Lessons Page - Under Construction</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes>      
    </BrowserRouter>
  )
}

export default App
