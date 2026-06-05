import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import usersRouter      from './routes/users';
import activitiesRouter from './routes/activities';
import teamsRouter      from './routes/teams';
import workoutsRouter   from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/users',       usersRouter);
app.use('/api/activities',  activitiesRouter);
app.use('/api/teams',       teamsRouter);
app.use('/api/workouts',    workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

export default app;
