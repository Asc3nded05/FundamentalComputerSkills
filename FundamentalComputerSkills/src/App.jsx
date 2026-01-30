import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import './Desktop.css'
import Desktop from './Pages/Desktop'
import Lessons from './Pages/Lessons'
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
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/login" element={<Login />} />
      </Routes>      
    </BrowserRouter>
  )
}

export default App
