import { useEffect, useRef, useState } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";
import { useSettingsContext } from "../utils/settings/settingsContext";

import wifiIcon from '../assets/Icons/Wifi Full.png';
import bluetoothIcon from '../assets/Icons/Bluetooth.png';
import airplaneModeIcon from '../assets/Icons/Airplane Mode.png';
import energySaverIcon from '../assets/Icons/Battery Saver.png';
import accessibilityIcon from '../assets/Icons/Accessibility Mode.png';
import projectIcon from '../assets/Icons/Project Icon.png';
import settingsQSIcon from '../assets/Icons/Settings (QS).png';
import batteryIcon from '../assets/Icons/Battery.png';
import pcScreenOnlyIcon from '../assets/Icons/PC Screen Only.png';
import duplicateIcon from '../assets/Icons/Duplicate.png';
import extendIcon from '../assets/Icons/Extend.png';
import secondScreenOnlyIcon from '../assets/Icons/Second Screen Only.png';
import wifiLockedIcon from '../assets/Icons/Wifi Lock.png';
import headphoneDeviceIcon from '../assets/Icons/Bluetooth Headphone Device.png';
import phoneDeviceIcon from '../assets/Icons/Bluetooth Phone Device.png';
import speakerDeviceIcon from '../assets/Icons/Bluetooth Speaker Device.png';
import mouseDeviceIcon from '../assets/Icons/Bluetooth Mouse Device.png';

import "../css/QuickSettings.css";

