
import Home from "./settings/Home";
import System from "./settings/System";
import BluetoothDevices from "./settings/BluetoothDevices";
import Network from "./settings/Network";
import Personalization from "./settings/Personalization";
import Apps from "./settings/Apps";
import Accounts from "./settings/Accounts";
import TimeLanguage from "./settings/TimeLanguage";
import Gaming from "./settings/Gaming";
import Accessibility from "./settings/Accessibility";
import PrivacySecurity from "./settings/PrivacySecurity";
import WindowsUpdate from "./settings/WindowsUpdate";

import '../css/Settings.css';

import { useEffect, useState } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";

function Settings({ startingPage = 'home', backgroundImage, onBackgroundChange, onResetDefault  }) {

    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(startingPage); // default page (can be passed from different places to open to specific pages)
    const [navigation, setNavigation] = useState({ page: 'home', subpage: null }); // For swapping to specific page with a button click

    // Update internal state when the prop changes (e.g., when re‑opening the same window)
    useEffect(() => {
        setCurrentPage(startingPage);
    }, [startingPage]);

    // Update state on input change
    const handleSearch = (e) => setQuery(e.target.value);

    // Toggle sidebar visibility
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // NOTE: Later, we can add custom icons for each page instead of emojis
    const pages = {
        home: { name: 'Home', icon: '🏠', event: 'SettingsHomePageClicked' },
        system: { name: 'System', icon: '⚙️', event: 'SettingsSystemPageClicked' },
        bluetooth: { name: 'Bluetooth & Devices', icon: '🔌', event: 'SettingsBluetoothPageClicked' },
        network: { name: 'Network & Internet', icon: '🌐', event: 'SettingsNetworkPageClicked' },
        personalization: { name: 'Personalization', icon: '🎨', event: 'SettingsPersonalizationPageClicked' },
        apps: { name: 'Apps', icon: '📱', event: 'SettingsAppsPageClicked' },
        accounts: { name: 'Accounts', icon: '👤', event: 'SettingsAccountsPageClicked' },
        time: { name: 'Time & Language', icon: '🕐', event: 'SettingsTimeLanguagePageClicked' },
        gaming: { name: 'Gaming', icon: '🎮', event: 'SettingsGamingPageClicked' },
        accessibility: { name: 'Accessibility', icon: '♿', event: 'SettingsAccessibilityPageClicked' },
        privacy: { name: 'Privacy & Security', icon: '🔒', event: 'SettingsPrivacySecurityPageClicked' },
        updates: { name: 'Windows Update', icon: '📦', event: 'SettingsUpdatePageClicked' },
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <Home setCurrentPage={setCurrentPage} />
            case 'system':
                return <System/>
            case 'bluetooth':
                return <BluetoothDevices />;
            case 'network':
                return <Network/>
            case 'personalization':
                return <Personalization 
                    backgroundImage={backgroundImage}
                    onBackgroundChange={onBackgroundChange}
                    onResetDefault={onResetDefault}
                />;
            case 'apps':
                return <Apps/>
            case 'accounts':
                return <Accounts/>
            case 'time':
                return <TimeLanguage/>
            case 'gaming':
                return <Gaming/>
            case 'accessibility':
                return <Accessibility/>
            case 'privacy':
                return <PrivacySecurity/>
            case 'updates':
                return <WindowsUpdate/>
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
                                setSidebarOpen(false);
                                dispatchDesktopEvent(pages[key].event);
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