import { Request, Response } from 'express';
import TeamsService from '../service/Team.service';

class TeamsController {
  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const { code, data } = await TeamsService.findAll();
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async findByPk(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { code, data } = await TeamsService.findByPk(Number(id));
      return res.status(code).json(data);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default TeamsController;
