import updateImage from "../../assets/UpdatePlaceholder.png"

function WindowsUpdate() {

    // hard coded update status
    const updateAvailable = true;
    const lastChecked = "Today, 2:13 AM";
    const updateName = "2026-03 Update (KB5085516) (26200.8039)";

    return (
        <div className="settings-section">
            <h1>Windows Update</h1>

            {/* Main status block */}
            <div className="windows-update-status">
                <div className="status-icon">
                    <img 
                        src={updateImage}
                        alt="Windows Update" 
                        className="wifi-icon" 
                    />
                </div>
                <div className="status-text">
                    <p className="status-title">You're up to date</p>
                    <p className="status-detail">Last checked: {lastChecked}</p>
                    {updateAvailable && (
                        <p className="update-available">
                            <span className="info-icon">ℹ️</span> 
                            {updateName} is available.
                        </p>
                    )}
                </div>
            </div>

            {/* More options section */}
            <h2 className="subsection-title">More options</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <div className="toggle-row">
                        <h3 className="card-title">Get the latest updates as soon as they're available</h3>
                        <label className="toggle">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <p className="card-description">
                        Be among the first to get the latest non-security updates, fixes, and improvements as they roll out.
                    </p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Pause updates</h3>
                    <p className="card-description">Pause for 1 week</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Update history</h3>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Advanced options</h3>
                    <p className="card-description">Delivery optimization, optional updates, active hours, other update settings</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Windows Insider Program</h3>
                    <p className="card-description">Get preview builds of Windows to share feedback on new features and updates</p>
                </div>
            </div>

            {/* Related support section */}
            <h2 className="subsection-title">Related support</h2>
            <div className="settings-card support-card">
                <h3 className="card-title">Help with Windows Update</h3>
                <ul className="support-list">
                    <li>Uninstalling problematic Windows updates easily</li>
                    <li>Installing pending Windows updates easily</li>
                    <li>Pausing updates for a convenient time</li>
                    <li>Manually updating your device drivers</li>
                </ul>
            </div>

            {/* Footer */}
            <div className="update-footer">
                <p>Windows Update is committed to helping reduce carbon emissions.</p>
                <div className="footer-links">
                    <button className="btn btn-text">Get help</button>
                    <button className="btn btn-text">Give feedback</button>
                </div>
            </div>
        </div>
    );
}

export default WindowsUpdate;