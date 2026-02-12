import { dispatchDesktopEvent } from "../utils/eventBus";

function Notepad() {
    return ( <>
        <div className="notepad-bottom-nav"> 
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
        </div>
        <div className="notepad-content">
            <textarea 
            className="notepad-body" 
            defaultValue="This is the notepad app. You can type anything in here. This is some example text for the copying and pasting lesson.

Here is more example text.

:)"
            onCopy={() => dispatchDesktopEvent("NotepadCopy")} // Broadast events for copy/paste/cut
            onCut={() => dispatchDesktopEvent("NotepadCut")}
            onPaste={() => dispatchDesktopEvent("NotepadPaste")}
            ></textarea>
        </div>
    </>
    );
}

export default Notepad;