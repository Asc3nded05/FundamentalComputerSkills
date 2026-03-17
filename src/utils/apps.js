import { compact } from 'react-grid-layout/build/utils';
import desktopIcon from '../assets/DesktopIconPlaceholder.png';

/**
 * Shared app registry: metadata for all apps in the system
 * Each app object contains: id, name, icon, content component name, default size,
 * whether it can have multiple instances open, and for Notepad, the starting text content.
 * 
 * Now that the desktop is dynamic, just edit this to change all the apps that are displayed.
 */
export const APP_REGISTRY = [
    {
        id: 'FileExplorer',
        name: 'File Explorer',
        icon: desktopIcon,
        component: 'FileExplorer',
        defaultSize: { width: 800, height: 600 },
        canHaveMultipleInstances: true,
    },
    {
        id: 'Notepad',
        name: 'Notepad',
        icon: desktopIcon,
        component: 'Notepad',
        defaultSize: { width: 500, height: 400 },
        canHaveMultipleInstances: true,
        initialContent: ''
    },
    {
        id: 'Settings',
        name: 'Settings',
        icon: desktopIcon,
        component: 'Settings',
        defaultSize: { width: 800, height: 600 },
        canHaveMultipleInstances: false
    },
    {
        id: 'FrameApp',
        name: 'Frame App',
        icon: desktopIcon,
        component: 'FrameApp',
        defaultSize: { width: 200, height: 200 },
        canHaveMultipleInstances: false
    },
    // {
    //     id: 'MY_FILE',
    //     name: 'MY_FILE.txt',
    //     icon: desktopIcon,
    //     component: 'Notepad',
    //     defaultSize: { width: 500, height: 400 },
    //     canHaveMultipleInstances: true,
    //     initialContent: 'THIS IS A TXT FILE'
    // },
];
