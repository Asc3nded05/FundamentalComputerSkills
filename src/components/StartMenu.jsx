import { useEffect, useState, useRef } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { dispatchDesktopEvent } from "../utils/eventBus";
import AppIcon from './AppIcon.jsx';

const ResponsiveGridLayout = WidthProvider(Responsive);

function StartMenu({ closeStartMenu, isOpen, apps = [] }) {
    const nodeRef = useRef(null);

    // Generate grid layout for apps (6 columns, auto-positioned)
    const generateLayout = () => {
        return apps.map((app, idx) => ({
            i: `app-${idx}`,
            x: idx % 6,
            y: Math.floor(idx / 6),
            w: 1,
            h: 1,
            static: true
        }));
    };

    const handleClose = () => {
        closeStartMenu();
        dispatchDesktopEvent("StartMenuClose");
    }

    // Close on Escape and manage focus
    useEffect(() => {
        function handleKey(e) {
            if (!isOpen) return;
            if (e.key === "Escape") {
                closeStartMenu?.();
                dispatchDesktopEvent("StartMenuClosed");
            }
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, closeStartMenu]);

    // Move focus into menu when opened
    useEffect(() => {
        if (isOpen && nodeRef.current) {
            const firstFocusable = nodeRef.current.querySelector(
                'button, [href], input, [tabindex]:not([tabindex="-1"])'
            );
            (firstFocusable || nodeRef.current).focus();

            dispatchDesktopEvent("StartMenuOpen");
        }
    }, [isOpen]);

    const [query, setQuery] = useState('');
  
    // Update state on input change
    const handleSearch = (e) => setQuery(e.target.value);

    return (
        <>
            {isOpen && (
                <div
                    className="start-menu-overlay"
                    onMouseDown={handleClose}>
                        <div
                            ref={nodeRef}
                            className={`start-menu ${isOpen ? 'open' : ''}`}
                            tabIndex={-1}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            {apps.length === 0 ? (
                                <div className="start-empty">No apps installed</div>
                            ) : (
                                <ResponsiveGridLayout
                                    className="start-app-grid"
                                    layouts={{ lg: generateLayout() }}
                                    breakpoints={{ lg: 1200, md: 600, sm: 300, xs: 0 }}
                                    cols={{ lg: 6, md: 6, sm: 6, xs: 6 }}
                                    rowHeight={100}
                                    width={588} // 600px container - 12px padding
                                    compactType={null}
                                    preventCollision={true}
                                    isDraggable={false}
                                    isResizable={false}
                                >
                                    {apps.filter(app => {
                                        if (query === '') {
                                            return app;
                                        } else if (app.name.toLowerCase().includes(query.toLowerCase())) {
                                            return app;
                                        }
                                    }).map((app, idx) => (
                                        <div key={`app-${idx}`} className="start-menu-grid-item">
                                            <AppIcon
                                                name={app.name}
                                                icon={app.icon}
                                                eventName={app.eventName}
                                                openWindow={app.openWindow}
                                                variant={app.variant || 'start-menu'}
                                                isAppOpen={app.isAppOpen}
                                                closeMenu={handleClose}
                                            />
                                        </div>
                                    ))}
                                </ResponsiveGridLayout>
                            )}

                            <div className="start-menu-bottom">
                                <div className="user-profile-button">User Profile</div>
                                <input type="text" placeholder="Search..." value={query} onChange={handleSearch}/>
                                <div className="power-button">Power Button</div>
                            </div>
                        </div>
                    </div>
            )}
        </>
    )
}

export default StartMenu;