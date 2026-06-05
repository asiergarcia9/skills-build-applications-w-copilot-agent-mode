import { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router = Router();

// GET all users
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// GET single user
router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST create user
router.post('/', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  const { password: _pw, ...safe } = user.toObject();
  res.status(201).json(safe);
});

// PUT update user
router.put('/:id', async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
});

export default router;
