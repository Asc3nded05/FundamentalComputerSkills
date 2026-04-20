import React from "react";
import { useEffect, useRef, useState } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";
import Mark from "mark.js";

function Notepad({ initialContent = "Hello, this is text", onContentChange }) {

    const notepadRef = useRef(null);
    const contentRef = useRef(initialContent ?? "Hello, this is text");
    const hasInitializedContent = useRef(false);
    const [searchTerm, setSearchterm] = useState("");
    const [currentMark, setCurrentMark] = useState(-1);
    const [totalMarks, setTotalMarks] = useState(0);

    useEffect(() => {
        if (hasInitializedContent.current) return;

        const nextText = initialContent ?? "Hello, this is text";
        contentRef.current = nextText;
        if (notepadRef.current) {
            notepadRef.current.innerText = nextText;
        }
        hasInitializedContent.current = true;
    }, [initialContent]);

    const handleSearch = (event) => {
        const query = event.target.value;
        const markInstance = new Mark(document.querySelector("#search-node"));
        setSearchterm(query);
        markInstance.unmark({
            done: () => {
                markInstance.mark(query, {
                    done: (count) => {
                        setTotalMarks(count);
                        setCurrentMark(count > 0 ? 0 : -1)
                    },
                });
            }
        });
    };

    const handleContentInput = (event) => {
        const nextContent = event.currentTarget.innerText;
        contentRef.current = nextContent;
        onContentChange?.(nextContent);
    };

    // Update active mark on currentMark change (Next/Prev buttons)
    useEffect(() => {
        const marks = document.querySelectorAll("#search-node mark");
        marks.forEach((m, i) => {
            m.classList.toggle('active', i === currentMark); // Add 'active' class to current mark
        });
    }, [currentMark]);

    const findNext = () => {
        dispatchDesktopEvent("NotepadFindNext");
        setCurrentMark(prev => ((prev % totalMarks) + 1))

    };

    const findPrev = () => {
        dispatchDesktopEvent("NotepadFindPrev");
        setCurrentMark(prev => (prev - 2 + totalMarks) % totalMarks + 1)
    };

    const showFindBar = () => {
        const findBar = document.querySelector(".notepad-find-options");
        if (findBar) {
            findBar.style.display = "flex"; // Show the find bar
            const input = document.querySelector(".notepad-find");
            if (input) {
                input.focus(); // Focus the input field
            }
        }
    };

    const closeFindBar = () => {
        const findBar = document.querySelector(".notepad-find-options");
        if (findBar) {
            findBar.style.display = "none"; // Hide the find bar
            setSearchterm(""); // Clear search term state
            const markInstance = new Mark(document.querySelector("#search-node"));
            markInstance.unmark(); // Remove highlights when closing find bar
        }
        setSearchterm(""); // Clear search term state
        setCurrentMark(-1);
        setTotalMarks(0);
    };


    // Keyboard shortcut broadcasting
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey || event.metaKey) { // Check for Ctrl (Windows) or Command (Mac)
                switch (event.key.toLowerCase()) {
                    case "c": // Ctrl+C or Command+C
                        dispatchDesktopEvent("NotepadCopy");
                        break;
                    case "x": // Ctrl+X or Command+X
                        dispatchDesktopEvent("NotepadCut");
                        break;
                    case "v": // Ctrl+V or Command+V
                        dispatchDesktopEvent("NotepadPaste");
                        break;
                    case "z": // Ctrl+Z or Command+Z
                        if (event.shiftKey) { // Check if Shift is also pressed
                            dispatchDesktopEvent("NotepadRedoZ"); // Ctrl+Shift+Z for Redo
                        } else {
                            dispatchDesktopEvent("NotepadUndo"); // Ctrl+Z for Undo
                        }
                        break;
                    case "y": // Ctrl+Y or Command+Y
                        dispatchDesktopEvent("NotepadRedoY");
                        break;
                    case "f": // Ctrl+F or Command+F
                        event.preventDefault();
                        dispatchDesktopEvent("NotepadFind");
                        showFindBar();
                        break;
                    case "a": // Ctrl+A or Command+A
                        dispatchDesktopEvent("NotepadSelectAll");
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown); // Cleanup on unmount
        };
    }, []);

    return (<>
        <div className="notepad-full">
            <div className="notepad-find-options" style={{ display: "none" }}>
                <input id="myInput" type="text" placeholder="Find..." className="notepad-find" value={searchTerm} onChange={handleSearch} />
                <div className="notepad-find-counter">
                    {currentMark > 0
                        ? `${currentMark}/${totalMarks}`
                        : "0/0"}
                </div>
                <button className="notepad-find-next-prev" onClick={findNext}>Next</button>
                <button className="notepad-find-next-prev" onClick={findPrev}>Prev</button>
                <button className="notepad-find-close" onClick={closeFindBar}>x</button>
            </div>
            <div className="notepad-inner">
            <div className="notepad-bottom-top-nav">
                <div className="notepad-options">
                    <button>File</button>
                    <button>Edit</button>
                    <button>View</button>
                </div>
            </div>
            <div id="search-node" className="notepad-content">
                <p
                    ref={notepadRef}
                    id="myTextArea"
                    className="notepad-body"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onInput={handleContentInput} 
                    onMouseDown={closeFindBar}
                />
            </div>
            </div>
        </div>
    </>
    );
}

export default Notepad;