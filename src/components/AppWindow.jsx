import { Rnd } from 'react-rnd';
import { useState, useEffect } from 'react';
import { dispatchDesktopEvent } from "../utils/eventBus";

function AppWindow({
    name,
    isOpen,
    isMinimized = false,
    isMaximized = false,
    onMinimize,
    onMaximize,
    onClose,
    closeEventName,
    zIndex,
    bringToFront,
    content,
    initialSize = { width: 600, height: 400 },
    scale,
    baseHeight,
    baseWidth,
    offset = 0
}) {

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
                x: (baseWidth - initialSize.width) / 2 + offset, // Center new windows on desktop
                y: (baseHeight - initialSize.height - 56) / 2 + offset,
                width: initialSize.width,
                height: initialSize.height,
            }}
            minWidth={300}
            minHeight={100}
            onMouseDown={handleFocus}
            dragHandleClassName='window-header'
            bounds={"parent"} // prevent dragging outside of desktop area
            className={`appWindow ${isOpen ? 'open' : ''}`}
            style={{ zIndex: zIndex }}
            scale={scale}
        >
            <div className="window">
                <div className="window-header">
                    <div className="top-header">
                        <p>{name}</p>

                        <a
                            href="#"
                            className="appWindowMinimize"
                            // onClick={onMinimize}
                        >
                            ─
                        </a>
                        <a
                            href="#"
                            className="appWindowMaximize"
                            // onClick={onMaximize}
                        >
                            &#9744;
                        </a>
                        <a
                            href="#"
                            className="appWindowClose"
                            onClick={handleClose}>
                            &times;
                        </a>
                    </div>
                </div>
                <div className="window-content">
                    {content}
                </div>
            </div>
        </Rnd>
    );
}

export default AppWindow;