function Gaming() {
    return (
        <div className="settings-section">
            <h1>Gaming</h1>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="card-title">Game Bar</h3>
                    <p className="card-description">Controller and keyboard shortcuts</p>
                    <span className="card-arrow">&rsaquo;</span>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Captures</h3>
                    <p className="card-description">Save location, recording preferences</p>
                    <span className="card-arrow">&rsaquo;</span>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Game Mode</h3>
                    <p className="card-description">Optimize your PC for play</p>
                    <span className="card-arrow">&rsaquo;</span>
                </div>
            </div>
        </div>
    );
}

export default Gaming;