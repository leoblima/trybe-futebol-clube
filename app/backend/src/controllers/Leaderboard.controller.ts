import { Request, Response } from 'express';
import Leaderboard from '../service/Leaderboard.service';
import LeaderboardHome from '../service/LeaderboardHome.service';
import LeaderboardAway from '../service/LeaderboardAway.service';

class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    try {
      const { code, data } = await Leaderboard.getLeaderboard();
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getLeadaerboardHome(req: Request, res: Response) {
    try {
      const { code, data } = await LeaderboardHome.getLeaderboardHome();
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getLeadaerboardAway(req: Request, res: Response) {
    try {
      const { code, data } = await LeaderboardAway.getLeaderboardAway();
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default LeaderboardController;
