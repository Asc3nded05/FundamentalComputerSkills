import { useContext } from 'react';
import { UnresponsiveContext } from '../components/UnresponsiveContext.jsx';


export async function startUnresponsive(stepId, setShowUnresponsive) {
    console.log(`Checking if step ID ${stepId} should trigger unresponsive behavior...`);
    const unresponsiveStepId = 96; // Change this stepId that needs Unresponsive
    if (stepId === unresponsiveStepId) {
        setShowUnresponsive(true);
        console.log(`Starting unresponsive behavior for step ID ${unresponsiveStepId}`);
    }

};
