// import { readJsonFile } from './jsonService.js';
// const LessonFile = 'lessons.json';

// // GET ALL
// export const getAllLessons = async () => {
//     return await readJsonFile('lessonData.json');
// }

// //GET LESSON BY ID
// export const getLessonById = async (lessonId) => {
//     const data = await readJsonFile('lessonData.json');
//     const lessons = data.lessons;
//     return lessons.find(lesson => lesson.lessonId === lessonId);
// }



import initOracle from "../database/oracle.js";

export async function getAllLessons() {

    console.log("getAllLessons called");
    let connection;

    try {
        connection = await initOracle();

        const result = await connection.execute(
        `SELECT lessonId, lessonName, categoryId, orderNumber
        FROM ADMIN.Lesson
        ORDER BY categoryId, orderNumber`
        );

        return result.rows.map(row => ({
        lessonId: row[0],
        lessonName: row[1],
        categoryId: row[2],
        orderNumber: row[3]
        }));
    } finally {
        if (connection) await connection.close();
    }
}

export async function getLessonById(id) {
    let connection;

    try {
        connection = await initOracle();

        const result = await connection.execute(
        `SELECT lessonId, lessonName, categoryId, orderNumber
        FROM ADMIN.Lesson
        WHERE lessonId = :id`,
        { id }
        );

        if (result.rows.length === 0) return null;

        const row = result.rows[0];

        return {
        lessonId: row[0],
        lessonName: row[1],
        categoryId: row[2],
        orderNumber: row[3]
        };
    } finally {
        if (connection) await connection.close();
    }
}
