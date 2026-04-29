import { useState } from "react";
import wifiIcon from "../../assets/icons/WifiPlaceholder.png";
import wifiLockedIcon from "../../assets/Icons/WifiLockPlaceholder.png";
import { useSettingsContext } from "../../utils/settings/settingsContext";
import { dispatchDesktopEvent } from "../../utils/eventBus";

function Network({ subPage = 'main', onSubPageChange }) {
    const [openDropdownNetwork, setOpenDropdownNetwork] = useState(null); // track which network dropdown is open

    const [passwords, setPasswords] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({});

    const {
        wifiOn,
        toggleWifi,
        airplaneOn,
        toggleAirplane,
        wifiStatuses,
        wifiRequiresPassword,
        selectedWifi,
        setSelectedWifi,
        toggleWifiConnection,
    } = useSettingsContext();

    // helpful functions to display network status
    const connectedNetwork = Object.keys(wifiStatuses).find(
        network => wifiStatuses[network] === 'connected'
    );
    const isConnecting = Object.keys(wifiStatuses).some(
        network => wifiStatuses[network] === 'connecting'
    );

    if (subPage === 'main') {
        return (
            <div className="settings-section">
                <h1>Network & internet</h1>

                {/* Network status card */}
                {wifiOn && (
                    <div className="info-card">
                        <div className="network-header">
                            <img src={wifiIcon} alt="Wi-Fi" className="wifi-icon" />
                            <div className="network-details">
                                <h3 className="card-title">Wi-Fi ({connectedNetwork ? `${connectedNetwork}` : 'Not Connected'})</h3>
                                <p className="card-description">
                                    {connectedNetwork
                                        ? 'Connected, secured'
                                        : isConnecting
                                            ? 'Connecting...'
                                            : 'No internet connection'}
                                </p>
                                <p className="network-property">Properties: Private network, 5 GHz</p>
                            </div>
                        </div>
                        <div className="data-usage">
                            <p className="card-description">Data usage: 18.37 GB, last 30 days</p>
                        </div>
                    </div>
                )}

                {/* Settings grid */}
                <div className="settings-grid">
                    <div className="settings-card control-card interactable">
                        <div className="card-content" onClick={() => { dispatchDesktopEvent('SettingsNetworkWifiSubPageClicked'); onSubPageChange?.('wifi') }}>
                            <h3 className="card-title">Wi-Fi</h3>
                            <p className="card-description">Connect, manage known networks, metered network</p>
                        </div>
                        <div className="card-control">
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={wifiOn}
                                    onChange={() => toggleWifi('App')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <span className="card-arrow">&rsaquo;</span>
                    </div>

                    {/* VPN */}
                    <div className="settings-card">
                        <h3 className="card-title">VPN</h3>
                        <p className="card-description">Add, connect, manage</p>
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
                    </div>

                    {/* Airplane mode */}
                    <div className="settings-card control-card">
                        <div className="card-content">
                            <h3 className="card-title">Airplane mode</h3>
                            <p className="card-description">Stop wireless communication</p>
                        </div>
                        <div className="card-control">
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={airplaneOn}
                                    onChange={() => toggleAirplane()}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
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
    if (subPage === 'wifi') {
        return (
            <div className="settings-section">
                {/* Back button */}
                <button
                    className="btn btn-text"
                    onClick={() => {
                        onSubPageChange?.('main');
                        dispatchDesktopEvent("SettingsNetworkPageClicked");
                    }}
                >
                    ← Back to Network & Internet
                </button>

                <h1>Wi-Fi</h1>

                <div className="settings-grid">
                    <div className="settings-card control-card">
                        <div className="card-content">
                            <h3 className="card-title">Wi-Fi</h3>
                        </div>
                        <div className="card-control">
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={wifiOn}
                                    onChange={() => toggleWifi('App')}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    {wifiOn && (
                        <>
                            <div className="settings-card">
                            <h3 className="card-title">
                                {connectedNetwork ? connectedNetwork : 'WiFi'} Properties
                            </h3>
                            <p className="card-description">
                                {connectedNetwork
                                ? 'Connected, secured'
                                : isConnecting
                                ? 'Connecting...'
                                : 'No internet connection'}
                            </p>
                            </div>

                            <h3 className="subsection-title">Available Networks:</h3>

                            {Object.keys(wifiStatuses).length === 0 ? (
                            <p className="card-description">No networks found.</p>
                            ) : (
                            <div className="settings-grid" style={{ marginBottom: '32px' }}>
                                {Object.keys(wifiStatuses).map((network) => {
                                const status = wifiStatuses[network];
                                const isOpen = openDropdownNetwork === network;
                                const isConnectingOrDisconnecting =
                                    status === 'connecting' || status === 'disconnecting';
                                const isDisabled = !wifiOn || isConnectingOrDisconnecting;
                                const requiresPassword = wifiRequiresPassword[network];

                                const statusText =
                                    status === 'connected'
                                    ? 'Connected'
                                    : status === 'connecting'
                                    ? 'Connecting...'
                                    : '';

                                let buttonLabel = 'Connect';
                                if (status === 'connected') buttonLabel = 'Disconnect';
                                else if (status === 'connecting') buttonLabel = 'Connecting...';
                                else if (status === 'disconnecting') buttonLabel = 'Disconnecting...';

                                return (
                                    <div key={network} className="device-card-wrapper">
                                    {/* Main card */}
                                    <div
                                        className="settings-card interactable"
                                        onClick={() => {
                                        dispatchDesktopEvent('WiFiNetworkSelected', { networkName: network });
                                        setOpenDropdownNetwork(isOpen ? null : network);
                                        }}
                                    >
                                        <div className="network-card-content">
                                        <div className="network-card-left">
                                            <img
                                            src={requiresPassword ? wifiLockedIcon : wifiIcon}
                                            alt={requiresPassword ? 'Secured network' : 'Open network'}
                                            className="card-icon"
                                            />
                                            <div className="network-card-text">
                                            <h3 className="card-title">{network}</h3>
                                            {statusText && (
                                                <p className="card-description">{statusText}</p>
                                            )}
                                            </div>
                                        </div>
                                        <span className="card-arrow" style={{ fontSize: "20px", lineHeight: 1 }}>v</span>
                                        </div>
                                    </div>

                                    {/* Dropdown panel */}
                                    {isOpen && (
                                        <div className="dropdown-panel">
                                        <p className="dropdown-status">Status: {status}</p>
                                        {requiresPassword && status !== 'connected' && (
                                            <div style={{ marginTop: '8px' }}>
                                                <input
                                                type="password"
                                                placeholder="Network password"
                                                value={passwords[network] || ''}
                                                onChange={(e) => {
                                                    setPasswords(prev => ({ ...prev, [network]: e.target.value }));
                                                    // Clear error when user starts typing
                                                    if (passwordErrors[network]) {
                                                    setPasswordErrors(prev => ({ ...prev, [network]: false }));
                                                    }
                                                }}
                                                disabled={isConnectingOrDisconnecting}
                                                className="password-input"  // add your own CSS class
                                                />
                                                {passwordErrors[network] && (
                                                <p className="error-message" style={{ color: 'red', margin: '4px 0 0' }}>
                                                    Incorrect password
                                                </p>
                                                )}
                                            </div>
                                        )}
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                if (isConnectingOrDisconnecting) return;
                                                const pwd = passwords[network] || '';    // get entered password, if any

                                                // Clear previous error for this network
                                                setPasswordErrors(prev => ({ ...prev, [network]: false }));

                                                const result = toggleWifiConnection(
                                                network,
                                                'App',
                                                status === 'connected' ? undefined : pwd   // disconnect doesn't need password
                                                );

                                                // If password was incorrect, show error and clear the entered password
                                                if (result?.action === 'passwordIncorrect') {
                                                setPasswordErrors(prev => ({ ...prev, [network]: true }));
                                                setPasswords(prev => ({ ...prev, [network]: '' }));
                                                return;
                                                }

                                                // Connection/disconnect started – clear the password input and error
                                                if (result?.action === 'disconnectStarted' || 
                                                    result?.action === 'connectStarted' || 
                                                    result?.action === 'switchStarted') {
                                                setPasswords(prev => ({ ...prev, [network]: '' }));
                                                setPasswordErrors(prev => ({ ...prev, [network]: false }));
                                                }
                                                {buttonLabel}
                                            }}
                                            disabled={isDisabled}
                                        >
                                            {buttonLabel}
                                        </button>
                                        </div>
                                    )}
                                    </div>
                                );
                                })}
                            </div>
                            )}
                        </>
                    )}



                    <div className="settings-card">
                        <h3 className="card-title">Hardware properties</h3>
                        <p className="card-description">View and manage Wi-Fi adapter properties</p>
                    </div>

                    <div className="settings-card control-card">
                        <div className="card-content">
                            <h3 className="card-title">Random hardware addresses</h3>
                            <p className="card-description">Help protect your privacy by making it harder for people to track your device location.</p>
                        </div>
                        <div className="card-control">
                            <label className="toggle">
                                <input type="checkbox" />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    <div className="settings-card">
                        <h3 className="card-title">Help with WiFi</h3>

                        <p className="card-description">Get help</p>
                        <p className="card-description">Give feedback</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Network;