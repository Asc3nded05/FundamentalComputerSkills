import wifi from "../../assets/WifiPlaceholder.png"

function Network() {
    return (
        <div className="settings-section">
            <h1>Network & internet</h1>
            
            {/* Network status card */}
            <div className="network-info-card">
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
                </div>
            </div>

            {/* Settings grid */}
            <div className="settings-grid">
                {/* Wi-Fi */}
                <div className="settings-card">
                    <div className="toggle-row">
                        <h3 className="card-title">Wi-Fi</h3>
                        <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <p className="card-description">Connect, manage known networks, metered network</p>
                </div>

                {/* VPN */}
                <div className="settings-card">
                    <h3 className="card-title">VPN</h3>
                    <p className="card-description">Add, connect, manage</p>
                </div>

                {/* Mobile hotspot */}
                <div className="settings-card">
                    <div className="toggle-row">
                        <h3 className="card-title">Mobile hotspot</h3>
                        <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <p className="card-description">Share your internet connection</p>
                </div>

                {/* Airplane mode */}
                <div className="settings-card">
                    <div className="toggle-row">
                        <h3 className="card-title">Airplane mode</h3>
                        <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <p className="card-description">Stop wireless communication</p>
                </div>

                {/* Proxy */}
                <div className="settings-card">
                    <h3 className="card-title">Proxy</h3>
                    <p className="card-description">Proxy server for Wi-Fi and Ethernet connections</p>
                </div>

                {/* Dial-up */}
                <div className="settings-card">
                    <h3 className="card-title">Dial-up</h3>
                    <p className="card-description">Set up a dial-up internet connection</p>
                </div>

                {/* Advanced network settings */}
                <div className="settings-card">
                    <h3 className="card-title">Advanced network settings</h3>
                    <p className="card-description">View all network adapters, network reset</p>
                </div>
            </div>
        </div>
    );
}

export default Network;