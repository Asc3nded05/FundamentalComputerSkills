import { useLesson } from '../api/useLesson.js';
import { runLesson } from '../utils/lessonRunner.js';
import { useState } from 'react';
import { useStep } from '../api/useStep.js';
import { Link } from 'react-router-dom';
import { dispatchDesktopEvent } from '../utils/eventBus.js';
import { MdArrowBack } from 'react-icons/md';
import { MdPerson } from 'react-icons/md';
import NextButton from './NextButton.jsx';
import '../css/SideBar.css';
import Loading from './Loading.jsx';
import React from 'react';
import hintVideo from '../assets/TestVideo.mp4';

function SideBar(props) {
    // Sets Current LessonID or Default to lesson 1 if no lessonId is provided
    const currentLesson = props.lessonId || 1; 

     // "NotStarted", "InProgress", "Completed"
    const [lessonState, setLessonState] = useState("NotStarted");

    //Event name to determine which button to show
    const [eventName, setEventName] = useState(null);

    //Starts Lesson
      async function handleStartLesson() {
        console.log("Starting lesson...");
        setLessonState("InProgress");

        //Runs lesson and listens for events
        await runLesson(steps, currentLesson, setCurrentStep, setWrongEvent, setEventName, eventName);
    }

    //Dispatch Next event when Next button is clicked
     function handleNext() {
        dispatchDesktopEvent("Next");
    }
   
    // Fetches lesson data
    const { loading, error } = useLesson(currentLesson);

    // Fetches step data for the current lesson
    const {response: steps} = useStep(currentLesson);

    // State to track the current step's instructions and any wrong events
    const [currentStep, setCurrentStep] = useState("Press Start Lesson to Begin");
    const [wrongEvent, setWrongEvent] = useState(null);
   
    // Handles loading and error states
    if (loading) return <Loading />;
    if (error) return <div>Error loading lesson data</div>;

    return (
         <div className="sidebar-container">
                <div className="sidebar-links">
                    <div className="lesson-link link">
                        <Link to="/lessons">
                        <MdArrowBack size={30} />
                        Lessons</Link>
                    </div>
                    <div className="login-link link">
                        <Link to="/login">
                        <MdPerson style={{ fontSize: '2rem', color: 'Blue' }} />
                        </Link>
                    </div>
                   
                </div>
            <div id='sidebar' className='sidebar'>
                {/* Lesson number and progress */}
                <div className='lesson-num'>
                    <p>Lesson #{currentLesson}</p>
                    <div className="lesson-progress">
                        <div className={"lesson-progress-bar"}
                            // style={{width: `${(currentStepId / steps.length * 100)}%`}}
                        ></div>
                    </div>
                </div>
                <p className="wrong-event">{wrongEvent}</p>
                <p className="current-step">{currentStep}</p>
                {/* Next button Component for Conditional Rendering */}
                <NextButton 
                steps={steps} 
                currentLesson={currentLesson} 
                setCurrentStep={setCurrentStep} 
                setWrongEvent={setWrongEvent} 
                handleStartLesson={handleStartLesson} 
                handleNext={handleNext}
                lessonState={lessonState}
                eventName={eventName}
                setEventName={setEventName}
                />

                {/* Help buttons */}
                <div className="help-buttons">
                    <button popoverTarget="hint-content" className="hint-button">
                        Hints
                    </button>
                    {/* Uses the Popover API */}
                    {/* Hint content popover */}
                    <div id="hint-content" popover="auto" className="hint-content">
                        <p>This is the hint text.</p>
                        <button popoverTarget="big-demo" className="hint-demo">Demo</button>
                    </div>
                    {/* Demo gif popover */}
                    <div id="big-demo" popover='auto'>
                        <video autoPlay loop muted controls={false}>
                            <source src={hintVideo} type="video/mp4" />
                        </video>  
                    </div>

                    <button className="chat-button">
                        Questions
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default SideBar;