import Checklist from './Checklist';
import { useLesson } from '../api/useLesson.js';

function SideBar({instructions}) {
    

    return (
        <>
            <div id='sidebar' className='sidebar'>
                {/* dropdown menu 
                <div class="dropdown">
                    <button class="dropdown-button">Menu</button>
                    <div class="dropdown-content">
                        <a href="#">Name</a>
                        <a href="/lessons">Lessons</a> 
                        <a href="/">Desktop</a>
                        <a href="#">Setting</a> 
                        <a href="/login">Log Out</a> 
                    </div>
                </div>
                */}

                {/* Lesson number and progress */}
                <div className='lesson-num'>
                    <button onClick={useLesson(1,1)} className='start-button'>Start Lesson</button>
                    <p>Lesson #1</p>
                    <div className="lesson-progress"></div>
                </div>

                <Checklist />

                {/* Help buttons */}
                <div className="help-buttons">
                    <button className="hint-button">
                        Hints
                    </button>
                    <button className="chat-button">
                        Questions
                    </button>
                </div>
                
            </div>
        </>
    );
}

export default SideBar;