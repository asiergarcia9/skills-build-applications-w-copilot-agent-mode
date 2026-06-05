import { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

// GET all teams
router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members', '-password').populate('createdBy', '-password');
  res.json(teams);
});

// GET single team
router.get('/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params.id).populate('members', '-password').populate('createdBy', '-password');
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

// POST create team
router.post('/', async (req: Request, res: Response) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

// PUT update team
router.put('/:id', async (req: Request, res: Response) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json({ message: 'Team deleted' });
});

export default router;
