import { useState, useEffect } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => { if (!r.ok) throw new Error(`API error ${r.status}`); return r.json(); })
      .then((d) => Array.isArray(d) ? d : d.results ?? d)
      .then(setEntries)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading leaderboard…</p>;
  if (error)   return <p className="error">Error: {error}</p>;

  return (
    <section>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Total Duration (min)</th>
            <th>Total Distance (km)</th>
            <th>Total Calories</th>
            <th>Activities</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={e.userId}>
              <td>{i + 1}</td>
              <td>{e.username}</td>
              <td>{e.totalDuration}</td>
              <td>{e.totalDistance ?? '—'}</td>
              <td>{e.totalCalories ?? '—'}</td>
              <td>{e.activityCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
