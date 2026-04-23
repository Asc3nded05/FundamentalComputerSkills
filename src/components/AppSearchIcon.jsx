import { dispatchDesktopEvent } from "../utils/eventBus";
import "../css/SearchMenu.css"

function AppSearchIcon({ name, icon, eventName, openWindow, isAppOpen = false, closeMenu }) {
    const handleIconClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openWindow();
        closeMenu();
        dispatchDesktopEvent(eventName);
        }

    return (
        <div 
            tabIndex={0} 
            className="search-app-icon" 
            onClick={handleIconClick}
        >   
        <div className="search-app-icon-content">
                <img className="search-app-icon-image" src={icon} alt={name} />
                <div className="search-app-icon-text">
                    <p className="search-app-icon-name">{name}</p>
                    <p className="search-app-icon-type">App</p>
                </div>
            </div>

        </div>
    );
}

export default AppSearchIcon;