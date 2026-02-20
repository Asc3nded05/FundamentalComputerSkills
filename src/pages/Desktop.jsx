import { Responsive, WidthProvider } from "react-grid-layout";
import { useState, useEffect, use } from 'react';

import AppIcon from '../components/AppIcon.jsx'
import Clock from '../components/Clock.jsx'
import SideBar from '../components/SideBar.jsx'
import AppWindow from '../components/AppWindow.jsx';
import StartButton from "../components/StartButton.jsx";
import StartMenu from "../components/StartMenu.jsx";
import { Link } from 'react-router-dom';
import { APP_REGISTRY } from '../utils/apps.js';

import FileExplorer from "../components/FileExplorer.jsx";
import Notepad from "../components/Notepad.jsx";
import FrameApp from "../components/FrameApp.jsx";
import { useLocation } from 'react-router-dom';
const ResponsiveGridLayout = WidthProvider(Responsive);

function Desktop() {
    const location = useLocation();
    const {state} = location;
    const lessonId = state?.lessonId;
    console.log('Desktop received lessonId from navigation state:', lessonId);
    const initialLayout = [
        { i: "app1", x: 0, y: 0, w: 1, h: 1, static: false },
        { i: "app2", x: 0, y: 1, w: 1, h: 1, static: false },
        { i: "app3", x: 0, y: 2, w: 1, h: 1, static: false },
    ]

    const [isStartOpen, setIsStartOpen] = useState(false);

    const [isApp1Open, setIsApp1Open] = useState(false);
    const [isApp2Open, setIsApp2Open] = useState(false);
    const [isApp3Open, setIsApp3Open] = useState(false);

    // Temporary debug log for eventBus events (wildcard "*")
    // const [eventsLog, setEventsLog] = useState([]);
    // useEffect(() => {
    //     const handler = (e) => {
    //         const entry = { type: e.type, detail: e.detail || {}, time: Date.now() };
    //         console.log('eventBus:', entry);
    //         setEventsLog(prev => [entry, ...prev].slice(0, 20));
    //     };
    //     eventBus.addEventListener('*', handler);
    //     return () => eventBus.removeEventListener('*', handler);
    // }, []);

    // Apps list for StartMenu
    const apps = [
        {
            name: APP_REGISTRY[0].name,
            icon: APP_REGISTRY[0].icon,
            eventName: 'FileExplorerStartOpen',
            openWindow: () => setIsApp1Open(true),
            isAppOpen: isApp1Open,
            variant: 'start-menu'
        },
        {
            name: APP_REGISTRY[1].name,
            icon: APP_REGISTRY[1].icon,
            eventName: 'NotepadStartOpen',
            openWindow: () => setIsApp2Open(true),
            isAppOpen: isApp2Open,
            variant: 'start-menu'
        },
        {
            name: APP_REGISTRY[2].name,
            icon: APP_REGISTRY[2].icon,
            eventName: 'App3StartOpen',
            openWindow: () => setIsApp3Open(true),
            isAppOpen: isApp3Open,
            variant: 'start-menu'
        },
        {
            name: APP_REGISTRY[0].name,
            icon: APP_REGISTRY[0].icon,
            eventName: 'FileExplorerStartOpen',
            openWindow: () => setIsApp1Open(true),
            isAppOpen: isApp1Open,
            variant: 'start-menu'
        },
        {
            name: APP_REGISTRY[1].name,
            icon: APP_REGISTRY[1].icon,
            eventName: 'NotepadStartOpen',
            openWindow: () => setIsApp2Open(true),
            isAppOpen: isApp2Open,
            variant: 'start-menu'
        },
        {
            name: APP_REGISTRY[2].name,
            icon: APP_REGISTRY[2].icon,
            eventName: 'App3StartOpen',
            openWindow: () => setIsApp3Open(true),
            isAppOpen: isApp3Open,
            variant: 'start-menu'
        },
        {
            name: APP_REGISTRY[0].name,
            icon: APP_REGISTRY[0].icon,
            eventName: 'FileExplorerStartOpen',
            openWindow: () => setIsApp1Open(true),
            isAppOpen: isApp1Open,
            variant: 'start-menu'
        },
        {
            name: APP_REGISTRY[1].name,
            icon: APP_REGISTRY[1].icon,
            eventName: 'NotepadStartOpen',
            openWindow: () => setIsApp2Open(true),
            isAppOpen: isApp2Open,
            variant: 'start-menu'
        },
        {
            name: APP_REGISTRY[2].name,
            icon: APP_REGISTRY[2].icon,
            eventName: 'App3StartOpen',
            openWindow: () => setIsApp3Open(true),
            isAppOpen: isApp3Open,
            variant: 'start-menu'
        }
    ];

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

    const openApp = (appName) => {
        bringToFront(appName);
        if (appName === "app1") setIsApp1Open(prev => !prev);
        if (appName === "app2") setIsApp2Open(prev => !prev);
        if (appName === "app3") setIsApp3Open(prev => !prev);
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
                        <AppIcon
                            name={APP_REGISTRY[0].name}
                            icon={APP_REGISTRY[0].icon}
                            eventName="FileExplorerDesktopOpen"
                            openWindow={() => openApp("app1")}
                            variant="desktop"
                        />
                    </div>

                    <div key="app2">
                        <AppIcon
                            name={APP_REGISTRY[1].name}
                            icon={APP_REGISTRY[1].icon}
                            eventName="NotepadDesktopOpen"
                            openWindow={() => openApp("app2")}
                            variant="desktop"
                        />
                    </div>

                    <div key="app3">
                        <AppIcon
                            name={APP_REGISTRY[2].name}
                            icon={APP_REGISTRY[2].icon}
                            eventName="App3DesktopOpen"
                            openWindow={() => openApp("app3")}
                            variant="desktop"
                        />
                    </div>

                </ResponsiveGridLayout>

                {/* Small debug panel showing recent events from eventBus (temporary) */}
                {/* <div style={{position:'fixed', right:12, bottom:78, width:320, maxHeight:220, overflowY:'auto', background:'rgba(0,0,0,0.7)', color:'#fff', fontSize:12, padding:8, borderRadius:6, zIndex:9999}}>
                    <strong style={{display:'block', marginBottom:6}}>Event Log</strong>
                    {eventsLog.length === 0 ? (
                        <div style={{opacity:0.7}}>No events yet — try opening an app or clicking icons.</div>
                    ) : (
                        eventsLog.map((ev, i) => (
                            <div key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'4px 0'}}>
                                <div style={{fontWeight:600}}>{ev.type}</div>
                                <div style={{opacity:0.9, fontSize:11}}>{Object.keys(ev.detail).length ? JSON.stringify(ev.detail) : ''}</div>
                            </div>
                        ))
                    )}
                </div> */}
                
                {/* Taskbar */}
                <div className="navbar">
                    <div className="navbar-left">
                        {/* Left-aligned widgets can go here */}
                    </div>

                    <div className="navbar-center">
                        <StartButton toggleStartMenu={() => setIsStartOpen(prev => !prev)} />
                        <AppIcon
                            name={APP_REGISTRY[0].name}
                            icon={APP_REGISTRY[0].icon}
                            eventName="FileExplorerTaskbarOpen"
                            openWindow={() => openApp("app1")}
                            variant="taskbar"
                            isAppOpen={isApp1Open}
                        />
                        <AppIcon
                            name={APP_REGISTRY[1].name}
                            icon={APP_REGISTRY[1].icon}
                            eventName="NotepadTaskbarOpen"
                            openWindow={() => openApp("app2")}
                            variant="taskbar"
                            isAppOpen={isApp2Open}
                        />
                        <AppIcon
                            name={APP_REGISTRY[2].name}
                            icon={APP_REGISTRY[2].icon}
                            eventName="App3TaskbarOpen"
                            openWindow={() => openApp("app3")}
                            variant="taskbar"
                            isAppOpen={isApp3Open}
                        />
                    </div>

                    <div className="navbar-right">
                        {/* Clock, wifi, etc */}
                        <Clock />
                    </div>
                </div>

                <StartMenu
                    closeStartMenu={() => setIsStartOpen(false)}
                    isOpen={isStartOpen}
                    apps={apps}
                />

                {/* App Windows that conditionally render (to fix resetting position on close)*/}
                {isApp1Open &&
                    <AppWindow
                        name={APP_REGISTRY[0].name}
                        isOpen={isApp1Open}
                        onClose={() => setIsApp1Open(false)}
                        closeEventName="FileExplorerClose"
                        zIndex={windows.app1.zIndex}
                        bringToFront={() => bringToFront("app1")}
                        content={<FileExplorer />}
                    />
                }

                {isApp2Open &&
                    <AppWindow
                        name={APP_REGISTRY[1].name}
                        isOpen={isApp2Open}
                        onClose={() => setIsApp2Open(false)}
                        closeEventName="NotepadClose"
                        zIndex={windows.app2.zIndex}
                        bringToFront={() => bringToFront("app2")}
                        content={<Notepad />}
                    />
                }

                {isApp3Open &&
                    <AppWindow
                        name={APP_REGISTRY[2].name}
                        isOpen={isApp3Open}
                        onClose={() => setIsApp3Open(false)}
                        closeEventName="App3Close"
                        zIndex={windows.app3.zIndex}
                        bringToFront={() => bringToFront("app3")}
                        content={<FrameApp />}
                    />
                }
            </div>
            <div className="sidebar-container">
                <div className="sidebar-links">
                    <div className="link">
                        <Link to="/lessons">Lessons</Link>
                    </div>
                    <div className="link">
                        <Link to="/login">Login</Link>
                    </div>
                    {/*
                    <div className="link">
                        <Link to="/files">Files</Link>
                    </div>
                    */}
                </div>
                <SideBar lessonId={lessonId} />
            </div>
        </div>
    </>
}
export default Desktop;