import wifi from "../assets/WifiPlaceholder.png"
import speaker from "../assets/SpeakerPlaceholder.jpg"
import battery from "../assets/BatteryPlaceholder.svg"

function QuickSettingsButton({ toggleQuickSettings }) {
    const stop = (e) => {
        // Prevent the document-level outside-click handler from running
        // so the toggle handler can run alone and correctly close the menu.
        if (e && e.stopPropagation) e.stopPropagation();
    };

    return (
        <div
            className="quick-settings-button"
            onClick={toggleQuickSettings}
            onMouseDown={stop}
            onTouchStart={stop}
        >
            <img className="start-button-icon" src={wifi} alt="Wifi" />
            <img className="start-button-icon" src={speaker} alt="Speaker" />
            <img className="start-button-icon" src={battery} alt="Battery" />
        </div>
    )
}

export default QuickSettingsButton;