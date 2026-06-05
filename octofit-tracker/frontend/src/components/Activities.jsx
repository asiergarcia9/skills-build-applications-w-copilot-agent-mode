import { useState, useEffect } from 'react';
import { fetchList } from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError]           = useState(null);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    fetchList('/api/activities')
      .then(setActivities)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading activities…</p>;
  if (error)   return <p className="error">Error: {error}</p>;

  return (
    <section>
      <h2>Activities</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Distance (km)</th>
            <th>Calories</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a._id}>
              <td>{a.type}</td>
              <td>{a.duration}</td>
              <td>{a.distance ?? '—'}</td>
              <td>{a.calories ?? '—'}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
