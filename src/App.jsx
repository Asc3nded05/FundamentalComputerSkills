import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// @ts-ignore
import Desktop from './pages/Desktop.jsx'

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
import { SettingsProvider } from './utils/settings/settingsContext.jsx'
import { UnresponsiveProvider } from './components/UnresponsiveContext.jsx'
import { LessonCompletionProvider } from './components/LessonCompletionContext.jsx'

function App() {

  return (
    <BrowserRouter basename="/FundamentalComputerSkills/">
      <div className="app-layout">
        <Routes>
          <Route path="/" element={
            <SettingsProvider>
              <UnresponsiveProvider>
                <LessonCompletionProvider>
                  <Desktop />
                </LessonCompletionProvider>
              </UnresponsiveProvider>
            </SettingsProvider>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
