import windowsIcon from '../assets/Icons/Windows Icon.png';

function StartButton({ toggleStartMenu }) {
    const stop = (e) => {
        // Prevent the document-level outside-click handler from running
        // so the toggle handler can run alone and correctly close the menu.
        if (e && e.stopPropagation) e.stopPropagation();
    };

    return (
        <div
            className="start-button"
            onClick={toggleStartMenu}
            onMouseDown={stop}
            onTouchStart={stop}
        >
            <img className="start-button-icon" src={windowsIcon} alt="Start" />
        </div>
    )
}

export default StartButton;