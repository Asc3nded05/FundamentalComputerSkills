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



// import initOracle from "../database/oracle.js";

// export async function getAllSteps() {
//     let connection;

//     try {
//         connection = await initOracle();

//         const result = await connection.execute(
//         `SELECT stepId, lessonId, text, orderNumber
//         FROM ADMIN.Step
//         ORDER BY lessonId, orderNumber`
//         );

//         return result.rows.map(row => ({
//         stepId: row[0],
//         lessonId: row[1],
//         text: row[2],
//         orderNumber: row[3]
//         }));
//     } finally {
//         if (connection) await connection.close();
//     }
// }

// export async function getStepById(id) {
//     let connection;

//     try {
//         connection = await initOracle();

//         const result = await connection.execute(
//         `SELECT stepId, lessonId, text, orderNumber
//         FROM ADMIN.Step
//         WHERE stepId = :id`,
//         { id }
//         );

//         if (result.rows.length === 0) return null;

//         const row = result.rows[0];

//         return {
//         stepId: row[0],
//         lessonId: row[1],
//         text: row[2],
//         orderNumber: row[3]
//         };
//     } finally {
//         if (connection) await connection.close();
//     }
// }

// export async function getStepsByLessonId(lessonId) {
//     let connection;

//     try {
//         connection = await initOracle();

//         const result = await connection.execute(
//         `SELECT 
//             s.stepId,
//             s.text,
//             s.orderNumber,
//             e.eventId,
//             e.eventName
//         FROM ADMIN.Step s
//         LEFT JOIN ADMIN.StepEvent se ON s.stepId = se.stepId
//         LEFT JOIN ADMIN.Event e ON se.eventId = e.eventId
//         WHERE s.lessonId = :lessonId
//         ORDER BY s.orderNumber`,
//         { lessonId }
//         );

//         // Transform into structured JSON
//         const stepsMap = new Map();

//         for (const row of result.rows) {
//         const [stepId, text, orderNumber, eventId, eventName] = row;

//         if (!stepsMap.has(stepId)) {
//             stepsMap.set(stepId, {
//             stepId,
//             text,
//             orderNumber,
//             events: []
//             });
//         }

//         if (eventId) {
//             stepsMap.get(stepId).events.push({
//             eventId,
//             eventName
//             });
//         }
//         }

//         return [...stepsMap.values()];
//     } finally {
//         if (connection) await connection.close();
//     }
// }