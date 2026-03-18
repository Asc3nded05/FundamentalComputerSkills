import { useState, useEffect } from 'react';
export function useLesson(lessonId) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`http://4.172.249.10:3000/api/lessons/${lessonId}`)
            .then(res => res.json())
            .then(data => {
                console.log('Fetched lessons:', data);
                setResponse(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [lessonId]);
    return { response, loading, error };
}