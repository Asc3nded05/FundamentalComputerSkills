import wifi from "../../assets/WifiPlaceholder.png"

function Network() {
    return (
        <div className="settings-section">
            <h1>Network & internet</h1>
            
            {/* Network status card */}
            <div className="info-card">
                <div className="network-header">
                    <img src={wifi} alt="Wi-Fi" className="wifi-icon" />
                    <div className="network-details">
                        <h3 className="card-title">Wi-Fi (Wifi Network 1)</h3>
                        <p className="card-description">Connected, secured</p>
                        <p className="network-property">Properties: Private network, 5 GHz</p>
                    </div>
                </div>
                <div className="data-usage">
                    <p className="card-description">Data usage: 18.37 GB, last 30 days</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
            </div>

            {/* Settings grid */}
            <div className="settings-grid">
                <div className="settings-card control-card">
                    <div className="card-content">
                        <h3 className="card-title">Wi-Fi</h3>
                        <p className="card-description">Connect, manage known networks, metered network</p>
                    </div>
                    <div className="card-control">
                        <label className="toggle">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>

                {/* VPN */}
                <div className="settings-card">
                    <h3 className="card-title">VPN</h3>
                    <p className="card-description">Add, connect, manage</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>

                {/* Mobile hotspot */}
                <div className="settings-card control-card">
                    <div className="card-content">
                        <h3 className="card-title">Mobile hotspot</h3>
                        <p className="card-description">Share your internet connection</p>
                    </div>
                    <div className="card-control">
                        <label className="toggle">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>

                {/* Airplane mode */}
                <div className="settings-card control-card">
                    <div className="card-content">
                        <h3 className="card-title">Airplane mode</h3>
                        <p className="card-description">Stop wireless communication</p>
                    </div>
                    <div className="card-control">
                        <label className="toggle">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>

                {/* Proxy */}
                <div className="settings-card">
                    <h3 className="card-title">Proxy</h3>
                    <p className="card-description">Proxy server for Wi-Fi and Ethernet connections</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>

                {/* Dial-up */}
                <div className="settings-card">
                    <h3 className="card-title">Dial-up</h3>
                    <p className="card-description">Set up a dial-up internet connection</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>

                {/* Advanced network settings */}
                <div className="settings-card">
                    <h3 className="card-title">Advanced network settings</h3>
                    <p className="card-description">View all network adapters, network reset</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
            </div>
        </div>
    );
}

export default Network;