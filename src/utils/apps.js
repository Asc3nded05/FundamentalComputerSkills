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
        defaultSize: { width: 850, height: 520 },
        canHaveMultipleInstances: false,
    },
    {
        id: 'Notepad',
        name: 'Notepad',
        icon: notepadIcon,
        component: 'Notepad',
        defaultSize: { width: 440, height: 470 },
        canHaveMultipleInstances: false,
        initialContent: 'This is a notepad app. It has text in it. The text can be very repetitive. This is a notepad app where text is written. The text here is written inside of a notepad app. Text is a series of characters like a b c d e and so on. This sort of text is in this notepad app. Hello, my name is Larry, I am trapped in a notepad app! No one knows why... After all, this is a text editor app, so it only makes sense that there is text in it. This is a notepad app. It has text in it. The text can be very redundant. But it is not an exact copy. This is a notepad app where text is written. You can change the text. The text here is written inside of a notepad app, and thats how notepad apps work. This sort of text is in this notepad app. After all, this is a text editor app, so it only makes sense that there is text in it.'
    },
    {
        id: 'Settings',
        name: 'Settings',
        icon: settingsIcon,
        component: 'Settings',
        defaultSize: { width: 900, height: 575 },
        canHaveMultipleInstances: false,
        startingPage: 'home' // default page to open to (can be overridden when opening app)
    },
    {
        id: 'TaskManager',
        name: 'Task Manager',
        icon: taskManagerIcon,
        component: 'TaskManager',
        defaultSize: { width: 775, height: 430 },
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
