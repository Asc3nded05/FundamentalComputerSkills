import { useLesson } from '../api/useLesson.js';
import { runLesson } from '../utils/lessonRunner.js';
import { useState, useEffect } from 'react';
import { useStep } from '../api/useStep.js';
import { Link } from 'react-router-dom';
import { dispatchDesktopEvent } from '../utils/eventBus.js';
import { MdArrowBack } from 'react-icons/md';
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import NextButton from './NextButton.jsx';
import '../css/SideBar.css';
import Loading from './Loading.jsx';
import React from 'react';
import { createPortal } from 'react-dom';
import { useSettingsContext } from '../utils/settings/settingsContext.jsx';
// import hintVideo from '../assets/TestVideo.mp4';

function SideBar(props) {
    // Sets Current LessonID or Default to lesson 1 if no lessonId is provided
    const currentLesson = props.lessonId || 1; 

     // "NotStarted", "InProgress", "Completed"
    const [lessonState, setLessonState] = useState("NotStarted");

    const [readAloud, setReadAloud] = useState(true);
    
    const {volume} = useSettingsContext();

    //Event name to determine which button to show
    const [eventName, setEventName] = useState(null);

    //Starts Lesson
      async function handleStartLesson() {
        console.log("Starting lesson...");
        setCompletedSteps(0);
        setLessonState("InProgress");

        //Runs lesson and listens for events
        await runLesson(
            steps,
            currentLesson,
            setStepInstructions,
            setNextStep,
            setHintText,
            setHintVideo,
            setWrongEvent,
            setEventName,
            setCompletedSteps
        );
    }

    //Dispatch Next event when Next button is clicked
     function handleNext() {
        dispatchDesktopEvent("Next");
    }

    
    const videoShowButton = document.getElementById('hint-demo');
    document.addEventListener("click", function(event) {
        if (videoShowButton && !videoShowButton.contains(event.target)) {
            setShowVideo(false);
        }
    });
    
    // Fetches lesson data
    const { loading, error } = useLesson(currentLesson);

    // Fetches step data for the current lesson
    const {response: steps} = useStep(currentLesson);

    // State to track the current step's instructions and any wrong events
    const [stepInstructions, setStepInstructions] = useState("Press Start Lesson to Begin");
    const [nextStep, setNextStep] = useState(null);
    const [hintText, setHintText] = useState(null);
    const [hintVideo, setHintVideo] = useState(null);
    const [wrongEvent, setWrongEvent] = useState(null);
    const [completedSteps, setCompletedSteps] = useState(0);
   
    // State for video demo
    const [showVideo, setShowVideo] = useState(false);

    // Effect to read nextStep aloud when it changes
    useEffect(() => {
        if (stepInstructions && readAloud) {
            const audio = new SpeechSynthesisUtterance(stepInstructions);
            audio.pitch = 1; // Value of 1 to 2
            audio.volume = volume / 100;
            window.speechSynthesis.speak(audio);
        }
    }, [stepInstructions, readAloud]);

    // Effect to stop audio when read-aloud is turned off
    useEffect(() => {
        if (!readAloud) {
            window.speechSynthesis.cancel();
        }
    }, [readAloud]);

    const stepCount = steps?.length || 0;
    const progressPercent = stepCount ? Math.round((completedSteps / stepCount) * 100) : 0;

    useEffect(() => {
        if (stepCount > 0 && completedSteps === stepCount) {
            setLessonState("Completed");
        }
    }, [completedSteps, stepCount]);

    // Handles loading and error states
    if (loading) return <Loading />;
    if (error) return <div>Error loading lesson data</div>;


    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-links">
                    <div className="lesson-link link">
                        <Link to="/lessons">
                        <MdArrowBack size={30} />
                        Lessons</Link>
                    </div>
                    <button 
                        className="read-aloud-link link" 
                        onClick={() => setReadAloud(!readAloud)}
                        title={readAloud ? 'Turn off read aloud' : 'Turn on read aloud'}
                    >
                        {readAloud ? <MdVolumeUp size={30} /> : <MdVolumeOff size={30} />}
                        Read Aloud
                    </button>
                   
                </div>
            <div id='sidebar' className='sidebar'>
                {/* Lesson number and progress */}
                <div className='lesson-num'>
                    <p>Lesson #{currentLesson}</p>
                    <div className="lesson-progress">
                        <div className={"lesson-progress-bar"} style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <p className="lesson-progress-text">{completedSteps} of {stepCount} steps complete ({progressPercent}%)</p>
                </div>
                {/* <p className="wrong-event">{wrongEvent}</p> */}
                <p className="step-instructions">{stepInstructions}</p>
                <p className="next-step">{nextStep}</p>
                {/* Next button Component for Conditional Rendering */}
                <NextButton 
                    handleStartLesson={handleStartLesson} 
                    handleNext={handleNext}
                    lessonState={lessonState}
                    eventName={eventName}
                />

                {/* Help buttons */}
                <div className="help-buttons">
                    <button popoverTarget="hint-content" className="hint-button">
                        Hints
                    </button>
                    {/* Uses the Popover API */}
                    {/* Hint content popover */}
                    <div id="hint-content" popover="auto" className="hint-content">
                        <p>{hintText}</p>
                        <button popoverTarget="big-demo" className="hint-demo" id="hint-demo" onClick={() => setShowVideo(true)}>Demo</button>
                    </div>
                    
                    {/* Demo gif popover */}
                    {/* <div id="big-demo" popover='auto'>
                        <video autoPlay loop muted controls={false}>
                            <source src={hintVideo} type="video/mp4"/>
                        </video>  
                    </div> */}

                    <button className="chat-button">
                        Questions
                    </button>
                </div>
                
            </div>
        </div>
        {showVideo && props.desktopRef?.current && createPortal(
            <div id="big-demo" onClick={() => setShowVideo(false)} style={{ /* add positioning/styles as needed */ }}>
                <video autoPlay loop muted controls={false}>
                    <source src={hintVideo} type="video/mp4"/>
                </video>
            </div>,
            props.desktopRef.current
        )}
        </>
    );
}

export default SideBar;
