import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

// GET all activities (optionally filter by userId)
router.get('/', async (req: Request, res: Response) => {
  const filter = req.query.userId ? { userId: req.query.userId } : {};
  const activities = await Activity.find(filter).sort({ date: -1 });
  res.json(activities);
});

// GET single activity
router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params.id);
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
});

// POST create activity
router.post('/', async (req: Request, res: Response) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json({ message: 'Activity deleted' });
});

export default router;
