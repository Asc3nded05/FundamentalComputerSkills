import { useState } from 'react';

export function useChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendMessage = async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://fcscapstone.duckdns.org/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      return data.response;   // the AI text
    } catch (err) {
      setError(err.message);
      throw err;               // re‑throw so the component can still display an error message
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
}