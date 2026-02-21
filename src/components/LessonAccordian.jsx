import Accordion from 'react-bootstrap/Accordion';
import Desktop from '../pages/Desktop';
import { useNavigate } from 'react-router-dom';

function LessonAccordian({ lessons }) {
  const navigate = useNavigate();
  console.log("LessonAccordian received lesson prop:", lessons);
  const startLesson = (lesson) => {
      const data = {
        lessonId: lesson.lessonId,
      };
      console.log("Starting lesson with data:", data);
      navigate('/', { state: data });

  }
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" >
        <Accordion.Header>Computer Basics</Accordion.Header>
        <Accordion.Body>
          {lessons?.map((lesson, index) => (
            <div key={index}>
              <button className="lesson-button" onClick={() => startLesson(lesson)}>{lesson.lessonName}</button>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>
  );
}

export default LessonAccordian;