import { useState, useEffect } from 'react';

export function useLessonApps(lessonId) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!lessonId) {
            setResponse(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`https://fundamentalcomputerskills.duckdns.org/api/lessons/${lessonId}/apps`)
            .then(res => res.json())
            .then(data => {
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
