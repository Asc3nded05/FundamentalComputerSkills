import { useState, useEffect } from 'react';
import { useLessons } from '../api/useLessons.js';
import LessonAccordian from '../components/lessonAccordian.jsx';
import '../css/Lessons.css';
function Lessons() {
    const { response, loading, error} = useLessons();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading lessons</div>;

    return (
        <div className='lesson-content'>
            <LessonAccordian lessons={response?.lessons} />
        </div>

  );
}
           
export default Lessons;
