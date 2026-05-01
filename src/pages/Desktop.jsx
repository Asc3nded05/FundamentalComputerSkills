import { Responsive, WidthProvider } from "react-grid-layout";
import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppWindowManager } from "../utils/appWindowManager.js";
import { useLessonApps } from "../api/useLessonApps.js";
import { eventBus } from "../utils/eventBus.js";
import backgroundImageDefault from '../assets/Background.png';

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
import TaskManager from "../components/TaskManager/TaskManager.jsx";
import ContextMenuDesktop from "../components/ContextMenuDesktop.jsx";
import DesktopSelectionBox from "../components/DesktopSelectionBox.jsx";
import { APP_REGISTRY } from "../utils/apps.js";
import { SettingsProvider } from "../utils/settings/settingsContext.jsx";
import { useSettingsContext } from "../utils/settings/settingsContext.jsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Desktop() {
    const location = useLocation();
    const { state } = location;
    const lessonId = state?.lessonId ?? 1;
    const [query, setQuery] = useState("")
    const [backgroundImage, setBackgroundImage] = useState(
        localStorage.getItem('backgroundImage') || '../assets/background-image.jpg'
    );
    const [defaultBackgroundDataUrl, setDefaultBackgroundDataUrl] = useState(null); // To save time reading the default image by storing it as a data URL
    const { brightness, volume } = useSettingsContext();

    // Ref for desktop area, used to center new app windows
    const desktopRef = useRef(null);

    // Functions to keep desktop '1280x720' for internal content positioning but scale to fit screen
    const desktopAreaRef = useRef(null);
    const BASE_WIDTH = 1280;
    const BASE_HEIGHT = 720;
    const [scale, setScale] = useState(1);

    // Function to update background with image object
    const handleBackgroundChange = (newImage) => {
        setBackgroundImage(newImage);
        try {
            localStorage.setItem('backgroundImage', newImage);
        } catch (e) {
            if (e.message.includes('quota')) {
                // 1. Remove metadata (data:image/png;base64,)
                const base64String = newImage.split(',')[1];
                // 2. Calculate bytes: base64 strings are ~33% larger than raw binary data
                // Length * 0.75 is a standard approximation for size in bytes
                const bytes = base64String.length * 0.75;
                // 3. Convert bytes to KB
                const sizeInKB = bytes / 1024;
                console.warn('Image too large to store in localStorage! Size:', sizeInKB.toFixed(0), 'KB, Max 5000 KB');
            }
        }
    };

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
                setDefaultBackgroundDataUrl(dataUrl); // Store it
            };
            img.onerror = () => {
                console.error('Failed to load background image');
                setBackgroundImage(backgroundImageDefault);
                // Optionally handle error
            };
            img.src = backgroundImageDefault;
        }
    }, []);

    // Reset to default background if user selects the default option
    const resetToDefaultBackground = () => {
        if (defaultBackgroundDataUrl) {
            handleBackgroundChange(defaultBackgroundDataUrl);
        } else {
            // Fallback: load default image again
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL();
                handleBackgroundChange(dataUrl);
                setDefaultBackgroundDataUrl(dataUrl);
            };
            img.src = backgroundImageDefault;
        }
    };

    // Function to drag to select only on desktop (not app icons or taskbar)
    const shouldStartSelecting = (event, target) => {
        if (
            target.closest('.app-icon') ||
            target.closest('.navbar') ||
            target.closest('.react-grid-item') ||
            target.closest('.appWindow') ||
            target.closest('.context-menu-desktop') ||
            target.closest('.qs-panel')
        ) {
            return false;
        }
        return true;
    };

    const { response: lessonApps, loading: lessonAppsLoading, error: lessonAppsError } = useLessonApps(lessonId);
    const lessonAppRegistry = useMemo(() => {
        // ⭐ Sandbox mode → load ALL apps
        if (lessonId === 0) {
            return APP_REGISTRY;
        }

        if (lessonAppsLoading) return [];
        if (lessonAppsError || !lessonApps) return APP_REGISTRY;

        const allowedIds = new Set(lessonApps.map(app => app.registryId));
        const iconByRegistryId = new Map(lessonApps.map(app => [app.registryId, app.appIcon]));
        const appDetailsByRegistryId = new Map(lessonApps.map(app => [app.registryId, app]));

        return APP_REGISTRY.filter(app => allowedIds.has(app.id))
            .map(app => ({
                ...app,
                icon: iconByRegistryId.get(app.id) || app.icon,
                cpuMin: appDetailsByRegistryId.get(app.id)?.cpuMin || 0,
                cpuMax: appDetailsByRegistryId.get(app.id)?.cpuMax || 0,
                memMin: appDetailsByRegistryId.get(app.id)?.memMin || 0,
                memMax: appDetailsByRegistryId.get(app.id)?.memMax || 0,
                diskMin: appDetailsByRegistryId.get(app.id)?.diskMin || 0,
                diskMax: appDetailsByRegistryId.get(app.id)?.diskMax || 0,
                netMin: appDetailsByRegistryId.get(app.id)?.netMin || 0,
                netMax: appDetailsByRegistryId.get(app.id)?.netMax || 0
            }));
    }, [lessonId, lessonApps, lessonAppsLoading, lessonAppsError]);


    // Custom hook to manage app windows
    const {
        apps,
        sortedWindows,
        bringToFront,
        openApp,
        closeApp,
        minimizeApp,
        maximizeApp,
        updateWindowPosition,
        updateWindowSize,
        updateAppData,
    } = useAppWindowManager(lessonAppRegistry, BASE_WIDTH, BASE_HEIGHT);

    const baseApps = useMemo(() => apps.filter(app => !app.instanceId), [apps]);

    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isQuickSettingsOpen, setQuickSettingsOpen] = useState(false);

    function toggleStartMenu() {
        setIsStartOpen(prev => !prev);
    }

    function toggleSearch() {
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
            openWindow: () => openApp(app.id, { createNewInstance: false }),
            isAppOpen: app.isOpen,
            variant: 'start-menu',
            appId: app.id
        }))
        , [baseApps, openApp]);

    // Render appropriate app content
    const renderAppContent = (app) => {
        const identifier = app.instanceId || app.id;

        switch (app.component) {
            case 'FileExplorer':
                return <FileExplorer key={identifier} />;
            case 'Notepad':
                return <Notepad
                    key={identifier}
                    initialContent={app.initialContent}
                    onContentChange={(content) => updateAppData(identifier, { initialContent: content })}
                />;
            case 'Settings':
                return <Settings
                    key={identifier}
                    startingPage={app.currentPage || app.startingPage}
                    currentPage={app.currentPage || app.startingPage}
                    settingsState={app.settingsState}
                    onSettingsStateChange={(changes) => updateAppData(identifier, { settingsState: { ...app.settingsState, ...changes } })}
                    backgroundImage={backgroundImage}
                    onBackgroundChange={handleBackgroundChange}
                    onResetDefault={resetToDefaultBackground}
                    onPageChange={(page) => updateAppData(identifier, { currentPage: page, startingPage: page })}
                />;
            case 'TaskManager':
                return <TaskManager key={app.instanceId} sortedWindows={sortedWindows} closeApp={closeApp} />;
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
        <div className="desktop-background" style={{backgroundImage: `url('${backgroundImage}')`}}/>
        <div className="desktop-page">
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
                        style={{ height: '90%' }} // Keep icons inside the desktop area
                    >
                        {baseApps.map((app) => (
                            <div key={app.id}>
                                <AppIcon
                                    name={app.name}
                                    icon={app.icon}
                                    eventName={`${app.id}DesktopOpen`}
                                    openWindow={() => openApp(app.id, { createNewInstance: false })}
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
                                setQuery={setQuery} />


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
                        closeSearchMenu={() => {setIsSearchOpen(false)}}
                        isOpen={isSearchOpen}
                        apps={startMenuApps}
                        query={query}
                        setQuery={setQuery}
                    />

                    <QuickSettings
                        isOpen={isQuickSettingsOpen}
                        closeQuickSettings={() => setQuickSettingsOpen(false)}
                        openApp={openApp}
                    />

                    {/* Dynamic app windows */}
                    {sortedWindows.filter(app => !app.isMinimized).map((app) => (
                        <AppWindow
                            key={app.instanceId || app.id}
                            name={app.name}
                            icon={app.icon}
                            isOpen={app.isOpen}
                            isMinimized={app.isMinimized}
                            isMaximized={app.isMaximized}
                            onClose={() => closeApp(app.instanceId || app.id)}
                            onMinimize={() => minimizeApp(app.instanceId || app.id)}
                            onMaximize={() => maximizeApp(app.instanceId || app.id)}
                            onDragStop={(position) => updateWindowPosition(app.instanceId || app.id, position)}
                            onResizeStop={({ width, height, position }) => updateWindowSize(app.instanceId || app.id, { width, height }, position)}
                            zIndex={app.zIndex}
                            bringToFront={() => bringToFront(app.instanceId || app.id)}
                            content={renderAppContent(app)}
                            size={app.size}
                            position={app.position}
                            scale={scale}
                            baseHeight={BASE_HEIGHT}
                            baseWidth={BASE_WIDTH}
                            offset={app.offset}
                        />
                        
                    ))}

                </div>

                {/* Desktop Context Menu on right click */}
                <ContextMenuDesktop triggerRef={desktopRef} scale={scale} openApp={openApp} />

                {/* Drag-to-select on Desktop */}
                <DesktopSelectionBox
                    containerRef={desktopRef}
                    scale={scale}
                    baseWidth={BASE_WIDTH}
                    baseHeight={BASE_HEIGHT}
                    shouldStartSelecting={shouldStartSelecting}
                />
            </div>

            <SideBar lessonId={lessonId} desktopRef={desktopRef} />
        </div>
    </>
}
export default Desktop;