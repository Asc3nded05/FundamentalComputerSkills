import express from 'express';
import { getSteps, getStep, getStepsByLesson} from '../controllers/stepController.js';

const router = express.Router();

// GET /api/steps
router.get('/', getSteps);

// GET /api/steps/:id
router.get('/:id', getStep);

// GET /api/steps/lesson/:lessonId
router.get('/lesson/:lessonId', getStepsByLesson);

export default router;