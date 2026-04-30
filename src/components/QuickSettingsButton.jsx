import { useSettingsContext } from "../utils/settings/settingsContext";

import wifi from '../assets/Icons/Wifi Full.png';
import noWifiIcon from '../assets/Icons/No Wifi Icon.png';
import speaker from '../assets/Icons/Volume.png';
import battery from '../assets/Icons/Battery.png';
import batterySaverOnIcon from '../assets/Icons/Battery Saver On.png';
import airplaneMode from '../assets/Icons/Airplane Mode.png';

function QuickSettingsButton({ toggleQuickSettings}) {
    const {
        wifiOn, airplaneOn, energyOn
    } = useSettingsContext();

    const wifiIconToShow =
        airplaneOn
            ? airplaneMode
            : !wifiOn
                ? noWifiIcon
                : wifi;
    const batteryIconToShow = energyOn ? batterySaverOnIcon : battery;

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
            {/* <img className="start-button-icon" src={wifi} alt="Wifi" style={{height: '20px', marginRight: '5px'}}/>
            <img className="start-button-icon" src={speaker} alt="Speaker" style={{height: '20px', marginRight: '8px'}}/>
            <img className="start-button-icon" src={battery} alt="Battery" style={{height: '15px', marginRight: '5px'}}/> */}

            <img
                className="start-button-icon"
                src={wifiIconToShow}
                alt="Wifi/Airplane"
                style={{ height: '20px', marginRight: '5px' }}
            />

            <img
                className="start-button-icon"
                src={speaker}
                alt="Speaker"
                style={{ height: '20px', marginRight: '8px' }}
            />

            <img
                className="start-button-icon"
                src={batteryIconToShow}
                alt="Battery"
                style={{ height: '15px', marginRight: '5px' }}
            />
        </div>
    )
}

export default QuickSettingsButton;