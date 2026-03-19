import { useEffect } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";

function Notepad({initialContent=""}) {
    console.log("Notepad initial content:", initialContent);

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
                            dispatchDesktopEvent("NotepadRedo"); // Ctrl+Shift+Z for Redo
                        } else {
                            dispatchDesktopEvent("NotepadUndo"); // Ctrl+Z for Undo
                        }
                        break;
                    case "y": // Ctrl+Y or Command+Y
                        dispatchDesktopEvent("NotepadRedo");
                        break;
                    case "f": // Ctrl+F or Command+F
                        dispatchDesktopEvent("NotepadFind");
                        event.preventDefault();
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

    return ( <>
        <div className="notepad-bottom-nav"> 
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
        </div>
        <div className="notepad-content">
            <textarea 
            className="notepad-body" 
            defaultValue={initialContent}
            // onCopy={() => dispatchDesktopEvent("NotepadCopy")} // Broadast events for copy/paste/cut
            // onCut={() => dispatchDesktopEvent("NotepadCut")}
            // onPaste={() => dispatchDesktopEvent("NotepadPaste")}
            ></textarea>
        </div>
    </>
    );
}

export default Notepad;