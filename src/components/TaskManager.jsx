import { useEffect, useState, useRef } from "react";
import '../css/TaskManager.css';
import ContextMenuTaskManager from "./ContextMenuTaskbar.jsx";


function TaskManager({sortedWindows, closeApp}) {
    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectItemId, setSelectedItemId] = useState('')
    const [selectItemIdContextmenu, setSelectedItemIdContextMenu] = useState('')


    const handleSearch = (e) => setQuery(e.target.value);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [scale, setScale] = useState(1);
    const TaskManagerRef = useRef(null);
    

    const handleRowClick = (itemId) => setSelectedItemId(itemId);
    const handleRowRightClick = (itemId) => setSelectedItemIdContextMenu(itemId);

   const [systemProcesses, setSystemProcesses] = useState([
    { id: 'sys-1', name: 'System' },
    { id: 'sys-2', name: 'Registry' },
    { id: 'sys-3', name: 'Desktop Window Manager' },
    { id: 'sys-4', name: 'Windows Logon Application' },
    { id: 'sys-5', name: 'Local Security Authority Process' },
    { id: 'sys-6', name: 'Service Host: Local System' },
    { id: 'sys-7', name: 'Service Host: Network Service' },
    { id: 'sys-8', name: 'Service Host: Local Service' },
    { id: 'sys-9', name: 'Runtime Broker' },
    { id: 'sys-10', name: 'CTF Loader' },
    { id: 'sys-11', name: 'Shell Infrastructure Host' },
    { id: 'sys-12', name: 'COM Surrogate' },
    { id: 'sys-13', name: 'Windows Session Manager' },
    { id: 'sys-14', name: 'Client Server Runtime Process' },
]);
    
   function endTask(selectItemId) {
    console.log(selectItemId);
    if (!selectItemId) return;

    if (selectItemId.includes('sys')) {
        // system process
        setSystemProcesses(prev => prev.filter(p => p.id !== selectItemId));
        console.log(systemProcesses);
    } else {
        // real app window
        if (closeApp) closeApp(selectItemId);
    }

    setSelectedItemId('');
}

    return <>
        <div className="taskManager">
            <div className="taskManager-content">
                <div className={`taskManager-sidebar ${!sidebarOpen ? 'd-none' : ''}`}>
                    <div className="taskManager-menu">
                        <div className="hamburger">☰</div>
                        <div className="active">Processes</div>
                        <div className="inactive">Performance</div>
                        <div className="inactive">App History</div>
                        <div className="inactive">Startup Apps</div>
                        <div className="inactive">Users</div>
                        <div className="inactive">Details</div>
                        <div className="inactive">Services</div>
                    </div>
                </div>
                <div className="taskManager-body">
                    <div className="taskManager-header">
                        <button className="hamburger-menu" onClick={toggleSidebar}>☰</button>
                        <p>Processes</p>
                        {/* <input className="taskManagerSearch" type="text" placeholder="Find a task..." value={query} onChange={handleSearch} /> */}
                        <div className="taskManager-buttons">
                            <button className="taskManager-start-btn">Start New Task</button>
                            <button 
                            className="taskManager-end-btn"
                            onClick={() => endTask(selectItemId)}
                            >End Task</button>
                            <button className="taskManager-mode-btn">Efficiency Mode</button>
                        </div>
                    </div>
                    <table className="taskManager-main">
                        <thead>
                            <tr>
                                <th className="taskmanager-title">Name</th>
                                <th className="taskmanager-title">Status</th>
                                <th className="taskmanager-title">CPU</th>
                                <th className="taskmanager-title">Memory</th>
                                <th className="taskmanager-title">Disk</th>
                                <th className="taskmanager-title">Network</th>
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
                            {systemProcesses.map((proc) => (
                            <tr
                                className="taskManager-row"
                                key={proc.id}
                                onClick={() => handleRowClick(proc.id)}
                                onContextMenu={() => handleRowRightClick(proc.id)}
                                style={{
                                    background: selectItemId === proc.id ? '#00afec' : 'white',
                                    color: selectItemId === proc.id ? 'white' : 'black',
                                    cursor: 'pointer'
                                }}
                            >
                                <td className="taskManager-processes-apps">{proc.name}</td>
                                <td className="taskManager-processes-status"></td>
                                <td className="taskManager-processes-cpu">0%</td>
                                <td className="taskManager-processes-memory">0mb</td>
                                <td className="taskManager-processes-disk">0.1mb/s</td>
                                <td className="taskManager-processes-network">0mbps</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <ContextMenuTaskManager
                        triggerRef={TaskManagerRef}
                        scale={scale}
                        selectItemId={selectItemIdContextmenu}
                        endTask={endTask}/> 

                </div>
            </div>
        </div>
    </>;
}

export default TaskManager;