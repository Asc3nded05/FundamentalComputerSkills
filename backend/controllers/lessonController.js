import { getAllLessons, getLessonById } from "../services/lessonService.js";

// GET /api/lessons
export const getLessons = async (req, res) => {
    try {
        const lessons = await getAllLessons();
        res.json(lessons);
    } catch (error) {
        console.error('Error fetching lessons:', error);
        res.status(500).json({ error: 'Failed to fetch lessons' });
    }
};

// GET /api/lessons/:id
export const getLesson = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const lesson = await getLessonById(id);

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
};