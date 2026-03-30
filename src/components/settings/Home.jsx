function Home() {
    return (
        <div className="settings-section">
            <h1>Home</h1>

            {/* Device info section */}
            <p className="card-description">LAPTOP-ABC123</p>
            <p className="card-description">HP model 123456</p>

            {/* Quick status cards */}
            <h3 className="card-title">WiFi Network 1</h3>
            <p className="card-description">Connected</p>
            <h3 className="card-title">Windows Update</h3>
            <p className="card-description">Last checked: 10 minutes ago</p>

            {/* Main settings grid */}
            <div className="settings-grid">
                {/* Recommended Settings */}
                <div className="settings-card">
                    <h3 className="card-title">Recommended Settings</h3>
                    <p className="card-description">Recent and commonly used settings</p>
                    <div className="settings-list">
                        <div className="settings-list-item">
                            <span>Bluetooth</span>
                            <div className="settings-list-controls">
                                <label className="toggle toggle--small">
                                    <input type="checkbox" defaultChecked />
                                    <span className="toggle-slider"></span>
                                </label>
                                {/* <span className="card-arrow">&rsaquo;</span> */}
                            </div>
                        </div>
                        <div className="settings-list-item">
                            <span>Display Settings</span>
                            {/* <span className="card-arrow">&rsaquo;</span> */}
                        </div>
                        <div className="settings-list-item">
                            <span>Personalization</span>
                            {/* <span className="card-arrow">&rsaquo;</span> */}
                        </div>
                    </div>
                </div>

                {/* Cloud Storage */}
                <div className="settings-card">
                    <h3 className="card-title">Cloud Storage</h3>
                    <p className="card-description">3.4 used of 5 GB (68%)</p>
                    <div className="storage-bar">
                        <div className="storage-bar-fill" style={{ width: '68%' }}></div>
                    </div>
                    <div className="settings-card">
                        <h3 className="card-title">PC backup</h3>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>
                    <div className="settings-card">
                        <h3 className="card-title">Manage cloud Storage</h3>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>
                </div>

                {/* Bluetooth Devices */}
                <div className="settings-card">
                    <h3 className="card-title">Bluetooth Devices</h3>
                    <p className="card-description">Manage, add, and remove devices</p>

                    <div className="bluetooth-section">
                        <div className="bluetooth-row">
                            <span>Bluetooth</span>
                            <label className="toggle">
                                <input type="checkbox" defaultChecked />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <p className="bluetooth-device-name">Discoverable as "LAPTOP-ABC123"</p>

                        <div className="bluetooth-actions">
                            <button className="btn btn-small">Add Device</button>
                            {/* <span className="card-arrow">&rsaquo;</span> */}
                        </div>
                        <button className="btn btn-text">View all devices</button>
                    </div>
                </div>

                {/* Personalize Your Device */}
                <div className="settings-card">
                    <h3 className="card-title">Personalize Your Device</h3>

                    <div className="theme-grid">
                        <div className="theme-item">theme 1</div>
                        <div className="theme-item">theme 2</div>
                        <div className="theme-item">theme 3</div>
                        <div className="theme-item">theme 4</div>
                        <div className="theme-item">theme 5</div>
                        <div className="theme-item">theme 6</div>
                    </div>

                    <div className="color-mode-selector">
                        <label>Color Mode</label>
                        <select className="settings-select-small">
                            <option>Light</option>
                            <option>Dark</option>
                        </select>
                    </div>

                    <button className="btn btn-text">
                        Browse more backgrounds, colors, and themes
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;