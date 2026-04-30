import { Rnd } from 'react-rnd';
import { useState, useEffect } from 'react';
import { dispatchDesktopEvent } from "../utils/eventBus";
import Unresponsive from '../components/Unresponsive.jsx';
import { UnresponsiveContext } from '../components/UnresponsiveContext.jsx';
import { useContext } from 'react';


function AppWindow({
    name,
    icon,
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
    const { showUnresponsive, setShowUnresponsive } = useContext(UnresponsiveContext);

    const isThisWindowUnresponsive = showUnresponsive && name === "File Explorer";

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
                        <div className='appName'>
                            {icon && <img src={icon} alt="" className='appName-icon' />}
                            <span>{name}{isThisWindowUnresponsive ? " (Not responding)" : ""}</span>
                        </div>

                        <div className="window-controls">
                        <a
                            href="#"
                            className="appWindowMinimize"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!isThisWindowUnresponsive) {
                                    onMinimize?.();
                                }
                            }}
                        >
                            <i class="fa-regular fa-window-minimize"></i>
                        </a>
                        <a
                            href="#"
                            className="appWindowMaximize"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!isThisWindowUnresponsive) {
                                    onMaximize?.();
                                }
                            }}
                        >
                            <i class="fa-regular fa-window-restore"></i>
                        </a>
                        <a
                            href="#"
                            className="appWindowClose"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!isThisWindowUnresponsive) {
                                    onClose();
                                }
                            }}>
                           <i class="fa-regular fa-x"></i>
                        </a>
                        </div>
                    </div>
                </div>
                <div className={showUnresponsive && name=="File Explorer" ? "file-explorer-unresponsive" : "file-explorer"}>
                    <div className="window-content">
                        {content}
                    </div>
                    {showUnresponsive && name=="File Explorer" && <Unresponsive />}
                </div>

                
            </div>
        </Rnd>
    );
}

export default AppWindow;