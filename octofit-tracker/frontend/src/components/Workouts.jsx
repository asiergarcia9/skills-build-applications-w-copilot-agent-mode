import { useState, useEffect } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => { if (!r.ok) throw new Error(`API error ${r.status}`); return r.json(); })
      .then((d) => Array.isArray(d) ? d : d.results ?? d)
      .then(setWorkouts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading workouts…</p>;
  if (error)   return <p className="error">Error: {error}</p>;

  return (
    <section>
      <h2>Workouts</h2>
      {workouts.map((w) => (
        <div key={w._id} className="workout-card">
          <h3>{w.title}</h3>
          {w.description && <p>{w.description}</p>}
          <ul>
            {(w.exercises ?? []).map((ex, i) => (
              <li key={i}>
                <strong>{ex.name}</strong>
                {ex.sets && ` — ${ex.sets} sets × ${ex.reps} reps`}
                {ex.durationSeconds && ` — ${ex.durationSeconds}s`}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
