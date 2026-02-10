import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// @ts-ignore
import Desktop from './Pages/Desktop.jsx'
import Lessons from './Pages/Lessons.jsx'
import Login from './Pages/Login.jsx'

import './css/App.css'
import './css/AppIcon.css'
import './css/AppWindow.css'
import './css/Desktop.css'
import './css/FileExplorer.css'
import './css/FrameApp.css'
import './css/Notepad.css'
import './css/SideBar.css'
import './css/StartMenu.css'
import './css/Taskbar.css'
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import SideBar from './Components/SideBar.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <div className="sidebar-container">
          <div className="sidebar-links">
            <div className="link">
              <Link to="/">Desktop</Link>
            </div>
            <div className="link">
              <Link to="/lessons">Lessons</Link>
            </div>
            <div className="link">
              <Link to="/login">Login</Link>
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
