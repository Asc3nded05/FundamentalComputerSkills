import { useEffect, useState } from "react";
import { dispatchDesktopEvent } from "../utils/eventBus";

function Notepad({initialContent="", query, setQuery}) {

    const [text, setText] = useState(initialContent);

    const handleChange = (event) => {
        setText(event.target.value); // Get text as user types
    };

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
        <div className="notepad-bottom-top-nav"> 
            <div className="notepad-options">
                <button>File</button>
                <button>Edit</button>
                <button>View</button>
            </div>
            <div className="notepad-find-options">
                <input id="myInput" type="text" placeholder="Find..." className="notepad-find" value={query} onClick={searchText} />
                <button className="notepad-find-next" onClick={() => dispatchDesktopEvent("NotepadFindNext")}>Next</button>
                <button className="notepad-find-prev" onClick={() => dispatchDesktopEvent("NotepadFindPrev")}>Prev</button>
            </div>
        </div>
        <div className="notepad-content">
            <textarea 
            id="myTextArea"
            className="notepad-body" 
            defaultValue={initialContent}
            value={text}
            onChange={handleChange}
            // onCopy={() => dispatchDesktopEvent("NotepadCopy")} // Broadast events for copy/paste/cut
            // onCut={() => dispatchDesktopEvent("NotepadCut")}
            // onPaste={() => dispatchDesktopEvent("NotepadPaste")}
            ></textarea>
        </div>
    </>
    );
}

function searchText() {
    const searchTerm = document.getElementById("myInput").value;
    const textArea = document.getElementById("myTextArea");
    const text = textArea.value;
    const index = text.indexOf(searchTerm);
  
    if (index !== -1) {
      textArea.focus(); // Must focus for selection to be visible
      textArea.setSelectionRange(index, index + searchTerm.length);
    } else {
      alert("Not found");
    }
  };

export default Notepad;