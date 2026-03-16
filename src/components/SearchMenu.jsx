import { useEffect, useRef } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus.js";
import AppIcon from "./AppIcon.jsx";

function StartMenu({ closeStartMenu, isOpen, apps = [] , query, setQuery}) {
    const nodeRef = useRef(null);

    const handleClose = () => {
        closeStartMenu();
        dispatchDesktopEvent("SearchClose");
    };

    // Escape to close
    useEffect(() => {
        function handleKey(e) {
            if (!isOpen) return;
            if (e.key === "Escape") {
                closeStartMenu?.();
                dispatchDesktopEvent("SearchClosed");
            }
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, closeStartMenu]);

    // Focus trap
    useEffect(() => {
        if (isOpen && nodeRef.current) {
            const firstFocusable = nodeRef.current.querySelector('input');
            if (firstFocusable) firstFocusable.focus();
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
                        {/* App Grid */}
                        <div className="start-app-grid">
                            {filteredApps.map((app, index) => (
                                <div key={index} className="start-row">
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
                                            className="search-apps"
                                        />
                                        </div>
                                    ) : (
                                        <div className="start-menu-placeholder start-menu-tile" />
                                    )}
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default StartMenu;