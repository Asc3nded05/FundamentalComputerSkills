import { eventBus } from "./eventBus";

export async function runLesson(
    steps,
    lessonId, 
    updateInstructions, 
    updateWrongEvent, 
    setEventName
) {
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
    function waitForEvent(validEventNames, onWrongEvent) {
        return new Promise(resolve => {
            const handler = (event) => {
                const triggered = event.detail.type;

                console.log(`User triggered event: ${triggered}`);
                console.log(`Valid events: ${validEventNames.join(", ")}`);

                if (validEventNames.includes(triggered)) {
                    eventBus.removeEventListener("*", handler);
                    resolve(event);
                } else {
                    onWrongEvent(triggered);
                }
            };

            eventBus.addEventListener("*", handler);
        });
    }

    // Runs the specified step
    async function runStep(step) {
        updateInstructions(step.text);

        const validEventNames = step.events.map(e => e.eventName);
        setEventName(validEventNames);

        await waitForEvent(
            validEventNames, 
            (wrongEvent) => onWrongEvent(wrongEvent, validEventNames)
        );
    }

    async function onWrongEvent(eventType, validEventNames) {
        // TODO: indicate to the user that they have performed the wrong action
        updateWrongEvent(`User triggered ${eventType} instead of ${validEventNames.join(", ")}`);
        return;
    }

    // Loops through every step in the lesson
    while (currentStepNumber <= sortedSteps.length) {
        // Select and run the current step
        updateWrongEvent(null);
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