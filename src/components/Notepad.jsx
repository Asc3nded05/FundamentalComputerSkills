function Notepad() {
    return ( <>
        <div className="notepad-bottom-nav"> 
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
        </div>
        <div className="notepad-content">
            <textarea className="notepad-body">
                Text here
            </textarea>
        </div>
    </>
    );
}

export default Notepad;