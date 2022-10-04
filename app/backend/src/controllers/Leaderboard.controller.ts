import { Request, Response } from 'express';
import Leaderboard from '../service/Leaderboard.service';

class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    try {
      const { code, data } = await Leaderboard.getLeaderboard();
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default LeaderboardController;
