import { useState } from "react";
import '../css/Settings.css';

function Settings() {

    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    // Update state on input change
    const handleSearch = (e) => setQuery(e.target.value);
    
    // Toggle sidebar visibility
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return <>
    <div className="settings">
        <div className="settings-header">
            <button className="hamburger-menu" onClick={toggleSidebar}>☰</button>
            &lt;- Settings
            <input type="text" placeholder="Find a setting..." value={query} onChange={handleSearch}/>
        </div>
        <div className="settings-content">
            <div className={`settings-sidebar ${!sidebarOpen ? 'd-none' : ''}`}>                
                <div className="settings-user-info">
                    <h2>User</h2>
                    <p>Example@domain.com</p>
                </div>
                <div className="settings-button">🏠 Home</div>
                <div className="settings-button">⚙️ System</div>
                <div className="settings-button">🔌 Bluetooth & Devices</div>
                <div className="settings-button">🌐 Network & Internet</div>
                <div className="settings-button">🎨 Personalization</div>
                <div className="settings-button">📱 Apps</div>
                <div className="settings-button">👤 Accounts</div>
                <div className="settings-button">🕐 Time & Language</div>
                <div className="settings-button">🎮 Gaming</div>
                <div className="settings-button">♿ Accessibility</div>
                <div className="settings-button">🔒 Privacy & Security</div>
                <div className="settings-button">📦 Windows Update</div>
            </div>
            <div className="settings-main">

            </div>
        </div>
    </div>

    </>;
}
export default Settings;