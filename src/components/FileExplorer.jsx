import React, { useState } from 'react';
import FileIndex from './FileIndex';


function FileExplorer() {
   const [isOpen, setIsOpen] = useState(false);


   const toggleDropdown = () => {
       setIsOpen(!isOpen);
   };


 return <>
           <div className="file-explorer-bottom-header">
               <div className="file-explorer-dropdown">
               <button onClick={toggleDropdown} className="file-explorer-add-dropdown-button">+ New</button>
               {isOpen && (
                   <div className="file-explorer-add-dropdown-content">
                       <button className="file-explorer-add-folder">Folder</button>
                       <hr></hr>
                       <button className="file-explorer-add-txt">Text Document</button>
                   </div>
               )}
               </div>
           </div>


           <div className="file-explorer-top-nav">
               <button className="arrows"> &larr; </button>
               <button className="arrows"> &rarr; </button>
               <button className="arrows"> &darr; </button>
               <button className="arrows"> &uarr;</button>
               <input type="text" placeholder="Find..." />
               <input type="text" placeholder="Search..." />
           </div>


           <div className="file-explorer-body">
               <FileIndex />
           </div>


           <footer className="file-explorer-bottom-footer">
               <button className='list-view-btn'>List</button>
               <button className='grid-view-btn'>Grid</button>
           </footer>
 </>
}


export default FileExplorer;