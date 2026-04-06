import { useEffect, useState, useRef, use } from "react";
import '../css/TaskManager.css';
import ContextMenuTaskManager from "./ContextMenuTaskbar.jsx";
import { dispatchDesktopEvent } from "../utils/eventBus";


function TaskManager({sortedWindows, closeApp}) {
    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectItemId, setSelectedItemId] = useState('')
    const [selectItemIdContextmenu, setSelectedItemIdContextMenu] = useState('')

    const handleSearch = (e) => setQuery(e.target.value);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [scale, setScale] = useState(1);
    const TaskManagerRef = useRef(null);
    

    const handleRowClick = (itemId) => {
        setSelectedItemId(itemId)
    };
    const handleRowRightClick = (itemId) => setSelectedItemIdContextMenu(itemId);

    

    const [systemProcesses, setSystemProcesses] = useState([
        {
            id: 'sys-1',
            name: 'System',
            CpuMin: 0.0, CpuMax: 0.3,
            MemMin: 50, MemMax: 150,
            DiskMin: 0.0, DiskMax: 0.3,
            NetMin: 0.0, NetMax: 0.1,
        },
        {
            id: 'sys-2',
            name: 'Registry',
            CpuMin: 0.0, CpuMax: 0.1,
            MemMin: 20, MemMax: 60,
            DiskMin: 0.0, DiskMax: 0.1,
            NetMin: 0.0, NetMax: 0.01,
        },
        {
            id: 'sys-3',
            name: 'Desktop Window Manager',
            CpuMin: 0.1, CpuMax: 0.7,
            MemMin: 80, MemMax: 200,
            DiskMin: 0.0, DiskMax: 0.2,
            NetMin: 0.0, NetMax: 0.05,
        },
        {
            id: 'sys-4',
            name: 'Windows Logon Application',
            CpuMin: 0.0, CpuMax: 0.02,
            MemMin: 5, MemMax: 15,
            DiskMin: 0.0, DiskMax: 0.01,
            NetMin: 0.0, NetMax: 0.0,
        },
        {
            id: 'sys-5',
            name: 'Local Security Authority Process',
            CpuMin: 0.0, CpuMax: 0.1,
            MemMin: 10, MemMax: 40,
            DiskMin: 0.0, DiskMax: 0.1,
            NetMin: 0.0, NetMax: 0.02,
        },
        {
            id: 'sys-6',
            name: 'Service Host: Local System',
            CpuMin: 0.0, CpuMax: 0.3,
            MemMin: 50, MemMax: 150,
            DiskMin: 0.0, DiskMax: 0.5,
            NetMin: 0.0, NetMax: 0.3,
        },
        {
            id: 'sys-7',
            name: 'Service Host: Network Service',
            CpuMin: 0.0, CpuMax: 0.2,
            MemMin: 20, MemMax: 80,
            DiskMin: 0.0, DiskMax: 0.2,
            NetMin: 0.0, NetMax: 0.5,
        },
        {
            id: 'sys-8',
            name: 'Service Host: Local Service',
            CpuMin: 0.0, CpuMax: 0.1,
            MemMin: 20, MemMax: 60,
            DiskMin: 0.0, DiskMax: 0.1,
            NetMin: 0.0, NetMax: 0.05,
        },
        {
            id: 'sys-9',
            name: 'Runtime Broker',
            CpuMin: 0.0, CpuMax: 0.2,
            MemMin: 10, MemMax: 50,
            DiskMin: 0.0, DiskMax: 0.2,
            NetMin: 0.0, NetMax: 0.2,
        },
        {
            id: 'sys-10',
            name: 'CTF Loader',
            CpuMin: 0.0, CpuMax: 0.1,
            MemMin: 5, MemMax: 25,
            DiskMin: 0.0, DiskMax: 0.1,
            NetMin: 0.0, NetMax: 0.02,
        },
        {
            id: 'sys-11',
            name: 'Shell Infrastructure Host',
            CpuMin: 0.0, CpuMax: 0.2,
            MemMin: 30, MemMax: 100,
            DiskMin: 0.0, DiskMax: 0.2,
            NetMin: 0.0, NetMax: 0.05,
        },
        {
            id: 'sys-12',
            name: 'COM Surrogate',
            CpuMin: 0.0, CpuMax: 0.1,
            MemMin: 5, MemMax: 40,
            DiskMin: 0.0, DiskMax: 0.3,
            NetMin: 0.0, NetMax: 0.1,
        },
        {
            id: 'sys-13',
            name: 'Windows Session Manager',
            CpuMin: 0.0, CpuMax: 0.05,
            MemMin: 5, MemMax: 20,
            DiskMin: 0.0, DiskMax: 0.05,
            NetMin: 0.0, NetMax: 0.0,
        },
        {
            id: 'sys-14',
            name: 'Client Server Runtime Process',
            CpuMin: 0.0, CpuMax: 0.1,
            MemMin: 10, MemMax: 40,
            DiskMin: 0.0, DiskMax: 0.1,
            NetMin: 0.0, NetMax: 0.05,
        }
        ]);
    const [cpuUsage, setCpuUsage] = useState([]);
    const [CpuUsageTotal, setCpuUsageTotal] = useState(0);
    const [memoryUsage, setMemoryUsage] = useState([]);
    const [memoryUsageTotal, setMemoryUsageTotal] = useState(0);
    const [diskUsage, setDiskUsage] = useState([]);
    const [diskUsageTotal, setDiskUsageTotal] = useState(0);
    const [networkUsage, setNetworkUsage] = useState([]);
    const [networkUsageTotal, setNetworkUsageTotal] = useState(0);
    const getRandomNumber = (min, max, decimalPlaces) => {
        return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
    }

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
                setNetworkUsageTotal(0); // Reset total Network usage
                return systemProcesses.map(proc => {
                    const nextVal = Number(getRandomNumber(proc.NetMin, proc.NetMax, 2));
                    setNetworkUsageTotal(prev => prev + nextVal);
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