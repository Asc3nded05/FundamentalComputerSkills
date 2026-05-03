import { useLesson } from '../api/useLesson.js';
import { runLesson } from '../utils/lessonRunner.js';
import { useState, useEffect } from 'react';
import { useStep } from '../api/useStep.js';
import { dispatchDesktopEvent } from '../utils/eventBus.js';
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import '../css/SideBar.css';
import Loading from './Loading.jsx';
import React from 'react';
import { createPortal } from 'react-dom';
import { useSettingsContext } from '../utils/settings/settingsContext.jsx';
import { useContext } from 'react';
import { UnresponsiveContext } from './UnresponsiveContext.jsx';
import AIChat from './AIChat.jsx';
import Lessons from '../pages/Lessons.jsx';
import { useNavigate } from 'react-router-dom';
import { useLessonCompletionContext } from '../components/LessonCompletionContext.jsx';

// import hintVideo from '../assets/TestVideo.mp4';
//import vid from '../assets/HintVideos/FileExplorerTaskbarOpen.mp4';

function SideBar(props) {
    // Sets Current LessonID or Default to lesson 1 if no lessonId is provided
    const [currentLesson, setCurrentLesson] = useState(props.lessonId || 1);

    const resetLessonState = (lessonData) => {
        setCurrentLesson(lessonData.lessonId);
        setLessonState("NotStarted");
        setStepInstructions("Press Start Lesson to Begin");
        setEventName(null);
        setCompletedSteps(0);
        setNextStep(null);
        setActiveId(1);
        setHintText(null);
        setHintVideo(null);
        setShowUnresponsive(false);
        // Something to close apps when reset
    };

    // "NotStarted", "InProgress", "Completed", "Sandbox"
    const [lessonState, setLessonState] = useState("NotStarted");

    const [readAloud, setReadAloud] = useState(true);
    const [voiceIndex, setVoiceIndex] = useState(0);

    const { volume } = useSettingsContext();

    //Event name to determine which button to show
    const [eventName, setEventName] = useState(null);

    const { showUnresponsive, setShowUnresponsive } = useContext(UnresponsiveContext);

    const { isLessonCompleted, markLessonComplete } = useLessonCompletionContext();

    //Starts Lesson
    async function handleStartLesson() {
        //console.log("Starting lesson...");
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
            setCompletedSteps,
            setShowUnresponsive
        );
    }

    //Dispatch Next event when Next button is clicked
    function handleNext() {
        dispatchDesktopEvent("Next");
    }

    // //Temporary function to create unresponsive state for testing
    // function handleCreateUnresponsive() {

    // }


    const videoShowButton = document.getElementById('hint-demo');
    document.addEventListener("click", function (event) {
        if (videoShowButton && !videoShowButton.contains(event.target)) {
            setShowVideo(false);
        }
    });

    // Fetches lesson data
    const { response, loading, error } = useLesson(currentLesson);

    // Fetches step data for the current lesson
    const { response: steps } = useStep(currentLesson);
    //console.log("Steps:", steps);

    // State to track the current step's instructions and any wrong events
    const [stepInstructions, setStepInstructions] = useState("Press Start Lesson to Begin");
    const [nextStep, setNextStep] = useState(null);
    const [hintText, setHintText] = useState(null);
    const [hintVideo, setHintVideo] = useState(null);
    const [wrongEvent, setWrongEvent] = useState(null);
    const [completedSteps, setCompletedSteps] = useState(0);

    // State for video demo
    const [showVideo, setShowVideo] = useState(false);

    const toggleShowVideo = () => {
        setShowVideo(prev => !prev);
    };

    // State for chat messages (persists across tab switches)
    const [messages, setMessages] = useState([]);

    // Effect to read nextStep aloud when it changes
    useEffect(() => {
        if (stepInstructions && readAloud && stepInstructions !== "Lesson Completed! Great Job!") {
            const audio = new SpeechSynthesisUtterance(stepInstructions);
            const voices = window.speechSynthesis.getVoices();
            // console.log("Available voices:", voices);
            if (voices.length > 0) {
                audio.voice = voices[voiceIndex % voices.length];
            }
            audio.pitch = 1; // Value of 1 to 2
            audio.rate = 1; // Speed of the text read
            audio.volume = volume / 100;
            window.speechSynthesis.speak(audio);
        }
        return () => {
            window.speechSynthesis.cancel();
        };
    }, [stepInstructions, readAloud, voiceIndex]);

    // Effect to stop audio when read-aloud is turned off or lesson changes
    useEffect(() => {
        if (!readAloud) {
            window.speechSynthesis.cancel();
        }
    }, [readAloud]);

    const stepCount = steps?.length || 0;
    const progressPercent = stepCount ? Math.round((completedSteps / (stepCount-1)) * 100) : 0;

    useEffect(() => {
        if (stepCount > 0 && completedSteps === stepCount) {
            setLessonState("Completed");
        }
    }, [completedSteps, stepCount]);

    // Reset chat when lesson changes
    useEffect(() => {
        setMessages([]);
    }, [currentLesson]);

    // useEffect(() => {
    //     // console.log("Next step:", nextStep);
    //     if (nextStep === "45") {
    //         // console.log("Next step is 45");
    //     }

    // }, [nextStep]);

    // side bar tabs handled here
    const [activeId, setActiveId] = useState(1);

    const buttons = [
        { id: 1, label: 'Main' },
        { id: 2, label: 'Lessons' },
        { id: 3, label: 'AI Chat' },
    ];

    let content;
    if (activeId === 2) {
        content = <Lessons resetLessonState={resetLessonState} lessonState={lessonState}/>;
    } else if (activeId === 3) {
        content = <AIChat lessonId={currentLesson} steps={steps} completedSteps={completedSteps} stepInstructions={stepInstructions} nextStep={nextStep} messages={messages} setMessages={setMessages} />;
    } else {
        content = null;
    }

    let nextButton;
    if (lessonState === "NotStarted") {
        nextButton = <button onClick={handleStartLesson} className='next-button'>Start Lesson</button>
    } else if (lessonState === "InProgress" && eventName?.includes("Next")) {
        nextButton = (
            <button className='next-button' onClick={handleNext}>Next</button>
        );
    } else if (eventName?.includes("Finish")) {
        nextButton = (
            <button className='next-button' onClick={handleFinish}>Finish</button>
        );
    } else {
        nextButton = null;
    }

    // When finishing a lesson, the desktop is switched to a sandbox mode which has all the apps in it. 
    const navigate = useNavigate();
    function handleFinish() {
        markLessonComplete(currentLesson);
        setActiveId(2);

        // Enter sandbox mode
        setCurrentLesson(0);
        navigate('/', { state: { lessonId: 0 } });

        setLessonState("Sandbox");
        setStepInstructions("To start a new lesson, go to the Lessons tab and select a lesson.");
        setEventName(null);
        setCompletedSteps(0);
        setNextStep(null);
        setHintText(null);
        setHintVideo(null);
        setShowUnresponsive(false);
    }

    // Handles loading and error states
    if (loading) return <Loading />;
    if (error) return <div>Error loading lesson data</div>;

    return (
        <>
            <div className="sidebar-wrapper">
                <div className="sidebar-links">
                    {buttons.map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setActiveId(btn.id)}
                            className={activeId === btn.id ? 'active' : ''}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
                <div id='sidebar-tab' className='sidebar-tab' style={(activeId === 1) ? { zIndex: '0' } : { zIndex: '10' }}>
                    {content}
                </div>
                <div className='sidebar-main' style={(activeId === 1) ? { zIndex: '10' } : { zIndex: '0' }}>
                    <div className='sidebar-main-container'>
                        <div id='sidebar' className='sidebar'>
                            {/* Lesson number and progress */}
                            <div className='lesson-num' style={(lessonState === "Sandbox") ? { display: 'none' } : { display: 'block' }}>
                                <p>{response.lessonName}</p>
                                <div className="lesson-progress">
                                    <div className={"lesson-progress-bar"} style={{ width: `${progressPercent}%` }}></div>
                                </div>
                            </div>
                            {/* <p className="wrong-event">{wrongEvent}</p> */}
                            <p className="step-instructions" style={(lessonState === "Sandbox") ? { paddingTop: '20px' } : { paddingTop: 'none' }}>{stepInstructions}</p>
                            <p className="next-step">{nextStep}</p>
                            {/* Next button for Conditional Rendering */}
                            {nextButton}
                            {/* <button onClick={() => setShowUnresponsive(prev => !prev)}>Create Unresponsive</button> */}

                            {/* Help buttons */}
                            <div className="help-buttons">
                                <button popoverTarget="hint-content" className={`hint-button ${!hintText ? 'disabled' : ''}`}>
                                    Hint
                                </button>
                                {/* Hint content popover */}
                                <div id="hint-content" popover="auto" className="hint-content">
                                    <p>{hintText}</p>
                                </div>
                                
                                <button popoverTarget="big-demo" className={`hint-demo ${!hintVideo ? 'disabled' : ''}`} id="hint-demo" onClick={() => toggleShowVideo()}>
                                    Demo
                                </button>
                                
                                <button
                                    className="read-aloud"
                                    onClick={() => setReadAloud(!readAloud)}
                                    title={readAloud ? 'Turn off read aloud' : 'Turn on read aloud'}
                                >
                                    {readAloud ? <MdVolumeUp size={30} /> : <MdVolumeOff size={30} />}
                                    Read Aloud
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showVideo && props.desktopRef?.current && createPortal(
                <div id="big-demo" onClick={() => setShowVideo(false)} style={{ zIndex: 1000, position: 'absolute' }}>
                    <video autoPlay loop muted controls={false}>
                        <source src={hintVideo} type="video/mp4" />
                    </video>
                </div>,
                props.desktopRef.current
            )}
        </>
    );
}

export default SideBar;
