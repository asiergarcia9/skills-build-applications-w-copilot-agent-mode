import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { User }     from './models/User';
import { Activity } from './models/Activity';
import { Team }     from './models/Team';
import { Workout }  from './models/Workout';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Activity.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // ── Users ────────────────────────────────────────────────────────────────
  const users = await User.insertMany([
    { username: 'paul_octo',    email: 'paul@mergington.edu',    password: 'hashed_pw_1' },
    { username: 'jessica_cat',  email: 'jessica@mergington.edu', password: 'hashed_pw_2' },
    { username: 'alex_runner',  email: 'alex@mergington.edu',    password: 'hashed_pw_3' },
    { username: 'sam_lifts',    email: 'sam@mergington.edu',     password: 'hashed_pw_4' },
    { username: 'maya_cyclist', email: 'maya@mergington.edu',    password: 'hashed_pw_5' },
  ]);
  console.log(`Inserted ${users.length} users`);

  const [paul, jessica, alex, sam, maya] = users;

  // ── Activities ───────────────────────────────────────────────────────────
  const activities = await Activity.insertMany([
    { userId: paul._id,    type: 'running',  duration: 30, distance: 5,   calories: 300, date: new Date('2026-06-01') },
    { userId: paul._id,    type: 'walking',  duration: 45, distance: 3.5, calories: 150, date: new Date('2026-06-02') },
    { userId: jessica._id, type: 'cycling',  duration: 60, distance: 20,  calories: 480, date: new Date('2026-06-01') },
    { userId: jessica._id, type: 'running',  duration: 25, distance: 4,   calories: 240, date: new Date('2026-06-03') },
    { userId: alex._id,    type: 'running',  duration: 50, distance: 8,   calories: 500, date: new Date('2026-06-01') },
    { userId: alex._id,    type: 'running',  duration: 40, distance: 6.5, calories: 400, date: new Date('2026-06-04') },
    { userId: sam._id,     type: 'strength', duration: 60, calories: 350, date: new Date('2026-06-02') },
    { userId: sam._id,     type: 'strength', duration: 55, calories: 320, date: new Date('2026-06-05') },
    { userId: maya._id,    type: 'cycling',  duration: 90, distance: 35,  calories: 700, date: new Date('2026-06-01') },
    { userId: maya._id,    type: 'cycling',  duration: 75, distance: 28,  calories: 580, date: new Date('2026-06-03') },
  ]);
  console.log(`Inserted ${activities.length} activities`);

  // ── Teams ────────────────────────────────────────────────────────────────
  const teams = await Team.insertMany([
    {
      name: 'Cardio Crew',
      description: 'Running and cycling enthusiasts at Mergington High.',
      members: [paul._id, jessica._id, alex._id, maya._id],
      createdBy: paul._id,
    },
    {
      name: 'Iron Squad',
      description: 'Strength training focused team.',
      members: [sam._id, paul._id],
      createdBy: sam._id,
    },
  ]);
  console.log(`Inserted ${teams.length} teams`);

  // ── Workouts ─────────────────────────────────────────────────────────────
  const workouts = await Workout.insertMany([
    {
      title: 'Beginner 5K Plan',
      description: 'Three-day running plan to build up to 5K.',
      createdBy: paul._id,
      exercises: [
        { name: 'Warm-up walk',   durationSeconds: 300 },
        { name: 'Easy jog',       durationSeconds: 1200 },
        { name: 'Cool-down walk', durationSeconds: 300 },
      ],
    },
    {
      title: 'Full-Body Strength',
      description: 'Compound lifts for total-body strength.',
      createdBy: sam._id,
      exercises: [
        { name: 'Squat',       sets: 4, reps: 8 },
        { name: 'Bench Press', sets: 4, reps: 8 },
        { name: 'Deadlift',    sets: 3, reps: 5 },
        { name: 'Pull-up',     sets: 3, reps: 10 },
      ],
    },
    {
      title: 'Interval Cycling',
      description: 'High-intensity cycling intervals.',
      createdBy: maya._id,
      exercises: [
        { name: 'Warm-up spin',   durationSeconds: 300 },
        { name: 'Sprint interval', durationSeconds: 60 },
        { name: 'Recovery spin',  durationSeconds: 120 },
        { name: 'Sprint interval', durationSeconds: 60 },
        { name: 'Cool-down spin', durationSeconds: 300 },
      ],
    },
  ]);
  console.log(`Inserted ${workouts.length} workouts`);

  console.log('\nDatabase seeded successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
