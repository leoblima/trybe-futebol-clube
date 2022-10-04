import { Request, Response, NextFunction } from 'express';
import MatchService from '../service/Match.service';

class MatchValidation {
  static areTeamsEquals(teamHome: number, teamAway: number) {
    return teamHome === teamAway;
  }

  static async isIdTeamValid(id: number) {
    const { code } = await MatchService.findByPk(id);
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
