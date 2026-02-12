import { readJsonFile } from './jsonService.js';
// const LessonFile = 'lessons.json';

// GET ALL
export const getAllLessons = async () => {
    return await readJsonFile('lessonData.json');
}


//GET LESSON BY ID
export const getLessonById = async (lessonId) => {
    const lessonsData = await readJsonFile('lessonData.json');
    return lessonsData.find(lesson => lesson.id === lessonId);
}


