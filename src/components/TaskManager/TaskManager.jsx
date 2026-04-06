import { useEffect, useState, useRef, use } from "react";
import '../css/TaskManager.css';
import ContextMenuTaskManager from "./ContextMenuTaskManager.jsx";
import { dispatchDesktopEvent } from "../../utils/eventBus.js";
import {systemProcesses} from "../../data/systemProcesses.js";


function TaskManager({sortedWindows, closeApp}) {
    // UI STATE
    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scale, setScale] = useState(1);

    // SELECTION STATE
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectedContextItemId, setSelectedContextItemId] = useState('');

    // SYSTEM METRICS STATE
    const [cpuUsage, setCpuUsage] = useState([]);
    const [cpuTotal, setCpuTotal] = useState(0);

    const [memoryUsage, setMemoryUsage] = useState([]);
    const [memoryTotal, setMemoryTotal] = useState(0);

    const [diskUsage, setDiskUsage] = useState([]);
    const [diskTotal, setDiskTotal] = useState(0);

    const [networkUsage, setNetworkUsage] = useState([]);

    // REFS
    const taskManagerRef = useRef(null);

    // HANDLERS
    const handleSearch = (e) => setQuery(e.target.value);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    const handleRowClick = (itemId) => setSelectedItemId(itemId);

    const handleRowRightClick = (itemId) => setSelectedContextItemId(itemId);

    // UTILITIES
    const getRandomNumber = (min, max, decimalPlaces) => {
    return Number((Math.random() * (max - min) + min).toFixed(decimalPlaces));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCpuUsage(prevCpuUsage => {
                setCpuUsageTotal(0); // Reset total CPU usage

                return systemProcesses.map(proc => {
                    const nextVal = Number(getRandomNumber(proc.CpuMin, proc.CpuMax, 1));
                    setCpuUsageTotal(prev => prev + nextVal);
                    console.log('Next CPU Usage:', nextVal);
                    return nextVal;
                });
            })
            setMemoryUsage(prevMemoryUsage => {
                setMemoryUsageTotal(0); // Reset total Memory usage
                return systemProcesses.map(proc => {
                    const nextVal = Number(getRandomNumber(proc.MemMin, proc.MemMax, 0));
                    setMemoryUsageTotal(prev => prev + nextVal);
                    return nextVal;
                });
            })
            setDiskUsage(prevDiskUsage => {
                setDiskUsageTotal(0); // Reset total Disk usage
                return systemProcesses.map(proc => {
                    const nextVal = Number(getRandomNumber(proc.DiskMin, proc.DiskMax, 1));
                    setDiskUsageTotal(prev => prev + nextVal);
                    return nextVal;
                });
            })
            setNetworkUsage(prevNetworkUsage => {
                return systemProcesses.map(proc => {
                    const nextVal = Number(getRandomNumber(proc.NetMin, proc.NetMax, 2));
                    return nextVal;
                });
            });
    }, 2000);

        return () => clearInterval(interval);
    }, [systemProcesses]);    


   function endTask(selectItemId, type, closeApp) {
    if (!selectItemId) return;

    if (selectItemId.includes('sys')) {
        // system process
        setSystemProcesses(prev => prev.filter(p => p.id !== selectItemId));
        const systemAppName = systemProcesses.find(p => p.id === selectItemId)?.name;
        const systemAppEventName = `${systemAppName}${type}`;
        const systemAppNameDispatchName = systemAppEventName.replace(/\s/g, '');
        dispatchDesktopEvent(systemAppNameDispatchName);
    } else {
        // real app window
        if (closeApp) closeApp(selectItemId, type);
    }

    setSelectedItemId('');
}

    return <>
        <div className="taskManager">
            <div className="taskManager-content">
                <div className={`taskManager-sidebar ${!sidebarOpen ? 'd-none' : ''}`}>
                    <div className="taskManager-menu">
                        <div className="hamburger">☰</div>
                        <div className="active"><button>Processes</button></div>
                        <div className="inactive"><button>Performance</button></div>
                        <div className="inactive"><button>App History</button></div>
                        <div className="inactive"><button>Startup Apps</button></div>
                        <div className="inactive"><button>Users</button></div>
                        <div className="inactive"><button>Details</button></div>
                        <div className="inactive"><button>Services</button></div>
                    </div>
                </div>
                <div className="taskManager-body">
                    <div className="taskManager-header">
                        <button className="hamburger-menu" onClick={toggleSidebar}>☰</button>
                        <p>Processes</p>
                        <div className="taskManager-buttons">
                            <button className="taskManager-start-btn">Start New Task</button>
                            <button 
                            className="taskManager-end-btn"
                            onClick={() => {
                                endTask(selectItemId, 'CloseEndTaskButton', closeApp);
                            }}
                            >End Task</button>
                            <button className="taskManager-mode-btn">Efficiency Mode</button>
                        </div>
                    </div>
                    <table className="taskManager-main">
                        <thead>
                            <tr>
                                <th className="taskmanager-title">Name</th>
                                <th className="taskmanager-title">Status</th>
                                <th className="taskmanager-title">{CpuUsageTotal.toFixed(0)}% <br></br> CPU</th>
                                <th className="taskmanager-title">{(((memoryUsageTotal.toFixed(2)/1024)/8)*100).toFixed(0)}% <br></br> Memory</th>
                                <th className="taskmanager-title">{diskUsageTotal.toFixed(0)}% <br></br> Disk</th>
                                <th className="taskmanager-title">0% <br></br> Network</th>
                            </tr>
                        </thead>
                        <tbody ref={TaskManagerRef}>
                            {sortedWindows?.map((window, index) => (
                                <tr 
                                className="taskManager-row"
                                key={index}
                                onClick={() => handleRowClick(window.instanceId ||window.id)}
                                onContextMenu={() => handleRowRightClick(window.instanceId || window.id)} 
                                style={{
                                background: selectItemId === (window.instanceId ||window.id) ? '#00afec' : 'white',
                                color: selectItemId === (window.instanceId || window.id)? 'white' : 'black',
                                cursor: 'pointer' 
                                }}
                                >
                                    <td className="taskManager-processes-apps">{window.name}</td>
                                    <td className="taskManager-processes-status"></td>
                                    <td className="taskManager-processes-cpu">0%</td>
                                    <td className="taskManager-processes-memory">0mb</td>
                                    <td className="taskManager-processes-disk">0.1mb/s</td>
                                    <td className="taskManager-processes-network">0mbps</td>
                                    

                                </tr>
                                
                                
                            ))}
                            {systemProcesses.map((proc, index) => (
                            <tr
                                className="taskManager-row"
                                key={proc.id}
                                onClick={() => handleRowClick(proc.id)}
                                onContextMenu={() => handleRowRightClick(proc.id)}
                                style={{
                                    background: selectItemId || selectItemIdContextmenu === proc.id ? '#00afec' : 'white',
                                    color: selectItemId || selectItemIdContextmenu === proc.id ? 'white' : 'black',
                                    cursor: 'pointer'
                                }}
                            >
                                <td className="taskManager-processes-apps">{proc.name}</td>
                                <td className="taskManager-processes-status"></td>
                                <td className="taskManager-processes-cpu">{cpuUsage[index]}%</td>
                                <td className="taskManager-processes-memory">{memoryUsage[index]}mb</td>
                                <td className="taskManager-processes-disk">{diskUsage[index]}</td>
                                <td className="taskManager-processes-network">{networkUsage[index]}mbps</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <ContextMenuTaskManager
                        triggerRef={TaskManagerRef}
                        scale={scale}
                        selectItemIdContextmenu={selectItemIdContextmenu}
                        endTask={endTask}
                        closeApp={closeApp}
                        /> 
                        

                </div>
            </div>
        </div>
    </>;
    }

export default TaskManager;