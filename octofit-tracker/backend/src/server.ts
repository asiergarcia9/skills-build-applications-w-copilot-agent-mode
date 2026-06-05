import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';

import usersRouter       from './routes/users';
import activitiesRouter  from './routes/activities';
import teamsRouter       from './routes/teams';
import workoutsRouter    from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Build Codespaces-aware API base URL
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

console.log(`API base URL: ${API_BASE_URL}`);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl: API_BASE_URL });
});

app.use('/api/users',       usersRouter);
app.use('/api/activities',  activitiesRouter);
app.use('/api/teams',       teamsRouter);
app.use('/api/workouts',    workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

export default app;
