function AppIcon({ name, desktopIcon, iconStyling }) {
    return (
        <div className="icon-group">
            <img className={iconStyling} src={desktopIcon} alt="Icon" />
            <h3>{name}</h3>
        </div>
    );
}

export default AppIcon;