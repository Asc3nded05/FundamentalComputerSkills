import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lessonCompletionStates';

export function useLessonCompletion() {
  const [completedLessons, setCompletedLessons] = useState({});

  // Load completion states from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCompletedLessons(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing lesson completion states:', error);
      }
    }
  }, []);

  // Mark a lesson as completed
  const markLessonComplete = (lessonId) => {
    setCompletedLessons((prev) => {
      const updated = {
        ...prev,
        [lessonId]: {
          completed: true,
          completedAt: new Date().toISOString(),
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Mark a lesson as incomplete
  const markLessonIncomplete = (lessonId) => {
    setCompletedLessons((prev) => {
      const updated = { ...prev };
      delete updated[lessonId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Check if a lesson is completed
  const isLessonCompleted = (lessonId) => {
    return completedLessons[lessonId]?.completed || false;
  };

  // Clear all completion states
  const clearAllCompletions = () => {
    setCompletedLessons({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    completedLessons,
    markLessonComplete,
    markLessonIncomplete,
    isLessonCompleted,
    clearAllCompletions,
  };
}
