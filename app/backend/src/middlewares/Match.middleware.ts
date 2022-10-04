import { Request, Response, NextFunction } from 'express';
import TeamsService from '../service/Team.service';
import MatchService from '../service/Match.service';

class MatchValidation {
  static async checkMatchProgress(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const match = await MatchService.findByPk(Number(id));
    if (match.code === 404) return res.status(404).json({ message: 'Match not found' });
    if (!match.data?.inProgress) return res.status(403).json({ message: 'Not authorized' });
    next();
  }

  static areTeamsEquals(teamHome: number, teamAway: number) {
    return teamHome === teamAway;
  }

  static async isIdTeamValid(id: number) {
    const { code } = await TeamsService.findByPk(id);
    return code === 404;
  }

  static async checkMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    if (MatchValidation.areTeamsEquals(homeTeam, awayTeam)) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    if (await MatchValidation.isIdTeamValid(homeTeam)
        || await MatchValidation.isIdTeamValid(awayTeam)) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }
    next();
  }
}

export default MatchValidation;
