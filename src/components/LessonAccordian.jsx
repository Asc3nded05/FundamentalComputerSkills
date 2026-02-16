import Accordion from 'react-bootstrap/Accordion';
import Desktop from '../pages/Desktop';

function LessonAccordian(lesson) {
  const startLesson = (lesson) => {
    console.log('Starting lesson:', lesson);
    console.log('Lesson ID:', lesson.lessonId);
    <Desktop lessonId={lesson.lessonId} />
  }
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Lesson 1</Accordion.Header>
        <Accordion.Body>
          {lesson?.lessons?.map((lesson, index) => (
              <button key={index} onClick={() => startLesson(lesson)}>{lesson.name}</button>
          ))}
        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>
  );
}

export default LessonAccordian;