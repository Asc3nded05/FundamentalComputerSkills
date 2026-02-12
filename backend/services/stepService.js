import { readJsonFile } from './jsonService.js';

export const getAllSteps = async () => {
    const data = await readJsonFile('stepData.json');
    return data.steps;
}

export const getStepById = async (stepId) => {
    const data = await readJsonFile('stepData.json');
    return data.steps.find(step => step.stepId === stepId);
}

export const getStepsByLessonId = async (lessonId) => {
    const data = await readJsonFile('stepData.json');
    return data.steps.filter(step => step.lessonId === lessonId);
};