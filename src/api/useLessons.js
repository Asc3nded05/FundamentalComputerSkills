import { useState, useEffect } from 'react';
export function useLessons() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`/api/lessons`)
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
    }, []);
    return { response, loading, error };
}

