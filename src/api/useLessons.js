import { useState, useEffect } from 'react';
export function useLessons() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // fetch(`https://fundamentalcomputerskills.duckdns.org/api/lessons`)
        fetch(`http://localhost:3000/api/lessons`)
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

