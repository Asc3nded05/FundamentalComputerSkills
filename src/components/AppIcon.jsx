import { dispatchDesktopEvent } from "../utils/eventBus";

function AppIcon({ name, icon, eventName, openWindow, variant = "desktop", isAppOpen = false, closeMenu }) {
    const handleIconClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (variant === "taskbar" || variant === "start-menu") {
            openWindow();
            if (variant === "start-menu" && closeMenu) {
                closeMenu();
            }

            dispatchDesktopEvent(eventName);
        }
    };

    const handleDoubleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (variant === "desktop") {
            openWindow();
        }

        dispatchDesktopEvent(eventName);
    };
    return (
        <div 
            tabIndex={0} 
            className={`app-icon ${variant}`} 
            onClick={(variant === "taskbar" || variant === "start-menu") ? handleIconClick : undefined}
            onDoubleClick={variant === "desktop" ? handleDoubleClick : undefined}
        >
            <img className="app-icon-image" src={icon} alt={name} />

            {(variant === "start-menu") && (
                <div className={`app-icon-name app-icon-${variant}`}>{name}</div>
            )}
            {(variant === "desktop") && (
                <div className="app-icon-name">{name}</div>
            )}

            <div className={`app-icon-tooltip ${variant}`}>{name}</div>

            {variant === "taskbar" && isAppOpen && (
                <div className="app-icon-indicator"></div>
            )}

        </div>
    );
}

export default AppIcon;