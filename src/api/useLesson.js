import { useState, useEffect } from 'react';
export function useLesson(lessonId) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`https://fundamentalcomputerskills.duckdns.org/api/lessons/${lessonId}`)
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