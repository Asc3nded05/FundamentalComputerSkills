import { useState, useCallback, useMemo } from 'react';
import { APP_REGISTRY } from '../utils/apps';
import { dispatchDesktopEvent } from "../utils/eventBus";


export function useAppWindowManager(initialApps = APP_REGISTRY) {

    // The initial apps from the registry, for display on desktop and start menu
    const [apps, setApps] = useState(() => 
        initialApps.map((app, index) => ({
            ...app,
            id: app.id || `app-${index}`,
            isOpen: false,
            zIndex: 0,
            position: { x: 0, y: index },
            size: app.defaultSize || { width: 400, height: 300 },
            isMinimized: false,
            isMaximized: false
        }))
    );

    // Keeps track of the highest z-index to manage window stacking order
    const [highestZIndex, setHighestZIndex] = useState(500);


    // Function to manage Z-index:
    const bringToFront = useCallback((identifier) => {
        setApps(prev => {
            const newZIndex = highestZIndex + 1;
            setHighestZIndex(newZIndex);
            
            return prev.map(app => 
                (app.id === identifier || app.instanceId === identifier)
                    ? { ...app, zIndex: newZIndex, isMinimized: false }
                    : app
            );
        });
    }, [highestZIndex]);

    // Function to open app
    const openApp = useCallback((appId, options = {}) => {
        const { createNewInstance = false, position, size, initialContent, fileIdentifier, startingPage } = options;
        
        setApps(prev => {
            const appIndex = prev.findIndex(a => a.id === appId);
            if (appIndex === -1) return prev;

            const app = prev[appIndex];
            
            // Check if we should create a new instance
            const shouldCreateNewInstance = createNewInstance && app.canHaveMultipleInstances;
            
            if (!shouldCreateNewInstance) {
                // If app is already open, just bring it to front
                if (app.isOpen) {
                    return prev.map(a => 
                        a.id === appId
                            ? { ...a, isOpen: true, zIndex: highestZIndex + 1, isMinimized: false, startingPage: startingPage || a.startingPage }
                            : a
                    );
                } else {
                    // Open the base app (not an instance)
                    return prev.map(a =>
                        a.id === appId
                            ? { ...a, isOpen: true, zIndex: highestZIndex + 1, isMinimized: false, 
                                initialContent: initialContent !== undefined ? initialContent : a.initialContent,
                                startingPage: startingPage || a.startingPage }
                            : a
                    );
                }
            } else {
                // Check if an instance with this file is already open
                if (fileIdentifier) {
                    const existingInstance = prev.find(a => a.fileIdentifier === fileIdentifier && a.id === appId);
                    if (existingInstance) {
                        // Bring existing instance to front instead of creating a new one
                        return prev.map(a =>
                            a.instanceId === existingInstance.instanceId
                                ? { ...a, isOpen: true, zIndex: highestZIndex + 1, isMinimized: false }
                                : a
                        );
                    }
                }

                // Create a new instance of the app
                const newInstance = {
                    ...app,
                    instanceId: `${app.id}-${Date.now()}-${Math.random()}`,
                    isOpen: true,
                    zIndex: highestZIndex + 1,
                    position: position || calculateCenteredPosition(),
                    size: size || app.defaultSize,
                    initialContent: initialContent !== undefined ? initialContent : (app.initialContent || ''),
                    fileIdentifier: fileIdentifier || undefined,
                    startingPage: startingPage || app.startingPage
                };

                setHighestZIndex(prev => prev + 1);
                
                // Insert the new instance after the base app
                return [
                    ...prev.slice(0, appIndex + 1),
                    newInstance,
                    ...prev.slice(appIndex + 1)
                ];
            }
        });
    }, [highestZIndex]);

    // Close app
    const closeApp = useCallback((identifier) => {
    setApps(prev => {
        const appToClose = prev.find(app => 
            app.instanceId === identifier || app.id === identifier
        );
        
        if (appToClose) {
            dispatchDesktopEvent(`${appToClose.id}Close`);
        }
        
        return prev.map(app => {
            // If it's an instance, mark for removal
            if (app.instanceId === identifier) {
                return null;
            }
            // If it's a base app being closed, just set isOpen to false
            if (app.id === identifier && !app.instanceId) {
                return { ...app, isOpen: false };
            }
            return app;
        }).filter(app => app !== null);
    });
}, []);

    // Minimize app
    const minimizeApp = useCallback((identifier) => {
        setApps(prev =>
            prev.map(app =>
                (app.id === identifier || app.instanceId === identifier)
                    ? { ...app, isMinimized: true }
                    : app
            )
        );
    }, []);

    // Maximize app
    const maximizeApp = useCallback((identifier) => {
        setApps(prev =>
            prev.map(app => {
                if (app.id === identifier || app.instanceId === identifier) {
                    return {
                        ...app,
                        isMaximized: !app.isMaximized,
                        previousSize: app.isMaximized ? app.previousSize : app.size,
                        previousPosition: app.isMaximized ? app.previousPosition : app.position,
                        size: app.isMaximized ? app.previousSize || app.size : { width: window.innerWidth - 40, height: window.innerHeight - 100 },
                        position: app.isMaximized ? app.previousPosition || app.position : { x: 20, y: 20 }
                    };
                }
                return app;
            })
        );
    }, []);

    // Get open windows
    const openWindows = useMemo(() => 
        apps.filter(app => app.isOpen)
    , [apps]);

    // Get windows by state
    const minimizedWindows = useMemo(() => 
        apps.filter(app => app.isMinimized)
    , [apps]);

    // Sort windows by z-index for rendering
    const sortedWindows = useMemo(() => 
        [...openWindows].sort((a, b) => a.zIndex - b.zIndex)
    , [openWindows]);

return {
        apps,
        openWindows,
        sortedWindows,
        minimizedWindows,
        bringToFront,
        openApp,
        closeApp,
        minimizeApp,
        maximizeApp,
        highestZIndex
    };
}


// Helper function to center window
function calculateCenteredPosition() {
    return {
        x: Math.max(0, (window.innerWidth - 400) / 2),
        y: Math.max(0, (window.innerHeight - 300) / 2)
    };
}