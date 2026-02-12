import fs from 'fs/promises';
import path from 'path';
export const readJsonFile = async (filePath) => {
    const file = path.join(process.cwd(), 'data', filePath);
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
}