import { useEffect, useRef } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";
import "../css/QuickSettings.css";

function QuickSettings({ isOpen, closeQuickSettings, brightness, setBrightness, volume, setVolume }) {
    const panelRef = useRef(null);

    const handleClose = () => {
        closeQuickSettings();
        dispatchDesktopEvent("QuickSettingsClosed");
    };

    // Close on Escape
    useEffect(() => {
        function handleKey(e) {
            if (!isOpen) return;
            if (e.key === "Escape") handleClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    // Focus management
    useEffect(() => {
        if (isOpen && panelRef.current) {
            const firstFocusable = panelRef.current.querySelector(
                'button, input, [tabindex]:not([tabindex="-1"])'
            );
            (firstFocusable || panelRef.current).focus();
            dispatchDesktopEvent("QuickSettingsOpened");
        }
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="qs-overlay" onMouseDown={handleClose}>
                    <div
                        ref={panelRef}
                        className={`qs-panel ${isOpen ? "open" : ""}`}
                        tabIndex={-1}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {/* Top row toggles */}
                        <div className="qs-grid">
                            <button className="qs-tile" onClick={() => dispatchDesktopEvent("Wifi")}>
                                Wi‑Fi
                            </button>
                            <button className="qs-tile" onClick={() => dispatchDesktopEvent("Bluetooth")}>
                                Bluetooth
                            </button>
                            <button className="qs-tile" onClick={() => dispatchDesktopEvent("AirplaneMode")}>
                                Airplane Mode
                            </button>
                            <button className="qs-tile" onClick={() => dispatchDesktopEvent("BatterySaver")}>
                                Battery Saver
                            </button>
                            <button className="qs-tile" onClick={() => dispatchDesktopEvent("Accessibility")}>
                                Accessibility
                            </button>
                            <button className="qs-tile" onClick={() => dispatchDesktopEvent("Project")}>
                                Project
                            </button>
                        </div>

                        {/* Sliders */}
                        <div className="qs-slider">
                            <label>Brightness</label>
                            <input
                                type="range"
                                min="20"
                                max="120"
                                defaultValue={brightness}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setBrightness(value);
                                    dispatchDesktopEvent("BrightnessChange", { value });
                                }}
                            />
                        </div>

                        <div className="qs-slider">
                            <label>Volume</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                defaultValue={volume}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setVolume(value);
                                    dispatchDesktopEvent("VolumeChange", { value });
                                }}
                            />
                        </div>

                        {/* Battery indicator */}
                        <div className="qs-battery">
                            Battery: 87%
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default QuickSettings;