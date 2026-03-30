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
                <button className="btn btn-secondary">View more devices</button>
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
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                {/* Devices */}
                <div className="settings-card">
                    <h3 className="card-title">Devices</h3>
                    <p className="card-description">Mouse, keyboard, pen, audio, displays and docks, other devices</p>
                    <button className="btn btn-small" style={{ marginTop: '12px' }}>Add device</button>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
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

export default BluetoothDevices;