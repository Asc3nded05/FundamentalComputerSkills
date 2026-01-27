import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Desktop from './Pages/Desktop'
import Login from './Pages/Login'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Desktop</Link> |&nbsp;
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
