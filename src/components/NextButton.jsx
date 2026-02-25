import { dispatchDesktopEvent } from '../utils/eventBus.js';
import { useNavigate } from 'react-router-dom';
function NextButton(props) {
    const { handleStartLesson, handleNext, lessonState, eventName} = props;
    const navigate = useNavigate();

    // Dispatch Finish event and navigate back to lessons page when Finish button is clicked
    function handleFinish() {
        dispatchDesktopEvent("Finish");
        navigate(`/lessons`);
    }
    // Conditional rendering of Start, Next, and Finish buttons based on lesson state and current event
    if (lessonState === "NotStarted") {
    return (
        <button onClick={handleStartLesson} className='lesson-start-button'>Start Lesson</button>    );
    } else if (lessonState === "InProgress" && eventName?.includes("Next")) {
        return (
            <button className='next-button' onClick={handleNext}>Next</button>
        );
    } else if (eventName?.includes("Finish")) {
        return (
            <button className='next-button' onClick={handleFinish}>Finish</button>
        );
    } else {
        return null;
    }
}   ;  
   


export default NextButton;