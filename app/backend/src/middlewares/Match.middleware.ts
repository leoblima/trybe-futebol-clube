import { Request, Response, NextFunction } from 'express';

class MatchValidation {
  static areTeamsEquals(teamHome: number, teamAway: number) {
    return teamHome === teamAway;
  }

  static async checkMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    switch (true) {
      case MatchValidation.areTeamsEquals(homeTeam, awayTeam):
        return res.status(200)
          .json({ message: 'It is not possible to create a match with two equal teams' });

        break;

      default:
        break;
    }
  }
}

export default MatchValidation;
