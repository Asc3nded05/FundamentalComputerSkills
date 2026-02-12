import express from 'express';
import { getSteps, getStep} from '../controllers/stepController.js';

const router = express.Router();

// GET /api/steps
router.get('/', getSteps);

// GET /api/steps/:id
router.get('/:id', getStep);

export default router;