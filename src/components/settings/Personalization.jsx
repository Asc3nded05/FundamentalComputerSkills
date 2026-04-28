import { useState, useRef, useEffect } from 'react';
import { dispatchDesktopEvent } from '../../utils/eventBus';


const Personalization = ({ subPage = 'main', onSubPageChange, backgroundImage, onBackgroundChange, onResetDefault }) => {
    const [bgType, setBgType] = useState('picture');
    const [solidColor, setSolidColor] = useState('#0078d4');

    const solidColorTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (solidColorTimeoutRef.current) clearTimeout(solidColorTimeoutRef.current);
        };
    }, []);

    const handleFileUpload = (e) => {
        dispatchDesktopEvent('SettingsPersonalizationBackgroundImageUploaded');
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => onBackgroundChange(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    const generateSolidColorDataUrl = (color) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        return canvas.toDataURL();
    };

    const handleSolidColorChange = (e) => {
        const newColor = e.target.value;
        setSolidColor(newColor);
        const dataUrl = generateSolidColorDataUrl(newColor);
        onBackgroundChange(dataUrl);
        if (solidColorTimeoutRef.current) clearTimeout(solidColorTimeoutRef.current);
        solidColorTimeoutRef.current = setTimeout(() => {
            dispatchDesktopEvent('SettingsPersonalizationBackgroundColorSet');
        }, 500);
    };

    // Main view: list of personalization categories
    if (subPage === 'main') {
        return (
            <div className="settings-section">
                <h1>Personalization</h1>
                <div className="settings-grid">
                    <div className="settings-card interactable" onClick={() => {
                        onSubPageChange?.('background');
                        dispatchDesktopEvent('SettingsPersonalizationBackgroundSubPageClicked');
                    }}>
                        <h3 className="card-title">Background</h3>
                        <p className="card-description">Background image, color, slideshow</p>
                        <span className="card-arrow">&rsaquo;</span>
                    </div>

                    <div className="settings-card">
                        <h3 className="card-title">Colors</h3>
                        <p className="card-description">Accent color, transparency effects, color theme</p>
                    </div>

                    <div className="settings-card">
                        <h3 className="card-title">Themes</h3>
                        <p className="card-description">Install, create, manage</p>
                    </div>

                    <div className="settings-card">
                        <h3 className="card-title">Dynamic Lighting</h3>
                        <p className="card-description">Connected devices, effects, app settings</p>
                    </div>
                    <div className="settings-card">
                        <h3 className="card-title">Lock screen</h3>
                        <p className="card-description">Lock screen images, apps, animations</p>
                    </div>
                    <div className="settings-card">
                        <h3 className="card-title">Text input</h3>
                        <p className="card-description">Touch keyboard, voice typing, emoji and more, input method editor</p>
                    </div>
                    <div className="settings-card">
                        <h3 className="card-title">Start</h3>
                        <p className="card-description">Recent apps and items, folders</p>
                    </div>
                    <div className="settings-card">
                        <h3 className="card-title">Taskbar</h3>
                        <p className="card-description">Taskbar behaviors, system pins</p>
                    </div>
                    <div className="settings-card">
                        <h3 className="card-title">Fonts</h3>
                        <p className="card-description">Install, manage</p>
                    </div>
                    <div className="settings-card">
                        <h3 className="card-title">Device usage</h3>
                        <p className="card-description">Select all the ways you plan to use your devices to get personalized tips, ads, and recommendations within Microsoft experiences.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Background sub-page
    if (subPage === 'background') {
        return (
            <div className="settings-section">
                <button className="back-button" onClick={() => {onSubPageChange?.('main'); dispatchDesktopEvent('SettingsPersonalizationPageClicked')}}>
                    ← Back to Personalization
                </button>
                <h1>Background</h1>
                <p className="section-description">Personalize your background</p>

                <div className="settings-grid">
                    <div className="settings-card">
                        <h3 className="card-title">Current background</h3>
                        <div className="background-preview">
                            <img
                                src={backgroundImage}
                                alt="Current background"
                                className="background-thumbnail"
                            />
                        </div>
                    </div>

                    <div className="settings-card">
                        <h3 className="card-title">Choose your background</h3>
                        <select
                            className="settings-select interactable"
                            value={bgType}onChange={(e) => {
                                const newBgType = e.target.value;
                                setBgType(newBgType);
                                
                                if (newBgType === 'picture') {
                                    dispatchDesktopEvent('SettingsPersonalizationBackgroundPictureSelected');
                                } else if (newBgType === 'solid') {
                                    dispatchDesktopEvent('SettingsPersonalizationBackgroundColorSelected');
                                }
                            }}
                        >
                            <option value="picture">Picture</option>
                            <option value="solid">Solid color</option>
                            {/* <option value="slideshow">Slideshow</option> */}
                        </select>
                        {bgType === 'picture' && (
                            <>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => document.getElementById('bg-upload').click()}
                                >
                                    Choose a photo
                                </button>
                                <input
                                    type="file"
                                    id="bg-upload"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        dispatchDesktopEvent('SettingsPersonalizationBackgroundResetClicked');
                                        onResetDefault();
                                    }
                                    }
                                >
                                    Reset to default
                                </button>
                            </>
                        )}
                        {bgType === 'solid' && (
                            <>
                                <div className="color-picker-section">
                                    <label>Background color</label>
                                    <input 
                                        type="color" 
                                        value={solidColor}   
                                        onChange={handleSolidColorChange}
                                    />
                                </div>
                            </>
                        )
                        }
                    </div>

                    <div className="settings-card">
                        <h3 className="card-title">Contrast Themes</h3>
                        <p className="card-description">Color themes for low vision, light sensitivity</p>
                    </div>
                    <div className="settings-card">
                        <h3 className="card-title">Help with Background</h3>

                        <p className="card-description">Get help</p>
                        <p className="card-description">Give feedback</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Personalization;