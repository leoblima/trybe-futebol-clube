import TeamsModel from '../database/models/Team';

class TeamsService {
  static async findAll() {
    const teams = await TeamsModel.findAll();
    return { code: 200, data: teams };
  }

  static async findByPk(id: number) {
    const team = await TeamsModel.findByPk(id);
    if (team) return { code: 200, data: team };
    return { code: 404, data: 'Team not found!' };
  }
}

export default TeamsService;
