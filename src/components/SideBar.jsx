import Checklist from './Checklist';
import { useLesson } from '../api/useLesson.js';
import { runLesson } from '../utils/lessonRunner.js';
import { useState } from 'react';
import { useStep } from '../api/useStep.js';
import { dispatchDesktopEvent } from '../utils/eventBus.js';

function SideBar() {

    const { response: lesson, loading, error } = useLesson(1,1);
    const {response: steps, loading: stepsLoading, error: stepsError} = useStep(1,1);
    const [currentStep, setCurrentStep] = useState("Start Lesson");
    function handleNext() {
        dispatchDesktopEvent("Next");}

    async function handleStartLesson() {
        console.log("Starting lesson...");
        if (!lesson) return;
        console.log(lesson);
        await runLesson(steps, 1, setCurrentStep);
    }
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading lesson data</div>;

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
                    <button onClick={handleStartLesson} className='start-button'>Start Lesson</button>
                    <p>Lesson #1</p>
                    <div className="lesson-progress"></div>
                </div>

                <p>{currentStep}</p>
                {/* <Checklist lesson={lesson} /> */}

                <button className='next-button' onClick={handleNext}>Next</button>

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