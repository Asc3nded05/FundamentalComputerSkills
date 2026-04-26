import { useEffect, useState, useRef } from "react";
import '../../css/TaskManager.css';
import ContextMenuTaskManager from "./ContextMenuTaskManager.jsx";
import { dispatchDesktopEvent } from "../../utils/eventBus.js";
import systemProcessesData from "../../assets/systemProccesses.json";


function TaskManager({sortedWindows, closeApp}) {
    // UI STATE
    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scale, setScale] = useState(1);

    // SELECTION STATE
    const [selectedItemId, setSelectedItemId] = useState('');
    // const [selectedContextItemId, setSelectedContextItemId] = useState('');

    // SYSTEM METRICS STATE
    const [cpuTotal, setCpuTotal] = useState(0);

    const [memoryTotal, setMemoryTotal] = useState(0);

    const [diskTotal, setDiskTotal] = useState(0);

    const [networkTotal, setNetworkTotal] = useState(0);

    const [processMetrics, setProcessMetrics] = useState({});
    const [systemProcesses, setSystemProcesses] = useState(systemProcessesData.systemProcesses || []);

    // REFS
    const taskManagerRef = useRef(null);

    // HANDLERS
    const handleSearch = (e) => setQuery(e.target.value);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    const handleRowClick = (itemId) => setSelectedItemId(itemId);

    const handleRowRightClick = (itemId) => setSelectedItemId(itemId);

    const isRowSelected = (itemId) => {
        return selectedItemId === itemId;
    };

    // UTILITIES
    const getRandomNumber = (min, max, decimalPlaces) => {
    return Number((Math.random() * (max - min) + min).toFixed(decimalPlaces));
    };

    // Get all available items (windows + system processes)
    const getAllItems = () => {
        const windows = sortedWindows?.map(w => ({ id: w.instanceId || w.id, type: 'window' })) || [];
        const processes = systemProcesses.map(p => ({ id: p.id, type: 'process' }));
        return [...windows, ...processes];
    };

    const getAllItemProcesses = () => {
        const windows = sortedWindows?.map(w => ({ id: w.instanceId || w.id, cpuMin: w.cpuMin, cpuMax: w.cpuMax, memMin: w.memMin, memMax: w.memMax, diskMin: w.diskMin, diskMax: w.diskMax, netMin: w.netMin, netMax: w.netMax })) || [];
        const processes = systemProcesses.map(p => ({ id: p.id, cpuMin: p.cpuMin, cpuMax: p.cpuMax, memMin: p.memMin, memMax: p.memMax, diskMin: p.diskMin, diskMax: p.diskMax, netMin: p.netMin, netMax: p.netMax }));
        return [...windows, ...processes];
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

            const allItems = getAllItems();
            if (allItems.length === 0) return;

            const currentIndex = allItems.findIndex(item => item.id === selectedItemId);
            let nextIndex;

            if (event.key === 'ArrowDown') {
                if (currentIndex === -1) {
                    nextIndex = 0;
                } else if (currentIndex < allItems.length - 1) {
                    nextIndex = currentIndex + 1;
                } else {
                    return;
                }
            } else if (event.key === 'ArrowUp') {
                if (currentIndex === -1) {
                    nextIndex = allItems.length - 1;
                } else if (currentIndex > 0) {
                    nextIndex = currentIndex - 1;
                } else {
                    return;
                }
            }

            handleRowClick(allItems[nextIndex].id);
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedItemId, sortedWindows, systemProcesses]);

    // Scroll selected row into view
    useEffect(() => {
        if (!selectedItemId || !taskManagerRef.current) return;

        const container = taskManagerRef.current;
        const selectedRow = container.querySelector(`tr[data-item-id="${selectedItemId}"]`);

        if (selectedRow) {
            const containerRect = container.getBoundingClientRect();
            const rowRect = selectedRow.getBoundingClientRect();

            const rowBelow = rowRect.bottom > containerRect.bottom;

            if (rowBelow) {
                selectedRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } 
        }
    }, [selectedItemId]);


    useEffect(() => {
        const allItemProcesses = getAllItemProcesses();
        console.log("All item processes in Task Manager:", allItemProcesses);
        const interval = setInterval(() => {
            setCpuTotal(0);
            setCpuUsage(systemProcesses.map(proc => {
                const nextVal = Number(getRandomNumber(proc.cpuMin, proc.cpuMax, 1));
                setCpuTotal(prev => prev + nextVal);
                return nextVal;
            }));
            setMemoryTotal(0);
            setMemoryUsage(systemProcesses.map(proc => {
                const nextVal = Number(getRandomNumber(proc.memMin, proc.memMax, 0));
                setMemoryTotal(prev => prev + nextVal);
                return nextVal;
            }));
            setDiskTotal(0);
            setDiskUsage(systemProcesses.map(proc => {
                const nextVal = Number(getRandomNumber(proc.diskMin, proc.diskMax, 1));
                setDiskTotal(prev => prev + nextVal);
                return nextVal;
            }));
            setNetworkUsage(systemProcesses.map(proc => {
                const nextVal = Number(getRandomNumber(proc.netMin, proc.netMax, 2));
                return nextVal;
            }));
    }, 2000);

        return () => clearInterval(interval);
    }, [systemProcesses, sortedWindows]);    


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
                                endTask(selectedItemId, 'CloseEndTaskButton', closeApp);
                            }}
                            >End Task</button>
                            <button className="taskManager-mode-btn">Efficiency Mode</button>
                        </div>
                    </div>
                    <div className="taskManager-table-wrapper" ref={taskManagerRef}>
                        <table className="taskManager-main">
                            <thead>
                                <tr>
                                    <th className="taskmanager-title">Name</th>
                                    <th className="taskmanager-title">Status</th>
                                    <th className="taskmanager-title">{cpuTotal.toFixed(0)}% <br></br> CPU</th>
                                    <th className="taskmanager-title">{(((memoryTotal.toFixed(2)/1024)/8)*100).toFixed(0)}% <br></br> Memory</th>
                                    <th className="taskmanager-title">{diskTotal.toFixed(0)}% <br></br> Disk</th>
                                    <th className="taskmanager-title">0% <br></br> Network</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allItems.map((item) => {
                                    const rowId = item.id;
                                    const metrics = processMetrics[rowId] || { cpu: 0, memory: 0, disk: 0, network: 0 };

                                    return (
                                        <tr
                                            className={`taskManager-row ${isRowSelected(rowId) ? 'selected' : ''}`}
                                            key={rowId}
                                            data-item-id={rowId}
                                            onClick={() => handleRowClick(rowId)}
                                            onContextMenu={() => handleRowRightClick(rowId)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td className="taskManager-processes-apps">{item.name}</td>
                                            <td className="taskManager-processes-status"></td>
                                            <td className="taskManager-processes-cpu">{metrics.cpu}%</td>
                                            <td className="taskManager-processes-memory">{metrics.memory}mb</td>
                                            <td className="taskManager-processes-disk">{metrics.disk}mb/s</td>
                                            <td className="taskManager-processes-network">{metrics.network}mbps</td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                    </table>
                    </div>
                    <ContextMenuTaskManager
                        triggerRef={taskManagerRef}
                        scale={scale}
                        selectItemId={selectedItemId}
                        endTask={endTask}
                        closeApp={closeApp}
                        /> 
                        

                </div>
            </div>
        </div>
    </>;
}

export default TaskManager;