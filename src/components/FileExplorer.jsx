import Files from '../pages/Files.jsx';
import '../css/FileExplorer.css';


function FileExplorer() {
    
    return <>
        {/* <div className={showUnresponsive ? "file-explorer-unresponsive" : "file-explorer"}> */}
            <Files className="file-explorer"/>
            {/* {showUnresponsive && <Unresponsive />} */}
        {/* </div> */}
    </>
}


export default FileExplorer;