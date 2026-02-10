import React, { useState } from 'react';

function FileExplorer() {

    const [activeView, setActiveView] = useState('view1');

    const renderView = () => {
        switch (activeView) {
            case 'pc-view': return <div>This is the PC content</div>;
            case 'desktop-view': return <div>This is the Desktop content</div>;
            case 'downloads-view': return <div>This is the Downloads content</div>;
            case 'documents-view': return <div>This is the Documents content</div>;
            case 'pictures-view': return <div>This is the Pictures content</div>;
            case 'music-view': return <div>This is the Music content</div>;
            case 'videos-view': return <div>This is the Video content</div>;
            case 'networks-view': return <div>This is the Networks content</div>;
            default: return <div>Default View</div>;
        }
    };

  return <>
            <div className="file-explorer-bottom-header">
                {/*various icons*/}
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
                <div className="file-explorer-side-nav">
                    <details>
                        <summary>Quick Access</summary>
                        <p><button onClick={() => setActiveView('desktop-view')}>Desktop</button></p>
                        <p><button onClick={() => setActiveView('downloads-view')}>Downloads</button></p>
                        <p><button onClick={() => setActiveView('documents-view')}>Documents</button></p>
                    </details>

                    <details>
                        <summary><button onClick={() => setActiveView('pc-view')}>This PC</button></summary>
                        <details>
                            <summary><button onClick={() => setActiveView('desktop-view')}>Desktop</button></summary>
                            <p>Desktop item</p>
                            <p>Desktop item</p>
                        </details>
                        <details>
                            <summary><button onClick={() => setActiveView('downloads-view')}>Downloads</button></summary>
                            <p>Downloaded item</p>
                            <p>Downloaded item</p>
                            <p>Downloaded image</p>
                        </details>
                        <details>
                            <summary><button onClick={() => setActiveView('documents-view')}>Documents</button></summary>
                            <p>Boring Document</p>
                            <details>
                                <summary>Folder</summary>
                                <p>Super Secret Document</p>
                            </details>
                        </details>
                        <details>
                            <summary><button onClick={() => setActiveView('pictures-view')}>Pictures</button></summary>
                            

                            <p>Cat pic</p>
                        </details>
                        <details>
                            <summary><button onClick={() => setActiveView('music-view')}>Music</button></summary>
                        </details>
                        <details>
                            <summary><button onClick={() => setActiveView('videos-view')}>Videos</button></summary>
                        </details>
                    </details>

                    <details>
                        <summary><button onClick={() => setActiveView('networks-view')}>Network</button></summary>
                        <p>Network Stuff</p>
                    </details>
                </div>
                
                <div className='file-explorer-page-content'>
                    {renderView()}
                </div>
            </div>
  </>
}

export default FileExplorer;