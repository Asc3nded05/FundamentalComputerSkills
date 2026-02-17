import Accordion from 'react-bootstrap/Accordion';
import Desktop from '../pages/Desktop';
import { useNavigate } from 'react-router-dom';

function LessonAccordian(lesson) {
  const navigate = useNavigate();
  const startLesson = (lesson) => {
        console.log('Lesson ID:', lesson.lessonId);
      const data = {
        lessonId: lesson.lessonId,
      };
      navigate('/', { state: data });

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