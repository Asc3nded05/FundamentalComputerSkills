import { Responsive, WidthProvider } from "react-grid-layout";
import { useState, useEffect, use, useRef, useMemo } from 'react';

import AppIcon from '../components/AppIcon.jsx'
import Clock from '../components/Clock.jsx'
import SideBar from '../components/SideBar.jsx'
import AppWindow from '../components/AppWindow.jsx';
import StartButton from "../components/StartButton.jsx";
import StartMenu from "../components/StartMenu.jsx";
import QuickSettingsButton from "../components/QuickSettingsButton.jsx";
import QuickSettings from "../components/QuickSettings.jsx";
import { Link } from 'react-router-dom';
import { APP_REGISTRY } from '../utils/apps.js';

import FileExplorer from "../components/FileExplorer.jsx";
import Notepad from "../components/Notepad.jsx";
import FrameApp from "../components/FrameApp.jsx";
import { useLocation } from 'react-router-dom';
import { useAppWindowManager } from "../utils/appWindowManager.js";
import { eventBus } from "../utils/eventBus.js";
const ResponsiveGridLayout = WidthProvider(Responsive);

function Desktop() {
    const location = useLocation();
    const { state } = location;
    const lessonId = state?.lessonId;
    const [brightness, setBrightness] = useState(100);
    const [volume, setVolume] = useState(100);

    // Ref for desktop area, used to center new app windows
    const desktopRef = useRef(null);

    // Custom hook to manage app windows
    const {
        apps,
        sortedWindows,
        bringToFront,
        openApp,
        closeApp,
        minimizeApp,
        maximizeApp,
    } = useAppWindowManager();

    const baseApps = useMemo(() => apps.filter(app => !app.instanceId), [apps]);

    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isQuickSettingsOpen, setQuickSettingsOpen] = useState(false);

    function toggleStartMenu() {
        setIsStartOpen(prev => !prev);
    }

    function toggleQuickSettings() {
        setQuickSettingsOpen(prev => !prev);
    }


    const desktopLayout = useMemo(() => {
        const baseApps = apps.filter(app => !app.instanceId);

        return baseApps.map((app, index) => ({
            i: app.id,
            x: 0,
            y: index,
            w: 1,
            h: 1,
            static: false
        }));
    }, [apps]); // Recalculate when apps change

    // Puts all apps from the apps list into the start menu
    const startMenuApps = useMemo(() =>
        baseApps.map(app => ({
            name: app.name,
            icon: app.icon,
            eventName: `${app.id}StartOpen`,
            openWindow: () => openApp(app.id, { createNewInstance: app.canHaveMultipleInstances }),
            isAppOpen: app.isOpen,
            variant: 'start-menu',
            appId: app.id
        }))
        , [baseApps, openApp]);

    // Render appropriate app content
    const renderAppContent = (app) => {
        switch (app.component) {
            case 'FileExplorer':
                return <FileExplorer key={app.instanceId} />;
            case 'Notepad':
                return <Notepad key={app.instanceId} initialContent={app.initialContent} />;
            case 'FrameApp':
                return <FrameApp key={app.instanceId} />;
            default:
                return <div key={app.instanceId}>Unknown App: {app.name}</div>;
        }
    };

    // Open text files from File Explorer
    useEffect(() => {
    const handler = (e) => {
        const { file } = e.detail;
        openApp("Notepad", {
        createNewInstance: true,
        initialContent: file.content || '',
        fileIdentifier: file.path || file.name || file.id
        });
    };
    eventBus.addEventListener("OpenTextFile", handler);
    return () => eventBus.removeEventListener("OpenTextFile", handler);
    }, [openApp]);

    return <>
        <div className="desktop-page">
            <div 
                className="desktop-container" 
                ref={desktopRef}
                style={{ filter: `brightness(${brightness}%)` }}
            >
                <ResponsiveGridLayout
                    className="layout"
                    layouts={{ lg: desktopLayout }}
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
                    {/*  */}
                    {baseApps.map((app) => (
                        <div key={app.id}>
                            <AppIcon
                                name={app.name}
                                icon={app.icon}
                                eventName={`${app.id}DesktopOpen`}
                                // openWindow={() => openApp(app.id)}
                                openWindow={() => openApp(app.id, { createNewInstance: true })} // Open a new instance (if app allows)
                                variant="desktop"
                                isAppOpen={app.isOpen}
                            />
                        </div>
                    ))}
                </ResponsiveGridLayout>

                {/* Taskbar */}
                <div className="navbar">
                    <div className="navbar-left">
                        {/* Left-aligned widgets can go here */}
                    </div>

                    <div className="navbar-center">
                        <StartButton toggleStartMenu={toggleStartMenu} />

                        {baseApps.map((app) => {
                            // Get all instances of this app that are open or minimized
                            const appInstances = apps.filter(a => a.id === app.id && (a.instanceId || !a.instanceId === !app.instanceId));
                            const hasOpenInstance = appInstances.some(a => a.isOpen);
                            const allMinimized = appInstances.every(a => a.isMinimized);
                            
                            return (
                            <AppIcon
                                key={app.id}
                                name={app.name}
                                icon={app.icon}
                                eventName={`${app.id}TaskbarOpen`}
                                openWindow={() => {
                                    if (allMinimized && hasOpenInstance) {
                                        // If all instances are minimized, restore them
                                        appInstances.forEach(instance => bringToFront(instance.instanceId || instance.id));
                                    } else if (hasOpenInstance && app.canHaveMultipleInstances) {
                                        // If app can have multiple instances and one is already open, open a new one
                                        openApp(app.id, { createNewInstance: true });
                                    } else if (!hasOpenInstance) {
                                        // If no instance is open, open one
                                        openApp(app.id, { createNewInstance: app.canHaveMultipleInstances });
                                    } else {
                                        // Default: bring to front if minimized, or open if not
                                        if (app.isMinimized) {
                                            bringToFront(app.id);
                                        } else {
                                            openApp(app.id);
                                        }
                                    }
                                }}
                                variant="taskbar"
                                isAppOpen={hasOpenInstance}
                                isMinimized={allMinimized}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                }}
                            />
                            );
                        })}

                    </div>

                    <div className="navbar-right">
                        {/* Clock, wifi, etc */}
                        <QuickSettingsButton toggleQuickSettings={toggleQuickSettings} />
                        <Clock />
                    </div>
                </div>

                <StartMenu
                    closeStartMenu={() => setIsStartOpen(false)}
                    isOpen={isStartOpen}
                    apps={startMenuApps}
                />

                <QuickSettings
                    isOpen={isQuickSettingsOpen}
                    closeQuickSettings={() => setQuickSettingsOpen(false)}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    volume={volume}
                    setVolume={setVolume}
                />


                {/* Dynamic app windows */}
                {sortedWindows.map((app) => (
                    <AppWindow
                        key={app.instanceId || app.id}
                        name={app.name}
                        isOpen={app.isOpen}
                        isMinimized={app.isMinimized}
                        isMaximized={app.isMaximized}
                        onClose={() => closeApp(app.instanceId || app.id)}
                        onMinimize={() => minimizeApp(app.instanceId || app.id)}
                        onMaximize={() => maximizeApp(app.instanceId || app.id)}
                        zIndex={app.zIndex}
                        bringToFront={() => bringToFront(app.instanceId || app.id)}
                        content={renderAppContent(app)}
                        initialSize={app.size}
                        desktopRef={desktopRef}
                        closeEventName={`${app.id}Close`}
                    />
                ))}

            </div>

            <SideBar lessonId={lessonId} />

        </div>
    </>
}
export default Desktop;