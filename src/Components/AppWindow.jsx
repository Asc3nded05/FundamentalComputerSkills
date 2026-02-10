import { Rnd } from 'react-rnd';

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
                width: 600,
                height: 400,
            }}
            minWidth={300}
            minHeight={100}
            onMouseDown={handleFocus}
            dragHandleClassName='window-header'
            bounds={"parent"} // prevent dragging outside of desktop area
            className={`appWindow ${isOpen ? 'open' : ''}`}
            style={{ zIndex: zIndex }}
        >
            <div className="window-content">
                <div className="window-header">
                    <div className="top-header">
                        <p>{name}</p>

                        <a href="#" className="appWindowMinimize"> 
                            ─
                        </a>
                        <a href="#" className="appWindowMaximize"> 
                            &#9744;
                        </a>
                        <a href="#" className="appWindowClose" onClick={handleClose}> 
                            &times;
                        </a>
                    </div>
                </div>
                {content}
            </div>
        </Rnd>
    );
}

export default AppWindow;