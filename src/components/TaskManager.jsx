import { useState } from "react";
import '../css/TaskManager.css';
import { MdOpacity } from "react-icons/md";
import { useOpenWindows } from "../utils/appWindowManager.js";
 

function TaskManager(sortedWindow) {


    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Update state on input change
    const handleSearch = (e) => setQuery(e.target.value);

    // Toggle sidebar visibility
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    console.log(sortedWindow);

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
                        {/*<input className="taskManagerSearch" type="text" placeholder="Find a task..." value={query} onChange={handleSearch} /> */}
                        <div className="taskManager-buttons">
                            <button className="taskManager-start-btn">Start New Task</button>
                            |
                            <button className="taskManager-end-btn">End Task</button>
                            <button className="taskManager-mode-btn">Efficiency Mode</button>
                        </div>
                    </div>
                    <div className="taskManager-main">
                        <div className="taskManager-processes-apps">
                            <div className="taskmanager-title">Name</div>
                            {sortedWindow.map(window, index)}{
                                {window}
                            }
                            {/* <div>File Explorer</div>
                            <div>Task Manager</div>
                            <div>Settings</div>
                            <div>Notepad</div>
                            <div>Frame App</div> */}
                        </div>
                        <div className="taskManager-processes-status">
                            <div className="taskmanager-title">Status</div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div>Eco</div>
                            <div>Eco</div>
                        </div>
                        <div className="taskManager-processes-cpu">
                            <div className="taskmanager-title">CPU</div>
                            <div>0%</div>
                            <div>0%</div>
                            <div>0%</div>
                            <div>0%</div>
                            <div>0%</div>
                        </div>
                        <div className="taskManager-processes-memory">
                            <div className="taskmanager-title">Memory</div>
                            <div>207mb</div>
                            <div>97mb</div>
                            <div>163mb</div>
                            <div>88mb</div>
                            <div>100mb</div>
                        </div>
                        <div className="taskManager-processes-disk">
                            <div className="taskmanager-title">Disk</div>
                            <div>0.1mb/s</div>
                            <div>0.1mb/s</div>
                            <div>0.1mb/s</div>
                            <div>0.1mb/s</div>
                            <div>0.1mb/s</div>
                        </div>
                        <div className="taskManager-processes-network">
                            <div className="taskmanager-title">Network</div>
                            <div>0mbps</div>
                            <div>0mbps</div>
                            <div>0mbps</div>
                            <div>0mbps</div>
                            <div>0mbps</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>;
}
export default TaskManager;