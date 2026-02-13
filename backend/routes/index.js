import express from 'express';
import lessonRoutes from './lessons.js';
import stepRoutes from './steps.js';
import initOracle from "../database/oracle.js";

const router = express.Router();

router.get("/test-db", async (req, res) => {
  try {
    const conn = await initOracle();
    const result = await conn.execute("SELECT 'DB connection successful!' AS message FROM dual");
    await conn.close();

    res.json({ message: result.rows[0][0] });
  } catch (err) {
    console.error("DB test error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.use('/lessons', lessonRoutes);
router.use('/steps', stepRoutes);

export default router;

