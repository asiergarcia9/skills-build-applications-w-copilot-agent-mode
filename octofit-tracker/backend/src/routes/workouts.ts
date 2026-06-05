import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

// GET all workouts
router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().populate('createdBy', '-password');
  res.json(workouts);
});

// GET single workout
router.get('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id).populate('createdBy', '-password');
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json(workout);
});

// POST create workout
router.post('/', async (req: Request, res: Response) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

// PUT update workout
router.put('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json(workout);
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json({ message: 'Workout deleted' });
});

export default router;
