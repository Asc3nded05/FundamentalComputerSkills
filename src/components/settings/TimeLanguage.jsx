import Clock from '../Clock'; 

function TimeLanguage() {
    return (
        <div className="settings-section">
            <h1>Time & language</h1>

            {/* Current time and date block */}
            <div className="time-date-block">
                <Clock />
            </div>

            {/* Time zone info */}
            <h3 className="card-title">Time zone</h3>
            <p className="card-description">(UTC-05:00) Eastern Time (US & Canada)</p>
            
            <h3 className="card-title">Region</h3>
            <p className="card-description">United States</p>

            {/* Settings grid */}
            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="card-title">Date & time</h3>
                    <p className="card-description">Time zones, automatic clock settings, calendar display</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Language & region</h3>
                    <p className="card-description">Windows display language, preferred languages, regional formats</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Typing</h3>
                    <p className="card-description">Touch keyboard, text suggestions, preferences</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Speech</h3>
                    <p className="card-description">Speech language, speech recognition microphone setup, voices</p>
                </div>
            </div>
        </div>
    );
}

export default TimeLanguage;