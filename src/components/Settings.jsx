import { useState } from "react";
import '../css/Settings.css';
import Personalization from "./settings/Personalization";
import System from "./settings/System";
import BluetoothDevices from "./settings/BluetoothDevices";

function Settings() {

    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('home'); // default page

    // Update state on input change
    const handleSearch = (e) => setQuery(e.target.value);

    // Toggle sidebar visibility
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // NOTE: Later, we can add custom icons for each page instead of emojis
    const pages = {
        home: { name: 'Home', icon: '🏠' },
        system: { name: 'System', icon: '⚙️' },
        bluetooth: { name: 'Bluetooth & Devices', icon: '🔌' },
        network: { name: 'Network & Internet', icon: '🌐' },
        personalization: { name: 'Personalization', icon: '🎨' },
        apps: { name: 'Apps', icon: '📱' },
        accounts: { name: 'Accounts', icon: '👤' },
        time: { name: 'Time & Language', icon: '🕐' },
        gaming: { name: 'Gaming', icon: '🎮' },
        accessibility: { name: 'Accessibility', icon: '♿' },
        privacy: { name: 'Privacy & Security', icon: '🔒' },
        updates: { name: 'Windows Update', icon: '📦' },
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'system':
                return <System/>
            case 'bluetooth':
                return <BluetoothDevices />;
            case 'personalization':
                return <Personalization />;
            default:
                return (
                    <div className="settings-placeholder">
                        <h2>{pages[currentPage]?.name || 'Settings'}</h2>
                        <p>This section is under construction.</p>
                    </div>
                );
        }
    };

    return <>
        <div className="settings">
            <div className="settings-header">
                <button className="hamburger-menu" onClick={toggleSidebar}>☰</button>
                &lt;- Settings
                <input type="text" placeholder="Find a setting..." value={query} onChange={handleSearch} />
            </div>
            <div className="settings-content">
                <div className={`settings-sidebar ${!sidebarOpen ? 'd-none' : ''}`}>
                    <div className="settings-user-info">
                        <h2>User</h2>
                        <p>Example@domain.com</p>
                    </div>
                    {Object.entries(pages).map(([key, { name, icon }]) => (
                        <div
                            key={key}
                            className={`settings-button ${currentPage === key ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentPage(key);
                                setSidebarOpen(false); // Auto-close sidebar on mobile
                            }}
                        >
                            {icon} {name}
                        </div>
                    ))}
                </div>
                <div className="settings-main">
                    {renderContent()}
                </div>
            </div>
        </div>

    </>;
}
export default Settings;