import { Request, Response } from 'express';
import MatchService from '../service/Match.service';

// interface ITeam {
//   teamName: string,
// }

// interface IMatch {
//   id: number,
//   homeTeam: number,
//   homeTeamGoals: number,
//   awayTeam: number,
//   awayTeamGoals: number,
//   inProgress: boolean,
//   teamHome: ITeam,
//   teamAway: ITeam,
// }

class MatchController {
  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const progress = req.query.inProgress;
      if (progress !== null && typeof progress === 'string') {
        const { code, data } = await MatchService.findAllInProgress(progress);
        return res.status(code).json(data);
      }
      const { code, data } = await MatchService.findAll();
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default MatchController;
