import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

// GET leaderboard — top users by total activity duration
router.get('/', async (_req: Request, res: Response) => {
  const leaderboard = await Activity.aggregate([
    {
      $group: {
        _id: '$userId',
        totalDuration: { $sum: '$duration' },
        totalDistance: { $sum: '$distance' },
        totalCalories: { $sum: '$calories' },
        activityCount: { $sum: 1 },
      },
    },
    { $sort: { totalDuration: -1 } },
    { $limit: 20 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        username: '$user.username',
        totalDuration: 1,
        totalDistance: 1,
        totalCalories: 1,
        activityCount: 1,
      },
    },
  ]);
  res.json(leaderboard);
});

export default router;
