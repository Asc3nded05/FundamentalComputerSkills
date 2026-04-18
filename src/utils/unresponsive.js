import { useContext } from 'react';
import { UnresponsiveContext } from '../components/UnresponsiveContext.jsx';


export async function startUnresponsive(stepId, setShowUnresponsive) {
    // Define the step ID that should trigger unresponsive behavior
    const unresponsiveStepId = 0; // Change this to the desired step ID
    if (stepId === unresponsiveStepId) {
        setShowUnresponsive(true);
        console.log(`Starting unresponsive behavior for step ID ${unresponsiveStepId}`);
    }

};
