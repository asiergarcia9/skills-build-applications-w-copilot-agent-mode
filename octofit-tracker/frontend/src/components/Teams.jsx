import { useState, useEffect } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

export default function Teams() {
  const [teams, setTeams]   = useState([]);
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => { if (!r.ok) throw new Error(`API error ${r.status}`); return r.json(); })
      .then((d) => Array.isArray(d) ? d : d.results ?? d)
      .then(setTeams)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading teams…</p>;
  if (error)   return <p className="error">Error: {error}</p>;

  return (
    <section>
      <h2>Teams</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Description</th><th>Members</th></tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.description ?? '—'}</td>
              <td>{(t.members ?? []).map((m) => m.username ?? m).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
