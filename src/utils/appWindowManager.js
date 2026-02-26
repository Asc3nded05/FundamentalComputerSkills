import { useState, useCallback, useMemo } from 'react';
import { APP_REGISTRY } from '../utils/apps';

// note: used AI to move code from desktop into its own component

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
    // const openApp = useCallback((appId, options = {}) => {
    //     const { createNewInstance = false, position, size, initialContent } = options;
        
    //     setApps(prev => {
    //         const appIndex = prev.findIndex(a => a.id === appId);
    //         if (appIndex === -1) return prev;

    //         const app = prev[appIndex];
            
    //         if (createNewInstance && app.canHaveMultipleInstances) {
    //             // Create a new instance of the app with a unique instanceId if the app allows multiple instances
    //             const newInstance = {
    //                 ...app,
    //                 instanceId: `${app.id}-${Date.now()}`,
    //                 isOpen: true,
    //                 zIndex: highestZIndex + 1,
    //                 position: position || calculateCenteredPosition(),
    //                 size: size || app.defaultSize,
    //                 initialContent: initialContent !== undefined ? initialContent : (app.initialContent || '')
    //             };
                
    //             setHighestZIndex(prev => prev + 1);
                
    //             console.log("Current apps:", apps);
    //             return [
    //                 ...prev.slice(0, appIndex + 1),
    //                 newInstance,
    //                 ...prev.slice(appIndex + 1)
    //             ];
    //         } else {
    //             const newInstance = {
    //             ...app,
    //             instanceId: `${app.id}-${Date.now()}-${Math.random()}`,
    //             isOpen: true,
    //             zIndex: highestZIndex + 1,
    //             position: position || calculateCenteredPosition(),
    //             size: size || app.defaultSize,
    //             initialContent: initialContent !== undefined ? initialContent : (app.initialContent || ''),
    //             };
                
    //             setHighestZIndex(prev => prev + 1);

                
    //             console.log("Current apps:", apps);
    //             return newInstance;
    //         }
    //     });
    // }, [highestZIndex]);

    const openApp = useCallback((appId, options = {}) => {
        const { createNewInstance = false, position, size, initialContent } = options;
        
        setApps(prev => {
            const appIndex = prev.findIndex(a => a.id === appId);
            if (appIndex === -1) return prev;

            const app = prev[appIndex];
            
            // Always create a new instance (since base apps stay as templates)
            const newInstance = {
                ...app,
                instanceId: `${app.id}-${Date.now()}-${Math.random()}`,
                isOpen: true,
                zIndex: highestZIndex + 1,
                position: position || calculateCenteredPosition(),
                size: size || app.defaultSize,
                initialContent: initialContent !== undefined ? initialContent : (app.initialContent || '')
            };
            
            setHighestZIndex(prev => prev + 1);
            
            // Insert the new instance after the base app
            return [
                ...prev.slice(0, appIndex + 1),
                newInstance,
                ...prev.slice(appIndex + 1)
            ];
        });
    }, [highestZIndex]);

    // Close app
    const closeApp = useCallback((identifier) => {
        setApps(prev => prev.filter(app => app.instanceId !== identifier));
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