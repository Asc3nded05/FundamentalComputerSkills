function Notepad() {
    return ( <>
        <div className="notepad-bottom-nav"> 
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
        </div>
        <div className="notepad-content">
            <textarea className="notepad-body" style={{position:"fixed", width:"100%", height: "100%", resize: "none"}} defaultValue = "Text here"></textarea>
        </div>
    </>
    );
}

export default Notepad;