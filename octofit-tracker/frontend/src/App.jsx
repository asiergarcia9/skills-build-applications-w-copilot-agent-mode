import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Users       from './components/Users';
import Activities  from './components/Activities';
import Teams       from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts    from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/users',       label: 'Users' },
  { to: '/activities',  label: 'Activities' },
  { to: '/teams',       label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts',    label: 'Workouts' },
];

function App() {
  return (
    <>
      <header>
        <h1>OctoFit Tracker</h1>
        <nav>
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : undefined}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users"       element={<Users />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"    element={<Workouts />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
