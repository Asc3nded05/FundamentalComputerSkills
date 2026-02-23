import { dispatchDesktopEvent } from '../utils/eventBus.js';
import { runLesson } from '../utils/lessonRunner.js';
function NextButton(props) {
    const { steps, currentLesson, setCurrentStep, setWrongEvent } = props;
    async function handleStartLesson() {
        console.log("Starting lesson...");
        if (!currentLesson) return;
        await runLesson(steps, currentLesson, setCurrentStep, setWrongEvent); 
    }

     function handleNext() {
        dispatchDesktopEvent("Next");}

    return (
        <button onClick={handleStartLesson} className='lesson-start-button'>Start Lesson</button>    );

     // return (
    //     <button className='next-button' onClick={handleNext}>Next</button>
    // );
}   ;  
   


export default NextButton;