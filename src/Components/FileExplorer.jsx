function FileExplorer() {
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
                    </details>

                    <details>
                        <summary>This PC</summary>
                        <details>
                            <summary>Desktop</summary>
                            <p>Desktop item</p>
                            <p>Desktop item</p>
                        </details>
                        <details>
                            <summary>Downloads</summary>
                            <p>Downloaded item</p>
                            <p>Downloaded item</p>
                            <p>Downloaded image</p>
                        </details>
                        <details>
                            <summary>Documents</summary>
                            <p>Boring Document</p>
                            <details>
                                <summary>Folder</summary>
                                <p>Super Secret Document</p>
                            </details>
                        </details>
                        <details>
                            <summary>Pictures</summary>
                            <p>Cat pic</p>
                        </details>
                        <details>
                            <summary>Music</summary>
                        </details>
                        <details>
                            <summary>Videos</summary>
                        </details>
                    </details>

                    <details>
                        <summary>Network</summary>
                        <p>Network Stuff</p>
                    </details>
                </div>

                <div id="div1" className="content-div">
                    <p>This is the main window content for File Explorer.</p>
                </div>

                <div id="div2" className="content-div">
                    <p>This is the second window content for File Explorer.</p>
                </div>

                <div id="div3" className="content-div">
                    <p>This is the third window content for File Explorer.</p>
                </div>
            </div>
  </>
}

export default FileExplorer;