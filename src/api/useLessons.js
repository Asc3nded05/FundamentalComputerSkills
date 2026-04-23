import { useState, useEffect } from 'react';

let lessonsCache = null;
let lessonsPromise = null;

export function useLessons() {
    const [response, setResponse] = useState(lessonsCache);
    const [loading, setLoading] = useState(!lessonsCache);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (lessonsCache) {
            return;
        }

        if (!lessonsPromise) {
            lessonsPromise = fetch(`https://fcscapstone.duckdns.org/api/lessons`)
                .then(res => res.json())
                .then(data => {
                    lessonsCache = data;
                    return data;
                })
                .catch(err => {
                    lessonsPromise = null;
                    throw err;
                });
        }

        lessonsPromise
            .then(data => {
                setResponse(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { response, loading, error };
}

