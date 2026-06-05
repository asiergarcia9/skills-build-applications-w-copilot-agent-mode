import { useState, useEffect } from 'react';
import { fetchList } from '../api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList('/api/leaderboard')
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
