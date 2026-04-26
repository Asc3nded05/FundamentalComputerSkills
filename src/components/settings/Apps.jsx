function Apps() {
    return (
        <div className="settings-section">
            <h1>Apps</h1>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="card-title">Installed apps</h3>
                    <p className="card-description">Uninstall and manage apps on your PC</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Advanced app settings</h3>
                    <p className="card-description">Choose where to get apps, archive apps, uninstall updates</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Default apps</h3>
                    <p className="card-description">Defaults for file and link types, other defaults</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Actions</h3>
                    <p className="card-description">Windows can recommend actions from these apps.</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Offline maps</h3>
                    <p className="card-description">Downloads, storage location, map updates</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Apps for websites</h3>
                    <p className="card-description">Websites that can open in an app instead of a browser</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Video playback</h3>
                    <p className="card-description">Video adjustments, HDR streaming, battery options</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Startup</h3>
                    <p className="card-description">Apps that start automatically when you sign in</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Resume</h3>
                    <p className="card-description">Continue work across devices</p>
                </div>
            </div>
        </div>
    );
}

export default Apps;