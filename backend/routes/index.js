import express from 'express';
import lessonRoutes from './lessons.js';
import stepRoutes from './steps.js';

const router = express.Router();

router.use('/lessons', lessonRoutes);
router.use('/steps', stepRoutes);

export default router;

