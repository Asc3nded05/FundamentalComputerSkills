import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// @ts-ignore
import Desktop from './pages/Desktop.jsx'
import Lessons from './pages/Lessons.jsx'
import Login from './pages/Login.jsx'
import Files from './pages/Files.jsx'

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
import './css/TaskManager.css'
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { runLesson } from './utils/lessonRunner.js'
import { useState } from 'react'

function App() {

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/login" element={<Login />} />
          <Route path="/files" element={<Files />} />
        </Routes>

        {/* <div className="sidebar-container"> */}
          {/* <div className="sidebar-links"> */}
            {/* <div className="link">
              <Link to="/">Desktop</Link>
            </div>
            <div className="link">
              <Link to="/lessons">Lessons</Link>
            </div>
            <div className="link">
              <Link to="/login">Login</Link>
            </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </BrowserRouter>
  )
}

export default App
