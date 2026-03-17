import { useEffect, useRef, useState } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";
import placeholderImage from "../assets/WifiPlaceholder.png"
import "../css/QuickSettings.css";

function QuickSettings({ isOpen, closeQuickSettings, brightness, setBrightness, volume, setVolume, openApp }) {
    const panelRef = useRef(null);

    // Quick Setting Toggles
    const [wifiOn, setWifiOn] = useState(true);
    const [bluetoothOn, setBluetoothOn] = useState(false);
    const [airplaneOn, setAirplaneOn] = useState(false);
    const [energyOn, setEnergyOn] = useState(false);

    // Accessibility options
    const [accMagnifier, setAccMagnifier] = useState(false);
    const [accNarrator, setAccNarrator] = useState(false);
    const [accColorFilters, setAccColorFilters] = useState(false);
    const [accLiveCaptions, setAccLiveCaptions] = useState(false);
    const [accMonoAudio, setAccMonoAudio] = useState(false);
    const [accVoiceAccess, setAccVoiceAccess] = useState(false);
    const [accStickyKeys, setAccStickyKeys] = useState(false);

    // WiFi and Bluetooth interactivity
    const [selectedWifi, setSelectedWifi] = useState(null);
    const [wifiStatuses, setWifiStatuses] = useState({
        "Wifi Network 1": "connected",
        "Wifi Network 2": "disconnected",
        "Wifi Network 3": "disconnected",
        "Wifi Network 4": "disconnected",
        "Wifi Network 5": "disconnected"
    });
    const [bluetoothStatuses, setBluetoothStatuses] = useState({
        "Headphone 1": "connected",
        "Headphone 2": "disconnected",
        "Headphone 3": "disconnected",
        "Speaker": "disconnected",
        "Phone Link": "disconnected"
    });
    const [selectedProject, setSelectedProject] = useState("PC screen only");

    // "wifi" | "bluetooth" | "accessibility" | "project" | null
    const [activeDetail, setActiveDetail] = useState(null);

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

    const toggleWifi = () => {
        setWifiOn(v => {
            const next = !v;
            dispatchDesktopEvent("WiFiToggle", { on: next });
            return next;
        });
    };

    const toggleBluetooth = () => {
        setBluetoothOn(v => {
            const next = !v;
            dispatchDesktopEvent("BluetoothToggle", { on: next });
            return next;
        });
    };

    const toggleAirplane = () => {
        setAirplaneOn(v => {
            const next = !v;
            dispatchDesktopEvent("AirplaneModeToggle", { on: next });
            return next;
        });
    };

    const toggleEnergy = () => {
        setEnergyOn(v => {
            const next = !v;
            dispatchDesktopEvent("BatterySaverToggle", { on: next });
            return next;
        });
    };

    const selectWifiNetwork = (network) => {
        setSelectedWifi(prev => (prev === network ? null : network));
    };

    const toggleWifiConnection = (network) => {
        const currentConnected = Object.keys(wifiStatuses).find(n => wifiStatuses[n] === "connected");
        
        if (wifiStatuses[network] === "connected") {
            // Disconnect this one
            setWifiStatuses(prev => ({ ...prev, [network]: "disconnecting" }));
            setTimeout(() => {
                setWifiStatuses(prev => ({ ...prev, [network]: "disconnected" }));
            }, 1000);
        } else {
            // Disconnect current if any, then connect new
            if (currentConnected) {
                setWifiStatuses(prev => ({ ...prev, [currentConnected]: "disconnecting" }));
                setTimeout(() => {
                    setWifiStatuses(prev => ({ ...prev, [currentConnected]: "disconnected", [network]: "connecting" }));
                    setTimeout(() => {
                        setWifiStatuses(prev => ({ ...prev, [network]: "connected" }));
                    }, 1000);
                }, 1000);
            } else {
                setWifiStatuses(prev => ({ ...prev, [network]: "connecting" }));
                setTimeout(() => {
                    setWifiStatuses(prev => ({ ...prev, [network]: "connected" }));
                }, 1000);
            }
        }
    };

    const toggleBluetoothConnection = (device) => {
        setBluetoothStatuses(prev => {
            const current = prev[device];
            if (current === "connected") {
                return { ...prev, [device]: "disconnecting" };
            } else if (current === "disconnected") {
                return { ...prev, [device]: "connecting" };
            }
            return prev;
        });
        setTimeout(() => {
            setBluetoothStatuses(prev => {
                const current = prev[device];
                if (current === "connecting") {
                    return { ...prev, [device]: "connected" };
                } else if (current === "disconnecting") {
                    return { ...prev, [device]: "disconnected" };
                }
                return prev;
            });
        }, 1000); // 1 second delay
    };

    const openDetail = (type) => {
        setActiveDetail(prev => (prev === type ? null : type));
        dispatchDesktopEvent("QuickSettingsDetailOpen", { type });
    };

    const AccToggle = ({ label, description, value, setValue }) => (
        <button
            className={`qs-detail-toggle ${value ? "on" : ""}`}
            onClick={() => setValue(v => !v)}
        >
            <div className="qs-detail-toggle-text">
                <div className="qs-detail-toggle-label">{label}</div>
                <div className="qs-detail-toggle-description">{description}</div>
            </div>

            <span className="qs-toggle-indicator">{value ? "On" : "Off"}</span>
        </button>
    );

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
                                            <button className="qs-tile-left" onClick={toggleWifi}>
                                                <img className="qs-icon" src={placeholderImage} alt="Wifi" />
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
                                            <button className="qs-tile-left" onClick={toggleBluetooth}>
                                                <img className="qs-icon" src={placeholderImage} alt="Bluetooth" />
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
                                            <button className="qs-tile-single" onClick={toggleAirplane}>
                                                <img className="qs-icon" src={placeholderImage} alt="Airplane Mode" />
                                            </button>
                                        </div>
                                        <div className="qs-label">Airplane Mode</div>
                                    </div>

                                    {/* Energy Saver */}
                                    <div>
                                        <div className={`qs-tile ${energyOn ? "qs-tile-on" : ""}`}>
                                            <button className="qs-tile-single" onClick={toggleEnergy}>
                                                <img className="qs-icon" src={placeholderImage} alt="Energy Saver" />
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
                                                <img className="qs-icon" src={placeholderImage} alt="Accessibility" /> {"›"}
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
                                                <img className="qs-icon" src={placeholderImage} alt="Project" /> {"›"}
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
                                        defaultValue={brightness}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            setBrightness(value);
                                            dispatchDesktopEvent("BrightnessChange", { value });
                                        }}
                                    />
                                </div>

                                <div className="qs-slider">
                                    <label>Volume</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        defaultValue={volume}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            setVolume(value);
                                            dispatchDesktopEvent("VolumeChange", { value });
                                        }}
                                    />
                                </div>

                                <div className="qs-battery-row">
                                    <div className="qs-battery">
                                        <img className="qs-icon" src={placeholderImage} alt="Battery" />
                                        87%
                                    </div>
                                    <button className="qs-settings-button">
                                        <img className="qs-icon" src={placeholderImage} alt="Settings" onClick={() => openApp('Settings', { startingPage: 'home' })} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Detail panel area */}
                        {activeDetail && (
                            <div className="qs-detail-panel">
                                <div className="qs-detail-header"> 
                                    <button className="qs-back" onClick={() => setActiveDetail(null)}>
                                        ‹- 
                                    </button>
                                    <div className="qs-detail-title">
                                        {activeDetail === "wifi" && "Wi‑Fi"}
                                        {activeDetail === "bluetooth" && "Bluetooth"}
                                        {activeDetail === "accessibility" && "Accessibility"}
                                        {activeDetail === "project" && "Project"}
                                    </div>    
                                </div> 
                                

                                <div className="qs-detail-content">
                                    {activeDetail === "wifi" && (
                                        <div className="qs-detail-list">
                                            {Object.keys(wifiStatuses).map(network => (
                                                <div key={network}>
                                                    <button 
                                                        className="qs-detail-list-item" 
                                                        onClick={() => selectWifiNetwork(network)}
                                                    >
                                                        <div>
                                                            <div className="qs-network-info">
                                                                <img className="qs-icon" src={placeholderImage} alt={network} /> 
                                                                    <span>{network}</span>
                                                            </div>
                                                            {wifiStatuses[network] !== "disconnected" && (
                                                                <span className="qs-connected-indicator">{wifiStatuses[network]}</span>
                                                            )}
                                                        </div>

                                                        {selectedWifi === network && (
                                                            <button 
                                                                className={`qs-connect-button ${wifiStatuses[network] === "connected" ? "disconnect" : ""}`}
                                                                onClick={() => toggleWifiConnection(network)}
                                                            >
                                                                {wifiStatuses[network] === "connected" ? "Disconnect" : 
                                                                wifiStatuses[network] === "connecting" ? "Connecting..." : 
                                                                wifiStatuses[network] === "disconnecting" ? "Disconnecting..." : "Connect"}
                                                            </button>
                                                        )}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {activeDetail === "bluetooth" && (
                                        <div className="qs-detail-list">
                                            {Object.keys(bluetoothStatuses).map(device => (
                                                <button 
                                                    key={device}
                                                    className="qs-detail-list-item" 
                                                    onClick={() => toggleBluetoothConnection(device)}
                                                >
                                                    <div className="qs-bluetooth-name">
                                                        <img className="qs-icon" src={placeholderImage} alt={device} /> {device}
                                                    </div>
                                                    <span className="qs-device-status">
                                                        {bluetoothStatuses[device] === "connected" ? "Connected" : 
                                                         bluetoothStatuses[device] === "connecting" ? "Connecting..." : 
                                                         bluetoothStatuses[device] === "disconnecting" ? "Disconnecting..." : "Not Connected"}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {activeDetail === "accessibility" && (
                                        <div className="qs-detail-list">
                                            <AccToggle 
                                                label="Magnifier" 
                                                description="See words and images better" 
                                                value={accMagnifier} 
                                                setValue={setAccMagnifier} 
                                            />
                                            <AccToggle 
                                                label="Narrator" 
                                                description="Your built-in screen reader"
                                                value={accNarrator} 
                                                setValue={setAccNarrator} 
                                            />
                                            <AccToggle 
                                                label="Color Filters" 
                                                description="Distinguish among colors easily"
                                                value={accColorFilters} 
                                                setValue={setAccColorFilters} 
                                            />
                                            <AccToggle 
                                                label="Live Captions" 
                                                description="Real time audio transcription"
                                                value={accLiveCaptions} 
                                                setValue={setAccLiveCaptions} 
                                            />
                                            <AccToggle 
                                                label="Mono Audio" 
                                                description="Combine left and right audio channels"
                                                value={accMonoAudio} 
                                                setValue={setAccMonoAudio} 
                                            />
                                            <AccToggle 
                                                label="Voice Access" 
                                                description="Interact with your PC using voice"
                                                value={accVoiceAccess} 
                                                setValue={setAccVoiceAccess} 
                                            />
                                            <AccToggle 
                                                label="Sticky Keys" 
                                                description="Use shortcuts one key at a time"
                                                value={accStickyKeys} 
                                                setValue={setAccStickyKeys} 
                                            />
                                        </div>
                                    )}
                                    {activeDetail === "project" && (
                                        <div className="qs-detail-list">
                                            {[
                                                { label: "PC screen only", icon: "Display 1" },
                                                { label: "Duplicate", icon: "Display 2" },
                                                { label: "Extend", icon: "Display 3" },
                                                { label: "Second screen only", icon: "Display 4" }
                                            ].map(option => (
                                                <button 
                                                    key={option.label}
                                                    className={`qs-detail-list-item ${selectedProject === option.label ? "qs-project-selected" : ""}`}
                                                    onClick={() => setSelectedProject(option.label)}
                                                >
                                                    <div>
                                                        <img className="qs-icon" src={placeholderImage} alt={option.icon} /> {option.label}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="qs-detail-footer">
                                    {activeDetail === "wifi" && (
                                        <button className="qs-detail-footer-button" onClick={() => openApp('Settings', { startingPage: 'network' })}>
                                        More Wi‑Fi Settings
                                        </button>
                                    )}

                                    {activeDetail === "bluetooth" && (
                                        <button className="qs-detail-footer-button" onClick={() => openApp('Settings', { startingPage: 'bluetooth' })}>
                                        More Bluetooth Settings
                                        </button>
                                    )}

                                    {activeDetail === "accessibility" && (
                                        <button className="qs-detail-footer-button" onClick={() => openApp('Settings', { startingPage: 'accessibility' })}>
                                        More Accessibility Settings
                                        </button>
                                    )}

                                    {activeDetail === "project" && (
                                        <button className="qs-detail-footer-button" onClick={() => openApp('Settings', { startingPage: 'system' })}>
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