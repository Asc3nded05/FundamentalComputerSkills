import { useEffect, useRef } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus.js";
import AppSearchIcon from "./AppSearchIcon.jsx";
import "../css/SearchMenu.css";

function SearchMenu({ closeSearchMenu, isOpen, apps = [] , query, setQuery}) {
    const nodeRef = useRef(null);

    const handleClose = () => {
        closeSearchMenu();
        dispatchDesktopEvent("SearchClose");
    };

    // Escape to close
    useEffect(() => {
        function handleKey(e) {
            if (!isOpen) return;
            if (e.key === "Escape") {
                handleClose();
            }
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, closeSearchMenu]);

    useEffect(() => {
    if (isOpen) {
        dispatchDesktopEvent("SearchMenuOpen");
    } else {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
}, [isOpen]);

    // Filter apps by search
    const filteredApps = apps.filter(app =>
        query === "" ? true : app.name.toLowerCase().includes(query.toLowerCase())
    );


    return (
        <>
            {isOpen && (
                <div className="search-menu-overlay" onMouseDown={handleClose}>
                    <div
                        ref={nodeRef}
                        className={`search-menu ${isOpen ? "open" : ""}`}
                        tabIndex={-1}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {/* App Grid */}
                        <div className="search-app-grid">
                            {filteredApps.length === 0 ? (
                                <p className="no-results">No apps found</p>
                            ) : (
                                filteredApps.map((app, index) => (
                                        <AppSearchIcon
                                            key={index}
                                            name={app.name}
                                            icon={app.icon}
                                            eventName={app.eventName}
                                            openWindow={app.openWindow}
                                            variant={app.variant || "search-menu"}
                                            isAppOpen={app.isAppOpen}
                                            closeMenu={handleClose}
                                            className="search-apps"
                                        />
                                    )
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchMenu;