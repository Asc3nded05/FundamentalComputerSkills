function SearchBar({ toggleSearch, query, setQuery }) {
    const stop = (e) => {
        // Prevent the document-level outside-click handler from running
        // so the toggle handler can run alone and correctly close the menu.
        if (e && e.stopPropagation) e.stopPropagation();
    };      
    


    return (
        <div
            className="start-button"
            onFocus={toggleSearch}
            onMouseDown={stop}
            onTouchStart={stop}
        >
            <input
                className="taskbar-search"
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                            />
        </div>
    )
}

export default SearchBar;