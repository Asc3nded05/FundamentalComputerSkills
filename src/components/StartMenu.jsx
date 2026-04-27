import { useEffect, useState, useRef } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";
import AppIcon from "./AppIcon.jsx";

import accountIcon from '../assets/Icons/Settings Account Icon.png';
import powerIcon from '../assets/Icons/Power Icon.png';
import lockIcon from '../assets/Icons/Lock.png';
import sleepIcon from '../assets/Icons/Sleep Icon.png';
import restartIcon from '../assets/Icons/Restart.png';

function StartMenu({ closeStartMenu, isOpen, apps = [] }) {
    const nodeRef = useRef(null);
    const [query, setQuery] = useState("");
    const [powerMenuOpen, setPowerMenuOpen] = useState(false);

    const handleClose = () => {
        closeStartMenu();
        setPowerMenuOpen(false);
        dispatchDesktopEvent("StartMenuClose");
    };

    const togglePowerMenu = () => {
        setPowerMenuOpen(!powerMenuOpen);
    };

    const closePowerMenu = () => {
        setPowerMenuOpen(false);
    };

    // Escape to close
    useEffect(() => {
        function handleKey(e) {
            if (!isOpen) return;
            if (e.key === "Escape") {
                closeStartMenu?.();
                dispatchDesktopEvent("StartMenuClosed");
                closePowerMenu();
            }
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, closeStartMenu]);

    // Focus trap
    useEffect(() => {
        if (isOpen && nodeRef.current) {
            const firstFocusable = nodeRef.current.querySelector(
                'button, [href], input, [tabindex]:not([tabindex="-1"])'
            );
            (firstFocusable || nodeRef.current).focus();
            dispatchDesktopEvent("StartMenuOpen");
        }
    }, [isOpen]);

    // Filter apps by search
    const filteredApps = apps.filter(app =>
        query === "" ? true : app.name.toLowerCase().includes(query.toLowerCase())
    );

    // Chunk into rows of 6
    const chunked = [];
    for (let i = 0; i < filteredApps.length; i += 6) {
        chunked.push(filteredApps.slice(i, i + 6));
    }

    // Pad last row with invisible placeholders
    if (chunked.length > 0) {
        const lastRow = chunked[chunked.length - 1];
        while (lastRow.length < 6) {
            lastRow.push({ placeholder: true, id: `placeholder-${lastRow.length}` });
        }
    }

    return (
        <>
            {isOpen && (
                <div className="start-menu-overlay" onMouseDown={handleClose}>
                    <div
                        ref={nodeRef}
                        className={`start-menu ${isOpen ? "open" : ""}`}
                        tabIndex={-1}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="start-menu-top" onClick={closePowerMenu}>
                            <input
                                className="start-menu-search"
                                type="text"
                                placeholder="Search for apps, settings and documents"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        {/* App Grid */}
                        <div className="start-app-grid" onClick={closePowerMenu}>
                            {chunked.map((row, rowIndex) => (
                                <div key={rowIndex} className="start-row">
                                {row.map((app, colIndex) => (
                                    <div key={colIndex} className="start-cell">
                                    {!app.placeholder ? (
                                        <div className="start-menu-tile">
                                        <AppIcon
                                            name={app.name}
                                            icon={app.icon}
                                            eventName={app.eventName}
                                            openWindow={app.openWindow}
                                            variant={app.variant || "start-menu"}
                                            isAppOpen={app.isAppOpen}
                                            closeMenu={handleClose}
                                        />
                                        </div>
                                    ) : (
                                        <div className="start-menu-placeholder start-menu-tile" />
                                    )}
                                    </div>
                                ))}
                                </div>
                            ))}
                        </div>

                        {/* Bottom bar */}
                        <div className="start-menu-bottom">
                            <div className="user-profile-button">
                                <img className="user-profile-image" src={accountIcon} alt="User Profile" />
                                <span>User Profile</span>
                            </div>
                            <div className="power-button" onClick={(e) => {
                                e.stopPropagation();
                                togglePowerMenu();
                            }}>
                                <img src={powerIcon} alt="Power" />
                            </div>
                        </div>
                        {powerMenuOpen && (
                            <div className="power-menu" onClick={(e) => e.stopPropagation()}>
                                <div className="power-menu-item">
                                    <img src={lockIcon} alt="Lock" />
                                    <span>Lock</span>
                                </div>
                                <div className="power-menu-item">
                                    <img src={sleepIcon} alt="Sleep" />
                                    <span>Sleep</span>
                                </div>
                                <div className="power-menu-item">
                                    <img src={powerIcon} alt="Shut down" />
                                    <span>Shut down</span>
                                </div>
                                <div className="power-menu-item">
                                    <img src={restartIcon} alt="Restart" />
                                    <span>Restart</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default StartMenu;