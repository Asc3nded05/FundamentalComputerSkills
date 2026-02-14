import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

function FileIndex() {
    let folders = [
        {name: 'Desktop', folders:[]},
        {name: 'Documents', folders:[]},
        {name: 'Downloads', folders:[]},
        {name: 'Music', folders:[]},
        {name: 'Pictures', 
            folders: [
                {name: 'Cat Pics', 
                    folders: [
                        {name: 'CuteCats.jpg'}                
                    ]
                },
                {name: 'Photo.jpg'}
            ]
        },
        {name: 'Videos', folders:[]},
        {name: 'Networks', folders:[]}
    ];
    return <div className="file-index">
        <ul>
            {folders.map((folder) => (
            <Folder folder={folder} key={folder.name} />
            ))}
        </ul>
    </div>;
}

function Folder({folder}) {
    let [isOpen, setIsOpen] = useState(false);
    return <>
        <li key={folder.name}>
            <span>
                {folder.folders && folder.folders.length > 0 && (
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <FaChevronRight style={{ transform: 'rotate(90deg)' }} />
                        ) : (
                            <FaChevronRight />
                        )}
                    </button>
                )}
                {/* This would use icons to differentiate folders and files: 
                {folder.folders ? (<FolderIcon />) : (<FileIcon />)}*/}
                {folder.name}
            </span>

            {isOpen && (
                <ul className="file-index-subfolders">
                    {folder.folders?.map((folder) => (
                        <Folder folder={folder} key={folder.name} />
                    ))}
                </ul>
            )}
        </li>
    </>
}

export default FileIndex;