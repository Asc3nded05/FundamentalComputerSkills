import { useState, useEffect } from 'react';
import { useLessons } from '../api/useLessons.js';
import Accordion from 'react-bootstrap/Accordion';

function Lessons() {
    const { response, loading, error} = useLessons();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading lessons</div>;

    return (
        <div className="lessons-page">
            <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
            <Accordion.Header>Lessons</Accordion.Header>
            <Accordion.Body>
            {response?.lessons?.map((lesson, index) => (
                <div className="lesson" key={index}>
                    <button type="button" className="lesson-header">{lesson.name}</button>
                </div>
            ))}
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            
            {/* {response?.lessons?.map((category, index) => (
                <div className="lesson" key={index}>
                    <button type="button" className="lesson-header">{category.category}</button>
                    <div className="lesson-content">
                        {category?.items?.map((lesson, lessonIndex) => (
                            <p key={lessonIndex}>{lesson}</p>
                        ))}
                    </div>
                </div>
            ))} */}
        </div>
    );
}

export default Lessons;
