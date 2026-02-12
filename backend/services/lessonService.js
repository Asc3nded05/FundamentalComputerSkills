import { readJsonFile } from './jsonService.js';
// const LessonFile = 'lessons.json';

// GET ALL
export const getAllLessons = async () => {
    return await readJsonFile('lessonData.json');
}


//GET LESSON BY ID
export const getLessonById = async (lessonId) => {
    const data = await readJsonFile('lessonData.json');
    const lessons = data.lessons;
    return lessons.find(lesson => lesson.lessonId === lessonId);
}
