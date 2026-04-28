import Accordion from 'react-bootstrap/Accordion';
//import { useNavigate } from 'react-router-dom';

function LessonAccordian({ lessons, resetLessonState, lessonState }) {
  //const navigate = useNavigate();

  const startLesson = (lesson) => {
    if (lessonState === "InProgress") {
      if (!window.confirm("You have an ongoing lesson. Starting a new lesson will lose your current progress. Do you want to continue?")) {
        return;
      }
    }
      const data = {
        lessonId: lesson.lessonId,
      };
      resetLessonState(data);
      //navigate('/', { state: data });
  }

  const categories = lessons?.reduce((acc, lesson) => {
    const categoryKey = lesson.categoryName ?? `Category ${lesson.categoryId}`;
    if (!acc[categoryKey]) {
      acc[categoryKey] = {
        categoryId: lesson.categoryId,
        categoryName: categoryKey,
        categoryOrderNumber: lesson.categoryOrderNumber ?? 0,
        lessons: [],
      };
    }
    acc[categoryKey].lessons.push(lesson);
    return acc;
  }, {});

  const sortedCategories = Object.values(categories || {}).sort(
    (a, b) => a.categoryOrderNumber - b.categoryOrderNumber
  );

  return (
    <Accordion defaultActiveKey="0">
      {sortedCategories.length > 0 ? (
        sortedCategories.map((category, index) => (
          <Accordion.Item key={category.categoryId ?? index} eventKey={`${index}`}>
            <Accordion.Header>{category.categoryName}</Accordion.Header>
            <Accordion.Body>
              {category.lessons.map((lesson) => (
                <div key={lesson.lessonId}>
                  <button className="lesson-button" onClick={() => startLesson(lesson)}>{lesson.lessonName}</button>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))
      ) : (
        <Accordion.Item eventKey="0">
          <Accordion.Header>No lessons available</Accordion.Header>
          <Accordion.Body>
            <p>There are no lessons to display.</p>
          </Accordion.Body>
        </Accordion.Item>
      )}
    </Accordion>
  );
}

export default LessonAccordian;