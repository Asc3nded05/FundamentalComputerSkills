import React, { useState, useEffect, useRef } from 'react';
import '../css/ContextMenuDesktop.css';
import { dispatchDesktopEvent } from '../utils/eventBus';

function ContextMenuDesktop({ triggerRef, scale, openApp }) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef(null);

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
            if (
                e.target.closest('.app-icon') ||
                e.target.closest('.navbar') ||
                e.target.closest('.appWindow, .app-window')
            ) {
                return; // let the browser show its own context menu
            }

            // Valid background click: show our custom menu
            e.preventDefault();
            setPosition({ x: e.pageX, y: e.pageY });
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

    return (
        <div
            ref={menuRef}
            className="context-menu-desktop"
            style={{
                left: position.x,
                top: position.y,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',  // keeps the menu anchored at the cursor
                zIndex: 1200,
            }}
        >
            <div className="context-menu-item">
                View
            </div>
            <div className="context-menu-item">
                Sort By
            </div>
            <div className="context-menu-item">
                Refresh
            </div>
            <div className="context-menu-item">
                New
            </div>
            <div className="context-menu-separator" />
            <div className="context-menu-item" onClick={handleMenuItemClick(() => {
                openApp('Settings', {startingPage: 'system'});
                dispatchDesktopEvent('OpenDisplaySettingsFromContextMenu');
                })}>
                Display Settings
            </div>
            <div className="context-menu-item" onClick={handleMenuItemClick(() => {
                openApp('Settings', {startingPage: 'personalization'});
                dispatchDesktopEvent('OpenPersonalizationSettingsFromContextMenu');
                })}>
                Personalize
            </div>
        </div>
    );
}

export default ContextMenuDesktop;