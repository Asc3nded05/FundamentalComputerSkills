import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../css/ContextMenuTaskManager.css';

function ContextMenuTaskManager({ triggerRef, scale, endTask, selectItemId }) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef(null);
    const positionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleDocumentContextMenu = (e) => {
            // If menu is open and click is outside the menu, close it first
            if (visible && menuRef.current && !menuRef.current.contains(e.target)) {
                setVisible(false);
            }

            const container = triggerRef?.current;
            if (!container) return;

            // Only consider clicks inside the desktop container
            if (!container.contains(e.target)) return;

            // Exclude icons, taskbar, and app windows
            // if (
            //     e.target.closest('.app-icon') ||
            //     e.target.closest('.navbar') ||
            //     e.target.closest('.appWindow, .app-window')
            // ) {
            //     return; // let the browser show its own context menu
            // }

            // Valid background click: show our custom menu
            e.preventDefault();
            // setPosition({ x: e.clientX, y: e.clientY });
            positionRef.current = { x: e.clientX, y: e.clientY };
            setPosition({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };

        const handleDocumentClick = (e) => {
            // Left‑click outside the menu closes it
            if (visible && menuRef.current && !menuRef.current.contains(e.target)) {
                setVisible(false);
            }
        };

        document.addEventListener('contextmenu', handleDocumentContextMenu);
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('contextmenu', handleDocumentContextMenu);
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [triggerRef, visible]);
    
    const handleMenuItemClick = (callback) => {
        return (e) => {
            e.stopPropagation(); // Prevent event bubbling
            callback(); // Execute the passed function
            setVisible(false); // Close the menu after click
        };
    };

    if (!visible) return null;

    return createPortal (
        <div
            ref={menuRef}
            className="context-menu-desktop"
            style={{
                position: 'fixed',
                left: positionRef.current.x,
                top: positionRef.current.y,
                zIndex: 1200,
            }}
        >
            <div className="context-menu-item"  onClick={handleMenuItemClick(() => {
                            endTask(selectItemId);
                            // dispatchDesktopEvent('OpenDisplaySettingsFromContextMenu');
                            })}>
                End Task
            </div>
            {/* <div className="context-menu-separator" /> */}
        </div>,
        document.body 
    );
}

export default ContextMenuTaskManager;