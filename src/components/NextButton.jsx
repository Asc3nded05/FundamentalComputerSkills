import { dispatchDesktopEvent } from '../utils/eventBus.js';
import { runLesson } from '../utils/lessonRunner.js';
import { useNavigate } from 'react-router-dom';
function NextButton(props) {
    const { steps, currentLesson, setCurrentStep, setWrongEvent, handleStartLesson, handleNext, lessonState, eventName} = props;
    const navigate = useNavigate();
    function handleFinish() {
        dispatchDesktopEvent("Finish");
        navigate(`/lessons`);
    }
    if (lessonState === "NotStarted") {
    return (
        <button onClick={handleStartLesson} className='lesson-start-button'>Start Lesson</button>    );
    } else if (lessonState === "InProgress" && eventName === "Next") {
        return (
            <button className='next-button' onClick={handleNext}>Next</button>
        );
    } else if (eventName === "Finish") {
        return (
            <button className='next-button' onClick={handleFinish}>Finish</button>
        );
    } else {
        return null;
    }
     // return (
    //     <button className='next-button' onClick={handleNext}>Next</button>
    // );
}   ;  
   


export default NextButton;