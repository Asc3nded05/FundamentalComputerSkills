import { useEffect, useRef, useState } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";
import placeholderImage from "../assets/WifiPlaceholder.png"
import "../css/QuickSettings.css";

function QuickSettings({ isOpen, closeQuickSettings, brightness, setBrightness, volume, setVolume }) {
    const panelRef = useRef(null);

    const [wifiOn, setWifiOn] = useState(false);
    const [bluetoothOn, setBluetoothOn] = useState(false);
    const [airplaneOn, setAirplaneOn] = useState(false);
    const [energyOn, setEnergyOn] = useState(false);

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

    const openDetail = (type) => {
        setActiveDetail(prev => (prev === type ? null : type));
        dispatchDesktopEvent("QuickSettingsDetailOpen", { type });
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

                                {/* Battery indicator */}
                                <div className="qs-battery">
                                    Battery: 87%
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
                                    {activeDetail === "wifi" && <div className="qs-detail-list">
                                        <button className="qs-detail-list-item"> 
                                            <img className="qs-icon" src={placeholderImage} alt="Wifi 1" /> Wifi Network 1
                                        </button>
                                        <button className="qs-detail-list-item"> 
                                            <img className="qs-icon" src={placeholderImage} alt="Wifi 2" /> Wifi Network 2
                                        </button>
                                        <button className="qs-detail-list-item"> 
                                            <img className="qs-icon" src={placeholderImage} alt="Wifi 3" /> Wifi Network 3
                                        </button>
                                        <button className="qs-detail-list-item"> 
                                            <img className="qs-icon" src={placeholderImage} alt="Wifi 4" /> Wifi Network 4
                                        </button>
                                        <button className="qs-detail-list-item"> 
                                            <img className="qs-icon" src={placeholderImage} alt="Wifi 5" /> Wifi Network 5
                                        </button>
                                    </div>}
                                    {activeDetail === "bluetooth" && <div>
                                        Bluetooth devices (placeholder)
                                    </div>}
                                    {activeDetail === "accessibility" && <div>
                                        Accessibility options (placeholder)
                                    </div>}
                                    {activeDetail === "project" && <div>
                                        Project / display options (placeholder)
                                    </div>}
                                </div>

                                <div className="qs-detail-footer">
                                    <button className="qs-detail-footer-button">
                                        More 
                                        {activeDetail === "wifi" && " Wi‑Fi "}
                                        {activeDetail === "bluetooth" && " Bluetooth "}
                                        {activeDetail === "accessibility" && " Accessibility "}
                                        {activeDetail === "project" && " Project "}
                                        Settings
                                    </button>
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