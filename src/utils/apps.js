import fileExplorerIcon from '../assets/Icons/File Explorer.png';
import notepadIcon from '../assets/Icons/Notepad.png';
import settingsIcon from '../assets/Icons/Settings.png';
import taskManagerIcon from '../assets/Icons/Task Manager.png';

/**
 * Shared app registry: metadata for all apps in the system
 * Each app object contains: id, name, icon, content component name, default size,
 * whether it can have multiple instances open, and for Notepad, the starting text content.
 */
export const APP_REGISTRY = [
    {
        id: 'FileExplorer',
        name: 'File Explorer',
        icon: fileExplorerIcon,
        component: 'FileExplorer',
        defaultSize: { width: 800, height: 600 },
        canHaveMultipleInstances: false,
    },
    {
        id: 'Notepad',
        name: 'Notepad',
        icon: notepadIcon,
        component: 'Notepad',
        defaultSize: { width: 500, height: 400 },
        canHaveMultipleInstances: false,
        initialContent: ''
    },
    {
        id: 'Settings',
        name: 'Settings',
        icon: settingsIcon,
        component: 'Settings',
        defaultSize: { width: 800, height: 600 },
        canHaveMultipleInstances: false,
        startingPage: 'home' // default page to open to (can be overridden when opening app)
    },
    {
        id: 'TaskManager',
        name: 'Task Manager',
        icon: taskManagerIcon,
        component: 'TaskManager',
        defaultSize: { width: 800, height: 600 },
        canHaveMultipleInstances: false
    }
    // {
    //     id: 'FrameApp',
    //     name: 'Frame App',
    //     icon: desktopIcon,
    //     component: 'FrameApp',
    //     defaultSize: { width: 200, height: 200 },
    //     canHaveMultipleInstances: false
    // },
];
