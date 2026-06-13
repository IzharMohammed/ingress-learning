'use client';

import { useState } from 'react';

/* --- PREVIOUS PAGE COMMENTED OUT ---
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.izhardev.me';
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
      <p>Click the button below to fetch the message from the backend server.</p>
      
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
--- END OF PREVIOUS PAGE --- */

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBackendData = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ||'http://localhost:3001' || 'https://api.izhardev.me';
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
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      fontFamily: "'Quicksand', 'Nunito', 'Comic Sans MS', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap');
        
        .cute-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          padding: 50px 40px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 500px;
          width: 90%;
          border: 3px solid rgba(255, 255, 255, 0.6);
        }

        .cute-title {
          color: #ff6b81;
          font-size: 2.5rem;
          margin-bottom: 10px;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(255, 107, 129, 0.15);
          letter-spacing: -0.5px;
        }

        .cute-subtitle {
          color: #747d8c;
          font-size: 1.2rem;
          margin-bottom: 35px;
        }

        .cute-button {
          background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
          color: #ff4757;
          border: none;
          padding: 16px 35px;
          font-size: 1.3rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(255, 154, 158, 0.5);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          font-family: inherit;
        }

        .cute-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 12px 25px rgba(255, 154, 158, 0.7);
        }

        .cute-button:disabled {
          background: #dfe4ea;
          color: #a4b0be;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .message-box {
          margin-top: 35px;
          background: #ffffff;
          padding: 25px;
          border-radius: 20px;
          border: 3px dashed #ff9a9e;
          color: #2f3542;
          font-size: 1.15rem;
          line-height: 1.6;
          animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          text-align: left;
          white-space: pre-wrap;
        }

        .error-box {
          border-color: #ff4757;
          color: #ff4757;
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div className="cute-card">
        <h1 className="cute-title">🌸 For Muskaan 🌸</h1>
        <p className="cute-subtitle">A special message just for you! ✨</p>
        
        <button 
          className="cute-button"
          onClick={fetchBackendData}
          disabled={loading}
        >
          {loading ? 'Opening...' : '✨ Tap Here ✨'}
        </button>

        {error ? (
          <div className="message-box error-box">
            Oops! Error: {error}
          </div>
        ) : data ? (
          <div className="message-box">
            {data.data?.message || JSON.stringify(data, null, 2)}
          </div>
        ) : null}
      </div>
    </main>
  );
}
