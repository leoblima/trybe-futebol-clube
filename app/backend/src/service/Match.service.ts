import TeamsModel from '../database/models/Team';
import MatchModel from '../database/models/Match';
import TeamsService from './Team.service';

class MatchService {
  static getQueryValue(query: string):boolean {
    if (query === 'true') return true;
    return false;
  }

  static getInProgress(data: MatchModel[], query: boolean) {
    const inProgressMatches = data.filter((match) => match.inProgress === query);
    return inProgressMatches;
  }

  static async getTeamName(id: number) {
    const team = await TeamsService.findByPk(id);
    if (typeof team.data !== 'string') return { teamName: team.data.teamName };
  }

  static async findAllInProgress(query: string) {
    console.log('service');
    const { data } = await MatchService.findAll();
    const queryValue = MatchService.getQueryValue(query);
    const queryMatches = MatchService.getInProgress(data, queryValue);
    return { code: 200, data: queryMatches };
  }

  static async findAll() {
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
