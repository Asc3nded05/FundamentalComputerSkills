function NotepadApp() {
    return (
        <div>
            <textarea style={{position:"absolute", width:"100%", height: "100%", resize: "none", pointerEvents: "auto"}}>
                Text here
            </textarea>
        </div>
    );
}

export default NotepadApp;