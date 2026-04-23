import initOracle from "../database/oracle.js";

export async function getAllLessons() {

    console.log("getAllLessons called");
    let connection;

    try {
        connection = await initOracle();

        const result = await connection.execute(
        `SELECT l.lessonId, l.lessonName, l.categoryId, c.categoryName, c.categoryOrderNumber, l.orderNumber
        FROM ADMIN.Lesson l
        INNER JOIN ADMIN.Category c ON l.categoryId = c.categoryId
        ORDER BY c.categoryOrderNumber, l.orderNumber`
        );

        return result.rows.map(row => ({
        lessonId: row[0],
        lessonName: row[1],
        categoryId: row[2],
        categoryName: row[3],
        categoryOrderNumber: row[4],
        orderNumber: row[5]
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

export async function getAppsByLessonId(lessonId) {
    let connection;

    try {
        connection = await initOracle();

        const result = await connection.execute(
            `SELECT a.appId, a.registryId, a.appIcon, a.cpuMin, a.cpuMax, a.memMin, a.memMax, a.diskMin, a.diskMax, a.netMin, a.netMax
            FROM ADMIN.App a
            INNER JOIN ADMIN.LessonApp la ON a.appId = la.appId
            WHERE la.lessonId = :lessonId
            ORDER BY a.registryId`,
            { lessonId }
        );

        return result.rows.map(row => ({
            appId: row[0],
            registryId: row[1],
            appIcon: row[2],
            cpuMin: row[3],
            cpuMax: row[4],
            memMin: row[5],
            memMax: row[6],
            diskMin: row[7],
            diskMax: row[8],
            netMin: row[9],
            netMax: row[10]
        }));
    } finally {
        if (connection) await connection.close();
    }
}
