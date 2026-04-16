import React, { useContext } from 'react';
import Files from '../pages/Files.jsx';
import '../css/FileExplorer.css';
import Unresponsive from './Unresponsive.jsx';
import { UnresponsiveContext } from './UnresponsiveContext.jsx';

function FileExplorer() {
    const { showUnresponsive, setShowUnresponsive } = useContext(UnresponsiveContext);
    
    return <>
        <div className={showUnresponsive ? "file-explorer-unresponsive" : "file-explorer"}>
            <Files/>
            <button onClick={() => setShowUnresponsive(true)}>Simulate Unresponsive</button>
            {showUnresponsive && <Unresponsive />}
        </div>
    </>
}


export default FileExplorer;