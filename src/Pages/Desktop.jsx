import { Responsive, WidthProvider } from "react-grid-layout";
import { useState } from 'react';

import AppIcon from '../Components/AppIcon.jsx'
import Clock from '../Components/Clock.jsx'
import SideBar from '../Components/SideBar.jsx'
import AppWindow from '../Components/AppWindow.jsx';
import StartButton from "../Components/StartButton.jsx";
import StartMenu from "../Components/StartMenu.jsx";

import desktopIcon from '../assets/DesktopIconPlaceholder.png'
import FileExplorer from "../Components/FileExplorer.jsx";
import NotepadApp from "../Components/NotepadApp.jsx";
import FrameApp from "../Components/FrameApp.jsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Desktop() {

    const initialLayout = [
        { i: "app1", x: 0, y: 0, w: 1, h: 1, static: false },
        { i: "app2", x: 0, y: 1, w: 1, h: 1, static: false },
        { i: "app3", x: 0, y: 2, w: 1, h: 1, static: false }
    ]

    const [isStartOpen, setIsStartOpen] = useState(false);

    const [isApp1Open, setIsApp1Open] = useState(false);
    const [isApp2Open, setIsApp2Open] = useState(false);
    const [isApp3Open, setIsApp3Open] = useState(false);

    // Handle which App is in front
    const [windows, setWindows] = useState({
        app1: { isOpen: false, zIndex: 0 },
        app2: { isOpen: false, zIndex: 0 },
        app3: { isOpen: false, zIndex: 0 },
    });
    const [highestAppZIndex, setHighestAppZIndex] = useState(500);
    
    const bringToFront = (appName) => {
        const newAppZIndex = highestAppZIndex + 1;
        setWindows(prev => ({
            ...prev,
            [appName]: { 
                ...prev[appName], 
                zIndex: newAppZIndex 
            }
        }));
        setHighestAppZIndex(newAppZIndex);
    };

    return <>
        <div className="desktop-page">
            <div className="desktop-container">
                <ResponsiveGridLayout
                    className="layout"
                    layouts={{ lg: initialLayout }}
                    breakpoints={{ lg: 1200 }}
                    cols={{ lg: 12 }}
                    compactType={null}
                    preventCollision={true}
                    rowHeight={80}          // Controls vertical snap
                    width={1200}
                    isResizable={false}     // Desktop icons don’t resize   
                    draggableHandle=".app-icon" // Only drag by the icon

                    dragStartDelay={0} // To prevent conflict with double-click to open app
                    clickDelay={200}
                >
                    <div key="app1">
                        <AppIcon name="File Explorer" icon={desktopIcon} openWindow={() => setIsApp1Open(true)} />
                    </div>

                    <div key="app2">
                        <AppIcon name="Notepad" icon={desktopIcon} openWindow={() => setIsApp2Open(true)} />
                    </div>

                    <div key="app3">
                        <AppIcon name="App Name 3" icon={desktopIcon} openWindow={() => setIsApp3Open(true)} />
                    </div>
                </ResponsiveGridLayout>

                {/* Taskbar */}
                <div className="navbar">
                    <div className="navbar-left">
                        {/* Left-aligned widgets can go here */}
                    </div>

                    <div className="navbar-center">
                        <StartButton toggleStartMenu={() => setIsStartOpen(prev => !prev)} />
                        <AppIcon 
                            name="File Explorer" 
                            icon={desktopIcon} 
                            openWindow={() => setIsApp1Open(true)} 
                            variant="taskbar" 
                            isAppOpen={isApp1Open} />
                        <AppIcon name="Notepad" icon={desktopIcon} openWindow={() => setIsApp2Open(true)} variant="taskbar" isAppOpen={isApp2Open} />
                        <AppIcon name="App Name 3" icon={desktopIcon} openWindow={() => setIsApp3Open(true)} variant="taskbar" isAppOpen={isApp3Open} />
                    </div>

                    <div className="navbar-right">
                        {/* Clock, wifi, etc */}
                        <Clock />
                    </div>
                </div>

                <StartMenu
                    closeStartMenu={() => setIsStartOpen(false)} 
                    isOpen={isStartOpen}
                />

                {/* App Windows */}
                <AppWindow
                    name={"File Explorer"}
                    isOpen={isApp1Open}
                    onClose={() => setIsApp1Open(false)}
                    zIndex={windows.app1.zIndex}
                    bringToFront={() => bringToFront("app1")}
                    content={<FileExplorer />}
                />

                <AppWindow
                    name={"Notepad"}
                    isOpen={isApp2Open}
                    onClose={() => setIsApp2Open(false)}
                    zIndex={windows.app2.zIndex}
                    bringToFront={() => bringToFront("app2")}
                    content={<NotepadApp/>}
                />

                <AppWindow
                    name={"App Name 3"}
                    isOpen={isApp3Open}
                    onClose={() => setIsApp3Open(false)}
                    zIndex={windows.app3.zIndex}
                    bringToFront={() => bringToFront("app3")}
                    content={<FrameApp/>}
                />

            </div>

            <div className="sidebar-container">
                <SideBar />
            </div>
        </div>
    </>
}
export default Desktop;
