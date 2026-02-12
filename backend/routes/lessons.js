import express from 'express';
import {getLesson, getLessons} from '../controllers/lessonController.js';

const router = express.Router();

// GET /api/lessons
router.get('/', getLessons);

// GET /api/lessons/:id
router.get('/:id', getLesson);

export default router;
