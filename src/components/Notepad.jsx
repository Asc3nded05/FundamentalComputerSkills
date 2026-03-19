import { dispatchDesktopEvent } from "../utils/eventBus";

function Notepad({initialContent=""}) {
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
            onCopy={() => dispatchDesktopEvent("NotepadCopy")} // Broadast events for copy/paste/cut
            onCut={() => dispatchDesktopEvent("NotepadCut")}
            onPaste={() => dispatchDesktopEvent("NotepadPaste")}
            // onUndo={() => dispatchDesktopEvent("NotepadUndo")} //Broadcast undo/redo events
            // onRedo={() => dispatchDesktopEvent("NotepadRedo")}
            // onFind={() => dispatchDesktopEvent("NotepadFind")} // Broadcast find and select all events
            // onSelectAll={() => dispatchDesktopEvent("NotepadSelectAll")}
            ></textarea>
        </div>
    </>
    );
}

export default Notepad;