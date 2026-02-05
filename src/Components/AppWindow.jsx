import { Rnd } from 'react-rnd';
import FileExplorer from './FileExplorer';


function AppWindow({ name, isOpen, onClose, zIndex, bringToFront, content }) {

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    };

    const handleFocus = (e) => {
        // When window is clicked, bring it to front (function is managed by Desktop.jsx)
        e.stopPropagation();
        if (bringToFront) {
            bringToFront();
        }
    };

    return (
        <Rnd 
            default={{
                x: 400,
                y: 100,
                width: 500,
                height: 400,
            }}
            minWidth={300}
            minHeight={100}
            onMouseDown={handleFocus}
            className={`appWindow ${isOpen ? 'open' : ''}`}
            style={{ zIndex: zIndex }}
        >
            <div className="window-content">
                <div className="window-header">
                    <div className="top-header">
                        <p>{name}</p>

                        <a href="#" className="appWindowClose" onClick={handleClose}>
                            ─ &#9744; &times;
                        </a>
                    </div>
                </div>
                {content}
            </div>
        </Rnd>
    );
}

export default AppWindow;