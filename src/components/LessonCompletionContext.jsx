import { createContext, useContext } from 'react';
import { useLessonCompletion } from '../utils/useLessonCompletion';

const LessonCompletionContext = createContext();

export function LessonCompletionProvider({ children }) {
  const completion = useLessonCompletion();
  return (
    <LessonCompletionContext.Provider value={completion}>
      {children}
    </LessonCompletionContext.Provider>
  );
}

export function useLessonCompletionContext() {
  return useContext(LessonCompletionContext);
}