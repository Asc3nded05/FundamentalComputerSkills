function PrivacySecurity() {
    return (
        <div className="settings-section">
            <h1>Privacy & security</h1>

            <h2 className="subsection-title">Security</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="card-title">Windows Security</h3>
                    <p className="card-description">Antivirus, browser, firewall, and network protection for your device</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Find my device</h3>
                    <p className="card-description">Track your device if you think you've lost it</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Device encryption</h3>
                    <p className="card-description">Help protect your files from unauthorized access</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
            </div>

            <h2 className="subsection-title">Windows permissions</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="card-title">Recommendations & offers</h3>
                    <p className="card-description">Advertising ID, personalized offers, local content, app launches, settings suggestions, productivity tools</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Speech</h3>
                    <p className="card-description">Online speech recognition for dictation and other voice-based interactions</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Inking & typing personalization</h3>
                    <p className="card-description">Custom dictionary, words in your dictionary</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Diagnostics & feedback</h3>
                    <p className="card-description">Diagnostic data, inking and typing data, feedback frequency</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Search</h3>
                    <p className="card-description">Search history, search apps, cloud content search, search indexing</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
            </div>

            <h2 className="subsection-title">App permissions</h2>
            <div className="settings-grid">
                {[
                    'Location',
                    'Camera',
                    'Microphone',
                    'Voice activation',
                    'Notifications',
                    'Account info',
                    'Contacts',
                    'Calendar',
                    'Phone calls',
                    'Call history',
                    'Email',
                    'Tasks',
                    'Messaging',
                    'Radios',
                    'Other devices',
                    'App diagnostics',
                    'Automatic file downloads',
                    'Documents',
                    'Downloads folder',
                    'Music library',
                    'Pictures',
                    'Videos',
                    'File system',
                    'Screenshot borders',
                    'Screenshots and screen recording',
                    'Text and image generation',
                    'Passkeys'
                ].map(permission => (
                    <div className="settings-card" key={permission}>
                        <h3 className="card-title">{permission}</h3>
                        {/* <span className="card-arrow">&rsaquo;</span> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrivacySecurity;