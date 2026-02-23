import Checklist from './Checklist';
import { useLesson } from '../api/useLesson.js';
import { runLesson } from '../utils/lessonRunner.js';
import { useState } from 'react';
import { useStep } from '../api/useStep.js';
import { dispatchDesktopEvent } from '../utils/eventBus.js';
import NextButton from './NextButton.jsx';
import '../css/SideBar.css';

function SideBar(props) {
    const lessonId = props.lessonId;
    const currentLesson = lessonId || 1; // Default to lesson 1 if no lessonId is provided
    if (!lessonId) {
        console.log('No lessonId provided, defaulting to:', currentLesson);
    } else {
        const currentLesson = lessonId;
        console.log('Received lessonId prop:', lessonId);
    }   
    const { response: lesson, loading, error } = useLesson(currentLesson);
    const {response: steps, loading: stepsLoading, error: stepsError} = useStep(currentLesson);
    console.log('Steps from useStep hook:', steps);
    const [currentStep, setCurrentStep] = useState("Press Start Lesson to Begin");
    const [wrongEvent, setWrongEvent] = useState(null);
   

    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading lesson data</div>;

    return (
        <>
            <div id='sidebar' className='sidebar'>
                {/* Lesson number and progress */}
                <div className='lesson-num'>
                    {/* <button onClick={handleStartLesson} className='lesson-start-button'>Start Lesson</button> */}
                    <p>Lesson #{currentLesson}</p>
                    <div className="lesson-progress"></div>
                </div>
                <p className="wrong-event">{wrongEvent}</p>
                <p>{currentStep}</p>

                <NextButton steps={steps} currentLesson={currentLesson} setCurrentStep={setCurrentStep} setWrongEvent={setWrongEvent}/>
                {/* <button className='next-button' onClick={handleNext}>Next</button> */}

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