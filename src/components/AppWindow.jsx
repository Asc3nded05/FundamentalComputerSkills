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
    onDragStop,
    onResizeStop,
    zIndex,
    bringToFront,
    content,
    size = { width: 600, height: 400 },
    position,
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

    const windowSize = size;
    const windowPosition = position || {
        x: (baseWidth - windowSize.width) / 2 + offset,
        y: (baseHeight - windowSize.height - 56) / 2 + offset,
    };

    if (!isOpen || isMinimized) return null;

    return (
        <Rnd
            position={windowPosition}
            size={windowSize}
            minWidth={300}
            minHeight={100}
            onMouseDown={handleFocus}
            onDragStop={(e, d) => onDragStop?.({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) => {
                onResizeStop?.({ width: ref.offsetWidth, height: ref.offsetHeight, position });
            }}
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
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onMinimize?.();
                            }}
                        >
                            ─
                        </a>
                        <a
                            href="#"
                            className="appWindowMaximize"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onMaximize?.();
                            }}
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