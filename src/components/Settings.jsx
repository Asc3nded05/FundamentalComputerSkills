
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

import homeIcon from '../assets/Icons/Settings Home Icon.png';
import systemIcon from '../assets/Icons/Settings System Icon.png';
import bluetoothIcon from '../assets/Icons/Settings Bluetooth and Devices Icon.png';
import networkIcon from '../assets/Icons/Settings Network and Internet Icon.png';
import personalizationIcon from '../assets/Icons/Settings Personalization Icon.png';
import appsIcon from '../assets/Icons/Settings Apps Icon.png';
import accountsIcon from '../assets/Icons/Settings Account Icon.png';
import timeIcon from '../assets/Icons/Settings Time and Language Icon.png';
import gamingIcon from '../assets/Icons/Settings Gaming Icon.png';
import accessibilityIcon from '../assets/Icons/Settings Accessibility Icon.png';
import privacyIcon from '../assets/Icons/Settings Privacy and Security Icon.png';
import updatesIcon from '../assets/Icons/Settings Windows Update Icon.png';

import '../css/Settings.css';

import { useEffect, useState } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";
import { useSettingsContext } from "../utils/settings/settingsContext";

function Settings({ startingPage = 'home', currentPage: currentPageProp, settingsState = {}, onSettingsStateChange, backgroundImage, onBackgroundChange, onResetDefault, onPageChange }) {

    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(currentPageProp || startingPage); // default page (can be passed from different places to open to specific pages)

    // Update internal state when props change (e.g., when re‑opening the same window)
    useEffect(() => {
        setCurrentPage(currentPageProp || startingPage);
    }, [currentPageProp, startingPage]);

    // Update state on input change
    const handleSearch = (e) => setQuery(e.target.value);

    // Toggle sidebar visibility
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const pages = {
        home: { name: 'Home', icon: homeIcon, event: 'SettingsHomePageClicked' },
        system: { name: 'System', icon: systemIcon, event: 'SettingsSystemPageClicked' },
        bluetooth: { name: 'Bluetooth & Devices', icon: bluetoothIcon, event: 'SettingsBluetoothPageClicked' },
        network: { name: 'Network & Internet', icon: networkIcon, event: 'SettingsNetworkPageClicked' },
        personalization: { name: 'Personalization', icon: personalizationIcon, event: 'SettingsPersonalizationPageClicked' },
        apps: { name: 'Apps', icon: appsIcon, event: 'SettingsAppsPageClicked' },
        accounts: { name: 'Accounts', icon: accountsIcon, event: 'SettingsAccountsPageClicked' },
        time: { name: 'Time & Language', icon: timeIcon, event: 'SettingsTimeLanguagePageClicked' },
        gaming: { name: 'Gaming', icon: gamingIcon, event: 'SettingsGamingPageClicked' },
        accessibility: { name: 'Accessibility', icon: accessibilityIcon, event: 'SettingsAccessibilityPageClicked' },
        privacy: { name: 'Privacy & Security', icon: privacyIcon, event: 'SettingsPrivacySecurityPageClicked' },
        updates: { name: 'Windows Update', icon: updatesIcon, event: 'SettingsUpdatePageClicked' },
    };

    const {
        username, 
        userEmail
    } = useSettingsContext();

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <Home navigateToPage={(page) => {
                    setCurrentPage(page);
                    onPageChange?.(page);
                }} />
            case 'system':
                return <System/>
            case 'bluetooth':
                return <BluetoothDevices
                    subPage={settingsState?.bluetoothSubPage || 'main'}
                    onSubPageChange={(subPage) => onSettingsStateChange?.({ bluetoothSubPage: subPage })}
                />;
            case 'network':
                return <Network
                    subPage={settingsState?.networkSubPage || 'main'}
                    onSubPageChange={(subPage) => onSettingsStateChange?.({ networkSubPage: subPage })}
                />;
            case 'personalization':
                return <Personalization 
                    subPage={settingsState?.personalizationSubPage || 'main'}
                    onSubPageChange={(subPage) => onSettingsStateChange?.({ personalizationSubPage: subPage })}
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
                        <h2>{username}</h2>
                        <p>{userEmail}</p>
                    </div>
                    {Object.entries(pages).map(([key, { name, icon }]) => (
                        <div
                            key={key}
                            className={`settings-button ${currentPage === key ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentPage(key);
                                setSidebarOpen(false);
                                onPageChange?.(key);
                                dispatchDesktopEvent(pages[key].event);
                            }}
                        >
                            <img src={icon} style={{width: '20px'}}></img> {name}
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