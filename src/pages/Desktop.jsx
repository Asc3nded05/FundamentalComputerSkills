import { Responsive, WidthProvider } from "react-grid-layout";
import { useState, useEffect, use, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppWindowManager } from "../utils/appWindowManager.js";
import { eventBus } from "../utils/eventBus.js";
import backgroundImageDefault from '../assets/background-image.jpg';

import AppIcon from '../components/AppIcon.jsx'
import Clock from '../components/Clock.jsx'
import SideBar from '../components/SideBar.jsx'
import AppWindow from '../components/AppWindow.jsx';
import StartButton from "../components/StartButton.jsx";
import StartMenu from "../components/StartMenu.jsx";
import QuickSettingsButton from "../components/QuickSettingsButton.jsx";
import QuickSettings from "../components/QuickSettings.jsx";
import FileExplorer from "../components/FileExplorer.jsx";
import Notepad from "../components/Notepad.jsx";
import FrameApp from "../components/FrameApp.jsx";
import Settings from "../components/Settings.jsx";
import SearchBar from "../components/SearchBar.jsx"
import SearchMenu from "../components/SearchMenu.jsx"
import TaskManager from "../components/TaskManager.jsx";
import ContextMenuDesktop from "../components/ContextMenuDesktop.jsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Desktop() {
    const location = useLocation();
    const { state } = location;
    const lessonId = state?.lessonId;
    const [brightness, setBrightness] = useState(100);
    const [volume, setVolume] = useState(100);
    const [query, setQuery] = useState("")
    const [backgroundImage, setBackgroundImage] = useState('../assets/background-image.jpg');

    // Ref for desktop area, used to center new app windows
    const desktopRef = useRef(null);

    // Load background image from localStorage 
    useEffect(() => {
        const storedImage = localStorage.getItem('backgroundImage');
        if (storedImage) {
            setBackgroundImage(storedImage);
        } else {
            // Load default image and convert to data URL for storage
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL();
                localStorage.setItem('backgroundImage', dataUrl);
                setBackgroundImage(dataUrl);
            };
            img.onerror = () => {
                console.error('Failed to load background image');
                setBackgroundImage(backgroundImageDefault);
            };
            img.src = backgroundImageDefault;
        }
    }, []);

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
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isQuickSettingsOpen, setQuickSettingsOpen] = useState(false);

    function toggleStartMenu() {
        setIsStartOpen(prev => !prev);
    }

     function toggleSearch(){
        console.log("toggleSearch")
        setIsSearchOpen(prev => !prev);
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
            case 'Settings':
                return <Settings key={app.instanceId} startingPage={app.startingPage}/>;
            case 'TaskManager':
                return <TaskManager key={app.instanceId} sortedWindows={sortedWindows} />;
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

    // Functions to keep desktop '1280x720' for internal content positioning but scale to fit screen
    const desktopAreaRef = useRef(null);
    const BASE_WIDTH = 1280;
    const BASE_HEIGHT = 720;
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!desktopAreaRef.current) return;
        function updateScale() {
            const rect = desktopAreaRef.current.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                const newScale = Math.min(
                    rect.width / BASE_WIDTH,
                    rect.height / BASE_HEIGHT
                );
                setScale(newScale);
            }
        };

        // Create a ResizeObserver to watch for size changes
        const resizeObserver = new ResizeObserver(updateScale);
        resizeObserver.observe(desktopAreaRef.current);

        // Initial measurement
        updateScale();

        return () => resizeObserver.disconnect();
    }, []);


    return <>
        <div className="desktop-page" style={{}}>
            <div className="desktop-area" ref={desktopAreaRef}>
                <div
                    className="desktop-container"
                    ref={desktopRef}
                    style={{
                        transform: `translate(-50%, -50%) scale(${scale})`,
                        filter: `brightness(${brightness}%)`,
                        backgroundImage: `url('${backgroundImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >                    
                    <ResponsiveGridLayout
                        className="layout"
                        layouts={{ lg: desktopLayout }}
                        breakpoints={{ lg: 1200 }}
                        cols={{ lg: 12 }}
                        rows={{ lg: 7 }}
                        compactType={null}
                        preventCollision={true}
                        width={BASE_WIDTH}
                        rowHeight={80}          // Controls vertical snap
                        isResizable={false}     // Desktop icons don’t resize   
                        draggableHandle=".app-icon" // Only drag by the icon
                        dragStartDelay={0} // To prevent conflict with double-click to open app
                        clickDelay={200}
                        transformScale={scale}
                        isBounded={true}
                        style= {{ height: '90%' }} // Keep icons inside the desktop area
                    >
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
                            <SearchBar toggleSearch={toggleSearch}
                            query={query}
                            setQuery={setQuery}/>
                            

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

                    <SearchMenu
                        closeStartMenu={() => setIsSearchOpen(false)}
                        isOpen={isSearchOpen}
                        apps={startMenuApps}
                        query={query}
                        setQuery={setQuery}
                    />

                    <QuickSettings
                        isOpen={isQuickSettingsOpen}
                        closeQuickSettings={() => setQuickSettingsOpen(false)}
                        brightness={brightness}
                        setBrightness={setBrightness}
                        volume={volume}
                        setVolume={setVolume}
                        openApp={openApp}
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
                            scale={scale}
                            desktopRef={desktopRef}
                        />
                    ))}

                </div>

                {/* Desktop Context Menu on right click */}
                <ContextMenuDesktop triggerRef={desktopRef} scale={scale} />
            </div>

            <SideBar lessonId={lessonId} />
        </div>
    </>
}
export default Desktop;