import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Desktop from './pages/Desktop.jsx'
import Lessons from './pages/Lessons.jsx'
import Login from './pages/Login.jsx'

import './css/App.css'
import './css/AppIcon.css'
import './css/AppWindow.css'
import './css/Desktop.css'
import './css/SideBar.css'
import './css/StartMenu.css'
import './css/TaskBar.css'
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="topnav">
        <div className="link">
        <Link to="/">Desktop</Link>
        </div>
        <div className="link">
        <Link to="/lessons">Lessons</Link>
        </div>
        <div className="link">
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
