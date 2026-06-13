'use client';

import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBackendData = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real ingress setup, you might just fetch('/api/data')
      // For local development, we fallback to the Express port
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.izhardev.me';
      const res = await fetch(`${apiUrl}/api/data`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }
      const jsonData = await res.json();
      setData(jsonData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Frontend App (Next.js)</h1>
      <p>This is a basic frontend page built to test Ingress Nginx setup.</p>
      
      <button 
        onClick={fetchBackendData}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '1rem'
        }}
      >
        {loading ? 'Fetching...' : 'Call Backend API'}
      </button>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', color: '#333' }}>
        <h2>Backend Response:</h2>
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>No data fetched yet. Click the button above.</p>
        )}
      </div>
    </main>
  );
}
