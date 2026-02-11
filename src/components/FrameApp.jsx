import React, { useState, useEffect } from 'react';
import sampleTextFile from '../assets/example.txt';

function FrameApp() {
    const [text, setText] = useState('');
      
    useEffect(() => {
        fetch(sampleTextFile)
        .then((response) => response.text())
        .then((textContent) => {
            setText(textContent);
        })
        .catch((error) => console.error('Error fetching text file:', error));
    }, []);

    return ( <>
            <div className="notepad-bottom-nav"> 
                <button>File</button>
                <button>Edit</button>
                <button>View</button>
            </div>
            <div className="notepad-content">
                <textarea className="notepad-body" value={text}></textarea>
            </div>
        </>
        );
}

export default FrameApp;