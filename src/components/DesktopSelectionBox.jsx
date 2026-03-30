import { useState, useEffect, useRef } from 'react';

function DesktopSelectionBox({ containerRef, shouldStartSelecting }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  const container = containerRef?.current;

  // Start dragging
  const handleMouseDown = (e) => {
    if (shouldStartSelecting && !shouldStartSelecting(e, e.target)) return;
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setCurrentPos({ x: e.clientX, y: e.clientY });
  };

  // Update during drag
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentPos({ x: e.clientX, y: e.clientY });
  };

  // End drag
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Attach global mouse events when dragging starts
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Attach mousedown listener to the container
  useEffect(() => {
    if (!container) return;
    container.addEventListener('mousedown', handleMouseDown);
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
    };
  }, [container, shouldStartSelecting]);

  // Get container bounding rect (in viewport coordinates)
  const getContainerRect = () => {
    if (!container) return null;
    return container.getBoundingClientRect();
  };

  // Compute the intersection of the selection rectangle with the container
  const getClippedRect = () => {
    if (!isDragging) return null;

    const containerRect = getContainerRect();
    if (!containerRect) return null;

    // Selection rectangle in viewport coordinates
    const left = Math.min(startPos.x, currentPos.x);
    const right = Math.max(startPos.x, currentPos.x);
    const top = Math.min(startPos.y, currentPos.y);
    const bottom = Math.max(startPos.y, currentPos.y);

    // Clip to container bounds
    const clipLeft = Math.max(left, containerRect.left);
    const clipRight = Math.min(right, containerRect.right);
    const clipTop = Math.max(top, containerRect.top);
    const clipBottom = Math.min(bottom, containerRect.bottom);

    if (clipLeft >= clipRight || clipTop >= clipBottom) {
      return null; // No visible area
    }

    return {
      left: clipLeft,
      top: clipTop,
      width: clipRight - clipLeft,
      height: clipBottom - clipTop,
    };
  };

  const rect = getClippedRect();
  if (!rect) return null;

  return (
    <div
      className="selection-box"
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      }}
    />
  );
}

export default DesktopSelectionBox;