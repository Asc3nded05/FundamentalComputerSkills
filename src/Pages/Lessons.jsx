import { useState, useEffect } from 'react';
import { useLesson } from '../api/useLesson.js';

function Lessons() {
    const { response, loading, error} = useLesson();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading lessons</div>;

    return (
        <div className="lessons-page">
            {response?.lessons?.map((category, index) => (
                <div className="lesson" key={index}>
                    <button type="button" className="lesson-header">{category.category}</button>
                    <div className="lesson-content">
                        {category.items.map((lesson, lessonIndex) => (
                            <p key={lessonIndex}>{lesson}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Lessons;
