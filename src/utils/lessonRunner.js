import { eventBus } from "./eventBus";

export async function runLesson(steps, lessonId, updateInstructions, updateWrongEvent) {
    // call backend API to retrieve steps by lessonId
    console.log("Running lesson with ID:", lessonId);
    console.log("Steps:", steps);
    
      if (!steps || steps.length === 0) {
        console.error("No steps found for lesson", lessonId);
        return;
    }

    // Ensures that steps are in the correct order
    const sortedSteps = [...steps].sort((a, b) => a.orderNumber - b.orderNumber);
    // Tracks which step the user is on
    let currentStepNumber = 1;

    // Creates a promise that listens for the specified event before allowing the program to progress
    function waitForEvent(correctEventName, onWrongEvent) {
        return new Promise(resolve => {
            const handler = (event) => {
                const triggeredEventName = event.detail.type;
                console.log(`User triggered event: ${triggeredEventName}, waiting for event: ${correctEventName}`);
                if (triggeredEventName === correctEventName) {
                    eventBus.removeEventListener("*", handler);
                    resolve(event);
                } else {
                    onWrongEvent(triggeredEventName);
                }
            };

            eventBus.addEventListener("*", handler);
        });
    }

    // Runs the specified step
    async function runStep(step) {
        let instructions = step.text;
        updateInstructions(instructions);
        console.log(`steps.events.eventName: ${step.events[0].eventName}`);
        await waitForEvent(step.events[0].eventName, (eventType) => onWrongEvent(eventType, step))
    }

    async function onWrongEvent(eventType, step) {
        // TODO: indicate to the user that they have performed the wrong action
        updateWrongEvent(`User triggered ${eventType} instead of ${step.events[0].eventName}`);
        // console.alert(`User triggered ${eventType} instead of ${step.events[0].eventName}`);
        return;
    }

    // Loops through every step in the lesson
    while (currentStepNumber <= sortedSteps.length) {
        // Select and run the current step
        updateWrongEvent(null);
        const step = sortedSteps.find(step => step.orderNumber === currentStepNumber);
        console.log('step.events:', step.events); 

        if (!step) {
            console.error(`No step found with orderNumber ${currentStepNumber}`);
            break;
        }

        await runStep(step);

        // Increment to the next step in the lesson.
        currentStepNumber++;
    }

    // TODO: call backend API to add a new entry to the userLesson table with the completion value set to true.
}