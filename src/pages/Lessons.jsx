import { useState, useEffect } from 'react';
import { useLessons } from '../api/useLessons.js';
import LessonAccordian from '../components/LessonAccordian.jsx';
import Loading from '../components/Loading.jsx';
import '../css/Lessons.css';
function Lessons() {
    //Fetches lesson data
    const { response, loading, error} = useLessons();

    // Handles loading and error states
    if (loading) return <Loading />;
    if (error) return <div>Error loading lessons</div>;

    return (
        // Lesson Accordian component to display list of lessons and their steps
        <div className='lesson-content'>
            <LessonAccordian lessons={response} />
        </div>

  );
}
           
export default Lessons;
