function Accessibility() {
    return (
        <div className="settings-section">
            <h1>Accessibility</h1>

            <h2 className="subsection-title">Vision</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="card-title">Text size</h3>
                    <p className="card-description">Text size that appears throughout Windows and your apps</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Visual effects</h3>
                    <p className="card-description">Scroll bars, transparency, animations, notification timeout</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Mouse pointer and touch</h3>
                    <p className="card-description">Mouse pointer color, size</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Text cursor</h3>
                    <p className="card-description">Appearance and thickness, text cursor indicator</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Magnifier</h3>
                    <p className="card-description">Magnifier reading, zoom increment</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Color filters</h3>
                    <p className="card-description">Colorblindness filters, grayscale, inverted</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Contrast themes</h3>
                    <p className="card-description">Color themes for low vision, light sensitivity</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Narrator</h3>
                    <p className="card-description">Voice, verbosity, keyboard, braille</p>
                </div>
            </div>

            <h2 className="subsection-title">Hearing</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="card-title">Audio</h3>
                    <p className="card-description">Mono audio, audio notifications</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Hearing devices</h3>
                    <p className="card-description">Presets, environment sound control, audio routing</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Captions</h3>
                    <p className="card-description">Styles, live captions</p>
                </div>
            </div>

            <h2 className="subsection-title">Interaction</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3 className="card-title">Speech</h3>
                    <p className="card-description">Voice access, voice typing</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Keyboard</h3>
                    <p className="card-description">Sticky, Filter, and Toggle keys, on‑screen keyboard</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Mouse</h3>
                    <p className="card-description">Mouse keys, speed, acceleration</p>
                </div>
                <div className="settings-card">
                    <h3 className="card-title">Eye control</h3>
                    <p className="card-description">Eye tracker, text‑to‑speech</p>
                </div>
            </div>
        </div>
    );
}

export default Accessibility;