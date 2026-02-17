import Accordion from 'react-bootstrap/Accordion';
import Desktop from '../pages/Desktop';
import { useNavigate } from 'react-router-dom';

function LessonAccordian(lesson) {
  const navigate = useNavigate();
  const startLesson = (lesson) => {
      const data = {
        lessonId: lesson.lessonId,
      };
      navigate('/', { state: data });

  }
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" >
        <Accordion.Header>Computer Basics</Accordion.Header>
        <Accordion.Body>
          {lesson?.lessons?.map((lesson, index) => (
            <div key={index}>
              <button className="lesson-button" onClick={() => startLesson(lesson)}>{lesson.name}</button>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>
  );
}

export default LessonAccordian;