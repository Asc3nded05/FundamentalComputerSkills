function Accounts() {
    // For now, hardcoded user info – later can pass as prop
    const user = {
        name: "User",
        email: "Example@domain.com"
    };

    return (
        <div className="settings-section">
            <h1>Accounts</h1>

            {/* User info block */}
            <div className="settings-user-info">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>

            {/* Rewards & OneDrive row */}
            <div className="account-stats-row">
                <div className="stats-card">
                    <h3 className="card-title">Rewards</h3>
                    <p className="card-description">2756 points</p>
                </div>
                <div className="stats-card">
                    <h3 className="card-title">OneDrive</h3>
                    <p className="card-description">Manage</p>
                </div>
            </div>

            {/* Cloud Storage card (special) */}
            <div className="cloud-storage-card">
                <div className="cloud-storage-header">
                    <h3 className="card-title">Cloud Storage</h3>
                    <span className="cloud-storage-usage">3.8 GB / 5 GB</span>
                    <span className="card-arrow down-arrow">↓</span>
                </div>
                <p className="card-description">
                    This includes files, photos, attachments, and more across your Microsoft account
                </p>
            </div>

            {/* Main settings grid for all other cards */}
            <div className="settings-grid">
                <h2 className="subsection-title">Account settings</h2>
                <div className="settings-card">
                    <h3 className="card-title">Your info</h3>
                    <p className="card-description">Profile photo</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Sign-in options</h3>
                    <p className="card-description">Windows Hello, security key, password, dynamic lock</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Linked devices</h3>
                    <p className="card-description">Find, repair, and manage devices that are signed in with your Microsoft account</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Your accounts</h3>
                    <p className="card-description">Add or manage accounts used in Windows</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Family</h3>
                    <p className="card-description">Manage your family group, edit account types and device permissions</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Windows backup</h3>
                    <p className="card-description">Back up your files, apps, preferences to restore them across devices</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Other users</h3>
                    <p className="card-description">Device access, work or school users, kiosk assigned access</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Access work or school</h3>
                    <p className="card-description">Organization resources like email, apps, and network</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Passkeys</h3>
                    <p className="card-description">Use your face, fingerprint, or PIN to sign in to apps and websites</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
            </div>

            {/* Related settings section */}
            <h2 className="subsection-title">Related settings</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="card-title">Account privacy</h3>
                    <p className="card-description">View your privacy dashboard and manage activity data</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Subscriptions</h3>
                    <p className="card-description">Manage services and subscriptions from Microsoft</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Rewards</h3>
                    <p className="card-description">Earn and redeem points for using your favorite services and more</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Payment options</h3>
                    <p className="card-description">Manage how you pay for purchases with your Microsoft account</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Order history</h3>
                    <p className="card-description">View recent purchases made with your Microsoft account</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Account & billing help</h3>
                    <p className="card-description">Get support for subscriptions, payments, and billing</p>
                    {/* <span className="card-arrow">&rsaquo;</span> */}
                </div>
            </div>
        </div>
    );
}

export default Accounts;