import { getAllSteps, getStepById } from '../services/stepService.js';

// GET /api/steps
export const getSteps = async (req, res) => {
    try {
        const steps = await getAllSteps();
        res.json(steps);
    } catch (error) {
        console.error('Error fetching steps:', error);
        res.status(500).json({ error: 'Failed to fetch steps' });
    }
};

// GET /api/steps/:id
export const getStep = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const step = await getStepById(id);

    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }

    res.json(step);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch step' });
  }
};