function QuickSettings({ isOpen, closeQuickSettings, openApp }) {
    const panelRef = useRef(null);
    // "wifi" | "bluetooth" | "accessibility" | "project" | null
    const [activeDetail, setActiveDetail] = useState(null);

    const [passwords, setPasswords] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({});

    // Functions from settings Manager
    const {
        wifiOn, bluetoothOn, airplaneOn, energyOn,
        toggleWifi, toggleBluetooth, toggleAirplane, toggleEnergy,
        accessibility, toggleAccessibility,
        selectedProject, setProject, projectOptions,
        brightness, volume, setBrightnessValue, setVolumeValue,
        wifiStatuses, selectedWifi, setSelectedWifi, toggleWifiConnection,
        bluetoothStatuses, bluetoothIcons, toggleBluetoothConnection,
        wifiRequiresPassword,
    } = useSettingsContext();

    console.log (bluetoothStatuses);

    // Helper to select a Wi‑Fi network (toggles selection + dispatches event)
    const selectWifiNetwork = (network) => {
        setSelectedWifi(prev => (prev === network ? null : network));
        dispatchDesktopEvent("WiFiNetworkSelected", { networkName: network });
    };

    const handleClose = () => {
        closeQuickSettings();
        setActiveDetail(null);
        dispatchDesktopEvent("QuickSettingsClosed");
    };

    // Close on Escape
    useEffect(() => {
        function handleKey(e) {
            if (!isOpen) return;
            if (e.key === "Escape") handleClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    // Focus management
    useEffect(() => {
        if (isOpen && panelRef.current) {
            const firstFocusable = panelRef.current.querySelector(
                'button, input, [tabindex]:not([tabindex="-1"])'
            );
            (firstFocusable || panelRef.current).focus();
            dispatchDesktopEvent("QuickSettingsOpened");
        }
    }, [isOpen]);

    const openDetail = (type) => {
        setActiveDetail(prev => (prev === type ? null : type));
        if (type === "wifi") dispatchDesktopEvent("WiFiDetailOpen");
        if (type === "bluetooth") dispatchDesktopEvent("BluetoothDetailOpen");
        if (type === "accessibility") dispatchDesktopEvent("AccessibilityDetailOpen");
        if (type === "project") dispatchDesktopEvent("ProjectDetailOpen");
    };

    const AccToggle = ({ label, description, value, onToggle }) => (
        <button
            className={`qs-detail-toggle ${value ? "on" : ""}`}
            onClick={() => onToggle(label)}
        >
            <div className="qs-detail-toggle-text">
                <div className="qs-detail-toggle-label">{label}</div>
                <div className="qs-detail-toggle-description">{description}</div>
            </div>

            <span className="qs-toggle-indicator">{value ? "On" : "Off"}</span>
        </button>
    );

    const getProjectIcon = (label) => {
        switch (label) {
            case "PC screen only": return pcScreenOnlyIcon;
            case "Duplicate": return duplicateIcon;
            case "Extend": return extendIcon;
            case "Second screen only": return secondScreenOnlyIcon;
        }
    };

    const getBluetoothIcon = (icon, deviceName) => {
        // If deviceName is missing, avoid crashing
        if (!deviceName || typeof deviceName !== "string") {
            return bluetoothIcon; // generic fallback
        }

        // 1. If icon string exists, map it
        switch (icon) {
            case "headphoneDeviceIcon": return headphoneDeviceIcon;
            case "speakerDeviceIcon": return speakerDeviceIcon;
            case "phoneDeviceIcon": return phoneDeviceIcon;
            case "mouseDeviceIcon": return mouseDeviceIcon;
        }

        // 2. Infer icon from device name
        const lower = deviceName.toLowerCase();
        if (lower.includes("speaker")) return speakerDeviceIcon;
        if (lower.includes("mouse")) return mouseDeviceIcon;
        if (lower.includes("headphone")) return headphoneDeviceIcon;
        if (lower.includes("phone")) return phoneDeviceIcon;

        // 3. Final fallback
        return bluetoothIcon;
    };

    return (
        <>
            {isOpen && (
                <div className="qs-overlay" onMouseDown={handleClose}>
                    <div
                        ref={panelRef}
                        className={`qs-panel ${isOpen ? "open" : ""}`}
                        tabIndex={-1}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {!activeDetail && (
                            <div className="qs-main-content">
                                <div className="qs-grid">
                                    {/* Wi‑Fi */}
                                    <div>
                                        <div className={`qs-tile ${wifiOn ? "qs-tile-on" : ""}`}>
                                            <button className="qs-tile-left" onClick={() => toggleWifi('QS')}>
                                                <img className="qs-icon" src={wifiIcon} alt="Wifi" style={{height: '15px', width: 'auto'}}/>
                                            </button>
                                            <button className="qs-tile-right" onClick={() => openDetail("wifi")}>
                                                {"›"}
                                            </button>
                                        </div>
                                        <div className="qs-label">Wi‑Fi</div>
                                    </div>

                                    {/* Bluetooth */}
                                    <div>
                                        <div className={`qs-tile ${bluetoothOn ? "qs-tile-on" : ""}`}>
                                            <button className="qs-tile-left" onClick={() => toggleBluetooth('QS')}>
                                                <img className="qs-icon" src={bluetoothIcon} alt="Bluetooth" style={{height: '20px', width: 'auto'}}/>
                                            </button>
                                            <button className="qs-tile-right" onClick={() => openDetail("bluetooth")}>
                                                {"›"}
                                            </button>
                                        </div>
                                        <div className="qs-label">Bluetooth</div>
                                    </div>

                                    {/* Airplane Mode */}
                                    <div>
                                        <div className={`qs-tile ${airplaneOn ? "qs-tile-on" : ""}`}>
                                            <button className="qs-tile-single" onClick={() => toggleAirplane()}>
                                                <img className="qs-icon" src={airplaneModeIcon} alt="Airplane Mode" />
                                            </button>
                                        </div>
                                        <div className="qs-label">Airplane Mode</div>
                                    </div>

                                    {/* Energy Saver */}
                                    <div>
                                        <div className={`qs-tile ${energyOn ? "qs-tile-on" : ""}`}>
                                            <button className="qs-tile-single" onClick={() => toggleEnergy()}>
                                                <img className="qs-icon" src={energySaverIcon} alt="Energy Saver" />
                                            </button>
                                        </div>
                                        <div className="qs-label">Energy Saver</div>
                                    </div>

                                    {/* Accessibility */}
                                    <div>
                                        <div className="qs-tile">
                                            <button
                                                className="qs-tile-single"
                                                onClick={() => openDetail("accessibility")}
                                            >
                                                <img className="qs-icon" src={accessibilityIcon} alt="Accessibility" style={{height: '20px', width: 'auto'}}/> {"›"}
                                            </button>
                                        </div>
                                        <div className="qs-label">Accessibility</div>
                                    </div>

                                    {/* Project */}
                                    <div>
                                        <div className="qs-tile">
                                            <button
                                                className="qs-tile-single"
                                                onClick={() => openDetail("project")}
                                            >
                                                <img className="qs-icon" src={projectIcon} alt="Project" /> {"›"}
                                            </button>
                                        </div>
                                        <div className="qs-label">Project</div>
                                    </div>
                                </div>

                                {/* Sliders */}
                                <div className="qs-slider">
                                    <label>Brightness</label>
                                    <input
                                        type="range"
                                        min="20"
                                        max="120"
                                        value={brightness}
                                        onChange={(e) => {
                                            setBrightnessValue(Number(e.target.value));
                                        }}
                                    />
                                </div>

                                <div className="qs-slider">
                                    <label>Volume</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={(e) => {
                                            setVolumeValue(Number(e.target.value));
                                        }}
                                    />
                                </div>

                                <div className="qs-battery-row">
                                    <div className="qs-battery">
                                        <img className="qs-icon" src={batteryIcon} alt="Battery" style={{height: '15px', width: 'auto'}}/>
                                        87%
                                    </div>
                                    <button className="qs-settings-button">
                                        <img className="qs-icon" src={settingsQSIcon} alt="Settings" style={{height: '20px', width: 'auto'}}
                                            onClick={() => {
                                                handleClose();
                                                openApp('Settings', { startingPage: 'home' });
                                                dispatchDesktopEvent("OpenSettingsFromQS")
                                            }} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Detail panel area */}
                        {activeDetail && (
                            <div className="qs-detail-panel">
                                <div className="qs-detail-header"> 
                                    <div className="qs-header-left">
                                        <button 
                                            className="qs-back" 
                                            onClick={() => {
                                                setActiveDetail(null);
                                                dispatchDesktopEvent("ReturnToMainQuickSettings");
                                            }}>
                                            &#8592;
                                        </button>
                                        <div className="qs-detail-title">
                                            {activeDetail === "wifi" && "Wi‑Fi"}
                                            {activeDetail === "bluetooth" && "Bluetooth"}
                                            {activeDetail === "accessibility" && "Accessibility"}
                                            {activeDetail === "project" && "Project"}
                                        </div>
                                    </div>

                                    {/* Top-right toggle */}
                                    {(activeDetail === "wifi" || activeDetail === "bluetooth") && (
                                        <label className="toggle toggle--small" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={activeDetail === "wifi" ? wifiOn : bluetoothOn}
                                                onChange={() =>
                                                    activeDetail === "wifi"
                                                        ? toggleWifi('QS')
                                                        : toggleBluetooth('QS')
                                                }
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    )}
                                </div>


                                <div className="qs-detail-content">
                                    {activeDetail === "wifi" && (
                                        <div className="qs-detail-content">
                                            {!wifiOn ? (
                                                <div className="qs-radio-off-message">
                                                    <div className="qs-radio-off-title">Wi-Fi is off</div>
                                                    <div className="qs-radio-off-body">
                                                        Turn Wi-Fi back on to see available networks.
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="qs-detail-list">
                                                    {Object.keys(wifiStatuses).map(network => {
                                                        const status = wifiStatuses[network];
                                                        const requiresPassword = wifiRequiresPassword[network];
                                                        const showStatus = status === "connected" || status === "connecting";
                                                        return (
                                                        <div key={network}>
                                                            <button
                                                                className="qs-detail-list-item"
                                                                onClick={() => selectWifiNetwork(network)}
                                                            >
                                                                <div className="qs-network-info">
                                                                    <img className="qs-icon" src={requiresPassword ? wifiLockedIcon : wifiIcon} alt={network} style={{height: '15px', width: 'auto'}}/>
                                                                    <span>{network}</span>
                                                                </div>

                                                                {showStatus && (
                                                                    <span className="qs-connected-indicator">                          
                                                                        {status === "connected" ? "Connected" : "Connecting..."}
                                                                    </span>
                                                                )}
                                                            </button>

                                                            {selectedWifi === network && (
                                                                <>
                                                                {requiresPassword && status !== 'connected' && (
                                                                    <div style={{ marginTop: '8px' }}>
                                                                        <input
                                                                        type="password"
                                                                        placeholder="Network password"
                                                                        value={passwords[network] || ''}
                                                                        onChange={(e) => {
                                                                            setPasswords(prev => ({ ...prev, [network]: e.target.value }));
                                                                            // clear error while typing
                                                                            if (passwordErrors[network]) {
                                                                            setPasswordErrors(prev => ({ ...prev, [network]: false }));
                                                                            }
                                                                        }}
                                                                        disabled={status === 'connecting' || status === 'disconnecting'}
                                                                        className="qs-password-input"   // add your own class
                                                                        />
                                                                        {passwordErrors[network] && (
                                                                        <p style={{ color: 'white', margin: '4px 0 0', fontSize: '0.85em' }}>
                                                                            Incorrect password
                                                                        </p>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                <button
                                                                    className={`qs-connect-button ${
                                                                        status === "connected" ? "disconnect" : ""
                                                                    }`}
                                                                    onClick={() => {
                                                                        const pwd = passwords[network] || '';
                                                                        // clear previous error
                                                                        setPasswordErrors(prev => ({ ...prev, [network]: false }));

                                                                        const result = toggleWifiConnection(
                                                                            network,
                                                                            'QS',
                                                                            status === 'connected' ? undefined : pwd   // disconnect doesn’t need password
                                                                        );

                                                                        if (result?.action === 'passwordIncorrect') {
                                                                            setPasswordErrors(prev => ({ ...prev, [network]: true }));
                                                                            setPasswords(prev => ({ ...prev, [network]: '' }));
                                                                            return;
                                                                        }

                                                                        // On any success, clear the password and error
                                                                        setPasswords(prev => ({ ...prev, [network]: '' }));
                                                                        setPasswordErrors(prev => ({ ...prev, [network]: false }));
                                                                    }}
                                                                >
                                                                    {status === "connected"
                                                                        ? "Disconnect"
                                                                        : status === "connecting"
                                                                        ? "Connecting..."
                                                                        : status === "disconnecting"
                                                                        ? "Disconnecting..."
                                                                        : "Connect"}
                                                                </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    )})}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {activeDetail === "bluetooth" && (
                                        <div className="qs-detail-content">
                                            {!bluetoothOn ? (
                                                <div className="qs-radio-off-message">
                                                    <div className="qs-radio-off-title">Bluetooth is off</div>
                                                    <div className="qs-radio-off-body">
                                                        Turn Bluetooth back on to see available devices.
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="qs-detail-list">
                                                    {Object.keys(bluetoothStatuses).map(device => (
                                                        <button
                                                            key={device}
                                                            className="qs-detail-list-item"
                                                            onClick={() => toggleBluetoothConnection(device, 'QS')}
                                                        >
                                                            <div className="qs-bluetooth-name">
                                                                <img
                                                                    className="qs-icon"
                                                                    src={getBluetoothIcon(bluetoothIcons[device], device)}
                                                                    alt={device}
                                                                    style={{ height: "20px", width: "auto", paddingRight: '8px'}}
                                                                    />
                                                                    {device}
                                                            </div>
                                                            <span className="qs-device-status">
                                                                {bluetoothStatuses[device] === "connected"
                                                                    ? "Connected"
                                                                    : bluetoothStatuses[device] === "connecting"
                                                                        ? "Connecting..."
                                                                        : bluetoothStatuses[device] === "disconnecting"
                                                                            ? "Disconnecting..."
                                                                            : "Not Connected"}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {activeDetail === "accessibility" && (
                                        <div className="qs-detail-list">
                                            {[
                                                { label: "Magnifier", description: "See words and images better" },
                                                { label: "Narrator", description: "Your built-in screen reader" },
                                                { label: "Color Filters", description: "Distinguish among colors easily" },
                                                { label: "Live Captions", description: "Real time audio transcription" },
                                                { label: "Mono Audio", description: "Combine left and right audio channels" },
                                                { label: "Voice Access", description: "Interact with your PC using voice" },
                                                { label: "Sticky Keys", description: "Use shortcuts one key at a time" },
                                            ].map(({ label, description }) => (
                                                <AccToggle
                                                    key={label}
                                                    label={label}
                                                    description={description}
                                                    value={accessibility[label] || false}
                                                    onToggle={toggleAccessibility}
                                                />
                                            ))}
                                        </div>
                                    )}{activeDetail === "project" && (
                                        <div className="qs-detail-list">
                                            {projectOptions.map(option => (
                                                <button
                                                    key={option.label}
                                                    className={`qs-detail-list-item ${selectedProject === option.label ? "qs-project-selected" : ""}`}
                                                    onClick={() => setProject(option.label)}
                                                >
                                                    <div>
                                                        <img className="qs-icon" src={getProjectIcon(option.label)} alt={option.label} style={{height: '15px', width: 'auto'}}/> {option.label}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="qs-detail-footer">
                                    {activeDetail === "wifi" && (
                                        <button className="qs-detail-footer-button"
                                            onClick={() => {
                                                handleClose();
                                                openApp('Settings', { startingPage: 'network' });
                                                dispatchDesktopEvent("OpenWiFiSettingsFromQS");;
                                            }}>
                                            More Wi‑Fi Settings
                                        </button>
                                    )}

                                    {activeDetail === "bluetooth" && (
                                        <button className="qs-detail-footer-button"
                                            onClick={() => {
                                                handleClose();
                                                openApp('Settings', { startingPage: 'bluetooth' });
                                                dispatchDesktopEvent("OpenBluetoothSettingsFromQS");
                                            }}>
                                            More Bluetooth Settings
                                        </button>
                                    )}

                                    {activeDetail === "accessibility" && (
                                        <button className="qs-detail-footer-button"
                                            onClick={() => {
                                                handleClose();
                                                openApp('Settings', { startingPage: 'accessibility' });
                                                dispatchDesktopEvent("OpenAccessibilitySettingsFromQS");
                                            }}>
                                            More Accessibility Settings
                                        </button>
                                    )}

                                    {activeDetail === "project" && (
                                        <button className="qs-detail-footer-button"
                                            onClick={() => {
                                                handleClose();
                                                openApp('Settings', { startingPage: 'system' });
                                                dispatchDesktopEvent("OpenProjectSettingsFromQS")
                                            }}>
                                            More Display Settings
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default QuickSettings;