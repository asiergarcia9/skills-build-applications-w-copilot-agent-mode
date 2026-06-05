import { useState, useEffect } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => { if (!r.ok) throw new Error(`API error ${r.status}`); return r.json(); })
      .then((d) => Array.isArray(d) ? d : d.results ?? d)
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users…</p>;
  if (error)   return <p className="error">Error: {error}</p>;

  return (
    <section>
      <h2>Users</h2>
      <table>
        <thead>
          <tr><th>Username</th><th>Email</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
