function BluetoothDevices() {
    return (
        <div className="settings-section">
            <h1>Bluetooth & devices</h1>
            
            {/* Add device section - special tile with plus icon */}
            <div className="settings-grid" style={{ marginBottom: '24px' }}>
                <div className="settings-card add-device-card">
                    <div className="add-device-content">
                        <span className="plus-icon">+</span>
                        <h3 className="card-title">Add device</h3>
                    </div>
                </div>
            </div>

            {/* View more devices button */}
            <div style={{ marginBottom: '24px' }}>
                <button className="button-secondary">View more devices</button>
            </div>

            {/* Main settings grid */}
            <div className="settings-grid">
                {/* Bluetooth toggle */}
                <div className="settings-card">
                    <div className="toggle-row">
                        <h3 className="card-title">Bluetooth</h3>
                        <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <p className="card-description">Discoverable as "LAPTOP-123456" | On</p>
                </div>

                {/* Devices */}
                <div className="settings-card">
                    <h3 className="card-title">Devices</h3>
                    <p className="card-description">Mouse, keyboard, pen, audio, displays and docks, other devices</p>
                    <button className="button-small" style={{ marginTop: '12px' }}>Add device</button>
                </div>

                {/* Printers & scanners */}
                <div className="settings-card">
                    <h3 className="card-title">Printers & scanners</h3>
                    <p className="card-description">Preferences</p>
                </div>

                {/* Mobile devices */}
                <div className="settings-card">
                    <h3 className="card-title">Mobile devices</h3>
                    <p className="card-description">Instantly access your mobile devices from your PC</p>
                </div>

                {/* Cameras */}
                <div className="settings-card">
                    <h3 className="card-title">Cameras</h3>
                    <p className="card-description">Connected cameras, default image settings</p>
                </div>

                {/* Mouse */}
                <div className="settings-card">
                    <h3 className="card-title">Mouse</h3>
                    <p className="card-description">Buttons, mouse pointer speed, scrolling</p>
                </div>

                {/* Keyboard */}
                <div className="settings-card">
                    <h3 className="card-title">Keyboard</h3>
                    <p className="card-description">Character repeat, hotkeys</p>
                </div>

                {/* Touchpad */}
                <div className="settings-card">
                    <h3 className="card-title">Touchpad</h3>
                    <p className="card-description">Taps, gestures, scrolling, zooming</p>
                </div>

                {/* Touch */}
                <div className="settings-card">
                    <h3 className="card-title">Touch</h3>
                    <p className="card-description">Gestures, scroll, zoom, taps</p>
                </div>

                {/* Pen & Windows Ink */}
                <div className="settings-card">
                    <h3 className="card-title">Pen & Windows Ink</h3>
                    <p className="card-description">Right-handed or left-handed, pen button shortcuts, handwriting</p>
                </div>

                {/* AutoPlay */}
                <div className="settings-card">
                    <h3 className="card-title">AutoPlay</h3>
                    <p className="card-description">Defaults for removable drives and memory cards</p>
                </div>

                {/* USB */}
                <div className="settings-card">
                    <h3 className="card-title">USB</h3>
                    <p className="card-description">Notifications, USB battery saver</p>
                </div>
            </div>
        </div>
    );
}

export default BluetoothDevices;