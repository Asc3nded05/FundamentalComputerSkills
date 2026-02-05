function FileExplorer() {
  return <>
            <div className="bottom-header">
                {/*various icons*/}
            </div>

            <div className="window-body-top-nav">
                <p>&#8592; &#8594; &darr;</p>
                <input type="text" placeholder="Find..." />
                <input type="text" placeholder="Search..." />
            </div>

            <div className="window-body">
                <div className="window-body-side-nav">
                    <ul> &#8964; Quick Access
                        <li>&#8250; Desktop</li>
                        <li>&#8250; Downloads</li>
                        <li>&#8250; Documents</li>
                        <li>&#8250; Pictures</li>
                        <li>&#8250; Music</li>
                        <li>&#8250; Videos</li>
                    </ul>
                    <ul>&#8250; OneDrive </ul>
                    <ul>&#8250; This PC </ul>
                    <ul>&#8250; Network </ul>
                </div>
                <div className="window-body-main-content">
                    <p>This is the main window content for File Explorer.</p>
                </div>
            </div>
  </>
}

export default FileExplorer;