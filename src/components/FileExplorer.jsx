import React, { useState } from 'react';
import Files from '../pages/Files.jsx';
import '../css/FileExplorer.css';

function FileExplorer() {
 return <>
    <div className="file-explorer">
        <Files/>
    </div>
 </>
}


export default FileExplorer;