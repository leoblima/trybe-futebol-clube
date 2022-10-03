import TeamsModel from '../database/models/Team';
import MatchModel from '../database/models/Match';
import TeamsService from './Team.service';

class MatchService {
  static async getTeamName(id: number) {
    const team = await TeamsService.findByPk(id);
    if (typeof team.data !== 'string') return { teamName: team.data.teamName };
  }

  static async findAll() {
    const matchBasis = await MatchModel.findAll();

    const allMatches = await Promise.all(matchBasis.map(async (match) => {
      const { id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
      const teamHome = await MatchService.getTeamName(match.homeTeam);
      const teamAway = await MatchService.getTeamName(match.awayTeam);
      return { id,
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress,
        teamHome,
        teamAway };
    }));
    return { code: 200, data: allMatches };
  }

  static async findAllDirect() {
    const allMatches = await MatchModel.findAll({ include: [
      {
        model: TeamsModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
    ] });

    return { code: 200, data: allMatches };
  }
}

export default MatchService;
