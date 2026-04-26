import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';

function LessonAccordian({ lessons }) {
  const navigate = useNavigate();
  // Function to handle starting a lesson, navigates to the Desktop page with the selected lesson's ID
  const startLesson = (lesson) => {
      const data = {
        lessonId: lesson.lessonId,
      };
      navigate('/', { state: data });

  }
  // Renders an accordion with a list of lessons. Each lesson is a button that starts the lesson when clicked.
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