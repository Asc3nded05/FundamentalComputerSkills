import { eventBus } from "./eventBus";

export async function runLesson(userId, lessonId, setInstructions) {
    // TODO: call backend API to retrieve steps by lessonId
    let steps = [];

    // Ensures that steps are in the correct order
    const sortedSteps = [...steps].sort((a, b) => a.orderNumber - b.orderNumber);
    // Tracks which step the user is on
    let currentStepNumber = 1;

    // Creates a promise that listens for the specified event before allowing the program to progress
    function waitForEvent(correctEventName, onWrongEvent) {
        return new Promise(resolve => {
            const handler = (event) => {
                const triggeredEventName = event.detail.type;
                if (triggeredEventName === correctEventName) {
                    eventBus.removeEventListener("*", handler);
                    resolve(event);
                } else {
                    onWrongEvent(event.detail.type);
                }
            };

            eventBus.addEventListener("*", handler);
        });
    }

    // Runs the specified step
    async function runStep(step) {
        let instructions = step.text;
        setInstructions(instructions); // Update the instructions in the sidebar
        
        await waitForEvent(step.eventName);
    }

    async function onWrongEvent(eventType) {
        // TODO: indicate to the user that they have performed the wrong action
        console.warn(`User triggered ${eventType} instead of ${step.eventName}`);
        return;
    }

    // Loops through every step in the lesson
    while (currentStepNumber <= sortedSteps.length) {
        // Select and run the current step
        const step = sortedSteps.find(step => step.orderNumber === currentStepNumber);

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