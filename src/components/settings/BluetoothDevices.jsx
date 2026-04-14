import { useState } from "react";
import { useSettingsContext } from "../../utils/settings/settingsContext";
import { dispatchDesktopEvent } from "../../utils/eventBus";

function BluetoothDevices() {
    const [subPage, setSubPage] = useState('main'); // 'main', 'devices'
    const [openDropdown, setOpenDropdown] = useState(null); // track which device dropdown is open

    // Get Bluetooth state and devices from context
    const {
        bluetoothOn,
        toggleBluetooth,
        bluetoothStatuses,
        toggleBluetoothConnection,
    } = useSettingsContext();

    // List of device names from context (keys of bluetoothStatuses)
    const deviceNames = Object.keys(bluetoothStatuses);

    const handleRemoveDevice = (deviceName) => {
        dispatchDesktopEvent("BluetoothDeviceRemove", { deviceName });
        setOpenDropdown(null);
    };

    const handleProperties = (deviceName) => {
        dispatchDesktopEvent("BluetoothDeviceProperties", { deviceName });
        setOpenDropdown(null);
    };

    const addBluetoothDevice = () => {
        alert("Add device clicked");
    };

    // Helper to get button text based on status
    const getConnectButtonText = (status) => {
        if (status === "connected") return "Disconnect";
        if (status === "connecting") return "Connecting...";
        if (status === "disconnecting") return "Disconnecting...";
        return "Connect";
    };

    if (subPage === 'main') {
        return (
            <div className="settings-section">
                <h1>Bluetooth & devices</h1>

                {/* Add device section - special tile with plus icon */}
                <div className="settings-grid" style={{ marginBottom: '24px' }}>
                    <div className="settings-card add-device-card">
                        <div className="add-device-content">
                            <span className="plus-icon">+</span>
                            <h3 className="card-title" onClick={() => {
                                dispatchDesktopEvent("BluetoothAddDeviceClicked");
                                addBluetoothDevice();
                            }}>Add device</h3>
                        </div>
                    </div>
                </div>

                {/* View more devices button */}
                <div style={{ marginBottom: '24px' }}>
                    <button className="btn btn-secondary" onClick={() => {
                        dispatchDesktopEvent("SettingsBluetoothDevicesSubPageClicked");
                        setSubPage('devices')
                    }}>
                        View more devices
                    </button>
                </div>

                {/* Main settings grid */}
                <div className="settings-grid">
                    {/* Bluetooth toggle */}
                    <div className="settings-card control-card">
                        <div className="card-content">
                            <h3 className="card-title">Bluetooth</h3>
                            <p className="card-description">Discoverable as "LAPTOP-123456" | On</p>
                        </div>
                        <div className="card-control">
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={bluetoothOn}
                                    onChange={toggleBluetooth}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Devices */}
                    <div className="settings-card" onClick={() => {
                        dispatchDesktopEvent("SettingsBluetoothDevicesSubPageClicked");
                        setSubPage('devices');
                    }}>
                        <h3 className="card-title">Devices</h3>
                        <p className="card-description">Mouse, keyboard, pen, audio, displays and docks, other devices</p>
                        <button className="btn btn-primary" onClick={(e) => {
                            e.stopPropagation(); // prevent card click
                            dispatchDesktopEvent("BluetoothAddDeviceClicked");
                            addBluetoothDevice();
                        }}>Add device</button>
                        <span className="card-arrow">&rsaquo;</span>
                    </div>

                    {/* Printers & scanners */}
                    <div className="settings-card">
                        <h3 className="card-title">Printers & scanners</h3>
                        <p className="card-description">Preferences</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>

                    {/* Mobile devices */}
                    <div className="settings-card">
                        <h3 className="card-title">Mobile devices</h3>
                        <p className="card-description">Instantly access your mobile devices from your PC</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>

                    {/* Cameras */}
                    <div className="settings-card">
                        <h3 className="card-title">Cameras</h3>
                        <p className="card-description">Connected cameras, default image settings</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>

                    {/* Mouse */}
                    <div className="settings-card">
                        <h3 className="card-title">Mouse</h3>
                        <p className="card-description">Buttons, mouse pointer speed, scrolling</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>

                    {/* Keyboard */}
                    <div className="settings-card">
                        <h3 className="card-title">Keyboard</h3>
                        <p className="card-description">Character repeat, hotkeys</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>

                    {/* Touchpad */}
                    <div className="settings-card">
                        <h3 className="card-title">Touchpad</h3>
                        <p className="card-description">Taps, gestures, scrolling, zooming</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>

                    {/* Touch */}
                    <div className="settings-card">
                        <h3 className="card-title">Touch</h3>
                        <p className="card-description">Gestures, scroll, zoom, taps</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>

                    {/* Pen & Windows Ink */}
                    <div className="settings-card">
                        <h3 className="card-title">Pen & Windows Ink</h3>
                        <p className="card-description">Right-handed or left-handed, pen button shortcuts, handwriting</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>

                    {/* AutoPlay */}
                    <div className="settings-card">
                        <h3 className="card-title">AutoPlay</h3>
                        <p className="card-description">Defaults for removable drives and memory cards</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>

                    {/* USB */}
                    <div className="settings-card">
                        <h3 className="card-title">USB</h3>
                        <p className="card-description">Notifications, USB battery saver</p>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>
                </div>
            </div>
        );
    }
    if (subPage === 'devices') {
        return (
            <div className="settings-section">
                {/* Back button */}
                <button
                    className="btn btn-text"
                    onClick={() => {
                        setSubPage("main");
                        dispatchDesktopEvent("SettingsBluetoothPageClicked");
                    }}
                >
                    ← Back to Bluetooth & Devices
                </button>

                <h1>Devices</h1>

                {/* Bluetooth toggle card */}
                <div className="settings-card" style={{ marginBottom: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <h3 className="card-title">Bluetooth</h3>
                            <p className="card-description">Discoverable as "LAPTOP-123456"</p>
                        </div>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={bluetoothOn}
                                onChange={toggleBluetooth}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                {/* Add device section */}
                <div className="settings-card" style={{ marginBottom: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <h3 className="card-title">Connect a new device to "LAPTOP-123456"</h3>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => dispatchDesktopEvent("BluetoothAddDeviceClicked")}
                        >
                            Add Device
                        </button>
                    </div>
                </div>


                <h3 className="subsection-title">Paired devices</h3>
                {deviceNames.length === 0 ? (
                    <p className="card-description">No devices found. Add a device to get started.</p>
                ) : (
                    <div className="settings-grid" style={{ marginBottom: "32px" }}>
                        {deviceNames.map((device) => {
                            const status = bluetoothStatuses[device];
                            const isDropdownOpen = openDropdown === device;

                            return (
                                <div key={device} className="device-card-wrapper">
                                    {/* Main card - click anywhere toggles dropdown */}
                                    <div
                                        className="settings-card"
                                        onClick={() => setOpenDropdown(isDropdownOpen ? null : device)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div>
                                                <h3 className="card-title">{device}</h3>
                                                <p className="card-description">
                                                    {status === "connected"
                                                        ? "Connected"
                                                        : status === "connecting"
                                                            ? "Connecting..."
                                                            : status === "disconnecting"
                                                                ? "Disconnecting..."
                                                                : "Disconnected"}
                                                </p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                                {/* Connect/Disconnect button */}
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // prevent card click
                                                        if (status !== "connecting" && status !== "disconnecting") {
                                                            toggleBluetoothConnection(device);
                                                        }
                                                    }}
                                                    disabled={status === "connecting" || status === "disconnecting"}
                                                >
                                                    {getConnectButtonText(status)}
                                                </button>
                                                {/* Dropdown indicator (▼) */}
                                                <span className="card-arrow" style={{ fontSize: "20px", lineHeight: 1 }}>
                                                    v
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dropdown panel (appears below card, same width) */}
                                    {isDropdownOpen && (
                                        <div className="dropdown-panel">
                                            <button className="dropdown-item" onClick={() => handleProperties(device)}>
                                                Properties
                                            </button>
                                            <button className="dropdown-item dropdown-item-danger" onClick={() => handleRemoveDevice(device)}>
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="settings-card">
                    <h3 className="card-title">Help with Devices</h3>

                    <p className="card-description">Get help</p>
                    <p className="card-description">Give feedback</p>
                </div>
            </div>
        );
    }
}

export default BluetoothDevices;