import { useState, useEffect } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError]           = useState(null);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => { if (!r.ok) throw new Error(`API error ${r.status}`); return r.json(); })
      .then((d) => Array.isArray(d) ? d : d.results ?? d)
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
