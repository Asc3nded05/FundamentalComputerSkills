import React, { useState } from 'react';
import { FaChevronRight, FaFolder, FaFile } from "react-icons/fa";

import FileIndex from './FileIndex';


function FileExplorer() {
   const [isOpen, setIsOpen] = useState(false);


   const toggleDropdown = () => {
       setIsOpen(!isOpen);
   };

   let folders = [
    {name: 'This PC',
        folders: [
            {name: 'Desktop', folders:[
                {name: 'Notepad'},
                {name: 'App'}
            ]},
            {name: 'Documents', folders:[
                {name: 'Folder', folders:[
                    {name: 'Super Secret Document', content: "This is a super secret document. Don't tell anyone about it!"},
                ]},
                {name: 'Boring Document', content: "This is a boring document. It has no interesting content."},
                {name: 'Example Text File', content: "This is an example text file. It has some example text in it."}
            ]},
            {name: 'Downloads', folders:[
                {name: 'Downloaded item', content: "This is a downloaded item. It was downloaded from the internet."},
                {name: 'Downloaded item', content: "This is another downloaded item. It was downloaded from the internet."},
                {name: 'Downloaded image', content: "This isn't actually an image, it's just a text file pretending to be an image."}
            ]},
            {name: 'Music', folders:[
                {name: 'BirdsChirping.mp3', content: "This isn't actually an audio file, it's just a text file pretending to be an audio file."}
            ]},
            {name: 'Pictures',
                folders: [
                    {name: 'Cat Pics', folders: [
                        {name: 'CuteCat.jpg', content: "This isn't actually an image, it's just a text file pretending to be an image."},
                        {name: 'SuperCuteCat.jpg', content: "This isn't actually an image, it's just a text file pretending to be an image."},
                        {name: 'CrazyCuteCat.jpg', content: "This isn't actually an image, it's just a text file pretending to be an image."},
                        {name: 'FluffyCuteCat.jpg', content: "This isn't actually an image, it's just a text file pretending to be an image."},
                        {name: 'CuteKitten.jpg', content: "This isn't actually an image, it's just a text file pretending to be an image."},
                        {name: 'CuteCats.jpg', content: "This isn't actually an image, it's just a text file pretending to be an image."},             
                    ]},
                    {name: 'Photo.jpg', content: "This isn't actually an image, it's just a text file pretending to be an image."}
                ]
            },
            {name: 'Videos', folders:[
                {name: 'RickRoll.mp4', content: "Guess what."}
            ]}
        ]
    },
    {name: 'Networks', folders:[
        {name: 'Network Stuff'}
    ]}
];




const [activeView, setActiveView] = useState('pc-view');

const renderView = () => {
    switch (activeView) {
        case 'pc-view': return <div className='grid-view'>
            <p><button onClick={() => setActiveView('desktop-view')}>Desktop</button></p>
            <p><button onClick={() => setActiveView('downloads-view')}>Downloads</button></p>
            <p><button onClick={() => setActiveView('documents-view')}>Documents</button></p>
            <p><button onClick={() => setActiveView('pictures-view')}>Pictures</button></p>
            <p><button onClick={() => setActiveView('music-view')}>Music</button></p>
            <p><button onClick={() => setActiveView('videos-view')}>Videos</button></p>
        </div>;
        case 'desktop-view': return <div className='grid-view'>
            <p>Notepad</p>
            <p>App</p>
        </div>;
        case 'Desktop': return <div className='grid-view'>
            <p>Notepad</p>
            <p>Desktop App</p>
        </div>;
        case 'downloads-view': return <div className='list-view'>
            <p>Downloaded item</p>
            <p>Downloaded item</p>
            <p>Downloaded image</p>
        </div>;
        case 'documents-view': return <div className='list-view'>
            <details>
                <summary>Folder</summary>
                <p>Super Secret Document</p>
            </details>
            <p>Boring Document</p>
            <p>Example Text File</p>
        </div>;
        case 'newfolder-documents-view': return <div className='list-view'>
            <details>
                <summary>Folder</summary>
                <p>Super Secret Document</p>
            </details>
            <p>Boring Document</p>
            <p>Example Text File</p>
            <details>
                <summary>New Folder</summary>
            </details>
        </div>;
         case 'newfile-documents-view': return <div className='list-view'>
            <details>
                <summary>Folder</summary>
                <p>Super Secret Document</p>
            </details>
            <p>Boring Document</p>
            <p>Example Text File</p>
            <details>
                <summary>New Folder</summary>
                <p>New Document</p>
            </details>
        </div>;
        case 'pictures-view': return <div className='grid-view'>
            <p>Cat pic</p>
        </div>;
        case 'music-view': return <div className='grid-view'>
            <p>BirdsChirping.mp3</p>
        </div>;
        case 'videos-view': return <div className='grid-view'>
            <p>RickRoll.mp4</p>
        </div>;
        case 'networks-view': return <div className='list-view'>
            <p>Network Stuff</p>
        </div>;
        default: return <div>Default View</div>;
    }
};

 return <>
           <div className="file-explorer-bottom-header">
               <div className="file-explorer-dropdown">
               <button onClick={toggleDropdown} className="file-explorer-add-dropdown-button">+ New</button>
               {isOpen && (
                   <div className="file-explorer-add-dropdown-content">
                       <button onClick={() => setActiveView('newfolder-documents-view')} className="file-explorer-add-folder">Folder</button>
                       <hr></hr>
                       <button onClick={() => setActiveView('newfile-documents-view')} className="file-explorer-add-txt">Text Document</button>
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
               <div className="file-index">
                      <div className="file-explorer-side-nav">
                          <div className='quick-access'> Quick Access
                            <p><button onClick={() => setActiveView('desktop-view')}><FaFolder style={{fontSize: '20px', paddingRight: '4px', paddingLeft: '0px'}}/>Desktop</button></p>
                            <p><button onClick={() => setActiveView('downloads-view')}><FaFolder style={{fontSize: '20px', paddingRight: '4px', paddingLeft: '0px'}}/>Downloads</button></p>
                            <p><button onClick={() => setActiveView('documents-view')}><FaFolder style={{fontSize: '20px', paddingRight: '4px', paddingLeft: '0px'}}/>Documents</button></p>
                            <p><button onClick={() => setActiveView('music-view')}><FaFolder style={{fontSize: '20px', paddingRight: '4px', paddingLeft: '0px'}}/>Music</button></p>
                            <p><button onClick={() => setActiveView('pictures-view')}><FaFolder style={{fontSize: '20px', paddingRight: '4px', paddingLeft: '0px'}}/>Pictures</button></p>
                            <p><button onClick={() => setActiveView('videos-view')}><FaFolder style={{fontSize: '20px', paddingRight: '4px', paddingLeft: '0px'}}/>Video</button></p>
                          </div>
                          <ul>
                              {folders.map((folder) => (
                                  <Folder folder={folder} key={folder.name} />
                              ))}
                          </ul>
                       </div>
                             
                      <div className='file-explorer-page-content'>
                          {renderView()}
                      </div>
                  </div>
           </div>

            {/*
           <footer className="file-explorer-bottom-footer">
               <button className='list-view-btn'>List</button>
               <button className='grid-view-btn'>Grid</button>
           </footer>
           */}
 </>
}

function Folder({folder}) {
   let [isOpen, setIsOpen] = useState(false);
   return <>
       <li key={folder.name}>
           <span>
               {folder.folders /* && folder.folders.length > 0 */ && (
                   <button onClick={() => setIsOpen(!isOpen)}>
                       {isOpen ? (
                           <FaChevronRight style={{ fontSize: '10px', transform: 'rotate(90deg)' }} />
                       ) : (
                           <FaChevronRight style={{ fontSize: '10px'}} />
                       )}
                   </button>
               )}
               {folder.folders ? (
                   <FaFolder style={{fontSize: '25px', paddingRight: '4px', paddingLeft: '5px'}}/>
               ) : (
                   <FaFile style={{fontSize: '30px', paddingRight: '4px', paddingLeft: '15px'}}/>
               )}
               {folder.folders &&
                   <button onClick={() => alert(folder.name)} className="folder-name-button">
                       {folder.name}
                   </button>
               }
               {!folder.folders &&
                   <button onClick={() => alert(folder.content)} className="file-name-button">
                       {folder.name}
                   </button>
               }
           </span>


           {isOpen && (
               <ul className="file-index-subfolders">
                   {folder.folders?.map((folder) => (
                       <Folder folder={folder} key={folder.name} />
                   ))}
               </ul>
           )}
       </li>
   </>
}


export default FileExplorer;